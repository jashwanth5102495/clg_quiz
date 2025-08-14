const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: [true, 'Question ID is required']
  },
  selected_option: {
    type: Number,
    required: [true, 'Selected option is required'],
    min: [0, 'Selected option must be between 0 and 3'],
    max: [3, 'Selected option must be between 0 and 3']
  },
  is_correct: {
    type: Boolean,
    required: [true, 'Correct status is required']
  }
}, { _id: false });

const resultSchema = new mongoose.Schema({
  student_name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    minlength: [2, 'Student name must be at least 2 characters long'],
    maxlength: [100, 'Student name cannot exceed 100 characters']
  },
  roll_number: {
    type: String,
    required: [true, 'Roll number is required'],
    trim: true,
    minlength: [1, 'Roll number is required'],
    maxlength: [50, 'Roll number cannot exceed 50 characters']
  },
  topic: {
    type: String,
    required: [true, 'Topic is required'],
    enum: {
      values: ['MBA', 'MCA'],
      message: 'Topic must be either MBA or MCA'
    }
  },
  answers: {
    type: [answerSchema],
    required: [true, 'Answers are required'],
    validate: {
      validator: function(answers) {
        return answers.length > 0 && answers.length <= 20;
      },
      message: 'Must have between 1 and 20 answers'
    }
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
    min: [0, 'Score cannot be negative'],
    max: [20, 'Score cannot exceed 20']
  },
  total_questions: {
    type: Number,
    required: [true, 'Total questions is required'],
    default: 20
  },
  percentage: {
    type: Number,
    min: [0, 'Percentage cannot be negative'],
    max: [100, 'Percentage cannot exceed 100']
  },
  time_taken: {
    type: Number, // in seconds
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying
resultSchema.index({ date: -1 });
resultSchema.index({ topic: 1, date: -1 });
resultSchema.index({ roll_number: 1, topic: 1 });

// Calculate percentage before saving
resultSchema.pre('save', function(next) {
  if (this.score !== undefined && this.total_questions !== undefined && this.total_questions > 0) {
    this.percentage = Math.round((this.score / this.total_questions) * 100);
  } else {
    this.percentage = 0;
  }
  next();
});

// Virtual for grade calculation
resultSchema.virtual('grade').get(function() {
  if (this.percentage >= 90) return 'A+';
  if (this.percentage >= 80) return 'A';
  if (this.percentage >= 70) return 'B+';
  if (this.percentage >= 60) return 'B';
  if (this.percentage >= 50) return 'C';
  return 'F';
});

// Ensure virtual fields are serialized
resultSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Result', resultSchema);