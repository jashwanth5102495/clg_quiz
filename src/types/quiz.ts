export interface Question {
  id: number;
  question_text: string;
  options: [string, string, string, string];
  difficulty: 'easy' | 'slightly_difficult' | 'moderate' | 'difficult';
  correct_answer: number; // Index of correct answer (0-3)
}

export interface StudentInfo {
  name: string;
  rollNumber: string;
  topic: 'MBA' | 'MCA' | 'ANTI_RAGGING';
}

export interface Answer {
  questionId: number;
  selectedOption: number;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  answers: Answer[];
  questions: Question[];
}