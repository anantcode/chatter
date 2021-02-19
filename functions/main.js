const admin = require("firebase-admin");
const cors = require("cors")({
    origin: true,
});
const functions = require("firebase-functions");

var serviceAccount = require("functions/service-account.json");

//initializing firebase admin using the credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fireship-lessons.firebaseio.com",
});

//importing the session client from dialogflow
const { SessionClient } = require("dialogflow");

//settting up a HTTP cloud function called dialogflow gateway
exports.dialogflowGateway = functions.https.onRequest((req, res) => {
    //wrap the request response with cors, to allow request to be made from a browser
    cors(request, respose, async () => {
        /* Dialogflow is going to be looking for 2 things:
            1. queryInput contains the data that user is trying to send to bot (will be text or audio)
            2. sessionId is a unique id that is generated at client that allows the bot to determine the past messages 
            that were sent in this conversatrion
        */

        //initializing the session client by service account
        const sessionClient = new SessionClient({
            credentials: serviceAccount,
        });

        //referenceing the actual session by calling session path with our firebase proj ID and the session ID
        const session = sessionClient.sessionPath(
            "fireship-lessons",
            sessionId
        );

        //get an actual response from out chatbot
        //by calling detect intent by the session, and the query input which will contain the text or audio that user is saying to bot
        //it gives array of responses but we use only first one.

        const responses = await sessionClient.detectIntent({
            session,
            queryInput,
        });

        const result = responses[0].querResult;
    });
});
