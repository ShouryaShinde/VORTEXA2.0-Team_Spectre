import express from "express" 
import bodyParser from "body-parser"

const app = express() ;
const port = 3000 ;

app.use(express.static("public")) ;
app.use(bodyParser.urlencoded({extended : true})) ;

app.get("/" , (req,res) => {
  res.render("index.ejs") ;
});

app.get("/upload" , (req,res) => {
  res.render("upload.ejs") ;
});

app.get("/transcribe" , (req,res) => {
  res.render("transcribe.ejs") ;
});

app.get("/quiz" , (req,res) => {
  res.render("quiz.ejs") ;
});


app.listen(port , ()=> {
  console.log(`Listening on port ${port}`) ;
})