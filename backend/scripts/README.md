# Database Seeding Scripts

This directory contains the essential scripts for managing the quiz application database.

## Available Scripts

### 🚀 Main Seeding Scripts

- **`seedAllQuestions.js`** - Master script that seeds all topics (recommended)
- **`seedComprehensiveMCA.js`** - Seeds 100 MCA (Computer Applications) questions
- **`seedComprehensiveMBA.js`** - Seeds 100 MBA (Business Administration) questions  
- **`seedAntiRaggingQuestions.js`** - Seeds 100 Anti-Ragging awareness questions

### 🔍 Utility Scripts

- **`verifyDatabase.js`** - Verifies database contents and shows statistics

## Usage

### Seed All Topics (Recommended)
```bash
node scripts/seedAllQuestions.js
```

### Seed Individual Topics
```bash
# MCA questions only
node scripts/seedComprehensiveMCA.js

# MBA questions only
node scripts/seedComprehensiveMBA.js

# Anti-Ragging questions only
node scripts/seedAntiRaggingQuestions.js
```

### Verify Database
```bash
node scripts/verifyDatabase.js
```

## Database Structure

Each topic contains:
- **100 questions total**
- **25 questions per difficulty level**:
  - Easy (25)
  - Slightly Difficult (25)
  - Moderate (25)
  - Difficult (25)

## Quiz Configuration

- **30 questions per quiz** (randomly selected from 100 available)
- **30 minutes time limit** (1 minute per question)
- **Maximum anti-cheating** through randomization
- **Balanced difficulty distribution**: 7-8 questions per difficulty level

## Topics Covered

### MCA (Computer Applications)
- Programming, Data Structures, Algorithms
- Database Systems, Operating Systems
- Computer Networks, Security
- Software Engineering, Web Technologies

### MBA (Business Administration)
- Strategic Management, Finance, Marketing
- Human Resources, Operations Management
- Leadership, Organizational Behavior
- Economics, Business Ethics

### Anti-Ragging
- Legal Framework, Prevention Strategies
- Reporting Mechanisms, Student Rights
- Psychological Impact, Support Systems
- Institutional Responsibility, Cultural Change