'use strict';
 /*----------------------------------------------------------------------------------
   * @ file        : AppConstants.js
   * @ description : It includes all the Constant values using in the application.
   * @ author      : Baljinder singh
   * @ date        : 25/07/2020
-----------------------------------------------------------------------------------*/

let DEVICE_TYPES = {
    ANDROID:"ANDROID",
    IOS:"IOS",
    WEB:"WEB"
}

let SOCIAL_MODE_TYPE ={
    FACEBOOK:"FACEBOOK",
    GOOGLE:"GOOGLE",
    APPLE:"APPLE",
}

let ACCOUNT_STATUS ={
    ACTIVE:"ACTIVE",
    INACTIVE:"INACTIVE",
}

let PLAN_TYPE_MAIN ={
    RESIDENTIAL:"RESIDENTIAL",
    COMMERCIAL:"COMMERCIAL",
}


let PLAN_TYPE ={
    R1:"R1",
    R2:"R2",
    R3:"R3",
    C1:"C1",
    C2:"C2",
}


let FEE_TYPE ={
    QUARTERLY:"QUARTERLY",
    MONTHLY:"MONTHLY",
    BI_ANNUAL:"BI_ANNUAL",
    ANNUAL:"ANNUAL",
   }



let CANISTER_TYPE ={
    TYPE_A:"TYPE A",
    TYPE_B:"TYPE B"
}

let ORDER_TYPE ={
    FIRST_ORDER:"FIRST ORDER",
    REPEAT_ORDER:"REPEAT ORDER"
}

let CANISTER_STATUS ={
    GOOD:"GOOD",
    DAMAGED:"DAMAGED",
    STOLEN:"STOLEN",
    OTHERS:"OTHERS"
}
let CANISTER_SOURCE ={
    GRAY_GAAS:"GRAY GAAS",
    CUSTOMER:"CUSTOMER"
}
let CANISTER_WORK_STATUS ={
    IN_SERVICE:"IN SERVICE",
    AVAILABLE:"AVAILABLE"
}

let ORDER_STATUS ={
    PENDING:"PENDING",
    CONFIRMED:"CONFIRMED",
    PICKEDUP:"PICKED UP",
    ONTHEWAY:"ON THE WAY",
    CANCEL:"CANCELLED",
    DELIVERED:"DELIVERED"
}


let NOTIFICATION_TYPE ={
    PLAN_CHANGE:"PLAN_CHANGE",
    FEE_CHANGE:"FEE_CHANGE"
}




let LOGIN_MODE_TYPE ={
    FACEBOOK:"FACEBOOK",
    GOOGLE:"GOOGLE",
    STANDARD:"STANDARD",
     APPLE:"APPLE"
}


let  swaggerDefaultResponseMessages = [
    {code: 200, message: 'OK'},
    {code: 400, message: 'Bad Request'},
    {code: 401, message: 'Unauthorized'},
    {code: 404, message: 'Data Not Found'},
    {code: 500, message: 'Internal Server Error'}
];

let RIDE_STATUS = {
    PENDING     : "Pending",
    COMPLETED   : "Completed",
    CANCEL      : "Cancel",
    UPCOMING    : "Upcoming"
}

let RIDE_INVITATION_STATUS = {
    ALL            :  "All",
    CANCELED       :  "Canceled",
    INTERESTED     :  "Interested",
    ACCEPTED       :  "Accepted",   
    REJECTED       : "Rejected"
}

let SERVICE_TYPE ={
    PAID:"PAID",
    REWARD:"REWARD",
}





