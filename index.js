const wretch = require("wretch");
const cors = require("cors");
const express = require("express");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const addressrURL = "http://localhost:8080";

app.get("/", (req, res) => {
  res.send("<h1>Send request to /api</h1>");
});

app.get("/api/addresses", (req, res) => {
  const { query } = req.body;

  const url = `${addressrURL}/addresses?q=${query}`;
  wretch()
    .url(url)
    .get()
    .json((data) => {
      res.status(200).json(data);
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
