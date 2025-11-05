const connection = require('../data/db');

function index(req, res) {

    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        
        const moviesWithFullPath = results.map(movie => ({
            ...movie,
            image: `${req.imagePath}${movie.image}`
          }));
        
        res.json(moviesWithFullPath);
    });
}


function show(req, res) {
    const id = req.params.id

    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'Movie not found' });

        const movie = movieResults[0];
        movie.image = req.imagePath + movie.image;

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            movie.reviews = reviewsResults;
            res.json(movie);
        });
    });

}

function movieReview(req, res) {
    const id = req.params.id;

    const { name, vote, text } = req.body;

    const sql = 'INSERT INTO `reviews` (`name`, `vote`, `text`, `movie_id`) VALUES (?,?,?,?)';

    connection.query(sql, [name, vote, text, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database query failed'});
        res.status(201);
        res.json({ id: result.insertId, message: 'Review added' });
    })
}

module.exports = { index, show, movieReview }