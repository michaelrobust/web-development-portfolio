🎬 Movie Finder

A full-stack web application that allows users to search for movies and view detailed information using the OMDb API. Built with Node.js, Express, and Handlebars, the app delivers a responsive and user-friendly experience across devices.

⸻

🌟 Features
	•	🔍 Search Movies by Title
Enter keywords or full movie titles to retrieve relevant results.
	•	📖 Comprehensive Movie Details
View plot summaries, cast, ratings (IMDb, Rotten Tomatoes, Metacritic), runtime, genre, and more.
	•	📊 Multiple Rating Sources
Display ratings from major platforms in a structured format.
	•	📱 Responsive UI
Optimized for desktops, tablets, and mobile devices.
	•	⚠️ Robust Error Handling
Graceful handling of invalid inputs, API issues, and missing content.
	•	🔢 Pagination
Browse up to 20 results with efficient rendering.

⸻

🛠️ Tech Stack

Backend
	•	Node.js – Runtime for server-side JavaScript
	•	Express.js – Lightweight web framework
	•	Axios – Promise-based HTTP client for API calls

Frontend
	•	Handlebars.js – Semantic templating for rendering views
	•	HTML5 + CSS3 – Clean, modern layout with responsiveness
	•	Vanilla JavaScript – Client-side interaction and logic

API
	•	OMDb API – Fetches real-time movie data

⸻

📦 Installation

Prerequisites
	•	Node.js (v14 or higher)
	•	npm (Node Package Manager)
	•	Internet connection for external API access

Steps

# 1. Clone the repo
git clone <repository-url>
cd movie-finder

# 2. Install dependencies
npm install

# 3. Start the server
npm start

Once running, navigate to:
http://localhost:3000 to use the app.

⸻

📁 Directory Structure

movie-finder/
├── app.js                 # Main application entry point
├── package.json           # Scripts and dependencies
├── public/
│   └── css/
│       └── styles.css     # Main stylesheet
└── views/
    ├── layouts/
    │   └── main.handlebars    # Base HTML layout
    ├── index.handlebars       # Search form
    ├── searchmovies.handlebars # Search results page
    └── movie.handlebars       # Movie detail view


⸻

📌 How to Use
	1.	🏠 Home Page
Enter a movie title in the search box.
	2.	🔎 Search Results
View and select any movie from the results to get more details.
	3.	📃 Movie Details Page
Displays plot, genre, director, actors, box office, and ratings.
	4.	↩️ Start a New Search
Return to the homepage via the provided link.

⸻

🚀 Core Highlights

Backend
	•	RESTful route management
	•	Template rendering with dynamic content
	•	OMDb API consumption & data formatting
	•	Status code & error response management

Frontend
	•	Form validation
	•	Conditional rendering
	•	Accessible error messages
	•	Mobile-first responsive styling

⸻

🔍 Routes

Method	Route	Description
GET	/	Home page with search input
POST	/searchmovies	Handles movie search queries
GET	/movie/:id	Movie detail view by IMDb ID
-	404	Handles page not found scenarios


⸻

🚨 Error Scenarios Handled
	•	❌ Empty or invalid search terms
	•	📭 No results returned
	•	🧩 Invalid IMDb ID or missing movie
	•	🌐 API request failures
	•	🔍 Page not found (404)

⸻

📱 Responsive Design

The UI is optimized for:
	•	✅ Desktop browsers
	•	✅ Tablets
	•	✅ Mobile devices

Uses flexible layout and media queries for consistent display.

⸻

🔮 Future Improvements
	•	👤 User login and profile system
	•	🌟 Favorites and watchlist
	•	🎯 Advanced filters (genre, release year, ratings)
	•	🧠 AI-powered movie recommendations
	•	💬 User-submitted reviews and ratings
	•	🗄️ MongoDB integration for caching and persistence

⸻

👨‍💻 Author

YuKai Yeh
Passionate about full-stack development and intuitive UI/UX design.

⸻

📜 License

This project is licensed under the MIT License.

⸻

🙏 Acknowledgments
	•	OMDb API for providing free access to movie data
	•	Handlebars.js for templating support
	•	Express.js for server framework
	•	Open-source contributors for inspiration
