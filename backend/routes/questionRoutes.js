const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Question = require('../models/Question');

const router = express.Router();

// Validation middleware
const validateTopic = [
  query('topic')
    .isIn(['MBA', 'MCA', 'ANTI_RAGGING'])
    .withMessage('Topic must be MBA, MCA, or ANTI_RAGGING'),
];

// Helper function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// GET /questions?topic=MBA or MCA
router.get('/', validateTopic, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { topic } = req.query;

    // Define question distribution pattern for 30 questions (from 100 available)
    const questionPattern = {
      easy: 7,
      slightly_difficult: 8,
      moderate: 7,
      difficult: 8
    };

    let allQuestions = [];

    // Fetch questions for each difficulty level
    for (const [difficulty, count] of Object.entries(questionPattern)) {
      const questions = await Question.find({ 
        topic, 
        difficulty 
      }).lean();

      if (questions.length < count) {
        return res.status(400).json({
          error: `Insufficient questions for ${topic} - ${difficulty}`,
          message: `Need ${count} questions but only found ${questions.length}`
        });
      }

      // Shuffle and take required count
      const shuffledQuestions = shuffleArray(questions);
      const selectedQuestions = shuffledQuestions.slice(0, count);
      
      allQuestions.push(...selectedQuestions);
    }

    // Final shuffle of all selected questions
    const finalQuestions = shuffleArray(allQuestions);

    // Transform questions for frontend (remove correct answer)
    const questionsForFrontend = finalQuestions.map(q => ({
      id: q._id,
      question_text: q.question_text,
      options: q.options,
      difficulty: q.difficulty,
      sub_category: q.sub_category
    }));

    res.json({
      success: true,
      topic,
      total_questions: questionsForFrontend.length,
      questions: questionsForFrontend
    });

  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      error: 'Failed to fetch questions',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /questions/stats - Get question statistics (for admin)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Question.aggregate([
      {
        $group: {
          _id: { topic: '$topic', difficulty: '$difficulty' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.topic',
          difficulties: {
            $push: {
              difficulty: '$_id.difficulty',
              count: '$count'
            }
          },
          total: { $sum: '$count' }
        }
      }
    ]);

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Error fetching question stats:', error);
    res.status(500).json({
      error: 'Failed to fetch question statistics'
    });
  }
});

module.exports = router;