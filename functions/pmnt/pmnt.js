const { updateOrCreateDocument, PremiumAccountsCollection } = require('./db');

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    // console.log(JSON.parse(event.body).event);
    // console.log(JSON.parse(event.body));
    const webhookPayload = JSON.parse(event.body);
      // email -> event.body.payload.subscription.entity.notes.Email_registered_with_Aviatoh
  
      if(webhookPayload.event === 'subscription.activated'){
        console.log(webhookPayload.payload.subscription.entity.notes);
          // add the user to premium subscribers list
          console.log(`writing SUBSCRIPTION ACTIVATION for user ${webhookPayload.payload.subscription.entity.notes.email_registered_with_aviatoh}`);
          await updateOrCreateDocument(PremiumAccountsCollection, webhookPayload.payload.subscription.entity.notes.email_registered_with_aviatoh, {
              premium: true,
              updatedAt: new Date()
          });
          console.log('update try done');
      }
  
      if(webhookPayload.event === 'subscription.pending'){
          // send the user an email mentioning the inability to charge and future discontinuity
   
      }
  
      if(webhookPayload.event === 'subscription.haulted'){
         // send an email mentioning the discontinuity
         // remove the user from premium subscribers list in firestore
         console.log(`writing SUBSCRIPTION HAULT for user ${webhookPayload.payload.subscription.entity.notes.email_registered_with_aviatoh}`);
          await updateOrCreateDocument(PremiumAccountsCollection, webhookPayload.payload.subscription.entity.notes.email_registered_with_aviatoh, {
              premium: false,
              updatedAt: new Date()
          })
  
      }
    // const subject = event.queryStringParameters.name || 'World'
    
      return {
        statusCode: 200
        // // more keys you can return:
        // headers: { "headerName": "headerValue", ... },
        // isBase64Encoded: true,
      }
  } catch (error) {
    console.log(".............", error.toString());
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
