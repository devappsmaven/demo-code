const Path = require('path');
const _ = require('underscore');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Service = require('../Services');
const Models  = require('../Models'); 
const Config = require('../Config');
const UniversalFunctions      = require('../Utils/UniversalFunctions');

const pushNotifications= require('./PushNotifications')
const CommonController = require('./CommonController');
const APP_CONSTANTS   =  Config.APP_CONSTANTS;
const DEVICE_TYPES    =  APP_CONSTANTS.DEVICE_TYPES;
const STATUS_MSG      =  APP_CONSTANTS.STATUS_MSG;
const SOCIAL_MODE_TYPE       =  APP_CONSTANTS.SOCIAL_MODE_TYPE;
    const pointInPolygon = require('point-in-polygon');
const Vonage = require('@vonage/server-sdk')

const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY_TEST);

const moment = require('moment');


const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_SECRET_KEY
})

const  driverLogin = async (payloadData)=> { 
  payloadData.password= UniversalFunctions.encryptedPassword(payloadData.password);
  let criteria  ={
    email:payloadData.email.toLowerCase(),
    password:payloadData.password,
    isDeleted: false
   // isBlocked: false 
  }; 
  let projection= {
    password:0
  };
  try {
    let deviceData={
      deviceType  : payloadData.deviceType,
      deviceToken : payloadData.deviceToken,
    }
    let userData    =   await Service.DeliveryTeamService.getData(criteria,projection,{lean:true});  console.log("userData",userData);
    if(userData.length==0){
       return {status: APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_EMAIL_PASSWORD,userData:{}}
     }
  
    let accessToken =  await  UniversalFunctions.generateAuthToken({_id:userData[0]._id,email:userData[0].email,role :APP_CONSTANTS.USER_ROLES.DELIVERY_TEAM}); //console.log("accessToken",accessToken);
  
    let updateCriteria = {_id:userData[0]._id}
    let dataToSet ={
      accessToken:accessToken,
      location:{
        type:'Point',
        coordinates: [payloadData.latitude, payloadData.longitude]
      },
      updatedAt: new Date(),
    }
    if(payloadData.deviceToken){
      dataToSet.deviceToken  = payloadData.deviceToken;
      dataToSet.deviceType   = payloadData.deviceType;
    }

      if(payloadData.appVersion){
  dataToSet.appVersion  = payloadData.appVersion;
    }
    
   
    let finalData = await Service.DeliveryTeamService.updateData(updateCriteria,dataToSet,{new:true}); 
      return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:finalData}
  }catch(err){
    throw err;
  }
}





const  driverForgotPassword = async (payloadData)=> { 
  //payloadData.password= UniversalFunctions.encryptedPassword(payloadData.password);
  let criteria  ={
    email:payloadData.email,
    isDeleted: false
  }; 
  let projection= {
    password:0
  };
  try {
    let userData    =   await Service.DeliveryTeamService.getData(criteria,projection,{lean:true}); 
    if(userData.length==0){
       return {status: APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_EMAIL_PASSWORD,userData:{}}
     }
      let  uniqueCode = await UniversalFunctions.generateRandomString(16);
    let updateCriteria = {_id:userData[0]._id}
    let dataToSet ={
      passwordResetToken:uniqueCode,
      updatedAt: new Date(),
    }  

  

 let  newpassword = await UniversalFunctions.generateRandomString(6);

let updatePWD= await Service.DeliveryTeamService.updateData(criteria,{$set:{password: UniversalFunctions.encryptedPassword(newpassword)}},{});

 let from = "92239190528"
      if(userData[0].countryCode === "1")
      {
      
          from = "12407029844"
      }
     
let to =  userData[0].countryCode.toString()+userData[0].contactNumber.toString();
let text = 'Your new password for smuggler is- '+newpassword;

vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})







    let finalData = await Service.DeliveryTeamService.updateData(updateCriteria,dataToSet,{new:true}); 
      return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:{}}
  }catch(err){
    throw err;
  }
}




