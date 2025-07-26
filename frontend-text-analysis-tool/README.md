📝 Text Analyzer Application

A client-side web application that performs real-time text analysis, providing detailed insights into characters, words, and patterns. Built with HTML, CSS, JavaScript, and served using a simple Node.js + Express backend.

⸻

🔍 Features
	•	Character Analysis
	•	Counts total letters, non-letters, vowels, and consonants
	•	Word Statistics
	•	Calculates total words, unique words, long words (≥6 letters), and short words (≤3 letters)
	•	Real-time Processing
	•	Instant results without server requests
	•	Input Validation
	•	Prevents empty or invalid submissions
	•	Result Accumulation
	•	Each analysis is preserved in an organized output area
	•	Responsive Design
	•	Fully mobile-friendly layout with Bootstrap styling

⸻

🛠️ Tech Stack

🔧 Frontend
	•	HTML5 – Semantic markup structure
	•	CSS3 – Custom styling with Bootstrap integration
	•	JavaScript (ES6) – Logic for analysis and DOM manipulation
	•	Bootstrap 3.3.6 – Responsive layout
	•	jQuery 2.2.4 – DOM interaction and event handling

🔩 Backend
	•	Node.js – JavaScript runtime
	•	Express.js – Lightweight static server for frontend files

⸻

📋 Prerequisites
	•	Node.js (v14 or higher)
	•	npm (Node Package Manager)
	•	A modern web browser (Chrome, Firefox, etc.)

⸻

🚀 Installation & Setup

# 1. Clone the repository
git clone <repository-url>
cd text-analyzer-app

# 2. Install dependencies
npm install

# 3. Start the server
npm start

Open your browser and navigate to:
http://localhost:3000

⸻

📁 Project Structure

text-analyzer-app/
├── app.js                 # Express server setup
├── package.json           # Dependencies and scripts
└── public/
    ├── index.html         # Main UI page
    ├── script.js          # Text analysis logic
    └── style.css          # Custom styling


⸻

🔧 How It Works

📊 Text Analysis

Category	Description
Letters	All alphabetic characters (A–Z, a–z)
Non-Letters	Numbers, punctuation, whitespace, symbols, etc.
Vowels	a, e, i, o, u (case-insensitive)
Consonants	All other letters (including ‘y’)
Total Words	Sequences of letters separated by non-letters
Unique Words	Distinct words, case-insensitive
Long Words	Words with 6 or more letters
Short Words	Words with 3 or fewer letters


⸻

🖥️ User Interface
	•	Textarea Input – Clean input box for text submission
	•	Live Analysis – Instant feedback on text entered
	•	Validation – Warnings for empty or invalid input
	•	Results Panel – Organized dl-style breakdown of results
	•	Multiple Sessions – New results added to the results panel without clearing previous ones

⸻

🎯 Key Features Demonstrated

Frontend Development
	•	DOM manipulation with vanilla JS and jQuery
	•	Client-side validation with regex
	•	Responsive layout using Bootstrap
	•	Clear UX for input/output interaction

Text Processing
	•	String parsing using RegExp and JS string methods
	•	Sets for unique word tracking
	•	Array operations for categorization and counting

UX/UI Design
	•	Accessible, responsive layout
	•	Clear hierarchy and structured data
	•	Visual feedback for errors and success

⸻

🔮 Future Enhancements
	•	🧠 Advanced Statistics: Sentence count, paragraph analysis, reading level
	•	📄 Export Options: Download analysis as PDF or CSV
	•	⚖️ Side-by-Side Text Comparison
	•	🌍 Language Detection for multilingual support
	•	📈 Word Frequency Charts
	•	⏱ Estimated Reading Time
	•	😊 Basic Sentiment Analysis

⸻

🎨 UI/UX Highlights
	•	Bootstrap Integration – Clean, consistent layout
	•	Custom CSS – Enhanced visual aesthetics
	•	Semantic HTML – Accessibility and SEO friendly
	•	Clear Messaging – Smooth error handling and result communication

⸻

👨‍💻 Author

YuKai Yeh

⸻

📄 License

This project is licensed under the MIT License.

⸻

🙏 Acknowledgments
	•	CS-546 Web Programming course @ Stevens Institute of Technology
	•	Bootstrap – Responsive UI framework
	•	jQuery – DOM manipulation library
