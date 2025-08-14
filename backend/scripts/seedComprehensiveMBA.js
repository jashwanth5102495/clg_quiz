const mongoose = require('mongoose');
const Question = require('../models/Question');
require('dotenv').config();

// 25 Easy MBA Questions
const easyQuestions = [
  {
    question_text: "What does MBA stand for?",
    options: ["Master of Business Administration", "Master of Business Analysis", "Master of Banking Administration", "Master of Business Accounting"],
    correct_option_index: 0,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "General Management"
  },
  {
    question_text: "What is the primary goal of a business?",
    options: ["Employee satisfaction", "Profit maximization", "Social service", "Environmental protection"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Business Fundamentals"
  },
  {
    question_text: "Which of the following is a function of management?",
    options: ["Planning", "Organizing", "Controlling", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Management"
  },
  {
    question_text: "What does ROI stand for?",
    options: ["Return on Investment", "Rate of Interest", "Return on Income", "Rate of Investment"],
    correct_option_index: 0,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Finance"
  },
  {
    question_text: "Which of the following is a marketing mix element?",
    options: ["Product", "Price", "Place", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Marketing"
  },
  {
    question_text: "What is the full form of CEO?",
    options: ["Chief Executive Officer", "Chief Economic Officer", "Chief Education Officer", "Chief Engineering Officer"],
    correct_option_index: 0,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Corporate Structure"
  },
  {
    question_text: "Which of the following is a type of business organization?",
    options: ["Sole Proprietorship", "Partnership", "Corporation", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Business Organization"
  },
  {
    question_text: "What does HR stand for?",
    options: ["Human Resources", "Human Relations", "Human Rights", "Human Research"],
    correct_option_index: 0,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Human Resources"
  },
  {
    question_text: "Which of the following is a financial statement?",
    options: ["Balance Sheet", "Income Statement", "Cash Flow Statement", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Accounting"
  },
  {
    question_text: "What is the basic economic problem?",
    options: ["Inflation", "Unemployment", "Scarcity", "Recession"],
    correct_option_index: 2,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Economics"
  },
  {
    question_text: "Which of the following is a leadership style?",
    options: ["Autocratic", "Democratic", "Laissez-faire", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Leadership"
  },
  {
    question_text: "What does SWOT analysis stand for?",
    options: ["Strengths, Weaknesses, Opportunities, Threats", "Systems, Work, Operations, Technology", "Sales, Workforce, Operations, Technology", "Strategy, Workforce, Operations, Tactics"],
    correct_option_index: 0,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Strategic Management"
  },
  {
    question_text: "Which of the following is a source of finance?",
    options: ["Equity", "Debt", "Retained Earnings", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Finance"
  },
  {
    question_text: "What is the first step in the planning process?",
    options: ["Setting objectives", "Analyzing environment", "Identifying alternatives", "Implementing plans"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Planning"
  },
  {
    question_text: "Which of the following is a market structure?",
    options: ["Perfect Competition", "Monopoly", "Oligopoly", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Economics"
  },
  {
    question_text: "What does B2B stand for?",
    options: ["Business to Business", "Business to Bank", "Bank to Business", "Business to Buyer"],
    correct_option_index: 0,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Business Models"
  },
  {
    question_text: "Which of the following is a motivation theory?",
    options: ["Maslow's Hierarchy", "Herzberg's Theory", "McGregor's Theory X and Y", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Organizational Behavior"
  },
  {
    question_text: "What is the break-even point?",
    options: ["Maximum profit point", "Point where revenue equals costs", "Minimum loss point", "Maximum sales point"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Finance"
  },
  {
    question_text: "Which of the following is a communication barrier?",
    options: ["Language", "Cultural differences", "Technical jargon", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Communication"
  },
  {
    question_text: "What does IPO stand for?",
    options: ["Initial Public Offering", "International Public Offering", "Internal Public Offering", "Initial Private Offering"],
    correct_option_index: 0,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Finance"
  },
  {
    question_text: "Which of the following is a quality management tool?",
    options: ["Six Sigma", "TQM", "Kaizen", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Operations Management"
  },
  {
    question_text: "What is the primary function of marketing?",
    options: ["Production", "Sales", "Customer satisfaction", "Profit making"],
    correct_option_index: 2,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Marketing"
  },
  {
    question_text: "Which of the following is a business ethics principle?",
    options: ["Honesty", "Fairness", "Responsibility", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Business Ethics"
  },
  {
    question_text: "What does GDP stand for?",
    options: ["Gross Domestic Product", "General Domestic Product", "Gross Development Product", "General Development Product"],
    correct_option_index: 0,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Economics"
  },
  {
    question_text: "Which of the following is a decision-making tool?",
    options: ["Decision Tree", "Cost-Benefit Analysis", "SWOT Analysis", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "easy",
    sub_category: "Decision Making"
  }
];

// 25 Slightly Difficult MBA Questions
const slightlyDifficultQuestions = [
  {
    question_text: "What is the difference between leadership and management?",
    options: ["No difference", "Leadership focuses on people, management on processes", "Management is higher than leadership", "Leadership is temporary"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Leadership"
  },
  {
    question_text: "Which financial ratio measures a company's ability to pay short-term debts?",
    options: ["Debt-to-equity ratio", "Current ratio", "Return on equity", "Price-earnings ratio"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Finance"
  },
  {
    question_text: "What is the purpose of market segmentation?",
    options: ["Increase costs", "Target specific customer groups", "Reduce competition", "Eliminate products"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Marketing"
  },
  {
    question_text: "Which of the following is a characteristic of effective communication?",
    options: ["One-way flow", "Clarity and conciseness", "Technical complexity", "Formal language only"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Communication"
  },
  {
    question_text: "What is the primary purpose of budgeting?",
    options: ["Increase expenses", "Control and plan financial resources", "Reduce revenue", "Eliminate profits"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Finance"
  },
  {
    question_text: "Which of the following is a competitive strategy according to Porter?",
    options: ["Cost leadership", "Differentiation", "Focus", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Strategic Management"
  },
  {
    question_text: "What is the difference between effectiveness and efficiency?",
    options: ["No difference", "Effectiveness is doing right things, efficiency is doing things right", "Efficiency is more important", "Effectiveness is about speed"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Management"
  },
  {
    question_text: "Which of the following is a characteristic of a good leader?",
    options: ["Autocratic behavior", "Vision and inspiration", "Micromanagement", "Avoiding risks"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Leadership"
  },
  {
    question_text: "What is the purpose of performance appraisal?",
    options: ["Punish employees", "Evaluate and improve employee performance", "Reduce salaries", "Increase workload"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Human Resources"
  },
  {
    question_text: "Which of the following is a pricing strategy?",
    options: ["Penetration pricing", "Skimming pricing", "Competitive pricing", "All of the above"],
    correct_option_index: 3,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Marketing"
  },
  {
    question_text: "What is the primary goal of supply chain management?",
    options: ["Increase costs", "Optimize flow of goods and services", "Reduce quality", "Eliminate suppliers"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Operations Management"
  },
  {
    question_text: "Which of the following is a characteristic of organizational culture?",
    options: ["Shared values and beliefs", "Individual preferences", "Temporary arrangements", "External regulations"],
    correct_option_index: 0,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Organizational Behavior"
  },
  {
    question_text: "What is the difference between fixed and variable costs?",
    options: ["No difference", "Fixed costs don't change with production, variable costs do", "Variable costs are always higher", "Fixed costs are temporary"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Finance"
  },
  {
    question_text: "Which of the following is a characteristic of entrepreneurship?",
    options: ["Risk aversion", "Innovation and creativity", "Following established patterns", "Avoiding change"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Entrepreneurship"
  },
  {
    question_text: "What is the purpose of brand management?",
    options: ["Increase costs", "Build and maintain brand value", "Confuse customers", "Reduce market share"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Marketing"
  },
  {
    question_text: "Which of the following is a characteristic of effective teamwork?",
    options: ["Individual competition", "Collaboration and communication", "Isolation", "Conflict avoidance"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Team Management"
  },
  {
    question_text: "What is the primary purpose of financial planning?",
    options: ["Increase expenses", "Achieve financial goals", "Reduce income", "Eliminate investments"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Finance"
  },
  {
    question_text: "Which of the following is a characteristic of good customer service?",
    options: ["Slow response", "Responsiveness and reliability", "Indifference", "High prices"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Customer Service"
  },
  {
    question_text: "What is the difference between strategy and tactics?",
    options: ["No difference", "Strategy is long-term, tactics are short-term", "Tactics are more important", "Strategy is about operations"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Strategic Management"
  },
  {
    question_text: "Which of the following is a characteristic of effective negotiation?",
    options: ["Win-lose approach", "Win-win approach", "Aggressive behavior", "Avoiding compromise"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Negotiation"
  },
  {
    question_text: "What is the purpose of market research?",
    options: ["Increase costs", "Understand customer needs and market trends", "Confuse competitors", "Reduce sales"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Marketing"
  },
  {
    question_text: "Which of the following is a characteristic of organizational change?",
    options: ["Resistance is always bad", "Change requires planning and communication", "Change should be avoided", "Change is always easy"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Change Management"
  },
  {
    question_text: "What is the primary goal of inventory management?",
    options: ["Maximize inventory", "Optimize inventory levels", "Eliminate inventory", "Increase storage costs"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Operations Management"
  },
  {
    question_text: "Which of the following is a characteristic of ethical business practices?",
    options: ["Profit at any cost", "Transparency and honesty", "Ignoring stakeholders", "Short-term focus"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Business Ethics"
  },
  {
    question_text: "What is the difference between debt and equity financing?",
    options: ["No difference", "Debt must be repaid, equity represents ownership", "Equity is always cheaper", "Debt gives ownership rights"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "slightly_difficult",
    sub_category: "Finance"
  }
];

// 25 Moderate MBA Questions
const moderateQuestions = [
  {
    question_text: "What is the concept of time value of money?",
    options: ["Money loses value over time", "Money today is worth more than money in the future", "Money has no time value", "Future money is more valuable"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Finance"
  },
  {
    question_text: "Which of the following best describes Porter's Five Forces model?",
    options: ["Internal analysis tool", "Framework for analyzing industry competition", "Financial analysis method", "Marketing strategy tool"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Strategic Management"
  },
  {
    question_text: "What is the primary difference between B2B and B2C marketing?",
    options: ["No difference", "B2B focuses on rational decisions, B2C on emotional", "B2C is more complex", "B2B uses only digital channels"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Marketing"
  },
  {
    question_text: "What is the concept of economic order quantity (EOQ)?",
    options: ["Maximum order size", "Optimal order quantity that minimizes total inventory costs", "Minimum order size", "Random order quantity"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Operations Management"
  },
  {
    question_text: "Which of the following is a characteristic of transformational leadership?",
    options: ["Focus on transactions", "Inspiring and motivating followers", "Maintaining status quo", "Avoiding risks"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Leadership"
  },
  {
    question_text: "What is the purpose of a balanced scorecard?",
    options: ["Only financial measurement", "Comprehensive performance measurement system", "Employee evaluation tool", "Marketing analysis"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Strategic Management"
  },
  {
    question_text: "Which of the following best describes the concept of corporate social responsibility?",
    options: ["Profit maximization only", "Business obligation to contribute to society", "Government regulation", "Employee welfare"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Business Ethics"
  },
  {
    question_text: "What is the difference between push and pull marketing strategies?",
    options: ["No difference", "Push promotes to intermediaries, pull promotes to end consumers", "Pull is always better", "Push uses only advertising"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Marketing"
  },
  {
    question_text: "Which of the following is a characteristic of matrix organizational structure?",
    options: ["Single chain of command", "Dual reporting relationships", "No formal structure", "Only vertical communication"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Organizational Structure"
  },
  {
    question_text: "What is the concept of net present value (NPV)?",
    options: ["Current value of investment", "Present value of future cash flows minus initial investment", "Future value of investment", "Total cash flows"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Finance"
  },
  {
    question_text: "Which of the following is a characteristic of lean manufacturing?",
    options: ["Waste maximization", "Waste elimination and continuous improvement", "Inventory buildup", "Complex processes"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Operations Management"
  },
  {
    question_text: "What is the primary purpose of benchmarking?",
    options: ["Increase costs", "Compare performance with best practices", "Reduce quality", "Eliminate competition"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Quality Management"
  },
  {
    question_text: "Which of the following best describes emotional intelligence?",
    options: ["IQ level", "Ability to understand and manage emotions", "Technical skills", "Academic knowledge"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Leadership"
  },
  {
    question_text: "What is the concept of customer lifetime value?",
    options: ["One-time purchase value", "Total value a customer brings over their relationship", "Annual purchase value", "Average order value"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Marketing"
  },
  {
    question_text: "Which of the following is a characteristic of agile project management?",
    options: ["Rigid planning", "Iterative and flexible approach", "Waterfall method", "No customer involvement"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Project Management"
  },
  {
    question_text: "What is the difference between centralization and decentralization?",
    options: ["No difference", "Centralization concentrates authority, decentralization distributes it", "Decentralization is always better", "Centralization eliminates hierarchy"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Organizational Structure"
  },
  {
    question_text: "Which of the following is a characteristic of blue ocean strategy?",
    options: ["Competing in existing markets", "Creating uncontested market space", "Price competition", "Following competitors"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Strategic Management"
  },
  {
    question_text: "What is the purpose of activity-based costing?",
    options: ["Simplify costing", "More accurate cost allocation based on activities", "Reduce costs", "Eliminate overhead"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Accounting"
  },
  {
    question_text: "Which of the following best describes stakeholder theory?",
    options: ["Focus only on shareholders", "Consider all parties affected by business decisions", "Ignore external parties", "Government-only focus"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Business Ethics"
  },
  {
    question_text: "What is the concept of economies of scale?",
    options: ["Costs increase with production", "Cost per unit decreases as production increases", "No relationship between cost and production", "Costs remain constant"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Economics"
  },
  {
    question_text: "Which of the following is a characteristic of servant leadership?",
    options: ["Command and control", "Serving and empowering followers", "Autocratic decision making", "Avoiding responsibility"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Leadership"
  },
  {
    question_text: "What is the primary purpose of risk management?",
    options: ["Eliminate all risks", "Identify, assess, and mitigate risks", "Increase risks", "Ignore risks"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Risk Management"
  },
  {
    question_text: "Which of the following best describes the concept of competitive advantage?",
    options: ["Being the largest company", "Superior performance relative to competitors", "Having most employees", "Highest prices"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Strategic Management"
  },
  {
    question_text: "What is the difference between effectiveness and efficiency in operations?",
    options: ["No difference", "Effectiveness is doing right things, efficiency is doing things right", "Efficiency is more important", "Effectiveness is about speed only"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Operations Management"
  },
  {
    question_text: "Which of the following is a characteristic of knowledge management?",
    options: ["Hoarding information", "Capturing, sharing, and using organizational knowledge", "Eliminating documentation", "Individual knowledge only"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "moderate",
    sub_category: "Knowledge Management"
  }
];

// 25 Difficult MBA Questions
const difficultQuestions = [
  {
    question_text: "What is the Black-Scholes model used for?",
    options: ["Inventory management", "Option pricing", "Marketing analysis", "HR planning"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Finance"
  },
  {
    question_text: "Which of the following best describes the concept of real options in strategic management?",
    options: ["Financial derivatives", "Strategic flexibility to make future decisions", "Employee stock options", "Marketing options"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Strategic Management"
  },
  {
    question_text: "What is the primary difference between CAPM and APT models?",
    options: ["No difference", "CAPM uses single factor, APT uses multiple factors", "APT is simpler", "CAPM is more accurate"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Finance"
  },
  {
    question_text: "Which of the following best describes the concept of dynamic capabilities?",
    options: ["Static resources", "Ability to integrate, build, and reconfigure competencies", "Financial capabilities", "Marketing skills"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Strategic Management"
  },
  {
    question_text: "What is the concept of economic value added (EVA)?",
    options: ["Total revenue", "Net operating profit after tax minus cost of capital", "Gross profit", "Market value"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Finance"
  },
  {
    question_text: "Which of the following best describes the resource-based view of the firm?",
    options: ["External focus only", "Competitive advantage from internal resources and capabilities", "Market-based strategy", "Cost leadership only"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Strategic Management"
  },
  {
    question_text: "What is the concept of behavioral finance?",
    options: ["Traditional finance theory", "Psychology's impact on financial decisions", "Mathematical finance", "Corporate finance"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Finance"
  },
  {
    question_text: "Which of the following best describes the concept of absorptive capacity?",
    options: ["Physical capacity", "Ability to recognize, assimilate, and apply external knowledge", "Financial capacity", "Production capacity"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Innovation Management"
  },
  {
    question_text: "What is the primary difference between transactional and transformational leadership theories?",
    options: ["No difference", "Transactional focuses on exchanges, transformational on inspiration", "Transformational is outdated", "Transactional is more effective"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Leadership"
  },
  {
    question_text: "Which of the following best describes the concept of organizational ambidexterity?",
    options: ["Single focus", "Ability to exploit existing capabilities while exploring new ones", "Avoiding change", "Centralized structure"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Organizational Theory"
  },
  {
    question_text: "What is the concept of value co-creation in marketing?",
    options: ["Company creates all value", "Joint value creation between company and customers", "Customers create no value", "Value is predetermined"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Marketing"
  },
  {
    question_text: "Which of the following best describes the concept of institutional theory?",
    options: ["Individual behavior focus", "How institutional pressures shape organizational behavior", "Financial theory", "Marketing theory"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Organizational Theory"
  },
  {
    question_text: "What is the primary concept behind the balanced scorecard's four perspectives?",
    options: ["Financial focus only", "Financial, customer, internal process, and learning perspectives", "Marketing focus only", "HR focus only"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Strategic Management"
  },
  {
    question_text: "Which of the following best describes the concept of strategic paradox?",
    options: ["Simple strategies", "Contradictory strategic requirements that must be managed simultaneously", "Linear thinking", "Single solutions"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Strategic Management"
  },
  {
    question_text: "What is the concept of organizational learning in strategic management?",
    options: ["Individual learning only", "Collective learning that changes organizational behavior", "Training programs only", "Knowledge hoarding"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Organizational Learning"
  },
  {
    question_text: "Which of the following best describes the concept of network effects?",
    options: ["Decreasing returns", "Value increases as more users adopt the product/service", "No relationship", "Linear growth"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Strategy"
  },
  {
    question_text: "What is the primary difference between single-loop and double-loop learning?",
    options: ["No difference", "Single-loop corrects errors, double-loop questions assumptions", "Double-loop is simpler", "Single-loop is more effective"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Organizational Learning"
  },
  {
    question_text: "Which of the following best describes the concept of strategic flexibility?",
    options: ["Rigid planning", "Ability to adapt strategy to changing conditions", "No planning", "Fixed strategies"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Strategic Management"
  },
  {
    question_text: "What is the concept of organizational slack?",
    options: ["Inefficiency", "Excess resources that enable innovation and adaptation", "Waste only", "Cost reduction"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Organizational Theory"
  },
  {
    question_text: "Which of the following best describes the concept of strategic intent?",
    options: ["Short-term goals", "Long-term vision that guides resource allocation and capability building", "Tactical plans", "Operational objectives"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Strategic Management"
  },
  {
    question_text: "What is the primary concept behind stakeholder capitalism?",
    options: ["Shareholder primacy", "Balancing interests of all stakeholders", "Government control", "Employee ownership"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Corporate Governance"
  },
  {
    question_text: "Which of the following best describes the concept of organizational identity?",
    options: ["Logo and branding", "Shared understanding of what the organization is", "Financial performance", "Market position"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Organizational Theory"
  },
  {
    question_text: "What is the concept of strategic renewal?",
    options: ["Maintaining status quo", "Transforming strategy and capabilities for future success", "Cost cutting only", "Downsizing"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Strategic Management"
  },
  {
    question_text: "Which of the following best describes the concept of organizational resilience?",
    options: ["Avoiding challenges", "Ability to adapt and recover from disruptions", "Rigid structures", "Risk avoidance"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Organizational Theory"
  },
  {
    question_text: "What is the primary difference between exploration and exploitation in organizational learning?",
    options: ["No difference", "Exploration seeks new knowledge, exploitation uses existing knowledge", "Exploitation is better", "Exploration is outdated"],
    correct_option_index: 1,
    topic: "MBA",
    difficulty: "difficult",
    sub_category: "Innovation Management"
  }
];

const allMBAQuestions = [...easyQuestions, ...slightlyDifficultQuestions, ...moderateQuestions, ...difficultQuestions];

async function seedComprehensiveMBA() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');
    
    // Clear only MBA questions
    await Question.deleteMany({ topic: 'MBA' });
    console.log('🗑️  Cleared existing MBA questions');
    
    await Question.insertMany(allMBAQuestions);
    console.log(`✅ Inserted ${allMBAQuestions.length} MBA questions`);

    const mbaCount = await Question.countDocuments({ topic: 'MBA' });
    console.log(`📊 Total MBA questions in database: ${mbaCount}`);

    const distribution = await Question.aggregate([
      { $match: { topic: 'MBA' } },
      { $group: { _id: { topic: '$topic', difficulty: '$difficulty' }, count: { $sum: 1 } } },
      { $sort: { '_id.difficulty': 1 } }
    ]);

    console.log('\n📈 MBA Distribution by difficulty:');
    distribution.forEach(item => {
      console.log(`${item._id.topic} - ${item._id.difficulty}: ${item.count} questions`);
    });

    console.log('\n🎉 MBA Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding MBA database:', error);
    process.exit(1);
  }
}

seedComprehensiveMBA();