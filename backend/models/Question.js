const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question_text: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
    minlength: [10, 'Question must be at least 10 characters long']
  },
  options: {
    type: [String],
    required: [true, 'Options are required'],
    validate: {
      validator: function(options) {
        return options.length === 4;
      },
      message: 'Question must have exactly 4 options'
    }
  },
  correct_option_index: {
    type: Number,
    required: [true, 'Correct option index is required'],
    min: [0, 'Correct option index must be between 0 and 3'],
    max: [3, 'Correct option index must be between 0 and 3']
  },
  topic: {
    type: String,
    required: [true, 'Topic is required'],
    enum: {
      values: ['MBA', 'MCA', 'ANTI_RAGGING'],
      message: 'Topic must be MBA, MCA, or ANTI_RAGGING'
    }
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is required'],
    enum: {
      values: ['easy', 'slightly_difficult', 'moderate', 'difficult'],
      message: 'Difficulty must be easy, slightly_difficult, moderate, or difficult'
    }
  },
  sub_category: {
    type: String,
    required: [true, 'Sub-category is required'],
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying
questionSchema.index({ topic: 1, difficulty: 1 });
questionSchema.index({ topic: 1, sub_category: 1 });

// Update the updated_at field before saving
questionSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Question', questionSchema);