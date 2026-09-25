const express = require("express")
const app = express();


app.set("view engine", "ejs") 
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index")
});
app.get("/spill", (req, res) => {
  res.render("spill")
});
app.get("/move", (req, res) => {
  res.render("move")
});
app.get("/mediter", (req, res) => {
  res.render("mediter")
});

app.get("/breathe", (req, res) => {
  res.render("breathe")
});
app.get("/clock", (req, res) => {
  res.render("clock")
});







app.listen(3000, () => {
  console.log("http://localhost:3000");
});