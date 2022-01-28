const express = require("express");
const app = express();
const path = require("path");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/ContactForm',{useNewUrlParser : true});
const { stringify } = require("querystring");
const port = 80;

var ContactForm = new mongoose.Schema({
    FirstName : String,
    LastName : String,
    Company : String,
    Email : String,
    AreaCode : String,
    PhoneNumber : String,
    Subject : String,
    BeginnerOrNot : String
});

var form = mongoose.model('form',ContactForm);  // schema modeling

app.use('/static', express.static('static')); // '/static' because we created folder static .. remainig thing is syntax.
app.use(express.urlencoded());
// Create the schema

//active pug engine
app.set('view engine', 'pug');
//set view directory for pug files
app.set('views', path.join(__dirname,'views'));

app.get("/", (req, res) => {
    const cont = "Hey everyone this is my first website using pug!";
    const parameter = {title: "Develop the web that you like", 'content':cont};
    res.status(200).render('website.pug',parameter);  // this how you can pass parameter to for website.pug file
});

//Creating backend storage for forms
app.post("/",(req,res)=>{
   var mydata = new form(req.body);
   mydata.save().then(()=>{
       res.send("This is done");
   }).catch(()=>{
       res.status(400).send("Item is not saved");
   })
})

app.listen(port, () => {
    console.log(`The express app is working on port ${port}`);
  });
