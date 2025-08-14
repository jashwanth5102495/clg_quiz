import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  BookOpen,
  Award,
  Calendar,
  Hash
} from 'lucide-react';
import { apiService } from '../services/api';
import DifficultyBadge from '../components/DifficultyBadge';

interface DetailedResult {
  _id: string;
  student_name: string;
  roll_number: string;
  topic: string;
  score: number;
  total_questions: number;
  percentage: number;
  time_taken?: number;
  date: string;
  answers: Array<{
    question_id: {
      _id: string;
      question_text: string;
      options: string[];
      correct_option_index: number;
      difficulty: string;
      sub_category: string;
    };
    selected_option: number;
    is_correct: boolean;
  }>;
}

const AdminResultDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<DetailedResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    if (!id) {
      navigate('/admin/dashboard');
      return;
    }
    loadResultDetail();
  }, [id]);

  const loadResultDetail = async () => {
    try {
      setLoading(true);
      const data = await apiService.getResultDetail(token!, id!);
      setResult(data.result);
    } catch (err: any) {
      if (err.message.includes('401')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
      } else {
        setError('Failed to load result details');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900';
    if (percentage >= 80) return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900';
    if (percentage >= 60) return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900';
    return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900';
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    return 'F';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading result details...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error || 'Result not found'}</p>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
      {/* Header */}
      <div className="glass border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Result Details</h1>
                <p className="text-gray-600 dark:text-gray-300">Detailed analysis of quiz performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Info Card */}
        <div className="glass rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Student Name</p>
                <p className="font-semibold text-gray-900 dark:text-white">{result.student_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Hash className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Roll Number</p>
                <p className="font-semibold text-gray-900 dark:text-white">{result.roll_number}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Topic</p>
                <p className="font-semibold text-gray-900 dark:text-white">{result.topic}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                <p className="font-semibold text-gray-900 dark:text-white">{formatDate(result.date)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Score Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-lg p-6 text-center">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full w-fit mx-auto mb-3">
              <Award className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{result.score}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">out of {result.total_questions}</p>
          </div>

          <div className="glass rounded-lg p-6 text-center">
            <div className={`p-3 rounded-full w-fit mx-auto mb-3 ${getGradeColor(result.percentage)}`}>
              <span className="text-2xl font-bold">{getGrade(result.percentage)}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{result.percentage}%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Percentage</p>
          </div>

          <div className="glass rounded-lg p-6 text-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-fit mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {result.answers.filter(a => a.is_correct).length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Correct</p>
          </div>

          <div className="glass rounded-lg p-6 text-center">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full w-fit mx-auto mb-3">
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {result.answers.filter(a => !a.is_correct).length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Incorrect</p>
          </div>
        </div>

        {/* Time Taken */}
        {result.time_taken && (
          <div className="glass rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Time Taken</p>
                <p className="text-gray-600 dark:text-gray-400">{formatTime(result.time_taken)} out of 30 minutes</p>
              </div>
            </div>
          </div>
        )}

        {/* Question-by-Question Analysis */}
        <div className="glass rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Question Analysis</h2>
          
          <div className="space-y-6">
            {result.answers.map((answer, index) => (
              <div key={answer.question_id._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-3 py-1 rounded-full">
                      Q{index + 1}
                    </span>
                    <DifficultyBadge difficulty={answer.question_id.difficulty as any} />
                    {answer.is_correct ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {answer.question_id.sub_category}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {answer.question_id.question_text}
                </h3>

                <div className="space-y-2">
                  {answer.question_id.options.map((option, optionIndex) => {
                    const isUserAnswer = answer.selected_option === optionIndex;
                    const isCorrectAnswer = answer.question_id.correct_option_index === optionIndex;

                    let bgColor = 'bg-gray-50 dark:bg-gray-700';
                    let textColor = 'text-gray-700 dark:text-gray-300';
                    let borderColor = 'border-gray-200 dark:border-gray-600';

                    if (isCorrectAnswer) {
                      bgColor = 'bg-green-50 dark:bg-green-900/20';
                      textColor = 'text-green-800 dark:text-green-300';
                      borderColor = 'border-green-200 dark:border-green-700';
                    } else if (isUserAnswer && !answer.is_correct) {
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
                                Correct Answer
                              </span>
                            )}
                            {isUserAnswer && (
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                answer.is_correct 
                                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                              }`}>
                                Student's Answer
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResultDetail;