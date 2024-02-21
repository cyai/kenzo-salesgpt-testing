const { sleep } = require("openai/core");

require("dotenv").config();

async function makeOutBoundCall() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    let callSid;

    const client = require("twilio")(accountSid, authToken);

    await client.calls
        .create({
            url: `https://${process.env.SERVER}/incoming`,
            to: process.env.YOUR_NUMBER,
            from: process.env.FROM_NUMBER,
        })
        .then((call) => {
            console.log(call.sid);
            callSid = call.sid;
        });

    // while (true) {
    //     const call = client.calls.get(callSid).fetch();
    //     console.log(`Call status: ${call.status}`);
    //     if (call.status === "in-progress") {
    //         break;
    //     } else if (call.status in ["completed", "failed", "calceled"]) {
    //         console.log(`Call status: ${call.status}`);
    //         break;
    //     }
    //     sleep(100000);
    // }
}

makeOutBoundCall();