const driverLogout = async (UserData)=>{ 
  console.log("Userdaata----", UserData)
  try{
    let  criteria = {_id: UserData._id };  
    let dataToSet = {
      $unset: {
          accessToken: 1,
          deviceToken:1
      }
    }; 
    let options = {};
    let updateData   = await Service.DeliveryTeamService.updateData(criteria,dataToSet,options);
    return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:{}}
  }catch(err){
    throw err;
  } 
};



const driverProfile = async (UserData)=>{ 
  console.log("Userdaata----", UserData)
  try{
    let  criteria = {_id: UserData._id };  
  let projection = {password:0}
  
    let options = {};
    let getData   = await Service.DeliveryTeamService.getData(criteria,projection,options);
    return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:getData}
  }catch(err){
    throw err;
  } 
};



const driverChangePassword = async (UserData,payloadData)=>{ 
 
  try{
    let  criteria = {_id: UserData._id };  
    let projection = {password:1, _id:1}
  
    let options = {};
    let getData   = await Service.DeliveryTeamService.getData(criteria,projection,options);

    let oldPass= UniversalFunctions.encryptedPassword(payloadData.oldPassword);
  
    if(getData[0].password != oldPass)
    {
    return {status: APP_CONSTANTS.STATUS_MSG.ERROR.INCORRECT_OLD_PASS,userData:{}}
    }
    else
    {
       payloadData.password= UniversalFunctions.encryptedPassword(payloadData.newPassword);
      let updatedData   = await Service.DeliveryTeamService.updateData(criteria,{$set:{password:payloadData.password, updatedAt: new Date()}},options);
 
    }
    return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:{}}
  }catch(err){
    throw err;
  } 
}; 


const driverUpdateProfile = async (UserData,payloadData)=>{ 
 
  try{
    let  criteria = {_id: UserData._id };  
    let options = {};

      let updatedData   = await Service.DeliveryTeamService.updateData(criteria,{$set:{firstName:payloadData.firstName,lastName:payloadData.lastName,
      email:payloadData.email,
      countryCode:payloadData.countryCode,
      contactNumber:payloadData.contactNumber,
       updatedAt: new Date()}},options);
 
 let finalData= await Service.DeliveryTeamService.getData(criteria,{password:0},{})
    
    return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:finalData}
  }catch(err){
    throw err;
  } 
};

const driverUpdateProfileImage = async (UserData,payloadData)=>{ 
 
  try{
    let  criteria = {_id: UserData._id };  
    let options = {};

      let updatedData   = await Service.DeliveryTeamService.updateData(criteria,{$set:{profileImage: payloadData.profileImage,updatedAt: new Date()}},options);
  let finalData= await Service.DeliveryTeamService.getData(criteria,{password:0},{})
    
    
    return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:finalData}
  }catch(err){
    throw err;
  } 
};


const driverGetOrders = async (UserData,payloadData)=>{ 
  
  try{
    let  criteria = {deliveryTeamId: UserData._id};

    let getAllStoreIds= await Service.StoreService.getData({deliveryTeamIds:{$in: [UserData._id]},isDeleted:false},{_id:1},{});

var storeIds=[];
if(getAllStoreIds)
  {
    var storeIds=[];

for(let sid of getAllStoreIds)
{
  storeIds.push(sid._id)
}

}
    if(payloadData.type === "All")
    {
      criteria= {$and:[{$or:[{deliveryTeamId: UserData._id},{ $and:[{storeId: {$in: storeIds}},{orderStatus: 'PENDING'}]}]},{rejectByDeliveryTeamId:{$nin:UserData._id}}]};

          /* criteria = {deliveryTeamId: UserData._id,
     storeId: {$in: storeIds},
    
     };*/
    }  
    else
     if(payloadData.type === "Active")
    {
      criteria.orderStatus= {$ne: APP_CONSTANTS.ORDER_STATUS.DELIVERED}
    }  
    else
      if(payloadData.type === "Delivered")
    {
      criteria.orderStatus= {$eq: APP_CONSTANTS.ORDER_STATUS.DELIVERED}
    }  
    console.log("criteria----------------",criteria)
    
      let collectionOptions =[
      {
          path: 'storeId',
          model: 'store',
          select: 'title location profileImage address',
          options: {lean: true}
      }, 
       {
          path: 'userBillingAddressId',
          model: 'userAddress',
          select: '',
          options: {lean: true}
      }, 
      {
          path: 'userId',
          model: 'user',
          select: 'firstName lastName countryCode contactNumber email',
          options: {lean: true}
      }, 
       {
          path: 'products.allSizes.attributeId',
          model: 'attribute',
          select: 'title',
          options: {lean: true}
      }, 
      ]

    let options = {sort:{_id:-1},skip:(payloadData.skip),limit:(payloadData.limit)};

      let userData    =  await Service.DAOService.getDataWithReferenceFixed(Models.UserOrder, criteria, {transactionDetail:0,transferDetail:0,__v:0}, options, collectionOptions); //console.log("categoryData",categoryData);

let getCount=  await Service.DAOService.getDataWithReferenceFixed(Models.UserOrder, criteria, {transactionDetail:0,transferDetail:0,__v:0}, {}, []); 

let finalArray= []
for(let order of userData)
{  
  order.needToShow= await checkDriverUnderStoreExistOrNot(order.storeId,UserData._id)
  finalArray.push(order)
}

let chkNotiCnt= await Service.PushNotificationService.countDocuments({deliveryTeamId: UserData._id, isRead: false});

    return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:finalArray, unReadPushCount:chkNotiCnt, getCount:getCount.length}
  }catch(err){
    throw err;
  } 
};


