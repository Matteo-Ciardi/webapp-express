const express = require("express");
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.json());

const router = require("./routers/movies");

app.get("/", (req, res) => {
    res.send('<h1>Server della mia webapp movies</h1>')
});

app.use("/movies", router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});