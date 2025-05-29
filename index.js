import express from "express";

const app = express();


app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the Home Page",
    timestamp: new Date().toISOString(),
  });
  console.log(req.headers);
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/contact", (req, res) => {
  res.send("Contact Page");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