async function checkDriverUnderStoreExistOrNot(storeId, deliveryTeamId)
{
  let checkDriverUnderStoreExistOrNot= await Service.StoreService.getData({_id:storeId },{deliveryTeamIds: 1},{});
  //console.log("checkDriverUnderStoreExistOrNot[0].deliveryTeamIds-------", checkDriverUnderStoreExistOrNot[0].deliveryTeamIds)
  //console.log("deliveryTeamId-------", deliveryTeamId)
  //console.log("checkDriverUnderStoreExistOrNot[0].deliveryTeamIds.indexOf(deliveryTeamId.toString())-------", checkDriverUnderStoreExistOrNot[0].deliveryTeamIds.indexOf(deliveryTeamId.toString()))
  if(checkDriverUnderStoreExistOrNot[0].deliveryTeamIds.indexOf(deliveryTeamId.toString()) < 0)
  {
    return 0;
  }
  else
  {
    return 1;
  }
}


const driverGetOrderDetail = async (UserData,payloadData)=>{ 
  //console.log("Userdaata----", UserData)
  try{


    let  criteria = {_id: payloadData.orderId};
   

    let collectionOptions =[
      {
          path: 'storeId',
          model: 'store',
          select: 'title location profileImage address',
          options: {lean: true}
      }, 
       {
          path: 'userBillingAddressId',
          model: 'userAddress',
          select: '',
          options: {lean: true}
      }, 
      {
          path: 'userId',
          model: 'user',
          select: 'firstName lastName countryCode contactNumber email profileImage',
          options: {lean: true}
      }, 
       {
          path: 'products.allSizes.attributeId',
          model: 'attribute',
          select: 'title',
          options: {lean: true}
      }, 
      ]

   

      let userData    =  await Service.DAOService.getDataWithReferenceFixed(Models.UserOrder, criteria, {transactionDetail:0,transferDetail:0,__v:0}, {}, collectionOptions); //console.log("categoryData",categoryData);

 let checkExist= await checkDriverUnderStoreExistOrNot(userData[0].storeId._id,UserData._id)
if(userData[0].orderStatus == 'PENDING')
{
if(checkExist == 0)
{
   return {status:APP_CONSTANTS.STATUS_MSG.ERROR.NOT_PERMITTED,userData:{}}
}
else
{
    return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:userData}
}
}
else
{
 if(checkExist == 0 || userData[0].deliveryTeamId != UserData._id)
{
   return {status:APP_CONSTANTS.STATUS_MSG.ERROR.NOT_PERMITTED,userData:{}}
}
else
{
    return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:userData}
} 
}




  }catch(err){
    throw err;
  } 
};



