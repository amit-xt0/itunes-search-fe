import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/search", async (req, res) => {
  const term = encodeURIComponent(req.query.term);
  const entity = req.query.entity;
  const limit = req.query.limit;
  const offset = req.query.offset;

  let url = `https://itunes.apple.com/search?term=${term}`;
  if (entity) {
    url += `&entity=${entity}`;
  }
  if (limit) {
    url += `&limit=${limit}`;
  }

  if (offset) {
    url += `&offset=${offset}`;
  }

  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
