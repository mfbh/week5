let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let viewsPath = __dirname + "/views";

let db=[];


app.use(express.static("public/img")); // to allow users to view image 
app.use(express.static('css'));
app.engine("html", require('ejs').renderFile);
app.set("view engine" , "html");
app.use(bodyParser.urlencoded({
    extended : false
}
));


app.get("/",function(req,res){
    let fileName = viewsPath + "/index.html";  
    res.sendFile(fileName);

});

app.get("/newtask.html", function(req,res){ // request first , after that respond
    let fileName = viewsPath + "/newtask.html";
    res.sendFile(fileName);
});


app.get("/listtask.html", function(req,res){
    let fileName = viewsPath + "/listtask.html";
    res.render(fileName, {
        task: db
    });
})


app.post("/addNewTAsk", function(req,res){
    console.log(req.body);
    db.push(req.body);
    res.redirect("/listtask.html");

});

app.listen(8080);