let STATUS_MSG = {
    SUCCESS: {
        CREATED: {
            statusCode:201,
            customMessage : 'Created Successfully',
            type : 'CREATED'
        },
        DEFAULT: {
            statusCode:200,
            customMessage : 'Success',
            type : 'DEFAULT'
        },
        DELETED: {
            statusCode:200,
            customMessage : 'Deleted Successfully',
            type : 'DELETED'
        },
        LOGOUT: {
            statusCode:200,
            customMessage : 'Logged Out Successfully',
            type : 'LOGOUT'
        },
        UPDATED: {
            statusCode:200,
            customMessage : 'Updated Successfully',
            type : 'UPDATED'
        },
    },
    ERROR: {
    	PAYMENT_ERROR: {
            statusCode:405,
            customMessage : 'Payment Error',
            type : 'PAYMENT_ERROR'
        },
        APP_ERROR: {
            statusCode:400,
            customMessage : 'Application Error',
            type : 'APP_ERROR'
        },
        CATEGORY_NAME_EXISTS: {
            statusCode:400,
            customMessage : 'Category name exists',
            type : 'CATEGORY_NAME_EXISTS'
        },
        COUNTRY_CODE_MISSING: {
            statusCode:400,
            customMessage : 'You forgot to enter the country code',
            type : 'COUNTRY_CODE_MISSING'
        },
        DB_ERROR: {
            statusCode:400,
            customMessage : 'DB Error.',
            type : 'DB_ERROR'
        },
        DEVICE_TOKEN_ALREADY_EXISTS:{
            statusCode:400,
            customMessage : 'Device Token already exists',
            type : 'DEVICE_TOKEN_ALREADY_EXISTS'

        },
         INVALID_DISCOUNT_CODE:{
            statusCode:400,
            customMessage : 'Invalid discount code!',
            type : 'INVALID_DISCOUNT_CODE'

        },
        DUPLICATE: {
            statusCode:400,
            customMessage : 'Duplicate entry',
            type : 'DUPLICATE'
        },
        EMAIL_EXISTS: {
            statusCode:400,
            customMessage : 'Email exists',
            type : 'EMAIL_EXISTS'
        },
        EMAIL_ALREADY_EXISTS: {
            statusCode:400,
            customMessage : 'Email already exists',
            type : 'EMAIL_ALREADY_EXISTS'
        },
         CLUSTER_ALREADY_EXISTS: {
            statusCode:400,
            customMessage : 'Cluster already exists',
            type : 'CLUSTER_ALREADY_EXISTS'
        },
          NOT_PERMITTED: {
            statusCode:400,
            customMessage : 'This order has been accepted by other driver.',
            type : 'NOT_PERMITTED'
        },  
           Del_ADD_EXIST: {
            statusCode:400,
            customMessage : 'Delivery address already exist!',
            type : 'Del_ADD_EXIST'
        },
        EMAIL_NOT_FOUND: {
            statusCode:400,
            customMessage : 'Email not found',
            type : 'EMAIL_NOT_FOUND'
        },
        ERROR_IN_EXECUTION:{
            statusCode:400,
            customMessage : 'ERROR INEXECUTION',
            type : 'ERROR_IN_EXECUTION'
        },
        FACEBOOK_ID_NOT_FOUND: {
            statusCode:400,
            customMessage : 'Facebook id not found',
            type : 'FACEBOOK_ID_NOT_FOUND'
        },
        FACEBOOK_ID_PASSWORD_ERROR: {
            statusCode:400,
            customMessage : 'Only one field should be filled at a time, either facebookId or password',
            type : 'FACEBOOK_ID_PASSWORD_ERROR'
        },
        IMP_ERROR: {
            statusCode:500,
            customMessage : 'Implementation Error',
            type : 'IMP_ERROR'
        },
        INCORRECT_OLD_PASS: {
            statusCode:400,
            customMessage : 'Incorrect old password',
            type : 'INCORRECT_OLD_PASS'
        },
        INCORRECT_PASSWORD_OTP: {
            statusCode:400,
            customMessage : 'Incorrect otp',
            type : 'INCORRECT_PASSWORD_OTP'
        }, 
   OTP_INVALID: {
            statusCode:400,
            customMessage : 'Invalid otp',
            type : 'OTP_INVALID'
        }, 

        INCORRECT_AREA: {
            statusCode:402,
            customMessage : 'Incorrect area',
            type : 'INCORRECT_AREA'
        },
        INCORRECT_CANISTER_ID: {
            statusCode:400,
            customMessage : 'Incorrect canister id',
            type : 'INCORRECT_CANISTER_ID'
        },
        INVALID_IMAGE_FORMAT: {
            statusCode:400,
            customMessage : 'Invalid image format',
            type : 'INVALID_IMAGE_FORMAT'
        },
         INVALID_PHONE_NUMBER: {
            statusCode:400,
            customMessage : 'There is no account linked with this phone number!',
            type : 'INVALID_PHONE_NUMBER'
        },
        INVALID_INVITATION_ID: {
            statusCode:400,
            customMessage : 'Invalid invitation id',
            type : 'INVALID_INVITATION_ID'
        },
        INVALID_BOOKING_ID: {
            statusCode:400,
            customMessage : 'Invalid booking id',
            type : 'INVALID_BOOKING_ID'
        },

        INVALID_LATITUDE_LOGITUDE: {
            statusCode:400,
            customMessage : "Please enter Valid latitude and longitude",
            type : 'INVALID_LATITUDE_LOGITUDE'
        },
        
        INVITATION_ALREADY_ACCEPTED: {
            statusCode:400,
            customMessage : 'Invalid invitation accepted',
            type : 'INVITATION_ALREADY_ACCEPTED'
        },
        INVITATION_ALREADY_CANCELED: {
            statusCode:400,
            customMessage : 'Invalid invitation canceled',
            type : 'INVITATION_ALREADY_CANCELED'
        },
        INCORRECT_PASSWORD: {
            statusCode:401,
            customMessage : 'Incorrect password',
            type : 'INCORRECT_PASSWORD'
        },
         CLOVER_MERCHANT_ID_EXIST: {
            statusCode:401,
            customMessage : 'Incorrect password',
            type : 'INCORRECT_PASSWORD'
        },
        INVALID_ACCESS_TOKEN: {
            statusCode:407,
            customMessage : 'Invalid access token',
            type : 'CLOVER_MERCHANT_ID_EXIST'
        },   

        INVALID_REST_PASSWORD_TOKEN: {
            statusCode:401,
            customMessage : 'Password reset token has been expired!',
            type : 'INVALID_REST_PASSWORD_TOKEN'
        },
        INVALID_COUNTRY_CODE: {
            statusCode:400,
            customMessage : 'Invalid country code, Should be in the format +52',
            type : 'INVALID_COUNTRY_CODE'
        }, 
        INVALID_EMAIL_PASSWORD: {
            statusCode:400,
            customMessage : 'Invalid email or password',
            type: 'INVALID_EMAIL_PASSWORD'
        },  
        NOT_VERIFIED: {
            statusCode:400,
            customMessage : 'Sorry, You are ID verification has failed',
            type: 'NOT_VERIFIED'
        }, 
             NOT_IN_STOCK: {
            statusCode:406,
            customMessage : 'Sorry, selected products are not in stock!',
            type: 'NOT_IN_STOCK'
        },
        INVALID_PHONE_NUMBER_AND_PASSWORD: {
            statusCode:400,
            customMessage : 'Invalid mobile number or password',
            type: 'INVALID_PHONE_NUMBER_AND_PASSWORD'
        },
        INVALID_ID: {
            statusCode:400,
            customMessage : 'Invalid Id Provided.',
            type : 'INVALID_ID'
        }, 
        INVALID_OTP: {
            statusCode:400,
            customMessage : 'Please enter correct verification code',
            type : 'INVALID_OTP'
        },
        INVALID_PHONE_NO_FORMAT: {
            statusCode:400,
            customMessage : 'Phone no. cannot start with 0',
            type : 'INVALID_PHONE_NO_FORMAT'
        },        
        INVALID_PROMO_CODE: {
            statusCode:400,
            customMessage : 'Invalid Promo Code',
            type : 'INVALID_PROMO_CODE'
        }, 
        USER_EMAIL_NOT_VERIFIED: {
            statusCode:400,
            customMessage : 'Email is not verified!',
            type : 'USER_EMAIL_NOT_VERIFIED'
        },
        INVALID_USER_PASS: {
            statusCode:401,
            type: 'INVALID_USER_PASS',
            customMessage : 'Invalid username or password'
        },
        MOBILE_NUMBER_ALREADY_EXISTS: {
            statusCode:400,
            customMessage : 'Phone number already exists',
            type : 'MOBILE_NUMBER_ALREADY_EXISTS'
        },
        NOT_FOUND: {
            statusCode:400,
            customMessage : 'User not found',
            type : 'NOT_FOUND'
        },    
         ALREADY_ACCEPTED: {
            statusCode:400,
            customMessage : 'Sorry, Order has been accepted by other driver!',
            type : 'ALREADY_ACCEPTED'
        },        
        PHONE_NO_EXIST: {
            statusCode:400,
            customMessage : 'Phone number already exists',
            type : 'PHONE_NO_EXIST'
        },
        TOKEN_NOT_VALID: {
            statusCode: 400,        
            customMessage: 'Invalid Token.',
            type: "TOKEN_NOT_VALID"
        },
        TOKEN_ALREADY_EXPIRED: {
            statusCode:401,
            customMessage : 'Token Already Expired',
            type : 'TOKEN_ALREADY_EXPIRED'
        },
        SOMETHING_WENT_WRONG: {
            statusCode:400,
            customMessage : 'Something went wrong. please try again after sometime.',
            type : 'SOMETHING_WENT_WRONG'
        },
        SUB_CATEGORY_NAME_EXISTS: {
            statusCode:400,
            customMessage : 'Subcategory name exists',
            type : 'SUB_CATEGORY_NAME_EXISTS'
        }, 
        UNAUTHORIZED: {
            statusCode:401,
            customMessage : 'This order has been accepted by other driver.',
            type : 'UNAUTHORIZED'
        }, 
        USEAR_IS_BLOCK: {
            statusCode:400,
            customMessage : 'User is blocked by admin.',
            type : 'USEAR_IS_BLOCK'
        },
        YOU_ALREADY_SEND_INTERESTED: {
            statusCode:400,
            customMessage : 'You have already sent invite',
            type : 'YOU_ALREADY_SEND_INVITE'
        },
         CANISTER_NOT_AVAILABLE: {
            statusCode:400,
            customMessage : 'No canister available!',
            type : 'CANISTER_NOT_AVAILABLE'
        },

    }

}
let JWT_KEY = "asedrftgyhujik"; 

