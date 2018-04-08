const builder = require('botbuilder');

module.exports = [
    // Prompt user to enter the name of the city they want to visit
    (session) => {
        // session.send("Welcome");
        session.beginDialog('/flight');
    }
];
