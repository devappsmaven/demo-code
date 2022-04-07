const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(Mongoose);
const Config = require('../Config');
const Schema = Mongoose.Schema;
const APP_CONSTANTS = Config.APP_CONSTANTS;

const User = new Schema({
  customerId: {type: String, trim: true,default:""},
  serialumber   : {type: Number, unique: true, sparse: true},
  firstName: {type: String, trim: true,default:""},
  lastName: {type: String, trim: true,default:""},
  email: {type: String,trim: true,index: true,sparse: true,default:""},
  dateOfBirth: {type: Date},
  googleId: {type: String, trim: true,sparse: true,default:""},
  appleId: {type: String, trim: true,sparse: true,default:""},
  fbId: {type: String, trim: true,sparse: true,default:""},
  instagramUserName: {type: String, trim: true,sparse: true,default:""},
  password: {type: String, trim: true,sparse: true,default:""},
  zipCode: {type: String, trim: true,sparse: true,default:""},
    iso: {type: String, trim: true,sparse: true,default:""},
    countryCode: {type: String, trim: true,sparse: true,default:""},
  contactNumber: {type: String, trim: true,sparse: true,default:""},
    deliveryTeamIds: [{type: Schema.Types.ObjectId , ref: 'deliveryTeam'}],
    favouriteProductIds: [{type: Schema.Types.ObjectId , ref: 'product'}],
  address: {type: String, trim: true,sparse: true,default:""},
  city: {type: String, trim: true,sparse: true,default:""},
  state: {type: String, trim: true,sparse: true,default:""},
  country: {type: String, trim: true,sparse: true,default:""},
  profileImage: {type: String, trim: true,sparse: true,default:""},
  loginType: {
    type: String, enum: [
      APP_CONSTANTS.LOGIN_MODE_TYPE.STANDARD,
      APP_CONSTANTS.LOGIN_MODE_TYPE.FACEBOOK,       
      APP_CONSTANTS.LOGIN_MODE_TYPE.GOOGLE,       
      APP_CONSTANTS.LOGIN_MODE_TYPE.APPLE,       
    ],
    default:APP_CONSTANTS.USER_ROLES.STANDARD
  },
  deviceType: {
    type: String, enum: [
      APP_CONSTANTS.DEVICE_TYPES.IOS,
      APP_CONSTANTS.DEVICE_TYPES.ANDROID ,      
      APP_CONSTANTS.DEVICE_TYPES.WEB       
    ],
    default:APP_CONSTANTS.DEVICE_TYPES.WEB
  },
  location: {
    type: {type: String, enum: "Point", default: "Point"},
    coordinates: {type: [Number]}
  },
  accountStatus: { type: String, enum: [
      APP_CONSTANTS.ACCOUNT_STATUS.ACTIVE,
      APP_CONSTANTS.ACCOUNT_STATUS.INACTIVE,       
     ],
    default: APP_CONSTANTS.ACCOUNT_STATUS.ACTIVE,
   },
  stripeCustomerId: {type: String, trim: true,sparse: true,default:""},  
  stripeConnectId: {type: String, trim: true,sparse: true,default:""},  
  appVersion: {type: String, trim: true,sparse: true,default:""},  
  verifyOtp: {type: Number,default:0}, 

  referedBy: {type: Schema.Types.ObjectId , ref: 'user'},  
  referalCode: {type: String, trim: true,sparse: true,default:""},
  referalCount:  {type: Number, default:0}, 
  
  walletPoints: {type: Number, default:0},
  deviceId: {type: String, trim: true,sparse: true},  
  passwordResetToken: {type: String, trim: true,sparse: true},  
  deviceToken: {type: String, trim: true,sparse: true},
  accessToken: {type: String, trim: true, unique: true, sparse: true},
  isFreeDelivery: {type: Boolean, default: false},
  freeDeliveryCount:  {type: Number, default:0}, 
  isEmailVerified: {type: Boolean, default: false},
  isPhoneVerified: {type: Boolean, default: false},
  isDeleted: {type: Boolean, default: false},
  isBlocked: {type: Boolean, default: false},
  isPasswordResetByUser: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now,required: true},
  updatedAt: {type: Date, default: Date.now,required: true},
});
User.plugin(AutoIncrement, {inc_field: 'serialumber'});
User.index({email:1});
module.exports = Mongoose.model('user', User);