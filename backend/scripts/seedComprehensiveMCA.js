const mongoose = require('mongoose');
const Question = require('../models/Question');
require('dotenv').config();

// 25 Easy MCA Questions
const easyQuestions = [
  {
    question_text: "Which of the following is volatile memory?",
    options: ["ROM", "SSD", "RAM", "Hard Disk"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Computer Fundamentals"
  },
  {
    question_text: "The binary number 1011 equals what in decimal?",
    options: ["11", "13", "9", "10"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Number Systems"
  },
  {
    question_text: "Which data structure uses LIFO (Last In First Out)?",
    options: ["Queue", "Stack", "Tree", "Graph"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Data Structures"
  },
  {
    question_text: "What does SQL stand for?",
    options: ["Simple Query Language", "Structured Query Language", "Standard Query Language", "Systematic Query Language"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Database"
  },
  {
    question_text: "What is the main function of the ALU (Arithmetic Logic Unit)?",
    options: ["Store data permanently", "Perform arithmetic and logical operations", "Manage I/O devices", "Control program flow"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Computer Architecture"
  },
  {
    question_text: "The time complexity of linear search is:",
    options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Algorithms"
  },
  {
    question_text: "What is the output of the boolean expression (true && false) || true?",
    options: ["true", "false", "undefined", "error"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Programming"
  },
  {
    question_text: "Which device converts digital signals to analog signals?",
    options: ["Modem", "Router", "Switch", "Hub"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Networking"
  },
  {
    question_text: "Which of the following is NOT an operating system?",
    options: ["Linux", "Windows 10", "Oracle", "macOS"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Operating Systems"
  },
  {
    question_text: "Which SQL statement is used to extract data from a database?",
    options: ["GET", "SELECT", "FETCH", "EXTRACT"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Database"
  },
  {
    question_text: "What does HTTP stand for?",
    options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "HyperText Transport Protocol", "High Text Transfer Protocol"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Networking"
  },
  {
    question_text: "Which of the following is a programming language?",
    options: ["HTML", "CSS", "Python", "XML"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Programming"
  },
  {
    question_text: "What is the base of the binary number system?",
    options: ["8", "10", "2", "16"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Number Systems"
  },
  {
    question_text: "Which component is known as the brain of the computer?",
    options: ["RAM", "Hard Disk", "CPU", "Monitor"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Computer Fundamentals"
  },
  {
    question_text: "What does GUI stand for?",
    options: ["Graphical User Interface", "General User Interface", "Global User Interface", "Guided User Interface"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Computer Fundamentals"
  },
  {
    question_text: "Which of the following is a web browser?",
    options: ["Microsoft Word", "Chrome", "Excel", "PowerPoint"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Internet Technology"
  },
  {
    question_text: "What does URL stand for?",
    options: ["Universal Resource Locator", "Uniform Resource Locator", "Universal Reference Link", "Uniform Reference Locator"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Internet Technology"
  },
  {
    question_text: "Which of the following is an input device?",
    options: ["Monitor", "Printer", "Keyboard", "Speaker"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Computer Hardware"
  },
  {
    question_text: "What is the full form of USB?",
    options: ["Universal Serial Bus", "Universal System Bus", "Uniform Serial Bus", "Universal Storage Bus"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Computer Hardware"
  },
  {
    question_text: "Which of the following is a database management system?",
    options: ["MS Word", "MySQL", "Photoshop", "VLC Player"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Database"
  },
  {
    question_text: "What does WWW stand for?",
    options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Internet Technology"
  },
  {
    question_text: "Which of the following is a loop in programming?",
    options: ["if", "for", "switch", "break"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Programming"
  },
  {
    question_text: "What is the decimal equivalent of binary 1010?",
    options: ["8", "10", "12", "14"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Number Systems"
  },
  {
    question_text: "Which of the following is an output device?",
    options: ["Mouse", "Keyboard", "Monitor", "Scanner"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Computer Hardware"
  },
  {
    question_text: "What does LAN stand for?",
    options: ["Large Area Network", "Local Area Network", "Long Area Network", "Limited Area Network"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "easy",
    sub_category: "Networking"
  }
];

// 25 Slightly Difficult MCA Questions
const slightlyDifficultQuestions = [
  {
    question_text: "In UNIX, which command is used to change file permissions?",
    options: ["chmod", "chperm", "setperm", "modperm"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "UNIX"
  },
  {
    question_text: "Which graph traversal algorithm uses a queue?",
    options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Dijkstra's algorithm", "Prim's algorithm"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Algorithms"
  },
  {
    question_text: "Which of the following is a non-relational (NoSQL) database example?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Database"
  },
  {
    question_text: "What does TCP provide that UDP does not?",
    options: ["Faster transmission", "Connectionless service", "Reliable, ordered delivery", "Broadcast support"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Networking"
  },
  {
    question_text: "Which pointer-based data structure allows fast insertion/deletion at both ends?",
    options: ["Array", "Singly linked list", "Doubly linked list", "Binary tree"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Data Structures"
  },
  {
    question_text: "In memory hierarchy, which is fastest?",
    options: ["Hard disk", "SSD", "Cache", "RAM"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Computer Architecture"
  },
  {
    question_text: "Which tree is used to implement a priority queue?",
    options: ["Binary Search Tree", "AVL Tree", "Heap (Binary Heap)", "Red-Black Tree"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Data Structures"
  },
  {
    question_text: "Which scheduling algorithm gives priority to the process with the smallest CPU burst time?",
    options: ["FCFS", "SJF", "Round Robin", "Priority Scheduling"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Operating Systems"
  },
  {
    question_text: "What is the default port for HTTPS?",
    options: ["21", "25", "443", "80"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Security"
  },
  {
    question_text: "Which join returns only matching rows from both tables?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Database"
  },
  {
    question_text: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Algorithms"
  },
  {
    question_text: "Which data structure is used for implementing recursion?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Data Structures"
  },
  {
    question_text: "What is the purpose of DNS?",
    options: ["Encrypt data", "Translate domain names to IP addresses", "Route packets", "Compress files"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Networking"
  },
  {
    question_text: "Which of the following is an object-oriented programming concept?",
    options: ["Looping", "Branching", "Inheritance", "Compilation"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Programming"
  },
  {
    question_text: "What is virtual memory?",
    options: ["Memory on the internet", "Simulated memory using disk space", "Memory in the cloud", "Temporary memory"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Operating Systems"
  },
  {
    question_text: "Which protocol is used for file transfer?",
    options: ["HTTP", "FTP", "SMTP", "POP3"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Networking"
  },
  {
    question_text: "What is encapsulation in OOP?",
    options: ["Hiding implementation details", "Creating multiple objects", "Inheriting properties", "Overloading methods"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Programming"
  },
  {
    question_text: "Which of the following is a compiled language?",
    options: ["Python", "JavaScript", "C++", "PHP"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Programming"
  },
  {
    question_text: "What is the hexadecimal equivalent of decimal 15?",
    options: ["E", "F", "10", "A"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Number Systems"
  },
  {
    question_text: "Which of the following is a primary key constraint?",
    options: ["Can be null", "Must be unique", "Can have duplicates", "Optional field"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Database"
  },
  {
    question_text: "What is the purpose of an index in a database?",
    options: ["Store data", "Speed up queries", "Backup data", "Encrypt data"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Database"
  },
  {
    question_text: "Which sorting algorithm has the best average case performance?",
    options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Algorithms"
  },
  {
    question_text: "What is a deadlock in operating systems?",
    options: ["System crash", "Infinite loop", "Processes waiting for each other", "Memory overflow"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Operating Systems"
  },
  {
    question_text: "Which layer of the OSI model handles error detection?",
    options: ["Physical", "Data Link", "Network", "Transport"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Networking"
  },
  {
    question_text: "What is the difference between a compiler and an interpreter?",
    options: ["No difference", "Compiler translates entire program at once", "Interpreter is faster", "Compiler runs code line by line"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "slightly_difficult",
    sub_category: "Programming"
  }
];

// 25 Moderate MCA Questions
const moderateQuestions = [
  {
    question_text: "Which sorting algorithm has average-case time complexity O(n log n)?",
    options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Algorithms"
  },
  {
    question_text: "Which OS scheduling algorithm is preemptive and uses a fixed time quantum?",
    options: ["First-Come-First-Serve", "Shortest Job First", "Round Robin", "Priority Scheduling"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Operating Systems"
  },
  {
    question_text: "Which of the following best describes a firewall?",
    options: ["A device that stores encryption keys", "A network security device that monitors and filters traffic", "A device used to store data securely", "A backup system"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Security"
  },
  {
    question_text: "What does CIA stand for in information security?",
    options: ["Confidentiality, Integrity, Availability", "Control, Integrity, Authentication", "Confidentiality, Information, Authentication", "Control, Inspection, Access"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Security"
  },
  {
    question_text: "Which attack involves overwhelming a system with requests to make it unavailable?",
    options: ["Phishing", "SQL Injection", "DoS Attack", "Eavesdropping"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Security"
  },
  {
    question_text: "What is the primary role of an operating system?",
    options: ["Run applications", "Manage hardware and software resources", "Compile programs", "Connect to the internet"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Operating Systems"
  },
  {
    question_text: "In SQL, COUNT(*) returns:",
    options: ["Number of columns", "Number of rows", "Number of unique values", "Sum of values"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Database"
  },
  {
    question_text: "Which of these is a primary key property?",
    options: ["Can be null", "Must be unique", "Can repeat values", "None of the above"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Database"
  },
  {
    question_text: "Which SQL clause is used to filter results?",
    options: ["WHERE", "FILTER", "HAVING", "CHECK"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Database"
  },
  {
    question_text: "What is pipelining in CPU design?",
    options: ["Caching data on CPU", "Dividing instruction execution into stages for throughput", "Allocating memory pages to processes", "Compressing instruction set"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Computer Architecture"
  },
  {
    question_text: "Which protocol is used for secure web communication?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Security"
  },
  {
    question_text: "What is the difference between a process and a thread?",
    options: ["No difference", "Process is lighter than thread", "Thread shares memory space with other threads", "Process runs faster"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Operating Systems"
  },
  {
    question_text: "Which sorting algorithm is stable?",
    options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Algorithms"
  },
  {
    question_text: "What is normalization in databases?",
    options: ["Making data normal", "Organizing data to reduce redundancy", "Increasing data size", "Encrypting data"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Database"
  },
  {
    question_text: "Which layer of OSI model handles routing?",
    options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Networking"
  },
  {
    question_text: "What is polymorphism in OOP?",
    options: ["Having multiple forms", "Single inheritance", "Data hiding", "Code reusability"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Programming"
  },
  {
    question_text: "Which data structure is best for implementing a graph?",
    options: ["Array", "Stack", "Adjacency List", "Queue"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Data Structures"
  },
  {
    question_text: "What is the purpose of a foreign key in a database?",
    options: ["Primary identification", "Link tables together", "Speed up queries", "Store large data"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Database"
  },
  {
    question_text: "Which algorithm is used for finding the shortest path in an unweighted graph?",
    options: ["Dijkstra's", "BFS", "DFS", "Bellman-Ford"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Algorithms"
  },
  {
    question_text: "What is cache memory?",
    options: ["Permanent storage", "High-speed temporary storage", "Virtual memory", "Secondary storage"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Computer Architecture"
  },
  {
    question_text: "Which of the following is a symmetric encryption algorithm?",
    options: ["RSA", "AES", "ECC", "DSA"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Security"
  },
  {
    question_text: "What is the main advantage of linked lists over arrays?",
    options: ["Faster access", "Dynamic size", "Less memory usage", "Better cache performance"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Data Structures"
  },
  {
    question_text: "Which protocol is used for sending emails?",
    options: ["HTTP", "FTP", "SMTP", "POP3"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Networking"
  },
  {
    question_text: "What is the purpose of the GROUP BY clause in SQL?",
    options: ["Sort data", "Filter data", "Group rows with same values", "Join tables"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Database"
  },
  {
    question_text: "Which of the following is a characteristic of object-oriented programming?",
    options: ["Global variables", "Goto statements", "Encapsulation", "Procedural approach"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "moderate",
    sub_category: "Programming"
  }
];

// 25 Difficult MCA Questions
const difficultQuestions = [
  {
    question_text: "Which normal form eliminates partial dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Database"
  },
  {
    question_text: "Which of the following is a deadlock prevention strategy?",
    options: ["Wait-die", "Banker's algorithm", "Round-robin scheduling", "Multithreading"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Operating Systems"
  },
  {
    question_text: "Which of these is a system call in OS?",
    options: ["fork()", "mkdir", "cd", "ls"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Operating Systems"
  },
  {
    question_text: "Which encryption algorithm is symmetric?",
    options: ["RSA", "DES", "ECC", "DSA"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Security"
  },
  {
    question_text: "What is the worst-case time complexity of Quick Sort?",
    options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Algorithms"
  },
  {
    question_text: "Which algorithm finds the shortest path in a weighted graph with non-negative weights?",
    options: ["Bellman-Ford", "Dijkstra's algorithm", "Floyd-Warshall", "Kruskal's algorithm"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Algorithms"
  },
  {
    question_text: "In relational algebra, which operator corresponds to SQL JOIN?",
    options: ["Selection", "Projection", "Cartesian Product with selection", "Union"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Database"
  },
  {
    question_text: "Which of the following describes thrashing in OS?",
    options: ["Excessive page faults leading to low CPU utilization", "Overheating CPU due to high load", "Memory leak in program", "File system corruption"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Operating Systems"
  },
  {
    question_text: "Which complexity class contains problems solvable in polynomial time?",
    options: ["NP", "P", "EXP", "PSPACE"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Theory of Computation"
  },
  {
    question_text: "In microprocessor, which register stores the address of the next instruction?",
    options: ["Instruction Register (IR)", "Program Counter (PC)", "Memory Address Register (MAR)", "Accumulator"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Computer Architecture"
  },
  {
    question_text: "Which algorithm is used for finding strongly connected components?",
    options: ["Dijkstra's", "Kosaraju's", "Prim's", "Kruskal's"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Algorithms"
  },
  {
    question_text: "What is the purpose of a semaphore in OS?",
    options: ["Memory allocation", "Process synchronization", "File management", "Network communication"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Operating Systems"
  },
  {
    question_text: "Which hash function is commonly used in cryptography?",
    options: ["MD5", "SHA-256", "CRC32", "Adler-32"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Security"
  },
  {
    question_text: "What is ACID in database transactions?",
    options: ["A programming language", "Database properties: Atomicity, Consistency, Isolation, Durability", "A type of query", "A storage engine"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Database"
  },
  {
    question_text: "Which design pattern ensures only one instance of a class?",
    options: ["Factory", "Observer", "Singleton", "Strategy"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Programming"
  },
  {
    question_text: "What is the space complexity of merge sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Algorithms"
  },
  {
    question_text: "Which protocol is used for email transmission?",
    options: ["HTTP", "FTP", "SMTP", "SNMP"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Networking"
  },
  {
    question_text: "What is the difference between BCNF and 3NF?",
    options: ["No difference", "BCNF eliminates all functional dependencies", "BCNF is stricter than 3NF", "3NF is stricter than BCNF"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Database"
  },
  {
    question_text: "Which of the following is true about AVL trees?",
    options: ["Height balanced binary search tree", "Complete binary tree", "Perfect binary tree", "Unbalanced tree"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Data Structures"
  },
  {
    question_text: "What is the time complexity of building a heap from an array?",
    options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Algorithms"
  },
  {
    question_text: "Which of the following is a characteristic of NoSQL databases?",
    options: ["ACID compliance", "Fixed schema", "Horizontal scalability", "SQL queries only"],
    correct_option_index: 2,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Database"
  },
  {
    question_text: "What is the purpose of virtual functions in C++?",
    options: ["Memory management", "Runtime polymorphism", "Compile-time optimization", "Error handling"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Programming"
  },
  {
    question_text: "Which of the following is true about TCP congestion control?",
    options: ["Uses fixed window size", "Implements slow start algorithm", "No flow control", "UDP-based protocol"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Networking"
  },
  {
    question_text: "What is the main difference between preemptive and non-preemptive scheduling?",
    options: ["Speed of execution", "CPU can be taken away from running process", "Memory usage", "Number of processes"],
    correct_option_index: 1,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Operating Systems"
  },
  {
    question_text: "Which of the following is a property of B+ trees?",
    options: ["All data stored in leaf nodes", "Binary tree structure", "Unbalanced tree", "No duplicate keys"],
    correct_option_index: 0,
    topic: "MCA",
    difficulty: "difficult",
    sub_category: "Data Structures"
  }
];

const allMCAQuestions = [...easyQuestions, ...slightlyDifficultQuestions, ...moderateQuestions, ...difficultQuestions];

async function seedComprehensiveMCA() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');
    
    // Clear only MCA questions
    await Question.deleteMany({ topic: 'MCA' });
    console.log('🗑️  Cleared existing MCA questions');
    
    await Question.insertMany(allMCAQuestions);
    console.log(`✅ Inserted ${allMCAQuestions.length} MCA questions`);

    const mcaCount = await Question.countDocuments({ topic: 'MCA' });
    console.log(`📊 Total MCA questions in database: ${mcaCount}`);

    const distribution = await Question.aggregate([
      { $match: { topic: 'MCA' } },
      { $group: { _id: { topic: '$topic', difficulty: '$difficulty' }, count: { $sum: 1 } } },
      { $sort: { '_id.difficulty': 1 } }
    ]);

    console.log('\n📈 MCA Distribution by difficulty:');
    distribution.forEach(item => {
      console.log(`${item._id.topic} - ${item._id.difficulty}: ${item.count} questions`);
    });

    console.log('\n🎉 MCA Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding MCA database:', error);
    process.exit(1);
  }
}

seedComprehensiveMCA();