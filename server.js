// server/server/js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");


// mongo db support

const {MongoClient} = require("mongodb");

const uri = `mongodb+srv://digitalmarker:secretpass@cluster0.v7zq1.mongodb.net/sample_airbnb?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use(bodyParser.json());
app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.use(express.urlencoded({extended: true}));

// Set up Auth0 configuration
const authConfig = {
    domain: "databaseapp.eu.auth0.com",
};

// Create middleware to validate the JWT using express-jwt
const checkJwt = jwt({
    // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    // Validate the audience (Identifier) and the issuer (Domain).
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithms: ["RS256"]
});

// mock data to send to our frontend
let events = [
    {
        id: 1,
        name: "Database 1",
        category: "Fundraising",
        description:
            "Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.",
        featuredImage: "https://placekitten.com/500/500",
        images: [
            "https://placekitten.com/500/500",
            "https://placekitten.com/500/500",
            "https://placekitten.com/500/500"
        ],
        location: "1234 Fancy Ave",
        date: "12-25-2019",
        time: "11:30"
    },
    {
        id: 2,
        name: "Database 2",
        category: "Adoptions",
        description:
            "Come to check yourself of corona",
        featuredImage: "https://placekitten.com/500/500",
        images: ["https://placekitten.com/500/500"],
        location: "1234 Dog Alley",
        date: "11-21-2019",
        time: "12:00"
    }
];

// get all events
app.get("/events", (req, res) => {
    res.send(events);
});

// get all events
app.get("/mongo", async (req, res) => {
    async function run() {
        try {
            await client.connect();
            const database = client.db('digitalmarker');
            const user = database.collection('users');
            // Query for a movie that has the title 'Back to the Future'
            const query = {paid: true};
            const result = await user.findOne(query);
            res.send(result);
            console.log("Done");
        } finally {
            // Ensures that the client will close when you finish/error
            client.close();
        }
    }

    run().catch(console.dir);

})

app.get("/events/:id", checkJwt, (req, res) => {
    const id = Number(req.params.id);
    const event = events.find(event => event.id === id);
    res.send(event);
});

app.get("/", (req, res) => {
    res.send(`Hi! Server is listening on port ${port}`);
});

// listen on the port
app.listen(port, function () {
    console.log("Server started successfully");
});
