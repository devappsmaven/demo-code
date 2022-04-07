const Config = require('../Config');
const APP_CREDENTIALS   =  Config.APP_CREDENTIALS;
const dotenv = require('dotenv');
dotenv.config();

let sendPush = async (title,body,deviceToken,orderId = "")=>{ 

 var FCM = require('fcm-node');
    var serverKey = process.env.FCM_KEY; //put your server key here
    //console.log("server key", serverKey)
    var fcm = new FCM(serverKey);
 
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: deviceToken, 
        collapse_key: 'your_collapse_key',
        
        notification: {
            title: title, 
            body: body, 
            orderId: orderId,           
 content_available : true,
 priority : "high",

        },
        
        data: {  //you can send only notification or only data(or include both)
          /*  my_key: 'my value',
            my_another_key: 'my another value'*/
            priority : "high",
 content_available : true,
  orderId: orderId  ,
 text : body,
 body : body
        }
    };

    console.log(message)
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!",err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });

}



module.exports ={
sendPush:sendPush
}