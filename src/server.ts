import express from "express";

const app = express();

app.get("/", (request, response) => {
  response.send("oi");
});

app.listen(3333, () =>
  console.log("Server is running on http://localhost:3333 🚀")
);
