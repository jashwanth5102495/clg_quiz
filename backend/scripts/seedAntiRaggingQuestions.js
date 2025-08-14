const mongoose = require('mongoose');
const Question = require('../models/Question');
require('dotenv').config();

// 25 Easy Anti-Ragging Questions
const easyQuestions = [
  {
    question_text: "What does ragging mean in educational institutions?",
    options: ["Friendly interaction", "Bullying or harassment of new students", "Academic competition", "Sports activity"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Definition and Awareness"
  },
  {
    question_text: "Ragging is considered a criminal offense in India under which act?",
    options: ["Indian Penal Code", "UGC Regulations", "Both IPC and UGC Regulations", "Education Act"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Legal Framework"
  },
  {
    question_text: "What should you do if you witness ragging?",
    options: ["Ignore it", "Report it immediately", "Join in", "Record it for fun"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Reporting and Response"
  },
  {
    question_text: "Which of the following is considered ragging?",
    options: ["Asking personal questions aggressively", "Forcing to do inappropriate acts", "Verbal abuse", "All of the above"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Types of Ragging"
  },
  {
    question_text: "Who can be a victim of ragging?",
    options: ["Only first-year students", "Any student", "Only hostel students", "Only day scholars"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Victims and Impact"
  },
  {
    question_text: "What is the primary purpose of anti-ragging measures?",
    options: ["To punish students", "To ensure student safety and dignity", "To reduce admissions", "To increase discipline"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Purpose and Objectives"
  },
  {
    question_text: "Ragging can lead to which of the following consequences for perpetrators?",
    options: ["Suspension", "Expulsion", "Legal action", "All of the above"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Consequences"
  },
  {
    question_text: "What is the role of senior students in preventing ragging?",
    options: ["To participate in ragging", "To be mentors and guides", "To ignore junior students", "To report juniors"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Prevention and Mentorship"
  },
  {
    question_text: "Which authority should you contact first to report ragging?",
    options: ["Police", "College authorities", "Parents", "Friends"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Reporting Mechanisms"
  },
  {
    question_text: "What does UGC stand for in the context of anti-ragging regulations?",
    options: ["University Grants Commission", "United Graduate Council", "Universal Grade Committee", "Unified Government Council"],
    correct_option_index: 0,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Regulatory Bodies"
  },
  {
    question_text: "Ragging affects which aspect of a student's life most significantly?",
    options: ["Academic performance", "Mental health", "Social relationships", "All of the above"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Impact on Students"
  },
  {
    question_text: "What should be the attitude of students towards ragging?",
    options: ["Accept it as tradition", "Zero tolerance", "Participate occasionally", "Ignore it"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Student Attitude"
  },
  {
    question_text: "Which of the following is NOT an acceptable form of interaction with juniors?",
    options: ["Helping with academics", "Forcing to perform embarrassing acts", "Providing guidance", "Friendly conversation"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Appropriate Behavior"
  },
  {
    question_text: "What is the best way to build healthy senior-junior relationships?",
    options: ["Through ragging", "Through mutual respect and mentorship", "Through competition", "Through isolation"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Healthy Relationships"
  },
  {
    question_text: "Ragging can be reported through which medium?",
    options: ["Anonymous helplines", "Written complaints", "Online portals", "All of the above"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Reporting Channels"
  },
  {
    question_text: "What is the immediate effect of ragging on new students?",
    options: ["Confidence building", "Fear and anxiety", "Better social skills", "Academic improvement"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Immediate Impact"
  },
  {
    question_text: "Which environment is most conducive to ragging?",
    options: ["Open and transparent", "Secretive and isolated", "Well-monitored", "Supervised"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Environmental Factors"
  },
  {
    question_text: "What should institutions do to prevent ragging?",
    options: ["Ignore the issue", "Create awareness and strict policies", "Encourage it as tradition", "Blame students only"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Institutional Responsibility"
  },
  {
    question_text: "Ragging is often justified as which of the following?",
    options: ["Character building", "Tradition", "Ice-breaking", "All of the above"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Common Justifications"
  },
  {
    question_text: "What is the correct response if someone asks you to participate in ragging?",
    options: ["Participate to fit in", "Refuse firmly", "Participate partially", "Ask friends for advice"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Personal Response"
  },
  {
    question_text: "Which of the following can help prevent ragging?",
    options: ["Awareness programs", "Strict monitoring", "Clear policies", "All of the above"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Prevention Strategies"
  },
  {
    question_text: "What should parents do to prepare their children against ragging?",
    options: ["Tell them to fight back", "Educate about rights and reporting", "Ignore the topic", "Encourage participation"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Parental Role"
  },
  {
    question_text: "Ragging typically occurs in which settings?",
    options: ["Hostels", "Classrooms", "Campus grounds", "All of the above"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Common Locations"
  },
  {
    question_text: "What is the long-term impact of ragging on victims?",
    options: ["Improved confidence", "Trauma and psychological issues", "Better social skills", "Academic excellence"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Long-term Effects"
  },
  {
    question_text: "Which approach is most effective in eliminating ragging?",
    options: ["Punishment only", "Awareness only", "Combined approach of awareness, prevention, and punishment", "Ignoring the issue"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "easy",
    sub_category: "Effective Approaches"
  }
];

// 25 Slightly Difficult Anti-Ragging Questions
const slightlyDifficultQuestions = [
  {
    question_text: "According to UGC regulations, what is the maximum punishment for ragging?",
    options: ["Warning", "Suspension for one semester", "Expulsion from institution", "Fine only"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Legal Consequences"
  },
  {
    question_text: "Which section of the Indian Penal Code deals with ragging-related offenses?",
    options: ["Section 339", "Section 341", "Section 506", "Multiple sections including 341, 342, 506"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Legal Framework"
  },
  {
    question_text: "What is the role of Anti-Ragging Committee in institutions?",
    options: ["To conduct ragging", "To investigate complaints and take action", "To support seniors", "To organize events"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Institutional Mechanisms"
  },
  {
    question_text: "Which psychological impact is most commonly associated with ragging victims?",
    options: ["Increased confidence", "Post-traumatic stress disorder", "Better social skills", "Academic improvement"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Psychological Impact"
  },
  {
    question_text: "What should institutions do within 24 hours of receiving a ragging complaint?",
    options: ["Ignore it", "Investigate and take preliminary action", "Inform parents only", "Wait for more complaints"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Institutional Response"
  },
  {
    question_text: "Which of the following is considered cyber ragging?",
    options: ["Online harassment", "Sharing embarrassing content", "Creating fake profiles", "All of the above"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Modern Forms of Ragging"
  },
  {
    question_text: "What is the difference between ragging and bullying?",
    options: ["No difference", "Ragging is institutional, bullying is general", "Ragging is legal", "Bullying is worse"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Conceptual Understanding"
  },
  {
    question_text: "Which authority has the power to ban an institution for ragging incidents?",
    options: ["Local police", "State government", "UGC/AICTE", "Student union"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Regulatory Powers"
  },
  {
    question_text: "What is the primary reason students often don't report ragging?",
    options: ["Lack of awareness", "Fear of retaliation", "Social pressure", "All of the above"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Reporting Barriers"
  },
  {
    question_text: "Which approach is most effective for senior students to help juniors?",
    options: ["Tough love through ragging", "Mentorship and guidance", "Ignoring them", "Competitive approach"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Positive Mentorship"
  },
  {
    question_text: "What should be included in an anti-ragging affidavit?",
    options: ["Promise not to rag", "Understanding of consequences", "Contact information", "All of the above"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Documentation"
  },
  {
    question_text: "Which factor contributes most to the perpetuation of ragging culture?",
    options: ["Academic pressure", "Silence and acceptance", "Lack of facilities", "Poor teaching"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Cultural Factors"
  },
  {
    question_text: "What is the role of faculty in preventing ragging?",
    options: ["Ignore student issues", "Active monitoring and intervention", "Support senior students", "Focus only on academics"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Faculty Responsibility"
  },
  {
    question_text: "Which of the following is a sign that someone might be a victim of ragging?",
    options: ["Withdrawal from social activities", "Declining academic performance", "Reluctance to stay in hostel", "All of the above"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Identifying Victims"
  },
  {
    question_text: "What should be the institutional response to anonymous ragging complaints?",
    options: ["Ignore them", "Investigate thoroughly", "Ask for identity first", "File them away"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Complaint Handling"
  },
  {
    question_text: "Which preventive measure is most effective in hostels?",
    options: ["CCTV surveillance", "Regular monitoring by wardens", "Peer support systems", "All of the above"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Hostel Safety"
  },
  {
    question_text: "What is the impact of ragging on institutional reputation?",
    options: ["Positive impact", "No impact", "Negative impact on admissions and ranking", "Improves discipline"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Institutional Impact"
  },
  {
    question_text: "Which support system is most important for ragging victims?",
    options: ["Academic support", "Counseling and psychological support", "Financial support", "Social media support"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Victim Support"
  },
  {
    question_text: "What should be the frequency of anti-ragging awareness programs?",
    options: ["Once a year", "Only during admission", "Regular and ongoing", "Never needed"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Awareness Programs"
  },
  {
    question_text: "Which stakeholder plays the most crucial role in eliminating ragging?",
    options: ["Students themselves", "Faculty", "Administration", "All stakeholders together"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Stakeholder Roles"
  },
  {
    question_text: "What is the relationship between ragging and dropout rates?",
    options: ["No relationship", "Ragging increases dropout rates", "Ragging decreases dropout rates", "Ragging improves retention"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Academic Impact"
  },
  {
    question_text: "Which approach should institutions take towards ragging traditions?",
    options: ["Preserve them", "Modify them", "Completely eliminate them", "Ignore them"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Cultural Change"
  },
  {
    question_text: "What is the most effective way to change the mindset about ragging?",
    options: ["Punishment only", "Education and awareness", "Peer pressure", "Administrative orders"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Mindset Change"
  },
  {
    question_text: "Which factor makes online/cyber ragging particularly harmful?",
    options: ["Limited reach", "Easy to ignore", "Permanent digital footprint", "Less serious impact"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Digital Age Challenges"
  },
  {
    question_text: "What should be the primary focus of anti-ragging policies?",
    options: ["Punishment", "Prevention", "Both prevention and punishment", "Documentation"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "slightly_difficult",
    sub_category: "Policy Framework"
  }
];

// 25 Moderate Anti-Ragging Questions
const moderateQuestions = [
  {
    question_text: "According to the Supreme Court guidelines, what constitutes the Anti-Ragging Squad's composition?",
    options: ["Only faculty members", "Only senior students", "Mix of faculty, staff, and senior students", "Only administrative staff"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Institutional Structure"
  },
  {
    question_text: "What is the legal liability of institutions that fail to prevent ragging?",
    options: ["No liability", "Warning only", "Monetary compensation and legal action", "Temporary closure"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Institutional Liability"
  },
  {
    question_text: "Which psychological intervention is most effective for ragging victims?",
    options: ["Group therapy", "Individual counseling", "Peer support groups", "Comprehensive multi-modal approach"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Therapeutic Interventions"
  },
  {
    question_text: "What is the significance of the Aman Kachroo case in anti-ragging legislation?",
    options: ["First ragging case", "Led to stricter anti-ragging laws", "Established compensation norms", "Created awareness programs"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Legal Precedents"
  },
  {
    question_text: "Which research finding is most significant regarding ragging's impact on academic performance?",
    options: ["No impact", "Improves performance", "Significantly reduces GPA and increases dropout rates", "Mixed results"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Research Findings"
  },
  {
    question_text: "What is the most effective model for peer mentorship to replace ragging culture?",
    options: ["Hierarchical model", "Buddy system with structured guidance", "Competitive model", "Informal interaction"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Alternative Models"
  },
  {
    question_text: "Which international best practice is most relevant for Indian anti-ragging efforts?",
    options: ["Zero tolerance policies", "Restorative justice approaches", "Comprehensive prevention programs", "All of the above"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "International Practices"
  },
  {
    question_text: "What is the role of technology in modern anti-ragging efforts?",
    options: ["Surveillance only", "Reporting platforms and monitoring", "Social media control", "Academic tracking"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Technology Integration"
  },
  {
    question_text: "Which factor is most predictive of ragging incidents in institutions?",
    options: ["Institution size", "Lack of clear policies and enforcement", "Student demographics", "Academic pressure"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Risk Factors"
  },
  {
    question_text: "What is the most effective timing for anti-ragging interventions?",
    options: ["After incidents occur", "During admission process", "Continuous throughout academic year", "Only in first semester"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Intervention Timing"
  },
  {
    question_text: "Which assessment tool is most reliable for measuring institutional anti-ragging climate?",
    options: ["Anonymous surveys", "Incident reports only", "Faculty observations", "Comprehensive climate assessment including multiple stakeholders"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Assessment Methods"
  },
  {
    question_text: "What is the relationship between institutional culture and ragging prevalence?",
    options: ["No relationship", "Strong correlation - toxic culture enables ragging", "Inverse relationship", "Complex non-linear relationship"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Organizational Culture"
  },
  {
    question_text: "Which training component is most crucial for faculty in anti-ragging efforts?",
    options: ["Legal knowledge", "Identification of warning signs", "Intervention techniques", "All components equally important"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Faculty Training"
  },
  {
    question_text: "What is the most significant challenge in implementing anti-ragging policies?",
    options: ["Lack of resources", "Changing deep-rooted cultural attitudes", "Legal complexities", "Student resistance"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Implementation Challenges"
  },
  {
    question_text: "Which evidence-based approach shows highest success in ragging prevention?",
    options: ["Punitive measures only", "Awareness campaigns only", "Multi-tiered prevention model", "Peer mediation"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Evidence-Based Practices"
  },
  {
    question_text: "What is the impact of social media on modern ragging patterns?",
    options: ["Reduces ragging", "No impact", "Amplifies and perpetuates ragging", "Makes reporting easier"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Digital Age Impact"
  },
  {
    question_text: "Which stakeholder group requires the most targeted intervention in anti-ragging efforts?",
    options: ["New students", "Senior students", "Bystanders who remain silent", "Faculty members"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Targeted Interventions"
  },
  {
    question_text: "What is the most effective way to measure the success of anti-ragging programs?",
    options: ["Incident reduction only", "Student satisfaction surveys", "Comprehensive outcome evaluation including climate, incidents, and well-being", "Compliance audits"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Program Evaluation"
  },
  {
    question_text: "Which psychological theory best explains the perpetuation of ragging culture?",
    options: ["Social learning theory", "Group dynamics theory", "Power and control theory", "All theories contribute to understanding"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Theoretical Understanding"
  },
  {
    question_text: "What is the most critical element in creating a ragging-free environment?",
    options: ["Strict punishment", "Strong leadership commitment", "Student involvement", "All elements working together"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Environmental Factors"
  },
  {
    question_text: "Which approach is most effective for addressing the root causes of ragging?",
    options: ["Individual counseling", "Systemic institutional change", "Legal enforcement", "Peer education"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Root Cause Analysis"
  },
  {
    question_text: "What is the role of alumni in anti-ragging efforts?",
    options: ["No role", "Sharing experiences only", "Active mentorship and culture change agents", "Financial support only"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Alumni Engagement"
  },
  {
    question_text: "Which factor is most important in sustaining long-term anti-ragging efforts?",
    options: ["Continuous monitoring", "Regular policy updates", "Cultural transformation", "Legal compliance"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Sustainability"
  },
  {
    question_text: "What is the most effective way to address the 'tradition' argument for ragging?",
    options: ["Ignore it", "Provide alternative positive traditions", "Strict punishment", "Academic consequences"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Cultural Alternatives"
  },
  {
    question_text: "Which research methodology is most appropriate for studying ragging prevalence?",
    options: ["Surveys only", "Interviews only", "Mixed methods approach", "Observational studies"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "moderate",
    sub_category: "Research Methodology"
  }
];

// 25 Difficult Anti-Ragging Questions
const difficultQuestions = [
  {
    question_text: "What is the constitutional basis for anti-ragging legislation in India?",
    options: ["Article 14 (Equality)", "Article 19 (Freedom)", "Article 21 (Right to Life and Dignity)", "All fundamental rights collectively"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Constitutional Framework"
  },
  {
    question_text: "Which criminological theory best explains the group dynamics in ragging incidents?",
    options: ["Strain theory", "Social disorganization theory", "Differential association theory", "Integrated theoretical approach"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Criminological Analysis"
  },
  {
    question_text: "What is the most significant legal precedent regarding institutional liability for ragging?",
    options: ["Vicarious liability principle", "Duty of care doctrine", "In loco parentis responsibility", "Comprehensive institutional accountability framework"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Legal Precedents"
  },
  {
    question_text: "Which neuropsychological impact of ragging has the most long-term consequences?",
    options: ["Memory impairment", "Trauma-induced neuroplasticity changes", "Attention deficits", "Emotional regulation disorders"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Neuropsychological Impact"
  },
  {
    question_text: "What is the most sophisticated model for predicting ragging risk in institutions?",
    options: ["Statistical correlation model", "Machine learning algorithms", "Multi-factorial risk assessment matrix", "Behavioral prediction models"],
    correct_option_index: 2,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Risk Assessment"
  },
  {
    question_text: "Which international human rights framework is most applicable to ragging prevention?",
    options: ["UDHR only", "ICCPR provisions", "Convention on Rights of Child", "Comprehensive human rights framework"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "International Law"
  },
  {
    question_text: "What is the most effective evidence-based intervention for perpetrators of ragging?",
    options: ["Punitive measures", "Cognitive-behavioral therapy", "Restorative justice programs", "Integrated rehabilitation approach"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Perpetrator Intervention"
  },
  {
    question_text: "Which sociological theory best explains the institutional tolerance of ragging?",
    options: ["Functionalist theory", "Conflict theory", "Symbolic interactionism", "Critical institutional theory"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Sociological Analysis"
  },
  {
    question_text: "What is the most comprehensive framework for measuring anti-ragging program effectiveness?",
    options: ["Outcome evaluation only", "Process evaluation only", "Logic model evaluation", "Systems-level impact assessment"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Program Evaluation"
  },
  {
    question_text: "Which ethical framework is most relevant for addressing ragging in educational institutions?",
    options: ["Utilitarian ethics", "Deontological ethics", "Virtue ethics", "Comprehensive ethical framework incorporating multiple approaches"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Ethical Considerations"
  },
  {
    question_text: "What is the most significant challenge in cross-cultural anti-ragging research?",
    options: ["Language barriers", "Cultural relativism vs. universal rights", "Methodological differences", "Legal system variations"],
    correct_option_index: 1,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Cross-Cultural Research"
  },
  {
    question_text: "Which technological innovation shows most promise for ragging prevention?",
    options: ["AI-powered monitoring", "Blockchain reporting systems", "VR empathy training", "Integrated digital ecosystem approach"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Technological Innovation"
  },
  {
    question_text: "What is the most sophisticated approach to addressing systemic factors that enable ragging?",
    options: ["Policy reform", "Cultural change initiatives", "Structural transformation", "Systems thinking approach to institutional change"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Systemic Change"
  },
  {
    question_text: "Which psychological intervention model is most effective for complex trauma from ragging?",
    options: ["EMDR therapy", "Trauma-focused CBT", "Narrative therapy", "Integrative trauma treatment approach"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Trauma Treatment"
  },
  {
    question_text: "What is the most critical factor in developing culturally sensitive anti-ragging interventions?",
    options: ["Language adaptation", "Cultural values integration", "Community involvement", "Comprehensive cultural competency framework"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Cultural Sensitivity"
  },
  {
    question_text: "Which research design is most appropriate for establishing causal relationships in ragging studies?",
    options: ["Cross-sectional surveys", "Longitudinal cohort studies", "Randomized controlled trials", "Mixed-methods longitudinal design"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Research Design"
  },
  {
    question_text: "What is the most comprehensive model for understanding ragging as a social phenomenon?",
    options: ["Individual pathology model", "Social learning model", "Ecological systems model", "Integrated bio-psycho-social-cultural model"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Theoretical Models"
  },
  {
    question_text: "Which policy implementation strategy is most effective for sustainable anti-ragging efforts?",
    options: ["Top-down enforcement", "Bottom-up initiatives", "Collaborative governance", "Adaptive implementation framework"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Policy Implementation"
  },
  {
    question_text: "What is the most significant methodological challenge in ragging prevalence studies?",
    options: ["Sample bias", "Underreporting", "Definition inconsistencies", "Comprehensive measurement validity issues"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Research Methodology"
  },
  {
    question_text: "Which organizational change theory is most applicable to anti-ragging institutional transformation?",
    options: ["Lewin's change model", "Kotter's 8-step process", "Systems theory", "Complexity theory approach to organizational change"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Organizational Change"
  },
  {
    question_text: "What is the most sophisticated approach to measuring the economic impact of ragging?",
    options: ["Direct cost calculation", "Indirect cost estimation", "Cost-benefit analysis", "Comprehensive social return on investment analysis"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Economic Analysis"
  },
  {
    question_text: "Which legal reform would be most effective in strengthening anti-ragging legislation?",
    options: ["Stricter penalties", "Broader definitions", "Institutional accountability", "Comprehensive legal framework reform"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Legal Reform"
  },
  {
    question_text: "What is the most critical element in developing global standards for anti-ragging efforts?",
    options: ["Universal definitions", "Common reporting mechanisms", "Shared intervention protocols", "Comprehensive international framework respecting cultural contexts"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Global Standards"
  },
  {
    question_text: "Which future trend poses the greatest challenge to anti-ragging efforts?",
    options: ["Digital technology evolution", "Changing social dynamics", "Globalization effects", "Complex interaction of technological, social, and cultural changes"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Future Challenges"
  },
  {
    question_text: "What is the most comprehensive approach to creating a global anti-ragging knowledge base?",
    options: ["Literature reviews", "Meta-analyses", "Systematic reviews", "Integrated knowledge synthesis using multiple methodologies"],
    correct_option_index: 3,
    topic: "ANTI_RAGGING",
    difficulty: "difficult",
    sub_category: "Knowledge Development"
  }
];

const allAntiRaggingQuestions = [...easyQuestions, ...slightlyDifficultQuestions, ...moderateQuestions, ...difficultQuestions];

async function seedAntiRaggingQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');
    
    // Clear only Anti-Ragging questions
    await Question.deleteMany({ topic: 'ANTI_RAGGING' });
    console.log('🗑️  Cleared existing Anti-Ragging questions');
    
    await Question.insertMany(allAntiRaggingQuestions);
    console.log(`✅ Inserted ${allAntiRaggingQuestions.length} Anti-Ragging questions`);

    const antiRaggingCount = await Question.countDocuments({ topic: 'ANTI_RAGGING' });
    console.log(`📊 Total Anti-Ragging questions in database: ${antiRaggingCount}`);

    const distribution = await Question.aggregate([
      { $match: { topic: 'ANTI_RAGGING' } },
      { $group: { _id: { topic: '$topic', difficulty: '$difficulty' }, count: { $sum: 1 } } },
      { $sort: { '_id.difficulty': 1 } }
    ]);

    console.log('\n📈 Anti-Ragging Distribution by difficulty:');
    distribution.forEach(item => {
      console.log(`${item._id.topic} - ${item._id.difficulty}: ${item.count} questions`);
    });

    console.log('\n🎉 Anti-Ragging Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Anti-Ragging database:', error);
    process.exit(1);
  }
}

seedAntiRaggingQuestions();