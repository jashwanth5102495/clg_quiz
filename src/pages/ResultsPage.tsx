import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { Question, StudentInfo, Answer } from '../types/quiz';
import { apiService } from '../services/api';
import DifficultyBadge from '../components/DifficultyBadge';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const storedStudentInfo = localStorage.getItem('studentInfo');
        const storedAnswers = localStorage.getItem('quizAnswers');
        const storedQuestions = localStorage.getItem('quizQuestions');
        const storedResult = localStorage.getItem('quizResult');

        if (!storedStudentInfo || !storedAnswers || !storedQuestions) {
          navigate('/');
          return;
        }

        const info = JSON.parse(storedStudentInfo) as StudentInfo;
        const userAnswers = JSON.parse(storedAnswers) as Answer[];
        const quizQuestions = JSON.parse(storedQuestions) as Question[];

        setStudentInfo(info);
        setAnswers(userAnswers);
        setQuestions(quizQuestions);

        // Use stored result if available, otherwise calculate locally
        if (storedResult) {
          const result = JSON.parse(storedResult);
          setScore(result.score);
        } else {
          // Fallback: calculate score locally
          let correctCount = 0;
          userAnswers.forEach(answer => {
            const question = quizQuestions.find(q => q.id === answer.questionId);
            if (question && question.correct_answer === answer.selectedOption) {
              correctCount++;
            }
          });
          setScore(correctCount);
        }
      } catch (error) {
        console.error('Error loading results:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [navigate]);

  const handleRetakeQuiz = () => {
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizQuestions');
    navigate('/');
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Average';
    return 'Needs Improvement';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Calculating your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8 transition-colors">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="glass rounded-lg shadow-sm p-6 mb-6 transition-colors bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full mb-3">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-1">Successfully Submitted! 🎉</h2>
              <p className="text-green-600 dark:text-green-300 text-sm">Your quiz has been saved to the database.</p>
            </div>
          </div>

          {/* Results Header */}
          <div className="glass rounded-lg shadow-sm p-8 mb-6 transition-colors">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
                <Award className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Completed!</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Great job, {studentInfo?.name}! Here are your results.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
                    {score}/{questions.length}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Questions Correct</p>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
                    {((score / questions.length) * 100).toFixed(1)}%
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Score Percentage</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {getScoreBadge()}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Performance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Answer Review */}
          <div className="glass rounded-lg shadow-sm p-6 mb-6 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Answer Review</h2>
            
            <div className="space-y-6">
              {questions.map((question, index) => {
                const userAnswer = answers.find(a => a.questionId === question.id);
                const isCorrect = userAnswer?.selectedOption === question.correct_answer;
                const wasAnswered = userAnswer && userAnswer.selectedOption !== -1;

                return (
                  <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-3 py-1 rounded-full">
                          Q{index + 1}
                        </span>
                        <DifficultyBadge difficulty={question.difficulty} />
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      {question.question_text}
                    </h3>

                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = userAnswer?.selectedOption === optionIndex;
                        const isCorrectAnswer = question.correct_answer === optionIndex;

                        let bgColor = 'bg-gray-50 dark:bg-gray-700';
                        let textColor = 'text-gray-700 dark:text-gray-300';
                        let borderColor = 'border-gray-200 dark:border-gray-600';

                        if (isCorrectAnswer) {
                          bgColor = 'bg-green-50 dark:bg-green-900/20';
                          textColor = 'text-green-800 dark:text-green-300';
                          borderColor = 'border-green-200 dark:border-green-700';
                        } else if (isUserAnswer && !isCorrect) {
                          bgColor = 'bg-red-50 dark:bg-red-900/20';
                          textColor = 'text-red-800 dark:text-red-300';
                          borderColor = 'border-red-200 dark:border-red-700';
                        }

                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border ${bgColor} ${borderColor}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={textColor}>{option}</span>
                              <div className="flex items-center gap-2">
                                {isCorrectAnswer && (
                                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                                    Correct
                                  </span>
                                )}
                                {isUserAnswer && (
                                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                                    Your Answer
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {!wasAnswered && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Not answered</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <button
              onClick={handleRetakeQuiz}
              className="inline-flex items-center gap-2 bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Take Another Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;