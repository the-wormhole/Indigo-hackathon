const twilio = require("twilio");
const config = require("../config");

const accountSid = config.twilioAccountSid;
const authToken = config.twilioAuthToken;
const client = twilio(accountSid, authToken);

module.exports.createMessage = async function(sendto,flight){
    try{
        const message = await client.messages.create({
            body: `The flight with number - ${flight.flightNumber} status's has been updated and is ${flight.status} and will fly on ${flight.ScheduledDepartureTime} from gate number - ${flight.gate}. Please check our website for more details`,
            from: config.twilioNumber,
            to: sendto,
        });
        console.log(message.body);
        return message;
    }catch(err){
        if(err){
            console.log("Failed to send a message using Twilio for number - ", sendto,err);
        }
        return {err};
    }
}

//createMessage;
// createMessage("");