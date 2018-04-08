const builder = require('botbuilder');
const axios = require("axios");
var qs = require("querystring");
var http = require("http");
var request = require("request");


// functions go here

module.exports = [
    // Prompt user to enter the name of the city they want to visit
    // (session) => {
    //     session.send('This is flight dialog.')
    //     fill in stuff here
    // },
    function (session) {
        session.send("Hello and welcome to Tripcommend!"); 
        builder.Prompts.text(session, "Where are you from?");
    },      
    function (session, results) {
        session.userData.origin = results.response;
        builder.Prompts.text(session, "Where do you want to go?"); 
    },
    function (session, results) {
        session.userData.destination = results.response;
        builder.Prompts.number(session, "Which day of april do you want leave?");
    },
    function (session, results) {
        session.userData.departureDay = results.response;
        builder.Prompts.number(session, "How many days?");
    },
    function (session, results) {
        session.userData.arrivalDay = results.response + session.userData.departureDay;
        session.send("Got it... wait a minute..." );
        const country = "DK";
        const currency = "DKK";
        const locale = "en-US";
        const originPlace = session.userData.origin;
        const destinationPlace = session.userData.destination;
        const outboundPartialDate =  `2018-04-${session.userData.departureDay}`;
        const inboundPartialDate = `2018-04-${session.userData.arrivalDay}`;
        const url =
        `http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${originPlace}/${destinationPlace}/${outboundPartialDate}/${inboundPartialDate}?apiKey=ha367676475536677623413270754176`;
        axios.get(url).then(response => {
        const bestDeal = `Your best deal is about ${response.data.Quotes[0].MinPrice} ${currency}!`;
        session.send(bestDeal);   
             })
        .catch(error => {
            console.log(error);
        });
        var options = { method: 'POST',
  url: 'http://partners.api.skyscanner.net/apiservices/pricing/v1.0',
  headers: 
   { 'Postman-Token': '5940ee59-655a-45a5-9c51-3ea05af91ba8',
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/x-www-form-urlencoded' },
  form: 
   { cabinclass: 'Economy',
     country: 'DK',
     currency: 'DKK',
     locale: 'en-US',
     locationSchema: 'iata',
     originplace: originPlace,
     destinationplace: destinationPlace,
     outbounddate: outboundPartialDate,
     inbounddate: inboundPartialDate,
     adults: '1',
     children: '0',
     infants: '0',
     apikey: 'ha367676475536677623413270754176' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  function splitString(stringToSplit, separator) {
    var arrayOfStrings = stringToSplit.split(separator);
    var numberOfElements = arrayOfStrings.length;
    var output = arrayOfStrings[numberOfElements - 1];
    return output;
  }
  
  var tempestString = response.headers.location;
  
  var space = '/';

  var output = splitString(tempestString, space);
  pollUrl = `http://partners.api.skyscanner.net/apiservices/pricing/uk1/v1.0/${output}`;
  
  options = { method: 'GET',
  url: pollUrl,
  qs: { apikey: 'ha367676475536677623413270754176' },
  headers: 
   { 'Postman-Token': 'f247babd-1b33-4be2-9f2b-d642b21ed1e5',
     'Cache-Control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  // console.log(response.data.Itineraries[0].DeeplinkUrl)
  // console.log(body)
  var json = JSON.parse(body);
  var flightLink = json["Itineraries"][0]["PricingOptions"][0]["DeeplinkUrl"];
  session.send(flightLink);
});
});

      

   
        


    }


    
];


