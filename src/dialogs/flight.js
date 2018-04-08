const builder = require('botbuilder');
const axios = require("axios");
var qs = require("querystring");
var http = require("http");



module.exports = [
    // Prompt user to enter the name of the city they want to visit
    // (session) => {
    //     session.send('This is flight dialog.')
    //     fill in stuff here
    // },
    function (session) {
        session.send("Hello and welcome to Tripcommend!");
        builder.Prompts.text(session, "Where are you from? e.g LHR");
    },
    function (session, results) {
        session.userData.origin = results.response;
        builder.Prompts.text(session, "Where do you want to go? e.g. CPH");
    },
    function (session, results) {
        session.userData.destination = results.response;
        builder.Prompts.number(session, "Which day of April do you want leave?");
    },
    function (session, results) {
        session.userData.departureDay = results.response;
        builder.Prompts.number(session, "How many days?");
    },
    function (session, results) {
        session.userData.arrivalDay = results.response + session.userData.departureDay;
        session.send("Got it... wait a minute...");
        const country = "DK";
        const currency = "DKK";
        const locale = "en-US";
        const originPlace = session.userData.origin;
        const destinationPlace = session.userData.destination;
        const outboundPartialDate = `2018-04-${session.userData.departureDay}`;
        const inboundPartialDate = `2018-04-${session.userData.arrivalDay}`;
        const url =
            `http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${originPlace}/${destinationPlace}/${outboundPartialDate}/${inboundPartialDate}?apiKey=ha367676475536677623413270754176`;
        axios.get(url).then(response => {
                const bestDeal = `Your best deal is about ${response.data.Quotes[0].MinPrice} ${currency}!`;
                session.send(bestDeal);
                session.send("[URL to buy flight ticket goes here]");
                session.send("Let me help you with finding places you can visit in CPH");
                session.beginDialog('/trip');
            })
            .catch(error => {
                session.send("ERROR");
                console.log(error);
            });
    }

];
