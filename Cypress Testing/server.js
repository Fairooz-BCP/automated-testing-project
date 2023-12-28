const express = require("express");
let app = express();

const bodyParser = require("body-parser");
const path = require('path'); // Used for concatenation to create a path


// loads json files of data
const webHierarchies = require('./data/webHierarchies.json');
const depots = require('./data/depots.json');
const products = require('./data/products.json');
const promotions = require('./data/promotions.json')
const mixMatchSchemes = require('./data/mixandmatch.json')
const customers = require('./data/customers.json');

const { mockOrderResponse } = require('./responses/placeOrder');

const port = process.env.PORT || 3001;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })) // Detect url encoded data in http and add to req body
app.use(express.json()); // Detect json data and put it into the req.body


// setting up home page
app.get('/', async (req, res, next) =>{

    // res.sendFile('./view/html/home.html', { root: __dirname }); // path is relative to the execution path __dirname
    res.send(200);

}
)

// Route for heartbeat endpoint
app.get('/rest/api', (req, res) =>{
    // const auth = req.headers;
    // console.log(auth)
    // console.log(req.body)
    // // console.log(username)
    // // console.log(password)
    // // console.log(req.headers)
    // // console.log(req.headers.authorization)
    res.status(200).send('Connection with API established');

})


// Route for web hierarchies endpoint
app.get("/rest/api/v1/webHierarchies", (req, res) => {
    res.json(webHierarchies)
});

// Route for depots endpoint
app.get("/rest/api/v1/depots", (req, res) => {
    res.json(depots)
});

// Route for products endpoint
app.get("/rest/api/v1/products", (req, res) => {
    res.json(products)
});

// Route for promotions endpoint
app.get("/rest/api/v1/promotions", (req, res) => {
    res.json(promotions)
});

// Route for mix and match schemes endpoint
app.get("/rest/api/v1/mixMatchSchemes", (req, res) => {
    res.json(mixMatchSchemes)
});

// Route for customers endpoint
app.get("/rest/api/v1/customers", (req, res) => {
    res.json(customers)
});

// Route to accept order
app.post('/rest/api/v1/placeOrder', async (req, res) => {
    try {
       const result = await mockOrderResponse(req.body);
       res.status(201).json(result);
    } catch (err) {
       console.log(err)
       res.status(500).json({ error: 'An error occurred while creating the order.' });
    }
}) 

app.get('/*', (req, res) =>{
    console.log(req.path)
    res.sendStatus(400);
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});