let USER_ROLES = {
    SUPERADMIN   : 'SuperAdmin',
    ADMIN        : 'Admin',
    STORE_EMPLOYEE        : 'StoreEmployee',
    USER         : 'User',
    DELIVERY_TEAM : 'DeliveryTeam'
}


let APP_CONSTANTS = {
	DEVICE_TYPES            : DEVICE_TYPES,
	SOCIAL_MODE_TYPE        : SOCIAL_MODE_TYPE,
    LOGIN_MODE_TYPE      : LOGIN_MODE_TYPE,
	swaggerDefaultResponseMessages  :  swaggerDefaultResponseMessages,
	STATUS_MSG                      :  STATUS_MSG,
    USER_ROLES                      :  USER_ROLES,
    JWT_KEY                         :  JWT_KEY,
    SERVICE_TYPE                    :  SERVICE_TYPE,
    ACCOUNT_STATUS          : ACCOUNT_STATUS,
    PLAN_TYPE                 : PLAN_TYPE,
    FEE_TYPE                    :FEE_TYPE,
    CANISTER_TYPE                 : CANISTER_TYPE,
CANISTER_STATUS                       :CANISTER_STATUS,
CANISTER_SOURCE                 : CANISTER_SOURCE,
CANISTER_WORK_STATUS       :CANISTER_WORK_STATUS,
PLAN_TYPE_MAIN   : PLAN_TYPE_MAIN,
ORDER_STATUS:  ORDER_STATUS,
NOTIFICATION_TYPE:NOTIFICATION_TYPE,
ORDER_TYPE:ORDER_TYPE,
PASSWORD_RESET_LINK:PASSWORD_RESET_LINK


}


module.exports = APP_CONSTANTS