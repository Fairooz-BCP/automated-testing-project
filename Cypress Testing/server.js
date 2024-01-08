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
const invoices = require('./data/invoices.json')
const transactions = require ('./data/transactions.json')
const statements = require('./data/statements.json')
const documents = require('./data/documents.json')
const reps = require('./data/reps.json')
const deliverySchedules = require('./data/deliverySchedules.json')
const claims = require('./data/claims.json')
const claimLines = require('./data/claimLines.json')
const orderLines = require('./data/orderLines.json')
const attributes = require('./data/attributes.json')
const attributeGroups = require('./data/attributeGroups.json')

const { mockOrderResponse } = require('./responses/placeOrder');
const {generateClaimResponse} = require('./responses/postClaim')

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

// Route for attributes
app.get("/rest/api/v1/attributes", (req, res) => {
    res.json(attributes)
});

// Route for attribute groups
app.get("/rest/api/v1/attributeGroups", (req, res) => {
    res.json(attributeGroups)
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

// Route for invoices
app.get("/rest/api/v1/invoices", (req, res) => {
    res.json(invoices)
});

// Route for transactions
app.get("/rest/api/v1/transactions", (req, res) => {
    res.json(transactions)
});

// Route for statements
app.get("/rest/api/v1/statements", (req, res) => {
    res.json(statements)
});

// Route for documents
app.get("/rest/api/v1/documents", (req, res) => {
    res.json(documents)
});

// Route for reps
app.get("/rest/api/v1/reps", (req, res) => {
    res.json(reps)
});

// Route for order

// Route for order lines
app.get("/rest/api/v1/orderLines", (req, res) => {
    res.json(orderLines)
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

// Route for delivery schedules
app.get("/rest/api/v1/deliverySchedules", (req, res) => {
    res.json(deliverySchedules)
});

// Route for claims
app.get("/rest/api/v1/claims", (req, res) => {
    res.json(claims)
});

// Route for claim lines
app.get("/rest/api/v1/claimLines", (req, res) => {
    res.json(claimLines)
});

// Route to accept claims. Generates one claim with with multiple claim lines
app.post("/rest/api/v1/claims", (req, res) => {
    try{
        const claim = generateClaimResponse(req);
        res.status(201).send(claim);
    } catch(err){
        console.log(err)
        res.status(500).send(`Error occured while creating the claim: ${err}`);
    }
})


app.get('/*', (req, res) =>{
    console.log(req.path)
    res.sendStatus(400);
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});