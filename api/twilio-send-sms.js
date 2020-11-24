const requireAuth = require("./_require-auth.js");
const { getUser } = require("./_db.js");

export default requireAuth(async (req, res) => {
    const body = req.body;
    const user = req.user;

    if (!body.to) {
        return res.status(400).send({
          status: "error",
          message: "No receiving phone number is defined in request body",
        });
      }

      if (!body.message) {
        return res.status(400).send({
          status: "error",
          message: "No message is defined in request body",
        });
      }
    
      try {
        const client = require("twilio")(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );

        let { stripeSubscriptionId } = await getUser(user.uid);
        
        // Uncomment when subscription id is fixed 
        // if(!stripeSubscriptionId) {
        //     console.log('bad sub');
        //     return res.status(400).send({
        //         status: "error",
        //         message: "User doesn't have paid subscription",
        //       });
        // }
        await client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: body.to,
            body: body.message
        })
        .then((status) => {
          // Return success response
          res.send({ status: "success", data: status });
        });
      } catch (error) {
        console.log("twilio-send-sms error", error);
    
        // Return error response
        res.send({ status: "error", code: error.code, message: error.message });
      }
    });