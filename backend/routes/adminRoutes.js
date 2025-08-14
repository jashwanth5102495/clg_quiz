const express = require('express');
const { body, query, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const fs = require('fs');
const Result = require('../models/Result');
const Question = require('../models/Question');
const { authenticateAdmin, generateToken } = require('../middleware/auth');

const router = express.Router();

// Validation middleware for admin login
const validateLogin = [
  body('username')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Username is required'),
  
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password is required')
];

// POST /admin/login - Admin authentication
router.post('/login', validateLogin, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { username, password } = req.body;

    // Check credentials against environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      console.error('Admin credentials not configured in environment variables');
      return res.status(500).json({
        error: 'Server configuration error'
      });
    }

    // Simple comparison (in production, you might want to hash the admin password)
    if (username !== adminUsername || password !== adminPassword) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = generateToken({
      username: adminUsername,
      role: 'admin',
      loginTime: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        username: adminUsername,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({
      error: 'Login failed',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /admin/results - Get all results with pagination
router.get('/results', authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const topic = req.query.topic;
    const format = req.query.format;
    const sortBy = req.query.sortBy || 'date';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    // Build query
    const query = {};
    if (topic && ['MBA', 'MCA', 'ANTI_RAGGING'].includes(topic)) {
      query.topic = topic;
    }

    // For CSV export, get all results without pagination
    if (format === 'csv') {
      const results = await Result.find(query)
        .populate('answers.question_id', 'question_text options correct_option_index')
        .sort({ [sortBy]: sortOrder });

      // Create CSV file
      const csvFilePath = path.join(__dirname, '../temp', `results_${Date.now()}.csv`);
      
      // Ensure temp directory exists
      const tempDir = path.dirname(csvFilePath);
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: [
          { id: 'student_name', title: 'Student Name' },
          { id: 'roll_number', title: 'Roll Number' },
          { id: 'topic', title: 'Topic' },
          { id: 'score', title: 'Score' },
          { id: 'total_questions', title: 'Total Questions' },
          { id: 'percentage', title: 'Percentage' },
          { id: 'grade', title: 'Grade' },
          { id: 'time_taken', title: 'Time Taken (seconds)' },
          { id: 'date', title: 'Date' }
        ]
      });

      const csvData = results.map(result => ({
        student_name: result.student_name,
        roll_number: result.roll_number,
        topic: result.topic,
        score: result.score,
        total_questions: result.total_questions,
        percentage: result.percentage,
        grade: result.grade,
        time_taken: result.time_taken || 'N/A',
        date: result.date.toISOString()
      }));

      await csvWriter.writeRecords(csvData);

      // Send file and clean up
      res.download(csvFilePath, `quiz_results_${new Date().toISOString().split('T')[0]}.csv`, (err) => {
        if (err) {
          console.error('Error sending CSV file:', err);
        }
        // Clean up temp file
        fs.unlink(csvFilePath, (unlinkErr) => {
          if (unlinkErr) console.error('Error deleting temp CSV file:', unlinkErr);
        });
      });

      return;
    }

    // Regular JSON response with pagination
    const skip = (page - 1) * limit;

    const [results, totalCount] = await Promise.all([
      Result.find(query)
        .populate('answers.question_id', 'question_text difficulty sub_category')
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit),
      Result.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      results,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        total_results: totalCount,
        results_per_page: limit,
        has_next: page < totalPages,
        has_prev: page > 1
      },
      filters: {
        topic: topic || 'all',
        sort_by: sortBy,
        sort_order: sortOrder === 1 ? 'asc' : 'desc'
      }
    });

  } catch (error) {
    console.error('Error fetching admin results:', error);
    res.status(500).json({
      error: 'Failed to fetch results',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /admin/dashboard - Get dashboard statistics
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const [
      totalResults,
      mbaResults,
      mcaResults,
      recentResults,
      topPerformers,
      questionStats
    ] = await Promise.all([
      Result.countDocuments(),
      Result.countDocuments({ topic: 'MBA' }),
      Result.countDocuments({ topic: 'MCA' }),
      Result.find().sort({ date: -1 }).limit(5).select('student_name roll_number topic score percentage date'),
      Result.find().sort({ percentage: -1, date: -1 }).limit(10).select('student_name roll_number topic score percentage date'),
      Question.aggregate([
        {
          $group: {
            _id: { topic: '$topic', difficulty: '$difficulty' },
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    // Calculate average scores
    const avgScores = await Result.aggregate([
      {
        $group: {
          _id: '$topic',
          avgScore: { $avg: '$score' },
          avgPercentage: { $avg: '$percentage' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      dashboard: {
        total_results: totalResults,
        results_by_topic: {
          MBA: mbaResults,
          MCA: mcaResults
        },
        average_scores: avgScores,
        recent_results: recentResults,
        top_performers: topPerformers,
        question_statistics: questionStats
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard data'
    });
  }
});

// GET /admin/result/:id - Get detailed result by ID
router.get('/result/:id', authenticateAdmin, async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate('answers.question_id', 'question_text options correct_option_index difficulty sub_category');

    if (!result) {
      return res.status(404).json({
        error: 'Result not found'
      });
    }

    res.json({
      success: true,
      result
    });

  } catch (error) {
    console.error('Error fetching result details:', error);
    res.status(500).json({
      error: 'Failed to fetch result details'
    });
  }
});

// DELETE /admin/result/:id - Delete a result (admin only)
router.delete('/result/:id', authenticateAdmin, async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        error: 'Result not found'
      });
    }

    res.json({
      success: true,
      message: 'Result deleted successfully',
      deleted_result: {
        id: result._id,
        student_name: result.student_name,
        roll_number: result.roll_number
      }
    });

  } catch (error) {
    console.error('Error deleting result:', error);
    res.status(500).json({
      error: 'Failed to delete result'
    });
  }
});

module.exports = router;