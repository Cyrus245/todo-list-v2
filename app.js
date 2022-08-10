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



const defaultItems = [item1, item2, item3];

const listSchema = {


    name: String,
    items: [itemSchema],
}


const List = mongoose.model("List", listSchema);





app.get("/", (req, res) => {




    //   Item.find({}, (err, foundItems) => {

    //         if (foundItems.length === 0) {

    //             Item.insertMany(defaultItems)
    //                 .then(m => {
    //                     console.log(`sucessfully saved default items to database`)
    //                 })
    //                 .catch(e => {

    //                     console.log(e)
    //                 })


    //             res.redirect('/')
    //         } else {
    //             res.render('list', {

    //                 listTitle: "Today",
    //                 newlistItems: foundItems,


    //             });

    //         }

    //     })

    Item.find().then(foundItems => {

            if (foundItems.length === 0) {

                Item.insertMany(defaultItems)
                    .then(m => {
                        console.log(`sucessfully saved default items to database`)
                    })
                    .catch(e => {

                        console.log(e)
                    })


                res.redirect('/')
            } else {
                res.render('list', {

                    listTitle: "Today",
                    newlistItems: foundItems,


                });

            }


        })

        .catch(e => {

            console.log(e)
        })


})






app.get("/about", (req, res) => {

    res.render('about');
})


app.get('/:customlistName', (req, res) => {


    const customListName = req.params.customlistName;

    List.findOne({
        name: customListName
    }, (err, foundlist) => {

        if (!err) {

            if (!foundlist) {

                const list = new List({

                    name: customListName,
                    items: defaultItems,



                })
                list.save();
                res.redirect('/' + customListName)


            } else {


                res.render('list', {

                    listTitle: foundlist.name,
                    newlistItems: foundlist.items,


                })
            }

        }


    })




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

    // Item.findByIdAndRemove(checkedId, err => {


    //     err ? console.log(err) : console.log(`sucessfully deleted checked item`)
    // })

    Item.findByIdAndRemove(checkedId).then(sucess => {

            console.log(`sucessfully deleted checked items`)
        })
        .catch(e => {
            console.log(e);
        })

    res.redirect('/')
})





app.listen(3000, () => {

    console.log(`server started on port 3000`);
})