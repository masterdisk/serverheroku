// server/server/js
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const CircularJSON = require('circular-json');

app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: true
}));
app.use(express.urlencoded({extended: true}));


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

app.get("/visma/demo", async (req, res, next) => {

    try {
        const apicall = await axios.get(("https://restapi.e-conomic.com/customers"), {
            headers: {
                'X-AppSecretToken': "demo",
                'X-AgreementGrantToken': "demo",
                'Content-Type': "application/json"
            }
        });
        res.send(apicall.data);
    } catch (err) {
        console.log(err);
    }
}) //template visma GET - HTTPS Request

app.get("/visma/customers", async (req, res, next) => {

    try {
        const apicall = await axios.get(("https://restapi.e-conomic.com/customers"), {
            headers: {
                'X-AppSecretToken': "3BHJkhRDuI1VRQr03bJm6pGPukQ8EhWjgGfMdFfEef41",
                'X-AgreementGrantToken': "oi1YjRUh16ZGAuNSAwRlmnHvEtyPedUBN02xl3B4Yuo1",
                'Content-Type': "application/json"
            }
        });
        res.send(apicall.data);
    } catch (err) {
        console.log(err);
    }

})

app.get("/visma/orders", async (req, res, next) => {

    try {
        const apicall = await axios.get(("https://restapi.e-conomic.com/orders"), {
            headers: {
                'X-AppSecretToken': "3BHJkhRDuI1VRQr03bJm6pGPukQ8EhWjgGfMdFfEef41",
                'X-AgreementGrantToken': "oi1YjRUh16ZGAuNSAwRlmnHvEtyPedUBN02xl3B4Yuo1",
                'Content-Type': "application/json"
            }
        });
        res.send(apicall.data);
    } catch (err) {
        console.log(err);
    }

})

app.get("/visma/invoices", async (req, res, next) => {

    try {
        const apicall = await axios.get(("https://restapi.e-conomic.com/invoices/booked"), {
            headers: {
                'X-AppSecretToken': "3BHJkhRDuI1VRQr03bJm6pGPukQ8EhWjgGfMdFfEef41",
                'X-AgreementGrantToken': "oi1YjRUh16ZGAuNSAwRlmnHvEtyPedUBN02xl3B4Yuo1",
                'Content-Type': "application/json"
            }
        });
        res.send(apicall.data);
    } catch (err) {
        console.log(err);
    }

})

app.get("/echo", (req, res) => {
    res.send(`Hi! Server is listening on port ${port}`);
});

// listen on the port
app.listen(port, function () {
    console.log("Server started successfully");
});
