const express = require("express");
const app = express();
const port = 3000;

const imagePath = require("./middlewares/imagePath");

app.use(express.static('public'));

app.use(express.json());

app.use(imagePath);

const router = require("./routers/movies");

const errorHandler = require("./middlewares/errorHandler");

const notFound = require("./middlewares/notFound");

app.get("/", (req, res) => {
    res.send('<h1>Server della mia webapp</h1>')
});

app.use("/movies", router);

app.use(errorHandler);

app.use(notFound);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});