const driverAcceptDeclineOrder = async (UserData,payloadData)=>{ 
 console.log("payloadData", payloadData)
  try{

     let  criteria = {_id: payloadData.orderId};

let getOrderId= await Service.UserOrderService.getData(criteria,{storeId:1,orderStatus:1,isScheduled: 1},{})
 let checkExist= await checkDriverUnderStoreExistOrNot(getOrderId[0].storeId._id,UserData._id)
if(checkExist == 0 || getOrderId[0].orderStatus != 'PENDING')
{
   return {status:APP_CONSTANTS.STATUS_MSG.ERROR.NOT_PERMITTED,userData:{}}
}
else
{
    
    let projection = {}
  
    let options = {};
    if(payloadData.isAccepted === false)
    {
     let updatedNotificationData   = await Service.PushNotificationService.updateData({orderId:payloadData.orderId,deliveryTeamId:UserData._id},{$set:{isDeleted:true,updatedAt: new Date()}},options);
     
     let updatedRejectIdsData   = await Service.UserOrderService.updateData({_id:payloadData.orderId},{$push:{rejectByDeliveryTeamId:UserData._id}},options);
   

    return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:{}}
    }
    else
    {
      
    let getData   = await Service.UserOrderService.getData(criteria,projection,options);
   
    if(getData[0].isDeliveryTeamAccepted == true)
    {
 return {status: APP_CONSTANTS.STATUS_MSG.ERROR.ALREADY_ACCEPTED,userData:{}}
    }
    else
    {
     let updatedData   = await Service.UserOrderService.updateData(criteria,{$set:{deliveryTeamId:UserData._id , orderStatus: "CONFIRMED",isDeliveryTeamAccepted:true, deliveryTeamAcceptedAt:  new Date(),updatedAt: new Date()}},options);
     let updatedNotificationData   = await Service.PushNotificationService.updateDataMany({orderId:payloadData.orderId,deliveryTeamId:{$ne:UserData._id}},{$set:{isDeleted:true,updatedAt: new Date()}},options);
     
     let updatedNotificationDataOwn   = await Service.PushNotificationService.updateData({orderId:payloadData.orderId,deliveryTeamId:UserData._id},{$set:{isAccepted:true,updatedAt: new Date()}},options);
   

/*user and driver data*/
let getDTIds= await Service.DeliveryTeamService.getData({_id:UserData._id},{},{});
  let getUserInfo= await Service.UserService.getData({_id:getData[0].userId},{countryCode:1,contactNumber:1, firstName:1,lastName:1,deviceToken:1,deviceType:1},{});

        let  savePushNotification='';


/*tipping notification*/
if(getData[0].driverTipAmount !== 0)
{
  
   var fcmToken = [];
 setTimeout(() =>
  getDTIds.forEach(element => {
            fcmToken.push(element.deviceToken);
             var savePushObject= {
    title: 'Tip Amount' ,
    text: getUserInfo[0].firstName+' '+getUserInfo[0].lastName+' tipped you $'+getData[0].driverTipAmount+'! Say thanks!',
    deliveryTeamId: element._id,
    orderId:payloadData.orderId
       }
          savePushNotification    =   Service.PushNotificationService.InsertData(savePushObject); 

        }), 20000);


   setTimeout(() => fcmToken.forEach(dt => {
           pushNotifications.sendPush('Tip Amount',getUserInfo[0].firstName+' '+getUserInfo[0].lastName+' tipped you $'+getData[0].driverTipAmount+'! Say thanks!',dt,payloadData.orderId);  
        }) , 20000);




   let from = "92239190528"
      if(getDTIds[0].countryCode === "1")
      {
      
          from = "12015109929"
      }
     
let to =   getDTIds[0].countryCode.toString()+ getDTIds[0].contactNumber.toString();
let text = getUserInfo[0].firstName+' '+getUserInfo[0].lastName+' tipped you $'+getData[0].driverTipAmount+'! Say thanks!'

  setTimeout(() => 
vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
}), 25000);


  
}
/*tipping notification end*/


/*accept order to user notification*/
 var fcmTokenUser = [];

  getUserInfo.forEach(element => {
            fcmTokenUser.push(element.deviceToken);
             var savePushObjectUser= {
    title: 'Order Confirmed' ,
    text: "Your order number "+getData[0].serialNumberOrder+" has been confirmed!",
    userId: element._id,
    orderId:payloadData.orderId
       }
          savePushNotification    =   Service.PushNotificationService.InsertData(savePushObjectUser); 

        });

   fcmTokenUser.forEach(dt => {
           pushNotifications.sendPush('Order Confirmed', "Your order number "+getData[0].serialNumberOrder+" has been confirmed!",dt,payloadData.orderId);  
        });

   /*accept end user notification*/





/*accept order to user notification*/
 var fcmTokenUser = [];

  getUserInfo.forEach(element => {
            fcmTokenUser.push(element.deviceToken);
             var savePushObjectUser= {
    title: 'Driver Accepted' ,
    text: getDTIds[0].firstName+' '+getDTIds[0].lastName+" has accepted your order! We'll let you know when they are on the way to you.",
    userId: element._id,
    orderId:payloadData.orderId
       }
          savePushNotification    =   Service.PushNotificationService.InsertData(savePushObjectUser); 

        });

   fcmTokenUser.forEach(dt => {
           pushNotifications.sendPush('Driver Accepted',getDTIds[0].firstName+' '+getDTIds[0].lastName+" has accepted your order! We'll let you know when they are on the way to you.",dt,payloadData.orderId);  
        });

   /*accept end user notification*/



/*Text message to user if enable for this order*/
/*if(getData[0].isTextEmailEnabled === true)
{
       let from = "92239190528"
      if(getUserInfo[0].countryCode === "1")
      {
        console.log("us number")
        console.log("us number")
        console.log("us number")
          from = "12407029844"
      }
     
let to =  getUserInfo[0].countryCode.toString()+getUserInfo[0].contactNumber.toString();
let text = getDTIds[0].firstName+' '+getDTIds[0].lastName+"  has accepted your order! We'll let you know when they are on the way to you. Call or text "+getUserInfo[0].countryCode+''+getUserInfo[0].contactNumber+" if you want to contact your driver.";

vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
}) 
}
*/
/*END Text message to user if enable for this order*/

     return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:{}}
    }
  }
  
   }
  }catch(err){
    throw err;
  } 
};


