import { verifyWebhook } from "@clerk/express/webhooks"
import { Request, Response } from "express"
import User from "../models/User.js"


export const clerkWebhook = async (req : Request, res :Response) => {
  try {
    const evt = await verifyWebhook(req)

    if(evt.type === 'user.created' || evt.type === 'user.updated'){
        const user = await User.findOne({clerkId : evt.data.id})

        const userData = {
        clerkId : evt.data.id,
        email : evt.data?.email_addresses[0]?.email_address,
        name : evt.data?.first_name + " " +  evt.data?.last_name ,
        image : evt.data?.image_url
    }

    if(user){
      console.log('going to updte in mongo');
        await User.findOneAndUpdate({clerkId : evt.data.id},user)
    }else{
       console.log('going to inset in mongo');
        await User.create(userData);
    }


    }

    
  

    // const { id } = evt.data
    // const eventType = evt.type
    // console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    // console.log('Webhook payload:', evt.data)

    res.json({success : true, message : "Webhook received"});
  } catch (err) {
    console.error('Error verifying webhook:', err)
    res.status(400).send('Error verifying webhook')
  }
}