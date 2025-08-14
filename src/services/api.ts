import { Question, StudentInfo, Answer, QuizResult } from '../types/quiz';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async fetchWithErrorHandling(url: string, options?: RequestInit) {
    try {
      console.log('Making API request to:', url);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      console.log('API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      
      // Provide more specific error messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
      
      throw error;
    }
  }

  async getQuestions(topic: 'MBA' | 'MCA'): Promise<Question[]> {
    const data = await this.fetchWithErrorHandling(
      `${API_BASE_URL}/questions?topic=${topic}`
    );
    
    return data.questions.map((q: any) => ({
      id: q.id,
      question_text: q.question_text,
      options: q.options,
      difficulty: q.difficulty,
      correct_answer: -1 // Not provided by backend for security
    }));
  }

  async submitQuiz(studentInfo: StudentInfo, answers: Answer[]): Promise<QuizResult> {
    const submissionData = {
      student_name: studentInfo.name,
      roll_number: studentInfo.rollNumber,
      topic: studentInfo.topic,
      answers: answers.map(answer => ({
        question_id: answer.questionId,
        selected_option: answer.selectedOption
      }))
    };

    const data = await this.fetchWithErrorHandling(
      `${API_BASE_URL}/submit`,
      {
        method: 'POST',
        body: JSON.stringify(submissionData),
      }
    );

    return {
      score: data.result.score,
      totalQuestions: data.result.total_questions,
      answers,
      questions: [] // Questions not returned for security
    };
  }

  async getStudentResults(rollNumber: string, topic?: string): Promise<any[]> {
    const url = topic 
      ? `${API_BASE_URL}/results/student/${rollNumber}?topic=${topic}`
      : `${API_BASE_URL}/results/student/${rollNumber}`;
    
    const data = await this.fetchWithErrorHandling(url);
    return data.results;
  }

  // Admin methods
  async adminLogin(username: string, password: string): Promise<string> {
    const data = await this.fetchWithErrorHandling(
      `${API_BASE_URL}/admin/login`,
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }
    );
    
    return data.token;
  }

  async getAdminResults(token: string, page = 1, limit = 20, topic?: string): Promise<any> {
    const url = new URL(`${API_BASE_URL}/admin/results`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());
    if (topic) url.searchParams.append('topic', topic);

    const data = await this.fetchWithErrorHandling(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return data;
  }

  async getDashboard(token: string): Promise<any> {
    const data = await this.fetchWithErrorHandling(
      `${API_BASE_URL}/admin/dashboard`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    return data.dashboard;
  }

  async getResultDetail(token: string, resultId: string): Promise<any> {
    const data = await this.fetchWithErrorHandling(
      `${API_BASE_URL}/admin/result/${resultId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    return data;
  }

  async deleteResult(token: string, resultId: string): Promise<any> {
    const data = await this.fetchWithErrorHandling(
      `${API_BASE_URL}/admin/result/${resultId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    return data;
  }
}

export const apiService = new ApiService();