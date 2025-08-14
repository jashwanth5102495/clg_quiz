const mongoose = require('mongoose');
const Question = require('../models/Question');
require('dotenv').config();

async function verifyDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');
    
    const totalQuestions = await Question.countDocuments();
    console.log(`📊 Total questions in database: ${totalQuestions}`);

    const distribution = await Question.aggregate([
      { $group: { _id: { topic: '$topic', difficulty: '$difficulty' }, count: { $sum: 1 } } },
      { $sort: { '_id.topic': 1, '_id.difficulty': 1 } }
    ]);

    console.log('\n📈 Complete Distribution:');
    distribution.forEach(item => {
      console.log(`${item._id.topic} - ${item._id.difficulty}: ${item.count} questions`);
    });

    const topicCounts = await Question.aggregate([
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $sort: { '_id': 1 } }
    ]);

    console.log('\n🎯 Questions by Topic:');
    topicCounts.forEach(item => {
      console.log(`${item._id}: ${item.count} questions`);
    });

    console.log('\n🎉 Database verification completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error verifying database:', error);
    process.exit(1);
  }
}

verifyDatabase();