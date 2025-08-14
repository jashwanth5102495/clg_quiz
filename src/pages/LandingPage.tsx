import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Hash, ChevronDown } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    rollNumber: '',
    topic: '' as 'MBA' | 'MCA' | 'ANTI_RAGGING' | ''
  });
  const [errors, setErrors] = useState({
    name: '',
    rollNumber: '',
    topic: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      rollNumber: '',
      topic: ''
    };

    if (!studentInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!studentInfo.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required';
    }

    if (!studentInfo.topic) {
      newErrors.topic = 'Please select a topic';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleStartQuiz = () => {
    if (validateForm()) {
      // Store student info in localStorage for access across components
      localStorage.setItem('studentInfo', JSON.stringify(studentInfo));
      navigate('/quiz');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-black dark:to-gray-900 flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl shadow-xl p-8 transition-colors">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Application</h1>
            <p className="text-gray-600 dark:text-gray-300">Enter your details to begin the assessment</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  value={studentInfo.name}
                  onChange={(e) => setStudentInfo(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
            </div>

            {/* Roll Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Roll Number
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  value={studentInfo.rollNumber}
                  onChange={(e) => setStudentInfo(prev => ({ ...prev, rollNumber: e.target.value }))}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                    errors.rollNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Enter your roll number"
                />
              </div>
              {errors.rollNumber && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.rollNumber}</p>}
            </div>

            {/* Topic Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Topic
              </label>
              <div className="relative">
                <select
                  value={studentInfo.topic}
                  onChange={(e) => setStudentInfo(prev => ({ ...prev, topic: e.target.value as 'MBA' | 'MCA' | 'ANTI_RAGGING' }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white transition-colors ${
                    errors.topic ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700 text-gray-900 dark:text-white`}
                >
                  <option value="">Choose a topic</option>
                  <option value="MBA">MBA - Business Administration</option>
                  <option value="MCA">MCA - Computer Applications</option>
                  <option value="ANTI_RAGGING">Anti-Ragging Awareness</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              </div>
              {errors.topic && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.topic}</p>}
            </div>

            {/* Start Quiz Button */}
            <button
              onClick={handleStartQuiz}
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              Start Quiz
            </button>
          </div>

          {/* Quiz Info */}
          <div className="mt-8 p-4 glass rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Quiz Information:</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• 30 questions total (randomly selected from 100 per topic)</li>
              <li>• 30 minutes time limit</li>
              <li>• Questions will be displayed one at a time</li>
              <li>• You can navigate back and forth</li>
              <li>• Each student gets different questions (anti-cheating)</li>
              <li>• Available topics: MBA, MCA, Anti-Ragging</li>
            </ul>
          </div>

          {/* Admin Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/admin/login')}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
            >
              Admin Panel →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;