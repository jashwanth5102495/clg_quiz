import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { Question, StudentInfo, Answer } from '../types/quiz';
import { apiService } from '../services/api';
import Timer from '../components/Timer';
import DifficultyBadge from '../components/DifficultyBadge';
import SuccessModal from '../components/SuccessModal';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedInfo = localStorage.getItem('studentInfo');
    if (!storedInfo) {
      navigate('/');
      return;
    }

    const info = JSON.parse(storedInfo) as StudentInfo;
    setStudentInfo(info);

    const loadQuestions = async () => {
      try {
        setLoading(true);
        const fetchedQuestions = await apiService.getQuestions(info.topic);
        setQuestions(fetchedQuestions);
        setAnswers(fetchedQuestions.map(q => ({ questionId: q.id, selectedOption: -1 })));
      } catch (err) {
        setError('Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [navigate]);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    const answerIndex = newAnswers.findIndex(a => a.questionId === questions[currentQuestionIndex].id);
    if (answerIndex !== -1) {
      newAnswers[answerIndex].selectedOption = optionIndex;
      setAnswers(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    if (!studentInfo) return;

    try {
      setSubmitting(true);
      setError(''); // Clear any previous errors
      
      // Filter out unanswered questions
      const validAnswers = answers.filter(answer => answer.selectedOption !== -1);

      if (validAnswers.length === 0) {
        setError('Please answer at least one question before submitting.');
        return;
      }

      console.log('Submitting quiz with:', {
        studentInfo,
        answersCount: validAnswers.length,
        apiUrl: import.meta.env.VITE_API_URL
      });

      // Submit to backend
      const result = await apiService.submitQuiz(studentInfo, validAnswers);
      
      // Store for results page
      localStorage.setItem('quizResult', JSON.stringify(result));
      localStorage.setItem('quizAnswers', JSON.stringify(validAnswers));
      localStorage.setItem('quizQuestions', JSON.stringify(questions));

      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      
      // More specific error messages
      if (error.message.includes('fetch')) {
        setError('Cannot connect to server. Please check if the backend is running on port 3001.');
      } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        setError('Network error. Please check your internet connection and try again.');
      } else if (error.message.includes('500')) {
        setError('Server error. Please try again in a moment.');
      } else {
        setError(`Failed to submit quiz: ${error.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/results');
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center transition-colors">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
      <Timer initialMinutes={30} onTimeUp={handleTimeUp} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="glass rounded-lg shadow-sm p-6 mb-6 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {studentInfo?.topic} Quiz
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Welcome, {studentInfo?.name} ({studentInfo?.rollNumber})
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Question Progress</p>
                <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="glass rounded-lg shadow-sm p-6 mb-6 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-medium px-3 py-1 rounded-full">
                  Q{currentQuestionIndex + 1}
                </span>
                <DifficultyBadge difficulty={currentQuestion.difficulty} />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {currentQuestion.question_text}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 border-2 rounded-lg transition-colors ${
                    currentAnswer?.selectedOption === index
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        currentAnswer?.selectedOption === index
                          ? 'border-indigo-500 bg-indigo-500 dark:border-indigo-400 dark:bg-indigo-400'
                          : 'border-gray-300 dark:border-gray-500'
                      }`}
                    >
                      {currentAnswer?.selectedOption === index && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="text-gray-900 dark:text-white">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                currentQuestionIndex === 0
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                  : 'glass border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 bg-green-600 dark:bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Quiz Submitted Successfully! 🎉"
        message="Your answers have been saved to the database. You can now view your results."
      />
    </div>
  );
};

export default QuizPage;