const driverUnAcceptOrderAfterAccept = async (UserData,payloadData)=>{ 
 
  try{
    let  criteria = {_id: payloadData.orderId};  


  let getOrderData = await Service.UserOrderService.getData({_id:payloadData.orderId},{},{});
 let checkExist= await checkDriverUnderStoreExistOrNot(getOrderData[0].storeId._id,UserData._id)
if(checkExist == 0)
{
   return {status:APP_CONSTANTS.STATUS_MSG.ERROR.NOT_PERMITTED,userData:{}}
}
else
{

    let projection = {}  
    let options = {}; 

  
    let updatedNotificationData   = await Service.PushNotificationService.updateData({orderId:payloadData.orderId,deliveryTeamId:UserData._id},{$set:{isDeleted:true,updatedAt: new Date()}},options);
    let updatedData   = await Service.UserOrderService.updateData(criteria,{$set:{orderStatus: "PENDING",isDeliveryTeamAccepted:false, updatedAt: new Date()}},options);
    
let updatedRejectIdsData   = await Service.UserOrderService.updateData({_id:payloadData.orderId},{$push:{rejectByDeliveryTeamId:UserData._id}},options);
   

/*Send push notifications again to all drivers except the rejected one.*/
     let fcmToken=[];
      let deviceTokenSP= await Service.StoreService.getData({_id:getOrderData[0].storeId},{deliveryTeamIds:1},{})
    let getDTIds= await Service.DeliveryTeamService.getData({_id:{$in: deviceTokenSP[0].deliveryTeamIds},_id:{$ne: UserData._id}},{deviceToken:1,deviceType:1},{});
  getDTIds.forEach(element => {
            fcmToken.push(element.deviceToken);
             let savePushObject= {
    title: 'New Order' ,
    text: 'You have received new order- '+getOrderData[0].serialNumberOrder+' request',
    deliveryTeamId: element._id,
    orderId:getOrderData[0]._id
       }


       if(getOrderData[0].isScheduled == true)
       {
      savePushObject.isScheduleOrder = true;  
      savePushObject.deliveryTimeSlot = getOrderData[0].deliveryTimeSlot;  
      savePushObject.timeZone = getOrderData[0].timeZone;  
      savePushObject.offSet = getOrderData[0].offSet; 
      savePushObject.scheduleDateTimeStart = getOrderData[0].scheduleDateTimeStart;  
      savePushObject.scheduleDateTimeEnd = getOrderData[0].scheduleDateTimeEnd;   
       }

       let  savePushNotification    =   Service.PushNotificationService.InsertData(savePushObject); 

        });

 fcmToken.forEach(dt => {
           pushNotifications.sendPush('New Order',"You have received new order- "+getOrderData[0].serialNumberOrder+" request",dt,getOrderData[0]._id);  
        });   
    
     return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:{}}
    
   }
  }catch(err){
    throw err;
  } 
};




