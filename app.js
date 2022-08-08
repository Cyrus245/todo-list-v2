const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(express.static("public"));


mongoose.connect('mongodb://localhost:27017/todoListDB')

const itemSchema = {


    name: String
}

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({

    name: "Reading books",




})

const item2 = new Item({

    name: "Cook Food",




})

const item3 = new Item({

    name: "Watching Tv",




})


// Item.find({}, (err, foundItems) => {

//     console.log(foundItems);

// }) 


const defaultItems = [item1, item2, item3]


app.get("/", (req, res) => {




    Item.find({}, (err, foundItems) => {

        if (foundItems.length === 0) {

            Item.insertMany(defaultItems, err => {

                err ? console.log(err) : console.log("sucessfully saved to the database")
            })


            res.redirect('/')
        } else {
            res.render('list', {

                listTitle: "Today",
                newlistItems: foundItems,


            });




        }





    })







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


    const itemName = req.body.newItem;

    const item = new Item({

        name: itemName,

    })

    item.save();
    res.redirect('/')



})

app.post('/delete', (req, res) => {


    const checkedId = req.body.checkbox;

    Item.findByIdAndRemove(checkedId, err => {


        err ? console.log(err) : console.log(`sucessfully removed from db`)
    })

    res.redirect('/')
})



app.listen(3000, () => {

    console.log(`server started on port 3000`);
})