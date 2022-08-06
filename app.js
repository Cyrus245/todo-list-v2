const bodyParser = require('body-parser');
const express = require('express');
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(express.static("public"));

const inputs = ["Buy food", "Cook food", "Eat food"];
const work = [];


app.get("/", (req, res) => {

    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const mnth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


    const day = date.getDate();

    res.render('list', {

        listTitle: day,
        newlistItems: inputs,


    });





})


app.get('/work', (req, res) => {


    res.render("list", {

        listTitle: "Work List",
        newlistItems: work,

    })
})

app.get("/about", (req, res) => {

    res.render('about');
})

app.post("/", (req, res) => {


    const input = req.body.newItem;
    if (req.body.list === 'Work') {

        work.push(input);
        res.redirect("/work");

    } else {

        inputs.push(input)
        res.redirect("/");
    }
})



app.listen(3000, () => {

    console.log(`server started on port 3000`);
})