const driverUpdateOrderStatus = async (UserData,payloadData)=>{ 

  try{
      let getDTData=  await Service.DeliveryTeamService.getData({_id:UserData._id},{location:1,firstName:1,lastName:1,countryCode:1,contactNumber:1},{});
      let getOrderData=  await Service.UserOrderService.getData({_id:payloadData.orderId},{},{});



 let checkExist= await checkDriverUnderStoreExistOrNot(getOrderData[0].storeId._id,UserData._id)
if(checkExist == 0)
{
   return {status:APP_CONSTANTS.STATUS_MSG.ERROR.NOT_PERMITTED,userData:{}}
}
else
{
       let getUserDT =  await Service.UserService.getData({_id:getOrderData[0].userId},{deviceToken:1,_id:1},{})

    let  criteria = {_id: payloadData.orderId };  
    let options = {};
    let dataToSet = {};
       let notiObj='';

 if(payloadData.orderStatus ===  APP_CONSTANTS.ORDER_STATUS.PICKEDUP)
    {
   dataToSet= {
  $set:{
    orderStatus:payloadData.orderStatus,
  /*  driverLocation: {type:'Point',
        coordinates: [getDTData[0].location.coordinates[0], getDTData[0].location.coordinates[1]]},*/
    updatedAt: new Date(),
    orderPickedUpAt: new Date()}
  }

  notiObj= {
    title: 'Order Picked Up' ,
    text: getDTData[0].firstName+ ' has picked up your order and is on their way to you now! Have your ID ready, please.',
    userId: getOrderData[0].userId,
    orderId:getOrderData[0]._id,
       }

 pushNotifications.sendPush(notiObj.title,notiObj.text,getUserDT[0].deviceToken,getOrderData[0]._id); 
 let  savePushNotification    =   Service.PushNotificationService.InsertData(notiObj); 

    }

else if(payloadData.orderStatus ===  APP_CONSTANTS.ORDER_STATUS.ONTHEWAY)
    {
   dataToSet= {
  $set:{
    orderStatus:payloadData.orderStatus,
   /* driverLocation: {type:'Point',
        coordinates: [getDTData[0].location.coordinates[0], getDTData[0].location.coordinates[1]]},*/
    updatedAt: new Date(),
    orderOnTheWayAt: new Date()}
  }

  notiObj= {
    title: 'Order On The Way' ,
    text: getDTData[0].firstName+ ' is on the way! Give them a call if you need to coordinate any extra delivery instructions.',
    userId: getOrderData[0].userId,
    orderId:getOrderData[0]._id,
       }

 pushNotifications.sendPush(notiObj.title,notiObj.text,getUserDT[0].deviceToken,getOrderData[0]._id); 
 let  savePushNotification    =   Service.PushNotificationService.InsertData(notiObj); 

    }       
   




    else  if(payloadData.orderStatus ===  APP_CONSTANTS.ORDER_STATUS.CANCEL)
    {
 dataToSet= {
  $set:{
    orderStatus:payloadData.orderStatus,
    updatedAt: new Date(),
     orderDeliveredAt: new Date()}
  }
    notiObj= {
    title: 'Order Cancelled' ,
    text: getDTData[0].firstName+ ' has cancelled your order.',
    userId: getOrderData[0].userId,
    orderId:getOrderData[0]._id,
       }

 pushNotifications.sendPush(notiObj.title,notiObj.text,getUserDT[0].deviceToken,getOrderData[0]._id); 
 let  savePushNotification    =   Service.PushNotificationService.InsertData(notiObj); 
    }



    else  if(payloadData.orderStatus ===  APP_CONSTANTS.ORDER_STATUS.DELIVERED)
    {
 dataToSet= {
  $set:{
    orderStatus:payloadData.orderStatus,
    updatedAt: new Date(),
     orderDeliveredAt: new Date()}
  }
    notiObj= {
    title: 'Order Delivered' ,
    text: getDTData[0].firstName+ ' has delivered your order! Remember to rate your delivery, and contact us if you have any comments, questions, or concerns.',
    userId: getOrderData[0].userId,
    orderId:getOrderData[0]._id,
       }

 pushNotifications.sendPush(notiObj.title,notiObj.text,getUserDT[0].deviceToken,getOrderData[0]._id); 
 let  savePushNotification    =   Service.PushNotificationService.InsertData(notiObj); 
    }


      let updatedData   = await Service.UserOrderService.updateData(criteria,dataToSet,options);


      let updatedDataNotifcations   = await Service.PushNotificationService.updateDataMany({orderId:getOrderData[0]._id},{$set: {isOrderDelivered: true}},{});

    let collectionOptions =[
      {
          path: 'storeId',
          model: 'store',
          select: 'title location profileImage address',
          options: {lean: true}
      }, 
       {
          path: 'userBillingAddressId',
          model: 'userAddress',
          select: '',
          options: {lean: true}
      }, 
      {
          path: 'userId',
          model: 'user',
          select: 'firstName lastName countryCode contactNumber email',
          options: {lean: true}
      }, 
       {
          path: 'products.allSizes.attributeId',
          model: 'attribute',
          select: 'title',
          options: {lean: true}
      }, 
      ]
  let userData    =  await Service.DAOService.getDataWithReferenceFixed(Models.UserOrder, criteria, {__v:0}, options, collectionOptions); //console.log("categoryData",categoryData);

  
    return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:userData}
  }
  }catch(err){
    throw err;
  } 
};




