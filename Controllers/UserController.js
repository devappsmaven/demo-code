 const Path = require('path');
 const _ = require('underscore');
 const mongoose = require('mongoose');

 const dotenv = require('dotenv');
 dotenv.config();
 const Service = require('../Services');
 const Models = require('../Models');
 const Config = require('../Config');
 const UniversalFunctions = require('../Utils/UniversalFunctions');

 const pushNotifications = require('./PushNotifications')
 const CommonController = require('./CommonController');
 const APP_CONSTANTS = Config.APP_CONSTANTS;
 const APP_CREDENTIALS = Config.APP_CREDENTIALS;
 const DEVICE_TYPES = APP_CONSTANTS.DEVICE_TYPES;
 const STATUS_MSG = APP_CONSTANTS.STATUS_MSG;
 const SOCIAL_MODE_TYPE = APP_CONSTANTS.SOCIAL_MODE_TYPE;
 const pointInPolygon = require('point-in-polygon');
 const Vonage = require('@vonage/server-sdk')
 const ObjectId = require('mongodb').ObjectID;
 const Stripe = require('stripe');
 const moment = require('moment');

 var request = require('request');

 const stripe = Stripe(process.env.STRIPE_SECRET_KEY_TEST);
 //const stripe = Stripe(process.env.STRIPE_SECRET_KEY_LIVE);


 const vonage = new Vonage({
     apiKey: process.env.VONAGE_API_KEY,
     apiSecret: process.env.VONAGE_SECRET_KEY
 })



 const userLogin = async(payloadData) => {
     payloadData.password = UniversalFunctions.encryptedPassword(payloadData.password);
     let criteria = {
         contactNumber: payloadData.contactNumber,
         countryCode: payloadData.countryCode,
         password: payloadData.password,
         isDeleted: false,
         // isBlocked: false 
     };
     let projection = {
         password: 0
     };
     try {
         let deviceData = {
             deviceType: payloadData.deviceType,
             deviceToken: payloadData.deviceToken,
         }
         let userData = await Service.UserService.getData(criteria, projection, { lean: true });
         //console.log("userData", userData);
         if (userData.length == 0) {
             return { status: APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_PHONE_NUMBER_AND_PASSWORD, userData: {} }
         }

         let accessToken = await UniversalFunctions.generateAuthToken({ _id: userData[0]._id, email: userData[0].email, role: APP_CONSTANTS.USER_ROLES.USER }, "user"); ////console.log("accessToken",accessToken);


         let updateCriteria = { _id: userData[0]._id }
         let dataToSet = {
             accessToken: accessToken,
             updatedAt: new Date(),
         }
         if (payloadData.deviceToken) {
             dataToSet.deviceToken = payloadData.deviceToken;
             dataToSet.deviceType = payloadData.deviceType;
         }

         if (payloadData.appVersion) {
             dataToSet.appVersion = payloadData.appVersion;
         }

         let finalData = await Service.UserService.updateData(updateCriteria, dataToSet, { new: true });

         let savedAddressData = await Service.UserAddressService.getData({ userId: userData[0]._id, isDeleted: false, isDefault: true }, {}, {})
         return { status: APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT, userData: finalData, savedAddressData: savedAddressData }
     } catch (err) {
         throw err;
     }
 }





 const userCreateClientSecret = async(UserData, payloadData) => {

     try {
         let clientSecret = '';
         if (payloadData.pm) {
             clientSecret = await stripe.paymentIntents.create({
                 amount: parseInt(payloadData.amount * 100),
                 currency: 'usd',
                 payment_method: payloadData.pm,
                 customer: UserData.stripeCustomerId,
                 confirm: true,
                 setup_future_usage: 'off_session',
                 // payment_method_types: ['card'],
                 description: 'Smuggler purchase',
                 shipping: {
                     name: UserData.firstName,
                     address: {
                         line1: '510 Townsend St',
                         postal_code: '98140',
                         city: 'San Francisco',
                         state: 'CA',
                         country: 'US',
                     },
                 },
             });
         } else {
             clientSecret = await stripe.paymentIntents.create({
                 amount: parseInt(payloadData.amount * 100),
                 currency: 'usd',
                 setup_future_usage: 'off_session',
                 // payment_method_types: ['card'],
                 description: 'Smuggler purchase',
                 customer: UserData.stripeCustomerId,
                 shipping: {
                     name: UserData.firstName,
                     address: {
                         line1: '510 Townsend St',
                         postal_code: '98140',
                         city: 'San Francisco',
                         state: 'CA',
                         country: 'US',
                     },
                 },
             });
         }


         return { status: APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT, userData: clientSecret };
     } catch (err) {
         throw err;
     }
 }

 const userForgotPassword = async(payloadData) => {
     //payloadData.password= UniversalFunctions.encryptedPassword(payloadData.password);
     let criteria = {
         countryCode: payloadData.countryCode,
         contactNumber: payloadData.contactNumber,
         //loginType: 'STANDARD',    
         isDeleted: false
     };
     let projection = {
         password: 0,
         accessToken: 0
     };
     try {
         let userData = await Service.UserService.getData(criteria, projection, { lean: true });
         if (userData.length == 0) {
             return { status: APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_PHONE_NUMBER, userData: {} }
         }
         let uniqueCode = await UniversalFunctions.generateRandomString(16);
         let updateCriteria = { _id: userData[0]._id }
         let dataToSet = {
             passwordResetToken: uniqueCode,
             updatedAt: new Date(),
         }

         let sendEmail = await UniversalFunctions.sendUserResetPasswordEmail(userData[0].email, userData[0].firstName, "https://mysmugglers.com/reset-password/" + uniqueCode);

         let from = "92239190528"
         if (payloadData.countryCode === "1") {

             from = "12015109929"
         }

         let to = payloadData.countryCode.toString() + payloadData.contactNumber.toString();
         let text = 'Your password reset link for smuggler is- ' + 'https://mysmugglers.com/reset-password/' + uniqueCode;

         vonage.message.sendSms(from, to, text, (err, responseData) => {
             if (err) {
                 //console.log(err);
             } else {
                 if (responseData.messages[0]['status'] === "0") {
                     //console.log("Message sent successfully.");
                 } else {
                     //console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                 }
             }
         })


         let finalData = await Service.UserService.updateData(updateCriteria, dataToSet, { new: true });
         return { status: APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT, userData: {} }
     } catch (err) {
         throw err;
     }
 }



 const userGoogleRegister = async(payloadData) => {
     //payloadData.password= UniversalFunctions.encryptedPassword(payloadData.password);

     let criteria = {
         googleId: payloadData.googleId,
         isDeleted: false,
         // isBlocked: false 
     };
     let projection = {
         password: 0
     };
     try {
         let dataToSetOld = {
             $set: {
                 deviceType: payloadData.deviceType,
                 deviceToken: payloadData.deviceToken,
             }
         }
         let userData = await Service.UserService.getData(criteria, projection, { lean: true });
         //console.log("userData", userData);
         if (userData.length > 0) {
             let accessToken = await UniversalFunctions.generateAuthToken({ _id: userData[0]._id, email: userData[0].email, name: userData[0].email, role: APP_CONSTANTS.USER_ROLES.USER }, "user");
             dataToSetOld.accessToken = accessToken;


             let upppData = await Service.UserService.updateData(criteria, dataToSetOld, { new: true, lean: true });
             let getFinalUserData = await Service.UserService.getData(criteria, projection, {});
             let savedAddressData = await Service.UserAddressService.getData({ userId: userData[0]._id, isDeleted: false, isDefault: true }, {}, {})
             return { status: APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT, userData: getFinalUserData[0], savedAddressData: savedAddressData }
         } else {
             payloadData.referalCode = await UniversalFunctions.generateRandomString(8);
             userData = await Service.UserService.InsertData(payloadData);
             //  let checkDevice =  await  UniversalFunctions.checkDeviceTokenAndDelete(deviceData);
             let accessToken = await UniversalFunctions.generateAuthToken({ _id: userData._id, email: userData.email, name: userData.email, role: APP_CONSTANTS.USER_ROLES.USER }, "user");
             let updateCriteria = { _id: userData._id };

             let stripeCustomerId = await stripe.customers.create({
                 phone: userData.countryCode + ' ' + userData.contactNumber,
                 name: userData.firstName + ' ' + userData.lastName,
                 email: userData.email
             });

             let dataToSet = {
                 accessToken: accessToken,
                 deviceType: payloadData.deviceType,
                 stripeCustomerId: stripeCustomerId.id,
                 deviceToken: payloadData.deviceToken
             }

             let finalData = await Service.UserService.updateData(updateCriteria, dataToSet, { new: true, lean: true });

             let getFinalUserData = await Service.UserService.getData({ _id: userData._id }, { password: 0 }, {});
             let savedAddressData = await Service.UserAddressService.getData({ userId: userData._id, isDeleted: false, isDefault: true }, {}, {})
             return { status: APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT, userData: getFinalUserData[0], savedAddressData: savedAddressData }
         }
     } catch (err) {
         throw err;
     }
 }




 const userAppleRegister = async(payloadData) => {
     //payloadData.password= UniversalFunctions.encryptedPassword(payloadData.password);
     let criteria = {
         appleId: payloadData.appleId,
         isDeleted: false,
         // isBlocked: false 
     };
     let projection = {
         password: 0
     };
     try {
         let dataToSetOld = {
             $set: {
                 deviceType: payloadData.deviceType,
                 deviceToken: payloadData.deviceToken,
             }
         }
         let userData = await Service.UserService.getData(criteria, projection, { lean: true });
         //console.log("userData", userData);
         if (userData.length > 0) {
             let accessToken = await UniversalFunctions.generateAuthToken({ _id: userData[0]._id, email: userData[0].email, name: userData[0].email, role: APP_CONSTANTS.USER_ROLES.USER }, "user");
             dataToSetOld.accessToken = accessToken;

             if (payloadData.appVersion) {
                 dataToSetOld.appVersion = payloadData.appVersion;
             }


             let upppData = await Service.UserService.updateData(criteria, dataToSetOld, { new: true, lean: true });
             let getFinalUserData = await Service.UserService.getData(criteria, projection, {});
             let savedAddressData = await Service.UserAddressService.getData({ userId: userData[0]._id, isDeleted: false, isDefault: true }, {}, {})
             return { status: APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT, userData: getFinalUserData[0], savedAddressData: savedAddressData }
         } else {
             payloadData.referalCode = await UniversalFunctions.generateRandomString(8);
             userData = await Service.UserService.InsertData(payloadData);
             //  let checkDevice =  await  UniversalFunctions.checkDeviceTokenAndDelete(deviceData);
             let accessToken = await UniversalFunctions.generateAuthToken({ _id: userData._id, email: userData.email, name: userData.email, role: APP_CONSTANTS.USER_ROLES.USER }, "user");
             let updateCriteria = { _id: userData._id };

             let stripeCustomerId = await stripe.customers.create({
                 phone: userData.countryCode + ' ' + userData.contactNumber,
                 name: userData.firstName + ' ' + userData.lastName,
                 email: userData.email
             });

             let dataToSet = {
                 accessToken: accessToken,
                 deviceType: payloadData.deviceType,
                 stripeCustomerId: stripeCustomerId.id,
                 deviceToken: payloadData.deviceToken
             }

             let finalData = await Service.UserService.updateData(updateCriteria, dataToSet, { new: true, lean: true });

             let getFinalUserData = await Service.UserService.getData({ _id: userData._id }, { password: 0 }, {});
             let savedAddressData = await Service.UserAddressService.getData({ userId: userData._id, isDeleted: false, isDefault: true }, {}, {})
             return { status: APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT, userData: getFinalUserData[0], savedAddressData: savedAddressData }
         }
     } catch (err) {
         throw err;
     }
 }



 const userFacebookRegister = async(payloadData) => {
     //payloadData.password= UniversalFunctions.encryptedPassword(payloadData.password);
     let criteria = {
         fbId: payloadData.fbId,
         isDeleted: false,
         // isBlocked: false 
     };
     let projection = {
         password: 0
     };
     try {
         let dataToSetOld = {
             $set: {
                 deviceType: payloadData.deviceType,
                 deviceToken: payloadData.deviceToken,
             }
         }
         let userData = await Service.UserService.getData(criteria, projection, { lean: true });
         //console.log("userData", userData);
         if (userData.length > 0) {
             let accessToken = await UniversalFunctions.generateAuthToken({ _id: userData[0]._id, email: userData[0].email, name: userData[0].email, role: APP_CONSTANTS.USER_ROLES.USER }, "user");
             dataToSetOld.accessToken = accessToken;

             if (payloadData.appVersion) {
                 dataToSetOld.appVersion = payloadData.appVersion;
             }


             let upppData = await Service.UserService.updateData(criteria, dataToSetOld, { new: true, lean: true });
             let getFinalUserData = await Service.UserService.getData(criteria, projection, {});
             let savedAddressData = await Service.UserAddressService.getData({ userId: userData[0]._id, isDeleted: false, isDefault: true }, {}, {})
             return { status: APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT, userData: getFinalUserData[0], savedAddressData: savedAddressData }
         } else {
             payloadData.referalCode = await UniversalFunctions.generateRandomString(8);
             userData = await Service.UserService.InsertData(payloadData);
             //  let checkDevice =  await  UniversalFunctions.checkDeviceTokenAndDelete(deviceData);
             let accessToken = await UniversalFunctions.generateAuthToken({ _id: userData._id, email: userData.email, name: userData.email, role: APP_CONSTANTS.USER_ROLES.USER }, "user");
             let updateCriteria = { _id: userData._id };
             let stripeCustomerId = await stripe.customers.create({
                 phone: userData.countryCode + ' ' + userData.contactNumber,
                 name: userData.firstName + ' ' + userData.lastName,
                 email: userData.email
             });

             let dataToSet = {
                 accessToken: accessToken,
                 deviceType: payloadData.deviceType,
                 stripeCustomerId: stripeCustomerId.id,
                 deviceToken: payloadData.deviceToken
             }

             let finalData = await Service.UserService.updateData(updateCriteria, dataToSet, { new: true, lean: true });

             let getFinalUserData = await Service.UserService.getData({ _id: userData._id }, { password: 0 }, {});
             let savedAddressData = await Service.UserAddressService.getData({ userId: userData._id, isDeleted: false, isDefault: true }, {}, {})
             return { status: APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT, userData: getFinalUserData[0], savedAddressData: savedAddressData }
         }
     } catch (err) {
         throw err;
     }
 }




 const userRegister = async(payloadData) => {
     //payloadData.password= UniversalFunctions.encryptedPassword(payloadData.password);
     let referalCodeRequest = '';
     if (payloadData.referalCode) {
         referalCodeRequest = payloadData.referalCode;
     }
     let criteria = {
         contactNumber: payloadData.contactNumber,
         isDeleted: false
     };
     let projection = {};
     try {
         let userData = await Service.UserService.getData(criteria, projection, { lean: true });
         //console.log("userData", userData);
         if (userData.length > 0) {
             return { status: APP_CONSTANTS.STATUS_MSG.ERROR.MOBILE_NUMBER_ALREADY_EXISTS, userData: {} }
         }

         let deviceData = {
             deviceType: payloadData.deviceType,
             deviceToken: payloadData.deviceToken,
         }

         payloadData.referalCode = await UniversalFunctions.generateRandomString(8);
         payloadData.password = UniversalFunctions.encryptedPassword(payloadData.password);
         payloadData.isPhoneVerified = true;
         userData = await Service.UserService.InsertData(payloadData);
         //   let checkDevice =  await  UniversalFunctions.checkDeviceTokenAndDelete(deviceData);
         let accessToken = await UniversalFunctions.generateAuthToken({ _id: userData._id, email: userData.email, name: userData.email, role: APP_CONSTANTS.USER_ROLES.USER });
         let updateCriteria = { _id: userData._id };

         let stripeCustomerId = await stripe.customers.create({
             phone: userData.countryCode + ' ' + userData.contactNumber,
             name: userData.firstName + ' ' + userData.lastName,
             email: userData.email
         });

         let dataToSet = {
             accessToken: accessToken,
             deviceType: payloadData.deviceType,
             stripeCustomerId: stripeCustomerId.id,
             deviceToken: payloadData.deviceToken
         }

         /*check referal code*/
         if (referalCodeRequest != '') {
             //console.log("cehcking referal code")

             let getRefUser = await Service.UserService.getData({ referalCode: referalCodeRequest }, { _id: 1 }, {});
             //console.log("getRefUser", getRefUser)
             if (getRefUser.length > 0) {
                 //console.log("updateding referal code and count")
                 let updateRef = await Service.UserService.updateData({ _id: getRefUser[0]._id }, { $inc: { freeDeliveryCount: 1 }, $set: { isFreeDelivery: true } }, {});
                 let updateRefOwn = await Service.UserService.updateData({ _id: userData._id }, { $inc: { freeDeliveryCount: 1 }, $set: { isFreeDelivery: true, referedBy: getRefUser[0]._id } }, {});
             }
         }

         let finalData = await Service.UserService.updateData(updateCriteria, dataToSet, { new: true, lean: true });

         let getFinalUserData = await Service.UserService.getData({ _id: userData._id }, { password: 0 }, {});

         return { status: APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT, userData: getFinalUserData[0] }
     } catch (err) {
         throw err;
     }
 }



 const userLogout = async(UserData) => {
     //console.log("Userdaata----", UserData)
     try {
         let criteria = { _id: UserData._id };
         let dataToSet = {
             $unset: {
                 accessToken: 1,
                 deviceToken: 1
             }
         };
         let options = {};
         let updateData = await Service.UserService.updateData(criteria, dataToSet, options);
         return { status: APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT, userData: {} }
     } catch (err) {
         throw err;
     }
 };



 module.exports = {
     userLogin: userLogin,
     userLogout: userLogout,
     userRegister: userRegister,
     userGoogleRegister: userGoogleRegister,
   
     userForgotPassword: userForgotPassword,
 }