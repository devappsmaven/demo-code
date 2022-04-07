const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(Mongoose);
const Config = require('../Config');
const Schema = Mongoose.Schema;
const APP_CONSTANTS = Config.APP_CONSTANTS;
var Float = require('mongoose-float').loadType(Mongoose,2);


const UserOrder = new Schema({
  orderId: {type: String, trim: true,default:""}, 
  serialNumberOrder   : {type: Number, unique: true, sparse: true},
  userId: {type: Schema.Types.ObjectId , ref: 'user'}, 
  taxAmount: {type: Float, default:0.00},  
  subTotalAmount: {type: Float, default:0.00},  
  storeAmount: {type: Float, default:0.00},  
  processingFee: {type: Float, default:0.00},  
  smugglerTax: {type: Float, default:0.00},  
  storeTax: {type: Float, default:0.00},  
  deliveryFee: {type: Float, default:0.00}, 
  driverTipPercentage: {type: Float, default:0.00},  
  driverTipAmount: {type: Float, default:0.00},  
  handlingFee: {type: Float, default:0.00},   
  netAmount: {type: Float, default:0.00},    
  paymentReferenceId: {type: String, default:''}, 
  cardToken: {type: String, default:''}, 
  connectAccountId: {type: String, default:''}, 
  transferId: {type: String, default:''}, 
  transferAccountId: {type: String, default:''}, 
  transactionDetail: {type: Object, default:{}}, 
   userLocation: {
    type: {type: String, enum: "Point", default: "Point"},
    coordinates: {type: [Number]}
  },
   driverLocation: {
    type: {type: String, enum: "Point", default: "Point"},
    coordinates: {type: [Number]}
  },
  transferDetail: {type: Object, default:{}},  
  refundDetail: {type: Object, default:{}},  
  paymentTransactionId: {type: String, default:''}, 
  products: [{
    productId: {type: Schema.Types.ObjectId , ref: 'product'},
    storeId: {type: Schema.Types.ObjectId , ref: 'store'},
    quantity: {type: Number, default:0},
    productPrice: {type: Float, default:0.00},  
    productName: {type: String, trim: true,default:""}, 
    productImage: {type: String, trim: true,default:""}, 
    createdAt: {type: Date, default: Date.now,required: true},
    updatedAt: {type: Date, default: Date.now,required: true},
    allSizes:{
  attributeId:{type: Schema.Types.ObjectId , ref: 'attribute'},
   attributeValue: {type: String, trim: true,sparse: true,default:""},
     productPackage: {type: String, trim: true,sparse: true,default:""},
      price: {type: Number, trim: true,sparse: true,default:0},
       image: {type: String,default:""},
        sizeSku: {type: String, trim: true,sparse: true,default:""},
       _id: {type:  Schema.Types.ObjectId }
 },   
  }],
  paymentGateway: {type: String, default:''}, 
  userBillingAddressId: {type: Schema.Types.ObjectId , ref: 'userAddress'},
  deliveryTeamId: {type: Schema.Types.ObjectId , ref: 'deliveryTeam'},
  rejectByDeliveryTeamId: [{type: Schema.Types.ObjectId , ref: 'deliveryTeam'}],
   isDeliveryTeamAccepted: {type: Boolean, default: false},
     deliveryTeamAcceptedAt: {type: Date},
  storeId: {type: Schema.Types.ObjectId , ref: 'store'},
  orderStatus: { type: String, enum: [
      APP_CONSTANTS.ORDER_STATUS.PENDING,
      APP_CONSTANTS.ORDER_STATUS.CONFIRMED,       
      APP_CONSTANTS.ORDER_STATUS.PICKEDUP,       
      APP_CONSTANTS.ORDER_STATUS.ONTHEWAY,       
      APP_CONSTANTS.ORDER_STATUS.CANCEL,       
      APP_CONSTANTS.ORDER_STATUS.DELIVERED
     ],
     default:   APP_CONSTANTS.ORDER_STATUS.PENDING, 
   } ,
  orderStatusChangedBy: { type: String, enum: [
      APP_CONSTANTS.USER_ROLES.ADMIN,
      APP_CONSTANTS.USER_ROLES.SUPERADMIN,
      APP_CONSTANTS.USER_ROLES.DELIVERY_TEAM,
      ""
     ],
     default:   ""
   } ,
  isReminderNotificationSentToDriver: {type: Boolean, default: false},
  isTextEmailEnabled: {type: Boolean, default: false},
  isFreeDeliveryCodeApplied: {type: Boolean, default: false},
  freeDeliveryCode: {type: String, default:''}, 


  discountCode: {type: String, default:''}, 
  discountAmount: {type: Float, default:0.00},  
  refundAmount: {type: Float, default:0.00},  
  discountPercentage: {type: Number, default:0}, 
 timeZone: {type: String, trim: true,sparse: true,default:""},
  offSet: {type: Number, default: -300},


 freeDeliveryByUserIdReferal: {type: Schema.Types.ObjectId , ref: 'user'}, 
  driverInstructions: {type: String, default:''}, 
  deliveryTimeSlot: {type: String, default:''}, 
  isScheduled: {type: Boolean, default: false},
  paymentType: {type: String, default: "Cash"},
  scheduleDateTimeStart: {type: Date},
  scheduleDateTimeEnd: {type: Date},
  isDeleted: {type: Boolean, default: false},
  isFreeDeliveryReferral: {type: Boolean, default: false},
  isVerifiedDelivery: {type: Boolean, default: false},
  isRated: {type: Boolean, default: false},
  ratingStar: {type: String, default:''}, 
  deliveredPersonUserName: {type: String, default:''}, 
  deliveredPersonDateOfBirth: {type: Date},
  ratinglikeOption: {type: String, default:''}, 
  driverReview: {type: String, default:''}, 
  orderSuggestion: {type: String, default:''}, 
  ratingDateTime: {type: Date},
  orderConfirmedAt: {type: Date},
  orderInprogressAt: {type: Date},
  orderPickedUpAt: {type: Date},
  orderOnTheWayAt: {type: Date},
  orderDeliveredAt: {type: Date},
  orderEstimateDeliveryDate: {type: Date},
  createdAt: {type: Date, default: Date.now,required: true},
  updatedAt: {type: Date, default: Date.now,required: true},
});
UserOrder.plugin(AutoIncrement, {inc_field: 'serialNumberOrder'});
//UserFeedback.index({userId:1});
module.exports = Mongoose.model('userOrder', UserOrder);