const driverGetNotifications = async (UserData,payloadData)=>{ 
  try{
   
    let  criteria = {deliveryTeamId: UserData._id, isDeleted: false};  

    let collectionOptions =[
      {
          path: 'orderId',
          model: 'userOrder',
          select: '',
          options: {lean: true}
      },        
      {
          path: 'userId',
          model: 'user',
          select: 'firstName lastName countryCode contactNumber email _id',
          options: {lean: true}
      }
      ]

let limit = payloadData.pageNumber?15:1000000;
let skip  = payloadData.pageNumber? (parseInt(payloadData.pageNumber) * parseInt(limit) ): 0
          let options = {sort:{_id:-1}, skip: skip,limit:parseInt(limit)};
      //   console.log("optionas----------------", optionas)
  let getData    =  await Service.DAOService.getDataWithReferenceFixed(Models.PushNotification, criteria, {__v:0}, options, collectionOptions); //console.log("categoryData",categoryData);
  let getCount    =  await Service.DAOService.getDataWithReferenceFixed(Models.PushNotification, criteria, {__v:0}, {}, []); //console.log("categoryData",categoryData);
 
let finalArray= []
for(let noti of getData)
{  
  noti.needToShow= await checkDriverUnderStoreExistOrNot(noti.orderId.storeId,UserData._id)
  finalArray.push(noti)
}

return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:finalArray,getCount:getCount.length}
    
  }catch(err){
    throw err;
  }  
};





const driverUpdateNotificationReadStatus = async (UserData)=>{ 
 
  try{
    let  criteria = {deliveryTeamId: UserData._id};  
 // console.log("criteria----------------", criteria)
  let getData    =  await Service.PushNotificationService.updateDataMany(criteria, {$set:{isRead: true}},{}); //console.log("categoryData",categoryData);
        return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:{}}
    
  }catch(err){
    throw err;
  } 
};




const driverStoreList = async (UserData)=>{ 
 
  try{
    let  criteria = {deliveryTeamIds: {$in: UserData._id}, isDeleted: false};  
    let projection = {}  
    let options = {sort:{_id:-1}};
    let getData   = await Service.StoreService.getData(criteria,projection,options);
       return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:getData}
    
  }catch(err){
    throw err;
  } 
};






