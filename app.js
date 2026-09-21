const express = require("express")
const app = express();




app.get("/", (req, res) => {
  res.render("index")
});

app.set("viewengine", "ejs") 

app.listen(4000, () => {
  console.log("http://localhost:4000");
});