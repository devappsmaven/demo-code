const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Controller        =  require('../Controllers');
const CONFIG            =  require('../Config');
const APP_CONSTANTS     =  CONFIG.APP_CONSTANTS;
const DEVICE_TYPES      =  APP_CONSTANTS.DEVICE_TYPES;
const SOCIAL_MODE_TYPE  =  APP_CONSTANTS.SOCIAL_MODE_TYPE;
const checkAccessToken = UniversalFunctions.getTokenFromDB;

let driverLogin = {
  method: 'POST',
  path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverLogin',
  handler: function (request, reply) {
    var payloadData = request.payload;
    return Controller.DeliveryTeamController.driverLogin(payloadData).then(response =>{
      return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
  config: {
    description: 'Login Via Phone number & Password For driver',
    tags: ['api', 'Driver'],
    validate: {
        payload: {
           email:     Joi.string().required().trim(),
          password:     Joi.string().required().trim(),
          longitude:     Joi.number().optional().allow(0),
          latitude:      Joi.number().optional().allow(0),
          appVersion:      Joi.string().optional(),
          deviceType:  Joi.string().required().valid([DEVICE_TYPES.IOS,DEVICE_TYPES.ANDROID,DEVICE_TYPES.WEB]),
          deviceToken: Joi.string().optional().allow("123456")
        },
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      'hapi-swagger': {
          payloadType : 'form',
          responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
}

let driverForgotPassword = {
  method: 'POST',
  path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverForgotPassword',
  handler: function (request, reply) {
    var payloadData = request.payload;
    return Controller.DeliveryTeamController.driverForgotPassword(payloadData).then(response =>{
      return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
  config: {
    description: 'Forgot password For driver',
    tags: ['api', 'Driver'],
    validate: {
        payload: {
          email: Joi.string().required().trim()      
        },
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      'hapi-swagger': {
          payloadType : 'form',
          responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
}



let driverLogout = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverLogout',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverLogout(UserData).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'Logout driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {     
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};



let driverProfile= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverProfile',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverProfile(UserData).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {     
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};
 
let driverUpdateNotificationReadStatus= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverUpdateNotificationReadStatus',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverUpdateNotificationReadStatus(UserData).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {     
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};
 

let driverUpdateProfile= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverUpdateProfile',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverUpdateProfile(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {   
      payload:{
            firstName:   Joi.string().required().trim(),
            lastName:   Joi.string().required().trim(),
            email:   Joi.string().required().trim(),
            countryCode:   Joi.string().required().trim(),
            contactNumber:   Joi.string().required().trim()          
      } , 
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};



let driverGetOrders= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverGetOrders',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverGetOrders(UserData,request.payload).then(response =>{
        //  console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'Orders driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {     
        payload:{
        type: Joi.string().required().valid(["All","Active","Delivered"]),
        skip: Joi.number().required(),
        limit: Joi.number().required()
        },
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};




let driverChangePassword= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverChangePassword',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverChangePassword(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'change password driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {     
        payload:{
        oldPassword: Joi.string().required().trim(),
        newPassword: Joi.string().required().trim()
        },
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};





let driverAcceptDeclineOrder= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverAcceptDeclineOrder',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverAcceptDeclineOrder(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'change password driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {     
        payload:{
        orderId: Joi.string().required().trim(),
        isAccepted: Joi.boolean().required()
        },
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};




let driverUnAcceptOrderAfterAccept= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverUnAcceptOrderAfterAccept',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverUnAcceptOrderAfterAccept(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'change password driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {     
        payload:{
        orderId: Joi.string().required().trim()
        },
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};





let driverUpdateOrderStatus= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverUpdateOrderStatus',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverUpdateOrderStatus(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'change password driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {     
        payload:{
        orderId: Joi.string().required().trim(),
        orderStatus: Joi.string().required().valid([APP_CONSTANTS.ORDER_STATUS.ONTHEWAY,APP_CONSTANTS.ORDER_STATUS.PICKEDUP,APP_CONSTANTS.ORDER_STATUS.DELIVERED,APP_CONSTANTS.ORDER_STATUS.CANCEL]),
        },
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};







let driverGetNotifications= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverGetNotifications',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverGetNotifications(UserData, request.payload).then(response =>{
         // console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'change password driver', 
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {   
        payload:{
        pageNumber: Joi.number().optional()
        },  
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};


let driverStoreList= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverStoreList',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverStoreList(UserData).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'Get store for driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {     
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};



let driverUpdateProfileImage= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverUpdateProfileImage',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverUpdateProfileImage(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {   
      payload:{         
            profileImage:  Joi.string().required().trim()         
      } , 
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};


let driverUpdateLocation= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverUpdateLocation',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverUpdateLocation(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {   
      payload:{         
            orderId:  Joi.string().required().trim(),        
            latitude:  Joi.number().required(),        
            longitude:  Joi.number().required()
      } , 
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};

let driverGetOrderDetail= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverGetOrderDetail',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverGetOrderDetail(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {   
      payload:{         
            orderId:  Joi.string().required().trim(),        
         
      } , 
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};
let driverVerifyDelivery= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/driverVerifyDelivery',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.driverVerifyDelivery(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'driver'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {   
      payload:{         
            orderId:  Joi.string().required().trim(),        
            userName:  Joi.string().required().trim(),        
            dateOfBirth:  Joi.date().required()   
         
      } , 
        headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};

let scheduleOrderNotifications= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_DT+'/scheduleOrderNotifications',
    handler: function (request, reply) {  
        // let UserData = request.pre.verify || {};  
        return Controller.DeliveryTeamController.scheduleOrderNotifications().then(response =>{
        
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'driver'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {      
      //  headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};




module.exports = [
  driverLogin,
  driverLogout,
  driverForgotPassword,
  driverProfile,
  driverGetOrders,
  driverChangePassword,
  driverAcceptDeclineOrder,
  driverUpdateProfile,
  driverGetNotifications,
  driverUpdateOrderStatus,
  driverStoreList,
  driverUpdateProfileImage,
  driverUpdateLocation,
  driverGetOrderDetail,
  driverUpdateNotificationReadStatus,
  driverUnAcceptOrderAfterAccept,
  driverVerifyDelivery,
  scheduleOrderNotifications
] 