const driverUpdateLocation = async (UserData, payloadData)=>{ 
 
  try{
       let updateOrder= await Service.UserOrderService.updateData({_id:payloadData.orderId},{$set:{ driverLocation:{
        type:'Point',
        coordinates: [payloadData.latitude, payloadData.longitude]
      }}},{});

       let updateDriverLocation= await Service.DeliveryTeamService.updateData({_id:payloadData.orderId},{$set:{ location:{
        type:'Point',
        coordinates: [payloadData.latitude, payloadData.longitude]
      }}},{});
       return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:{}}
    
  }catch(err){
    throw err;
  } 
};



const driverVerifyDelivery = async (UserData, payloadData)=>{ 
 
  try{
let A = moment(new Date());;
let B = moment(payloadData.dateOfBirth);
let result= A.diff(B, 'years');// => 1
if(result >= 21)
{
let update= await Service.UserOrderService.updateData({_id: payloadData.orderId},{$set:{deliveredPersonUserName: payloadData.userName, deliveredPersonDateOfBirth: payloadData.dateOfBirth, isVerifiedDelivery: true}})
 return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:result}
}
else
{
return {status: APP_CONSTANTS.STATUS_MSG.ERROR.NOT_VERIFIED,userData:result}
}
      
    
  }catch(err){
    throw err;
  } 
};




const scheduleOrderNotifications = async (payloadData)=>{ 
 
  try{


 let currentDate = new Date();
 currentDate.setHours(0,0,0);

let getAllNoti=  await Service.PushNotificationService.getData({isOrderDelivered:false,isScheduleOrder : true,isAccepted: true,isScheduleNotificationSent: false, isDeleted: false},{},{})

for(let noti of getAllNoti)
{
	console.log("noti.text------------", noti.text)
let hours = moment(new Date()).utcOffset(noti.offSet).format('HH:mm A');


let hoursScheudle = moment(new Date(noti.scheduleDateTimeStart)).format('HH:mm A');
let duration = moment.duration({hours: 1})
hoursScheudle= moment(hoursScheudle, 'HH:mm').subtract(duration).format('HH:mm A');

console.log("hoursScheudle------", hoursScheudle)
console.log("hours------", hours)
 
if(hoursScheudle == hours)
{
  let getToken= await Service.DeliveryTeamService.getData({_id: noti.deliveryTeamId},{deviceToken: 1},{})
  let notiObj= {
    title: 'Order Reminder' ,
    text: 'Reminder: you have an order scheduled to be delivered between '+noti.deliveryTimeSlot,
    userId: noti.deliveryTeamId,
    orderId:noti.orderId
       }

 pushNotifications.sendPush(notiObj.title,notiObj.text,getToken[0].deviceToken,noti.orderId); 
 let  savePushNotification    =   Service.PushNotificationService.InsertData(notiObj); 

 let updateNoti=  await Service.PushNotificationService.updateData({_id: noti._id}, {$set:{isScheduleNotificationSent: true}},{});
}
else
{
  console.log("NO needto send notification") 
}
 
}
      
  return {status:APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,userData:{}}   
  }catch(err){
    throw err;
  } 
};





module.exports ={
  driverLogin  : driverLogin,
  driverLogout: driverLogout,
  driverForgotPassword:driverForgotPassword,
  driverProfile:driverProfile,
  driverGetOrders:driverGetOrders,
  driverChangePassword: driverChangePassword,
  driverAcceptDeclineOrder:driverAcceptDeclineOrder,
  driverUpdateProfile:driverUpdateProfile,
  driverGetNotifications:driverGetNotifications,
  driverUpdateOrderStatus:driverUpdateOrderStatus,
  driverStoreList:driverStoreList,
  driverUpdateProfileImage:driverUpdateProfileImage,
  driverUpdateLocation:driverUpdateLocation,
  driverGetOrderDetail:driverGetOrderDetail,
  driverUpdateNotificationReadStatus:driverUpdateNotificationReadStatus,
  driverUnAcceptOrderAfterAccept:driverUnAcceptOrderAfterAccept,
  driverVerifyDelivery:driverVerifyDelivery,
  scheduleOrderNotifications:scheduleOrderNotifications
}