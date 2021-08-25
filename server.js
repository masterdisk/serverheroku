// server/server/js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
const {parse, stringify, toJSON, fromJSON} = require('flatted');
const port = process.env.PORT || 8000;


// mongo db support

app.use(bodyParser.json());
app.use(
    cors({
        credentials: true,
        origin: true
    })
);
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

//Customers

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

//Orders

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

//Invoices

app.get("/visma/invoices/booked", async (req, res, next) => {

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

})  // GET booked invoices

app.get("/visma/invoices/post", async (req, res, next) => {

    invoice = {
        "date": "2014-08-08",
        "currency": "DKK",
        "exchangeRate": 100,
        "netAmount": 10.00,
        "netAmountInBaseCurrency": 0.00,
        "grossAmount": 12.50,
        "marginInBaseCurrency": -46.93,
        "marginPercentage": 0.0,
        "vatAmount": 2.50,
        "roundingAmount": 0.00,
        "costPriceInBaseCurrency": 46.93,
        "paymentTerms": {
            "paymentTermsNumber": 1,
            "daysOfCredit": 14,
            "name": "Lobende maned 14 dage",
        },
        "customer": {
            "customerNumber": 1
        },
        "recipient": {
            "name": "Toj & Co Grossisten",
            "address": "Vejlevej 21",
            "zip": "7000",
            "city": "Fredericia",
            "vatZone": {
                "name": "Domestic",
                "vatZoneNumber": 1,
                "enabledForCustomer": true,
                "enabledForSupplier": true
            }
        },
        "delivery": {
            "address": "Hovedvejen 1",
            "zip": "2300",
            "city": "Kbh S",
            "country": "Denmark",
            "deliveryDate": "2014-09-14"
        },
        "references": {
            "other": "aaaa"
        },
        "layout": {
            "layoutNumber": 19
        },
        "lines": [
            {
                "lineNumber": 1,
                "sortKey": 1,
                "unit": {
                    "unitNumber": 2,
                    "name": "Tim"
                },
                "product": {
                    "productNumber": "1"
                },
                "quantity": 1.00,
                "unitNetPrice": 10.00,
                "discountPercentage": 0.00,
                "unitCostPrice": 46.93,
                "totalNetAmount": 10.00,
                "marginInBaseCurrency": -46.93,
                "marginPercentage": 0.0
            },
            {
                "lineNumber": 1,
                "sortKey": 1,
                "unit": {
                    "unitNumber": 1,
                    "name": "stk."
                },
                "product": {
                    "productNumber": "1"
                },
                "quantity": 1.00,
                "unitNetPrice": 10.00,
                "discountPercentage": 0.00,
                "unitCostPrice": 46.93,
                "totalNetAmount": 10.00,
                "marginInBaseCurrency": -46.93,
                "marginPercentage": 0.0
            },
            {
                "lineNumber": 1,
                "sortKey": 1,
                "unit": {
                    "unitNumber": 4
                },
                "product": {
                    "productNumber": "1"
                },
                "quantity": 1.00,
                "unitNetPrice": 10.00,
                "discountPercentage": 0.00,
                "unitCostPrice": 46.93,
                "totalNetAmount": 10.00,
                "marginInBaseCurrency": -46.93,
                "marginPercentage": 0.0
            }
        ]
    };

    try {

        const apicall = await axios.post("https://restapi.e-conomic.com/invoices/drafts", invoice, {
            headers: {
                'X-AppSecretToken': "3BHJkhRDuI1VRQr03bJm6pGPukQ8EhWjgGfMdFfEef41",
                'X-AgreementGrantToken': "oi1YjRUh16ZGAuNSAwRlmnHvEtyPedUBN02xl3B4Yuo1",
                'Content-Type': "application/json"
            }
        });

        res.send(toJSON(apicall));
        console.log("apicall");

    } catch (err) {
        console.log(err);
    }

}) //POST invoice without number (yet)

app.get("/visma/invoices/sent", async (req, res, next) => {

    try {
        const apicall = await axios.get(("https://restapi.e-conomic.com/invoices/sent"), {
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

})  //GET invoices sent


//Root
app.get("/", (req, res) => {
    res.send(`Hi! Server is listening on port ${port}`);
});

// listen on the port
app.listen(port, function () {
    console.log("Server started successfully");
});