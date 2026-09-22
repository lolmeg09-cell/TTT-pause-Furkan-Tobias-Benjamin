const express = require("express")
const app = express();




app.get("/", (req, res) => {
  res.render("index")
});

app.set("viewengine", "ejs") 
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("http://localhost:3000");
});