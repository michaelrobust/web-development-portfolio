Movie Finder Application
A full-stack web application built with Node.js and Express that allows users to search for movies and view detailed information using the Open Movie Database (OMDB) API.
🎬 Features

Movie Search: Search for movies by title or keywords
Detailed Information: View comprehensive movie details including plot, cast, ratings, and more
Multiple Ratings: Display ratings from various sources (IMDb, Rotten Tomatoes, Metacritic)
Responsive Design: Mobile-friendly interface that works on all devices
Error Handling: Comprehensive error handling for API failures and invalid inputs
Pagination Support: Retrieves up to 20 movies from search results

🛠️ Tech Stack
Backend

Node.js - JavaScript runtime environment
Express.js - Web application framework
Axios - HTTP client for API requests

Frontend

Handlebars - Template engine for dynamic HTML generation
HTML5 - Semantic markup
CSS3 - Responsive styling with modern design
JavaScript - Client-side functionality

External APIs

OMDB API - Movie database for retrieving film information

📋 Prerequisites

Node.js (v14 or higher)
npm (Node Package Manager)
Internet connection for API access

🚀 Installation & Setup

Clone the repository
bashgit clone <repository-url>
cd movie-finder

Install dependencies
bashnpm install

Start the application
bashnpm start

Access the application
Open your browser and navigate to http://localhost:3000

📁 Project Structure
movie-finder/
├── app.js                 # Main application file
├── package.json           # Project dependencies and scripts
├── public/
│   └── css/
│       └── styles.css     # Application styles
└── views/
    ├── layouts/
    │   └── main.handlebars    # Main layout template
    ├── index.handlebars       # Home page template
    ├── searchmovies.handlebars # Search results template
    └── movie.handlebars       # Movie details template
🔧 Usage

Search Movies: Enter a movie title or keyword in the search box on the home page
Browse Results: Click on any movie from the search results to view detailed information
View Details: Explore movie information including plot, cast, ratings, and box office data
New Search: Use the "Search for Another Movie" link to return to the home page

🎯 Key Features Demonstrated
Backend Development

RESTful route handling
Template rendering with dynamic data
API integration and data processing
Error handling and validation
HTTP status code management

Frontend Development

Responsive web design
Form handling and validation
Dynamic content rendering
User-friendly error messages
Clean and intuitive UI/UX

API Integration

External API consumption
Data parsing and transformation
Pagination handling
Rate limiting considerations

🔍 API Endpoints

GET / - Home page with search form
POST /searchmovies - Process movie search and display results
GET /movie/:id - Display detailed movie information
404 - Handle page not found errors

🚨 Error Handling
The application includes comprehensive error handling for:

Invalid search terms (empty or whitespace-only)
No search results found
Movie not found
API connection failures
Page not found (404)

📱 Responsive Design
The application is fully responsive and optimized for:

Desktop computers
Tablets
Mobile phones
Various screen sizes and orientations

🔮 Future Enhancements

User authentication and favorite movies
Advanced search filters (year, genre, rating)
Movie recommendations
User reviews and ratings
Watchlist functionality
Database integration for faster searches

👨‍💻 Author
YuKaiYeh
📄 License
This project is licensed under the MIT License.
🙏 Acknowledgments

OMDB API for providing movie data
Express.js and Handlebars communities for excellent documentation
Open source community for inspiration and resources
