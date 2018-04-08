const restify = require('restify');
const builder = require('botbuilder');

if (process.env.STAGE !== "production") {
    require('dotenv').config();
} 

const dialogs = require('./dialogs');

//=========================================================
// Bot Setup
//=========================================================

// Create chat bot
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
const bot = new builder.UniversalBot(connector);
// Register in-memory storage
bot.set('storage', new builder.MemoryBotStorage());

//=========================================================
// Bots Middleware
//=========================================================

bot.use(builder.Middleware.firstRun({ version: 1.0, dialogId: '*:/' }));
bot.use(builder.Middleware.sendTyping());

//=========================================================
// Bots Global Actions
//=========================================================

// // Add first run dialog
// bot.dialog('/firstRun', dialogs.firstRun).triggerAction({
//     onFindAction: function (context, callback) {
//         // Only trigger if we've never seen user before
//         if (!context.userData.firstRun) {
//             context.userData.firstRun = true;
//             // Return a score of 1.1 to ensure the first run dialog wins
//             callback(null, 1.1);
//         } else {
//             callback(null, 0.0);
//         }
//     }
// });


// Delete session.userData
bot.dialog('/resetUser', (session) => {
    session.userData = {};
    session.endDialog('User reset!');
    session.beginDialog('/');
}).triggerAction({
    matches: /^RESET/i,
    confirmPrompt: "Confirm RESET this user?"
});

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', dialogs.firstRun)
bot.dialog('/onboarding', dialogs.onboarding);
bot.dialog('/flight', dialogs.flight);
bot.dialog('/trip', dialogs.trip);


//=========================================================
// Server Setup
//=========================================================

const server = restify.createServer();

// Setup endpoint for incoming messages which will be passed to the bot's ChatConnector.
server.post('/api/messages', connector.listen());

// Start listening on 3978 by default
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s listening to %s', server.name, server.url);
});
