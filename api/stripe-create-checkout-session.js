const requireAuth = require("./_require-auth.js");
const { getUser, updateUser } = require("./_db.js");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: process.env.STRIPE_API_VERSION,
});

export default requireAuth(async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!body.priceId) {
    return res.status(400).send({
      status: "error",
      message: "No priceId is defined in request body",
    });
  }

  try {
    let { email, stripeCustomerId, stripeSubscriptionId } = await getUser(user.uid);

    // If user does not already have a stripeCustomerId then create a customer in Stripe
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({ email: email });

      await updateUser(user.uid, {
        stripeCustomerId: customer.id,
      });

      stripeCustomerId = customer.id;
    }

    // Create a checkout session
    let params = {}
    console.log(body);
    console.log(body.quantity);
    if (body.priceId !== process.env.STRIPE_PRICE_SMS) {
      params = {
        customer: stripeCustomerId,
        payment_method_types: ["card"],
        subscription_data: {
          // Use trial period set for this priceId (if there is one)
          trial_from_plan: true,
          // Uncomment to add a coupon code from request body
          //coupon: body.coupon
        },
        line_items: [
          {
            price: body.priceId,
            quantity: body.quantity,
          },
        ],
        mode: "subscription",
        // Uncomment to allow user to enter a promotional code
        //allow_promotion_codes: true,
        // Uncomment if you need address collection
        //billing_address_collection: "required",
        //shipping_address_collection: { allowed_countries: ['US'] },
        success_url: `${process.env.STRIPE_DOMAIN}/dashboard/:section?paid=true`,
        cancel_url: `${process.env.STRIPE_DOMAIN}/pricing`,
      };
    } else {
      params = {
        customer: stripeCustomerId,
        payment_method_types: ["card"],
        line_items: [
          {
            price: body.priceId,
            quantity: Math.max(body.quantity, 9),  // Pricing @ $0.06 cents needs to be >= $.50
          },
        ],
        mode: "payment",
        // Uncomment to allow user to enter a promotional code
        //allow_promotion_codes: true,
        // Uncomment if you need address collection
        //billing_address_collection: "required",
        //shipping_address_collection: { allowed_countries: ['US'] },
        success_url: `${process.env.STRIPE_DOMAIN}/dashboard/send-a-text`,
        cancel_url: `${process.env.STRIPE_DOMAIN}/dashboard/send-a-text`,
      };
    }
    const session = await stripe.checkout.sessions.create(params);

    // Return success response
    res.send({ status: "success", data: session });
  } catch (error) {
    console.log("stripe-create-checkout-session error", error);

    // Return error response
    res.send({ status: "error", code: error.code, message: error.message });
  }
});
