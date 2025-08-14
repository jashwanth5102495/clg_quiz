import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, TrendingUp, Download, Search, Eye, Trash2, LogOut, BarChart3 } from 'lucide-react';
import { apiService } from '../services/api';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ topic: '', search: '' });

  const token = localStorage.getItem('adminToken');
  const adminUser = localStorage.getItem('adminUser');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadDashboardData();
    loadResults();
  }, [currentPage, filters]);

  const loadDashboardData = async () => {
    try {
      const dashboardData = await apiService.getDashboard(token!);
      setStats(dashboardData);
    } catch (err: any) {
      if (err.message.includes('401')) {
        handleLogout();
      } else {
        setError('Failed to load dashboard data');
      }
    }
  };

  const loadResults = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAdminResults(token!, currentPage, 20, filters.topic || undefined);
      setResults(data.results);
      setTotalPages(data.pagination.total_pages);
    } catch (err: any) {
      if (err.message.includes('401')) {
        handleLogout();
      } else {
        setError('Failed to load results');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleExportCSV = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/results?format=csv${filters.topic ? `&topic=${filters.topic}` : ''}`;
      const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `quiz_results_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
      }
    } catch (err) {
      setError('Failed to export CSV');
    }
  };

  const handleViewResult = (resultId: string) => navigate(`/admin/result/${resultId}`);
  const handleDeleteResult = async (resultId: string) => {
    if (!confirm('Are you sure you want to delete this result?')) return;
    try {
      await apiService.deleteResult(token!, resultId);
      loadResults();
    } catch (err) {
      setError('Failed to delete result');
    }
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 80) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    if (percentage >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
      <div className="glass border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">Welcome back, {adminUser}</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleExportCSV} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Download className="w-4 h-4" />Export CSV
              </button>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Participants</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_results}</p>
                </div>
              </div>
            </div>
            <div className="glass rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">MBA Participants</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.results_by_topic?.MBA || 0}</p>
                </div>
              </div>
            </div>
            <div className="glass rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">MCA Participants</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.results_by_topic?.MCA || 0}</p>
                </div>
              </div>
            </div>
            <div className="glass rounded-lg p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.average_scores?.length > 0 ? Math.round(stats.average_scores.reduce((acc: number, curr: any) => acc + curr.avgPercentage, 0) / stats.average_scores.length) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="glass rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search by name or roll number..." value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
            </div>
            <div className="sm:w-48">
              <select value={filters.topic} onChange={(e) => setFilters(prev => ({ ...prev, topic: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">All Topics</option>
                <option value="MBA">MBA</option>
                <option value="MCA">MCA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Winner Announcement */}
        {results.length > 0 && (
          <div className="glass rounded-lg p-6 mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">🎉 Quiz Competition Results 🎉</h2>
              {(() => {
                const winner = results.sort((a, b) => b.percentage - a.percentage)[0];
                return winner ? (
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    <span className="font-bold text-yellow-600 dark:text-yellow-400">Winner: {winner.student_name}</span>
                    <span className="mx-2">•</span>
                    <span>Roll: {winner.roll_number}</span>
                    <span className="mx-2">•</span>
                    <span className="font-bold">{winner.score}/{winner.total_questions} ({winner.percentage}%)</span>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        )}

        {/* Leaderboard */}
        {results.length > 0 && (
          <div className="glass rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              🏆 Top 3 Performers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results
                .sort((a, b) => b.percentage - a.percentage)
                .slice(0, 3)
                .map((result, index) => (
                  <div key={result._id} className={`p-4 rounded-lg border-2 ${index === 0 ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' :
                      index === 1 ? 'border-gray-400 bg-gray-50 dark:bg-gray-800' :
                        'border-orange-400 bg-orange-50 dark:bg-orange-900/20'
                    }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-400 text-yellow-900' :
                          index === 1 ? 'bg-gray-400 text-gray-900' :
                            'bg-orange-400 text-orange-900'
                        }`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${result.topic === 'MBA' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                        {result.topic}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{result.student_name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Roll: {result.roll_number}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.score}/{result.total_questions}</div>
                      <div className={`text-lg font-bold ${getGradeColor(result.percentage)}`}>{result.percentage}%</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="glass rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Quiz Results (Ranked by Score)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Topic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score & Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {results
                  .filter(result => !filters.search || result.student_name?.toLowerCase().includes(filters.search.toLowerCase()) || result.roll_number?.toLowerCase().includes(filters.search.toLowerCase()))
                  .sort((a, b) => b.percentage - a.percentage) // Sort by percentage descending
                  .map((result, index) => {
                    const isWinner = index === 0 && result.percentage > 0;
                    const isTopPerformer = index < 3 && result.percentage >= 80;

                    return (
                      <tr key={result._id} className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${isWinner ? 'bg-yellow-50 dark:bg-yellow-900/20' : isTopPerformer ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-sm font-bold text-gray-900 dark:text-white">{result.student_name}</div>
                                {isWinner && <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-bold">🏆 WINNER</span>}
                                {isTopPerformer && !isWinner && <span className="text-xs bg-green-400 text-green-900 px-2 py-1 rounded-full font-bold">⭐ TOP</span>}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">Roll: {result.roll_number}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${result.topic === 'MBA' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}`}>
                            {result.topic}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">{result.score}/{result.total_questions}</div>
                              <div className={`text-sm font-bold px-2 py-1 rounded ${getGradeColor(result.percentage)} bg-opacity-20`}>
                                {result.percentage}%
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {result.score} correct • {result.total_questions - result.score} incorrect
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-400 text-yellow-900' :
                              index === 1 ? 'bg-gray-400 text-gray-900' :
                                index === 2 ? 'bg-orange-400 text-orange-900' :
                                  'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                              }`}>
                              #{index + 1}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDate(result.date)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleViewResult(result._id)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteResult(result._id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">Page {currentPage} of {totalPages}</div>
                <div className="flex gap-2">
                  <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50">Previous</button>
                  <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50">Next</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default AdminDashboard;