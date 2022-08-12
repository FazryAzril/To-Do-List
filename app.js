const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");



const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];


app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res){

let day = date.getDate();


    res.render("List", {listTitle: day, newListItems: items});

});


app.post("/", function (req,res){

    const item = req.body.newListItems;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/Work");
    } else {
        items.push(item);  
        res.redirect("/");
    }

});

app.get("/work", function (req,res){
    res.render("list",{listTitle:"Work List", newListItems: workItems});
})

app.post("/work", function (req,res){
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", function (req,res){
    res.render("about")
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
