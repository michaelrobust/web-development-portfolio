import express from 'express';
import { engine } from 'express-handlebars';
import axios from 'axios';

const app = express();
const PORT = 3000;

// 設定 Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// 中間件
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Key
const API_KEY = 'CS546';
const BASE_URL = 'http://www.omdbapi.com/';

// 輔助函數：搜尋電影
async function searchMovies(searchTerm) {
    try {
        // 搜尋第一頁
        const response1 = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}&page=1`);
        let movies = [];
        
        if (response1.data.Response === "True") {
            movies = response1.data.Search;
            
            // 如果有第二頁，也要取得
            if (parseInt(response1.data.totalResults) > 10) {
                try {
                    const response2 = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}&page=2`);
                    if (response2.data.Response === "True") {
                        movies = movies.concat(response2.data.Search);
                    }
                } catch (error) {
                    console.log('No second page available');
                }
            }
        }
        
        // 限制最多 20 部電影
        return movies.slice(0, 20);
    } catch (error) {
        console.error('搜尋電影時發生錯誤:', error);
        return [];
    }
}

// 輔助函數：根據 ID 取得電影詳細資料
async function getMovieById(movieId) {
    try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${movieId}`);
        if (response.data.Response === "True") {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('取得電影詳細資料時發生錯誤:', error);
        return null;
    }
}

// 路由
// GET / - 主頁
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Movie Finder'
    });
});

// POST /searchmovies - 搜尋電影
app.post('/searchmovies', async (req, res) => {
    const searchTerm = req.body.searchMoviesByName;
    
    // 驗證輸入
    if (!searchTerm || searchTerm.trim() === '') {
        return res.status(400).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error</title>
                <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
                <main>
                    <h1>Error</h1>
                    <p class="error">Please provide a valid search term and do not enter just spaces.</p>
                    <a href="/">Search for Another Movie</a>
                </main>
            </body>
            </html>
        `);
    }
    
    try {
        const movies = await searchMovies(searchTerm.trim());
        
        if (movies.length === 0) {
            return res.status(404).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Movies Found</title>
                    <link rel="stylesheet" href="/css/styles.css">
                </head>
                <body>
                    <main>
                        <h1>Movies Found</h1>
                        <h2>${searchTerm.trim()}</h2>
                        <p class="not-found">We're sorry, but no results were found for ${searchTerm.trim()}.</p>
                        <a href="/">Search for Another Movie</a>
                    </main>
                </body>
                </html>
            `);
        }
        
        res.render('searchmovies', {
            title: 'Movies Found',
            searchTerm: searchTerm.trim(),
            movies: movies
        });
    } catch (error) {
        res.status(500).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error</title>
                <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
                <main>
                    <h1>Error</h1>
                    <p class="error">An error occurred while searching for movies.</p>
                    <a href="/">Search for Another Movie</a>
                </main>
            </body>
            </html>
        `);
    }
});

// GET /movie/:id - 電影詳細頁面
app.get('/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    
    try {
        const movie = await getMovieById(movieId);
        
        if (!movie) {
            return res.status(404).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Movie Not Found</title>
                    <link rel="stylesheet" href="/css/styles.css">
                </head>
                <body>
                    <main>
                        <h1>Movie Not Found</h1>
                        <p class="error">The requested movie could not be found.</p>
                        <a href="/">Search for Another Movie</a>
                    </main>
                </body>
                </html>
            `);
        }
        
        res.render('movie', {
            title: movie.Title,
            movie: movie
        });
    } catch (error) {
        res.status(500).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error</title>
                <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
                <main>
                    <h1>Error</h1>
                    <p class="error">An error occurred while retrieving movie details.</p>
                    <a href="/">Search for Another Movie</a>
                </main>
            </body>
            </html>
        `);
    }
});

// 404 處理
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Page Not Found</title>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <main>
                <h1>404 - Page Not Found</h1>
                <p class="error">The page you are looking for does not exist.</p>
                <a href="/">Search for Another Movie</a>
            </main>
        </body>
        </html>
    `);
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});