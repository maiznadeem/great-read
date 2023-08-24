const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishingYear: {
    type: Number,
    required: true,
  },
  categories: {
    type: [String],
    validate: {
      validator: (categories) => {
        const allowedCategories = [
          'Autobiography/Biography',
          'Managing Workforce',
          'Success Recipes',
          'Procrastination Killers',
          'Mind Tabs',
          'Finding Yourself',
          'Breaking Your Limits',
          'Decision Making',
          'Innovation and Creativity',
          'Productivity Vitamin',
          'Community Builder',
          'Your Habits',
          'Network Web',
          'Productivity Hill',
          'Mindfulness',
          'Understanding Humans',
          'Time Management',
          "A Company's Insider",
          'Business Numeracy',
          'Business Strategy',
          'Art of Persuasion',
          'Emotions',
          'Leadership',
          'Startups',
          'Technology',
          'Product Development',
          'Finances',
          'Communication',
          'Branding',
          'Teamwork',
          'Problem Solving',
        ];
        return categories.every((category) => allowedCategories.includes(category));
      },
      message: 'One or more categories are not allowed.',
    },
  },
  amazon: {
    type: String,
    required: true,
  },
  perlego: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema, 'Book');

module.exports = Book;
