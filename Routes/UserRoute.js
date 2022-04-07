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

let userLogin = {
  method: 'POST',
  path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userLogin',
  handler: function (request, reply) {
    var payloadData = request.payload;
    return Controller.UserController.userLogin(payloadData).then(response =>{
      return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
  config: {
    description: 'Login Via Phone number & Password For user',
    tags: ['api', 'User'],
    validate: {
        payload: {
          contactNumber: Joi.string().required().trim(),
          countryCode: Joi.string().required().trim(),
          password:     Joi.string().required().trim(),
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

let userForgotPassword = {
  method: 'POST',
  path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userForgotPassword',
  handler: function (request, reply) {
    var payloadData = request.payload;
    return Controller.UserController.userForgotPassword(payloadData).then(response =>{
      return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
  config: {
    description: 'Forgot password For user',
    tags: ['api', 'User'],
    validate: {
        payload: {
          countryCode: Joi.string().required().trim(),      
          contactNumber: Joi.string().required().trim()      
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

let userRegister = {
  method: 'POST',
  path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userRegister',
  handler: function (request, reply) {
    var payloadData = request.payload;
    return Controller.UserController.userRegister(payloadData).then(response =>{
      return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
  config: {
    description: 'Standard register for user',
    tags: ['api', 'User'],
    validate: {
        payload: {
          contactNumber: Joi.string().required().trim(),
          password:     Joi.string().required().trim(),
          firstName:     Joi.string().required().trim(),
          countryCode:     Joi.string().required().trim(),
          iso:     Joi.string().required().trim(),
          lastName:     Joi.string().required().trim(),
          email:     Joi.string().required().trim(),
            appVersion:      Joi.string().optional(),
          isPhoneVerified:     Joi.boolean().required(),
           loginType:     Joi.string().required().trim(),
          instagramUserName:     Joi.string().optional().allow(""),
          referalCode:     Joi.string().optional().allow(""),
          dateOfBirth:     Joi.date().required(),
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


let userGoogleRegister = {
  method: 'POST',
  path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGoogleRegister',
  handler: function (request, reply) {
    var payloadData = request.payload;
    return Controller.UserController.userGoogleRegister(payloadData).then(response =>{
      return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
  config: {
    description: 'Google register for user',
    tags: ['api', 'User'],
    validate: {
        payload: {
          firstName:     Joi.string().required().trim(),         
          lastName:     Joi.string().optional().allow(""),         
          email:     Joi.string().required().trim(),
           contactNumber: Joi.string().optional(),
               countryCode:     Joi.string().optional(),
                 appVersion:      Joi.string().optional(),
          googleId:     Joi.string().required().trim(),        
          loginType:     Joi.string().required().trim(),        
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


let userAppleRegister = {
  method: 'POST',
  path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userAppleRegister',
  handler: function (request, reply) {
    var payloadData = request.payload;
    return Controller.UserController.userAppleRegister(payloadData).then(response =>{
      return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
  config: {
    description: 'Google register for user',
    tags: ['api', 'User'],
    validate: {
        payload: {
          firstName:     Joi.string().optional().allow(""),        
          lastName:     Joi.string().optional().allow(""),         
          email:     Joi.string().optional().allow(""),
          appleId:     Joi.string().required().trim(),    
            appVersion:      Joi.string().optional(),    
          loginType:     Joi.string().required().trim(),        
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


let userFacebookRegister = {
  method: 'POST',
  path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userFacebookRegister',
  handler: function (request, reply) {
    var payloadData = request.payload;
    return Controller.UserController.userFacebookRegister(payloadData).then(response =>{
      return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
  config: {
    description: 'Google register for user',
    tags: ['api', 'User'],
    validate: {
        payload: {
          firstName:     Joi.string().required().trim(),  
           lastName:     Joi.string().optional().allow(""),           
          email:     Joi.string().required().trim(),
                 contactNumber: Joi.string().optional(),
                   appVersion:      Joi.string().optional(),
               countryCode:     Joi.string().optional(),
          fbId:     Joi.string().required().trim(),        
          loginType:     Joi.string().required().trim(),        
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


let userLogout = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userLogout',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userLogout(UserData).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess( response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'Logout user',
      tags: ['api', 'User'],
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


let userGetAllProducts = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetAllProducts',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetAllProducts(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Logout user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
      payload:{
        latitude:  Joi.number().optional().allow(0.0) ,
         selectedStoreId:  Joi.string().optional().allow(""),
        longitude:  Joi.number().optional().allow(0.0)
      } ,  
   //     headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};


let userGetAllCategories = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetAllCategories',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetAllCategories(UserData).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Logout user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {     
   //     headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};



let userGetAllProductsCategoryWise = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetAllProductsCategoryWise',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetAllProductsCategoryWise(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Logout user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          categoryId:     Joi.string().required().trim(),
          subCategoryId:  Joi.array().optional(),
          brandIds:  Joi.array().optional(),
          containerIds:  Joi.array().optional(),
          countryIds:  Joi.array().optional(),
          storeIds:  Joi.array().optional(),
          subCategoryTypesIds:  Joi.array().optional(),
          sortBy:  Joi.string().optional().allow(""),
          selectedStoreId:  Joi.string().optional().allow(""),
          priceFilter:     Joi.string().optional().allow(""),
          latitude:     Joi.number().optional().allow(0),
          longitude:     Joi.number().optional().allow(0), 
         tagIds:     Joi.array().optional()
          },   
   //     headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};
 
let userGetAllFilters = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetAllFilters',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetAllFilters(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Logout user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          categoryId:     Joi.string().required().trim(),
           latitude:     Joi.number().optional(),
          longitude:     Joi.number().optional(), 
          },   
   //     headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};



let userGetSubCategoriesAccToCategory = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetSubCategoriesAccToCategory',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetSubCategoriesAccToCategory(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Logout user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          categoryId:     Joi.string().required().trim()
          },   
   //     headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};




let userGetSubCateTypeAccToSubCategory = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetSubCateTypeAccToSubCategory',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetSubCateTypeAccToSubCategory(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Logout user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          subCategoryIds:     Joi.array().optional()
          },   
   //     headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};







let getProductDetail = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/getProductDetail',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.getProductDetail(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single product detail user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          productId:     Joi.string().required().trim(),
          isAddressSelected:     Joi.boolean().optional(),
            latitude:     Joi.number().optional(),
          longitude:    Joi.number().optional(),
          storeId:     Joi.string().required().trim()
          },   
   //     headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};






let userGetDeliveryFee = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetDeliveryFee',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetDeliveryFee(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get delivery fees product detail user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          storeId:     Joi.string().required().trim()
          },   
   //     headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};



let userAddDeliveryAddress = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userAddDeliveryAddress',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userAddDeliveryAddress(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get delivery fees product detail user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          address:     Joi.string().required().trim(),
          comment:     Joi.string().optional().allow(""),
          latitude:     Joi.number().required(),
          longitude:    Joi.number().required(),
          type:    Joi.string().optional(),
          storeId:    Joi.string().optional()
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





let userUpdateDeliveryAddress = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userUpdateDeliveryAddress',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userUpdateDeliveryAddress(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Update delivery address user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          address:     Joi.string().required().trim(),
          comment:     Joi.string().optional().allow(""),
          id:     Joi.string().required().trim(),
          latitude:     Joi.number().required(),
          longitude:    Joi.number().required()
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




let userGetDeliveryAddresses = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetDeliveryAddresses',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetDeliveryAddresses(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get delivery address user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          storeId:   Joi.string().optional()
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




let userDeleteDeliveryAddress = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userDeleteDeliveryAddress',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userDeleteDeliveryAddress(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get delivery address user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          id:  Joi.string().required().trim(),
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


let userDeleteSavedCard = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userDeleteSavedCard',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userDeleteSavedCard(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get delivery address user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          id:  Joi.string().required().trim()
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
let userSetDefaultCard = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userSetDefaultCard',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userSetDefaultCard(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get delivery address user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          id:  Joi.string().required().trim(),
              status: Joi.boolean().required()
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


let userGetProfile = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetProfile',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetProfile(UserData).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get profile of user',
      tags: ['api', 'User'],
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




let userGetDeliveryAddressDetail = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetDeliveryAddressDetail',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetDeliveryAddressDetail(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get delivery address user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          id:  Joi.string().required().trim(),
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


let userUpdateProfile = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userUpdateProfile',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userUpdateProfile(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Update profile of user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
           contactNumber: Joi.string().optional().allow(''),
          password:     Joi.string().optional().allow(''),
          firstName:     Joi.string().required().trim(),
          lastName:     Joi.string().optional().allow(""),
          email:     Joi.string().required().trim(),
        //   loginType:     Joi.string().required().trim(),
          instagramUserName:     Joi.string().optional().allow(""),
          dateOfBirth:     Joi.date().required()
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

let userUpdatePassword = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userUpdatePassword',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userUpdatePassword(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Update profile of user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          oldPassword:     Joi.string().required().trim(),
          newPassword:     Joi.string().required().trim()
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


let userGenerateOrder = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGenerateOrder',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGenerateOrder(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Create order of user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          products: Joi.array().required(),
          driverInstructions:     Joi.string().optional().allow(''),
          discountCode:     Joi.string().optional().allow(''),
          needToSaveCard:     Joi.boolean().optional(),
          discountPercentage:     Joi.number().optional().allow(0),
          discountAmount:     Joi.string().optional().allow(''),
          storeId:     Joi.string().required(),
          netAmount:     Joi.number().required(),
          subTotalAmount:     Joi.number().required(),
          isScheduled :     Joi.boolean().required(),
          deliveryFee:     Joi.number().optional().allow(0),
          driverTipPercentage:     Joi.number().optional().allow(0),
          driverTipAmount:    Joi.number().optional().allow(0),
          taxAmount:    Joi.number().optional().allow(0),
          freeDeliveryCode:     Joi.string().optional().allow(''),
          isFreeDeliveryCodeApplied:     Joi.boolean().required(),        
          isFreeDeliveryReferral:     Joi.boolean().optional().allow(false),
          freeDeliveryByUserIdReferal:     Joi.string().optional(),        
          scheduleDateTimeStart:     Joi.date().optional(),  
          scheduleDateTimeEnd:     Joi.date().optional(),  
          deliveryTimeSlot:     Joi.string().optional(),  
          userBillingAddressId:  Joi.string().optional().allow(''),      
          address:  Joi.string().optional().allow(''),               
          isFromApp:     Joi.number().optional(),
          latitude:     Joi.number().required(),
          longitude:    Joi.number().required(),
          paymentId:   Joi.string().optional().allow(''),
           paymentMethod:  Joi.string().optional().allow('')
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



let userGetOrders = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetOrders',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetOrders(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get orders of user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
                pageNumber:  Joi.number().optional().allow(0),
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





let userGetSingleOrderDetail = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetSingleOrderDetail',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetSingleOrderDetail(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
                 id:     Joi.string().required().trim(), 
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





let userGetAllFaqs = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetAllFaqs',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetAllFaqs(UserData).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
               
              },   
       // headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};




let userSendOtp = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userSendOtp',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userSendOtp(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
                   contactNumber:     Joi.string().required().trim(),
                   countryCode:     Joi.string().required().trim()
              },   
       // headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};

let userVerifyOtp = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userVerifyOtp',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userVerifyOtp(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
                 otp:     Joi.number().required(), 
                   userId:     Joi.string().optional(),
                   contactNumber:     Joi.string().required().trim(),
                   countryCode:     Joi.string().required().trim()
              },   
       // headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};

let userSearch = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userSearch',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userSearch(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
                 searchText:     Joi.string().required().trim(),
                  latitude: Joi.number().optional(),
               longitude: Joi.number().optional() 
              },   
       // headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};

let userGetAllTags = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetAllTags',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetAllTags(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
    
       // headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};
let userGetAllCountries = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetAllCountries',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetAllCountries(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
    
       // headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};


let userGetAllContainers = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetAllContainers',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetAllContainers(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
       payload:{
        categoryId: Joi.string().optional()
       },
       // headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};
let userGetAllStores = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetAllStores',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetAllStores(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
    
       // headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};

let userGetAllBrandsAccToCategory = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetAllBrandsAccToCategory',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetAllBrandsAccToCategory(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
            payload:{
              categoryId: Joi.string().trim().required()
            },
       // headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};

let userGetSavedCards = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetSavedCards',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetSavedCards(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
     pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
                
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

let userGetSubscribe = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetSubscribe',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetSubscribe(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
   //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
                email: Joi.string().required().trim(),
                type: Joi.string().optional(),
                deliveryAddress: Joi.string().optional()
              },   
     //   headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};



let userGetNotifications = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetNotifications',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetNotifications(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
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


let userCheckToken = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userCheckToken',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userCheckToken(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
     pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
            
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


let userAddRating = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userAddRating',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userAddRating(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
               orderId: Joi.string().required().trim(),
               ratingStar: Joi.string().optional().allow(0),  
               ratinglikeOption: Joi.string().optional().allow(''),             
               driverReview: Joi.string().optional().allow(''),
               orderSuggestion: Joi.string().optional().allow(''),
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



let userChangePassword = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userChangePassword',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userChangePassword(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
      //pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
               token: Joi.string().required().trim(),
               password: Joi.string().required().trim()
              },   
     // headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};




let userCheckDeliveryAddressesCart = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userCheckDeliveryAddressesCart',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userCheckDeliveryAddressesCart(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
               userBillingAddressId: Joi.string().required().trim(),
               storeId: Joi.string().required().trim()
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


let userCheckDeliveryAddressesHeader = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userCheckDeliveryAddressesHeader',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userCheckDeliveryAddressesHeader(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
     // pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
               latitude: Joi.number().required(),
               longitude: Joi.number().required(),
               storeId: Joi.string().required().trim()
              },   
   //   headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};


let userSetDeliveryAddressDefault = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userSetDeliveryAddressDefault',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userSetDeliveryAddressDefault(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
               id: Joi.string().required().trim(),
               status: Joi.boolean().required()
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



let userCheckDiscountCode = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userCheckDiscountCode',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userCheckDiscountCode(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Get single order detail of user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
               code: Joi.string().required().trim(),
               storeId: Joi.string().optional()
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




let userUpdateProfileImage= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userUpdateProfileImage',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userUpdateProfileImage(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'User'],
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





let userGetBlogs= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetBlogs',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetBlogs(UserData,request.payload).then(response =>{
         // console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'User'],
      //pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {   
      payload:{         
            categoryIds:  Joi.array().optional()        
      } , 
     //   headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};



let userGetBlogCategories= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetBlogCategories',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetBlogCategories(UserData,request.payload).then(response =>{
         // console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'User'],
      //pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {   
      payload:{         
              
      } , 
     //   headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};





let userGetBlogDetail= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetBlogDetail',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetBlogDetail(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'User'],
      //pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {   
      payload:{         
            id:  Joi.string().required().trim(),
             selectedStoreId:  Joi.string().optional().allow(""),
  latitude:     Joi.number().optional().allow(0),
          longitude:     Joi.number().optional().allow(0)       
      } , 
     //   headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};



let userAddBlogComment= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userAddBlogComment',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userAddBlogComment(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {   
      payload:{         
            id:  Joi.string().required().trim(),       
            commentText:  Joi.string().required().trim()        
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



let userAddDeleteBlogLike= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userAddDeleteBlogLike',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userAddDeleteBlogLike(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {   
      payload:{         
            id:  Joi.string().required().trim(),       
            status:  Joi.boolean().required()        
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



let userAddCartItem= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userAddCartItem',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userAddCartItem(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {   
      payload:{ 
            products:  Joi.object().required()        
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



let userGetCartItems= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetCartItems',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetCartItems(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'User'],
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




let userGetHomeBanner= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetHomeBanner',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetHomeBanner(UserData,request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'User'],
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




let userCheckSizeQuantityBeforeOrderPlace= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userCheckSizeQuantityBeforeOrderPlace',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userCheckSizeQuantityBeforeOrderPlace(request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: { 
       payload:{ 
            products:  Joi.array().required()        
      } ,  
    
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




let userCheckSizeQuantityForInventory= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userCheckSizeQuantityForInventory',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userCheckSizeQuantityForInventory(request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: { 
       payload:{ 
            productId:   Joi.string().required(),     
            storeId:   Joi.string().optional(),     
            sizeId:   Joi.string().required(),     
      } ,  
    
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



let userCheckASAPAndSchduleTime= {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userCheckASAPAndSchduleTime',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userCheckASAPAndSchduleTime(request.payload).then(response =>{
          console.log("response--------", response)
               return  UniversalFunctions.sendSuccess(response)  ; 
        }).catch(error => {   //console.log("errr=====",error);
            return UniversalFunctions.sendError(error) ;  
        });
    },
    config: {
      description: 'profile driver',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: { 
       payload:{ 
            storeId:  Joi.string().required(),
            date: Joi.date().required(),
            isAsap: Joi.boolean().optional()        
      } ,  
    
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




let userGetAllProductsCategoryWisePagination = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userGetAllProductsCategoryWisePagination',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userGetAllProductsCategoryWisePagination(request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Logout user',
      tags: ['api', 'User'],
    //  pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          categoryId:     Joi.string().required().trim(),
          subCategoryId:  Joi.array().optional(),
          brandIds:  Joi.array().optional(),
          containerIds:  Joi.array().optional(),
          countryIds:  Joi.array().optional(),
          storeIds:  Joi.array().optional(),
          subCategoryTypesIds:  Joi.array().optional(),
          sortBy:  Joi.string().optional().allow(""),
          selectedStoreId:  Joi.string().optional().allow(""),
          priceFilter:     Joi.string().optional().allow(""),
          latitude:     Joi.number().optional().allow(0),
          longitude:     Joi.number().optional().allow(0), 
            pageNumber:     Joi.number().optional().allow(0),
         tagIds:     Joi.array().optional()
          },   
   //     headers: Joi.object({'authorization': Joi.string().trim().required()}).options({allowUnknown: true}),
        failAction: UniversalFunctions.failActionFunction,  
      },      
      plugins: {
        'hapi-swagger': {
            responseMessages: APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
};
 



let userCreateClientSecret = {
    method: 'POST',
    path: '/'+process.env.API+'/'+process.env.API_VERSION+'/'+process.env.API_PLATFORM_US+'/userCreateClientSecret',
    handler: function (request, reply) {  
         let UserData = request.pre.verify || {};  
        return Controller.UserController.userCreateClientSecret(UserData,request.payload).then(response =>{
         return  UniversalFunctions.sendSuccess(response)  ;   
    }).catch(error => {  
               return UniversalFunctions.sendError(error) ;    
    });
  },
    config: {
      description: 'Logout user',
      tags: ['api', 'User'],
      pre: [{ method: checkAccessToken, assign: 'verify' }],
      validate: {  
        payload: {
          amount:     Joi.string().required().trim(),        
          pm:     Joi.string().optional()      
              
       //  stripeCustomerId:     Joi.string().required().trim()        
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
 




module.exports = [
  userLogin,
  userRegister,
  userGoogleRegister,
  userLogout,
  userGetAllProducts,
  userGetAllProductsCategoryWise,
  userGetAllCategories,
  userGetSubCategoriesAccToCategory,
  getProductDetail,
  userForgotPassword,
  userGetDeliveryFee,
  userAddDeliveryAddress,
  userGetDeliveryAddresses,
  userDeleteDeliveryAddress,
  userGetDeliveryAddressDetail,
  userUpdateDeliveryAddress,
  userGetProfile,
  userUpdateProfile,
  userGenerateOrder,
  userGetOrders,
  userGetSingleOrderDetail,
  userGetAllFaqs,
  userSendOtp,
  userVerifyOtp,
  userSearch,
  userGetAllTags,
  userGetSavedCards,
  userGetSubscribe,
  userSetDeliveryAddressDefault,
  userGetNotifications,
  userCheckToken,
  userAddRating,
  userChangePassword,
  userFacebookRegister,
  userCheckDeliveryAddressesCart,
  userCheckDiscountCode,
  userUpdateProfileImage,
  userGetBlogs,
  userGetBlogDetail,
  userAddBlogComment,
  userAddDeleteBlogLike,
  userAddCartItem,
userGetCartItems,
userGetHomeBanner,
userGetAllCountries,
userGetAllContainers,
userGetSubCateTypeAccToSubCategory,
userGetAllBrandsAccToCategory,
userGetAllStores,
userCheckDeliveryAddressesHeader,
userDeleteSavedCard,
userAppleRegister,
userCheckSizeQuantityBeforeOrderPlace,
userUpdatePassword,
userCheckASAPAndSchduleTime,
userGetAllFilters,
userGetAllProductsCategoryWisePagination,
userCheckSizeQuantityForInventory,
userCreateClientSecret,
userSetDefaultCard,
userGetBlogCategories
] 