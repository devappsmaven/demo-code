const BaseJoi                  =  require('joi');
const Extension                =  require('joi-date-extensions');
const Joi                      =  BaseJoi.extend(Extension);
const Boom                     =  require('boom');
const MD5                      =  require('md5');
const jwt                      =  require('jsonwebtoken');
const HapiJWT                  =  require('hapi-jsonwebtoken');
const fsExtra                  =  require('fs-extra');
const timezoner                =  require('timezoner');
const requestPromise           =  require('request-promise');
const dotenv = require('dotenv');
dotenv.config();

const CONFIG                   =  require('../Config');
const Service                  =  require('../Services');
const APP_CONSTANTS            =  CONFIG.APP_CONSTANTS;
const STATUS_MSG               =  APP_CONSTANTS.STATUS_MSG;
const SUCCESS                  =  STATUS_MSG.SUCCESS;
const ERROR                    =  STATUS_MSG.ERROR

const Path = require('path');
const fs                       =  require('fs');


const ObjectId = require('mongodb').ObjectID;

let sendSuccess = function (response) {
      return { response};
};



let sendError = function (data) { //console.log("===sendError===",data);
   if (typeof data == 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('customMessage')) {
        let errorToSend= {};
        if( data.statusCode==401){  console.log("===sendError===22",data);
           errorToSend = Boom.unauthorized(data.customMessage, data.statusCode);
        }else{   
          errorToSend = Boom.badRequest(data.customMessage, data.statusCode);
        }; 
        errorToSend.output.payload.responseType = data.type; //console.log("===sendError===26",errorToSend);
       return errorToSend;
    } else {  
        const error = Boom.badRequest(data);
        error.reformat();
       return error;
   }
};


let failActionFunction = function (request, h, error) { //console.log("===failActionFunction======error===",JSON.stringify(error));
    let customErrorMessage ="";
    if (typeof(error) != "undefined" &  error.output.payload.message.indexOf("[") > -1) {
        customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf("["));
    } else {
        customErrorMessage = error.output.payload.message;
    }
    customErrorMessage = customErrorMessage.replace(/"/g, '');
    customErrorMessage = customErrorMessage.replace('[', '');
    customErrorMessage = customErrorMessage.replace(']', '');
    error.output.payload.message = customErrorMessage;
    delete error.output.payload.validation
    throw error;
};

let generateAuthToken = (userData,type="")=>{
    if(type == "user")
    {
    var expTime = 999999999999999999999999999631881195850
}
else
{
     var expTime = 9999999999999999999999999999999631881195850
}

    let jwtToken =   jwt.sign({ exp: expTime, data: userData}, APP_CONSTANTS.JWT_KEY);  console.log("jwtToken",jwtToken);
    //return callbackRoute(null,jwtToken);
    return jwtToken;
}

let encryptedPassword = (password,)=>{
    let dbPassword = MD5(password);
    return dbPassword;
}

let generateRandomString= (length)=>{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

let checkDeviceTokenAndDelete = async (deviceData) => {
  try{
    let criteria = {deviceType:deviceData.deviceType,deviceToken:deviceData.deviceToken};
    let projection = {_id:1};
    let getDeviceToken    =   await Service.UserService.getData(criteria,projection,{lean:true});
    if(getDeviceToken.length>0){
      let updateCriteria = {_id:getDeviceToken[0]._id}
      let dataToSet  = {$unset:{deviceToken:1}}
      let finalData    = await Service.UserService.updateData(updateCriteria,dataToSet,{new:true,lean:true});
    } 
    return;
  }catch(err){ console.log("==========catch=======errrrr====",err);
    throw err;
  }
}


let  checkCustomerToken= async (payloadData)=> {  
    let criteria  ={
       email:payloadData.email,
       _id:payloadData._id,
     //  accessToken:payloadData.accessToken
    }; //console.log("checkCustomerToken=====criteria",criteria);
    let projection= {password:0,__v:0};
    try {
        let userData    =   await Service.UserService.getData(criteria,projection,{lean:true}); // console.log("userData",userData);
        if(userData.length==0){
         throw ERROR.INVALID_ACCESS_TOKEN;
        }
        return userData[0];
    }catch(err){ console.log("err",err);
     throw err;
    }
};

let  checkDTToken= async (payloadData)=> {  
    let criteria  ={
       email:payloadData.email,
       _id:payloadData._id,
       accessToken:payloadData.accessToken
    }; //console.log("checkCustomerToken=====criteria",criteria);
    let projection= {password:0,__v:0};
    try {
        let userData    =   await Service.DeliveryTeamService.getData(criteria,projection,{lean:true}); // console.log("userData",userData);
        if(userData.length==0){
         throw ERROR.INVALID_ACCESS_TOKEN;
        }
        return userData[0];
    }catch(err){ console.log("err",err);
     throw err;
    }
};




let  checkAdminToken= async (payloadData)=> {  
    let criteria  ={
       email:payloadData.email,
       _id:payloadData._id,
       accessToken:payloadData.accessToken
    }; //console.log("checkCustomerToken=====criteria",criteria);
    let projection= {password:0,__v:0};
    try {
        let userData    =   await Service.StoreAdminService.getData(criteria,projection,{lean:true}); // console.log("userData",userData);
        if(userData.length==0){
         throw ERROR.INVALID_ACCESS_TOKEN;
        }
        return userData[0];
    }catch(err){ console.log("err",err);
     throw err;
    }
};


let  checkStoreEmpToken= async (payloadData)=> {  
    let criteria  ={
       email:payloadData.email,
       _id:payloadData._id,
       accessToken:payloadData.accessToken
    }; //console.log("checkCustomerToken=====criteria",criteria);
    let projection= {password:0,__v:0};
    try {
        let userData    =   await Service.StoreEmployeeService.getData(criteria,projection,{lean:true}); // console.log("userData",userData);
        if(userData.length==0){
         throw ERROR.INVALID_ACCESS_TOKEN;
        }
        return userData[0];
    }catch(err){ console.log("err",err);
     throw err;
    }
};


let  checkSuperAdminToken= async (payloadData)=> {  
    let criteria  ={
       email:payloadData.email,
       _id:payloadData._id,
       accessToken:payloadData.accessToken
    }; //console.log("checkCustomerToken=====criteria",criteria);
    let projection= {password:0,__v:0};
    try {
        let userData    =   await Service.SuperAdminService.getData(criteria,projection,{lean:true}); // console.log("userData",userData);
        if(userData.length==0){
         throw ERROR.INVALID_ACCESS_TOKEN;
        }
        return userData[0];
    }catch(err){ console.log("err",err);
     throw err;
    }
};



let getTokenFromDB = async (request,res, next) => { console.log("======================getTokenFromDB==init===109================");
    var token = (request.payload != null && (request.payload.authorization)) ? request.payload.authorization : ((request.params && request.params.authorization) ? request.params.authorization : request.headers['authorization']);
    var userData = null;
    console.log("======token================",APP_CONSTANTS.JWT_KEY,token);
    var usertype, userId, criteria; //console.log("token==1",token);
    try{ 
        let decoded = jwt.verify(token, APP_CONSTANTS.JWT_KEY);
      console.log("token==1",decoded);
        if(decoded.data.role==APP_CONSTANTS.USER_ROLES.SUPERADMIN){          
            let userData = decoded.data;
            userData.accessToken = token;
            let checkTokenData = await checkSuperAdminToken(userData);
            return checkTokenData; 
        }else if(decoded.data.role==APP_CONSTANTS.USER_ROLES.ADMIN){          
            let userData = decoded.data;
            userData.accessToken = token;
            let checkTokenData = await checkAdminToken(userData);
            return checkTokenData; 
        }else if(decoded.data.role==APP_CONSTANTS.USER_ROLES.USER){ 
            let userData = decoded.data;
            userData.accessToken = token;
            let checkTokenData = await checkCustomerToken(userData);
            return checkTokenData;              
        }else if(decoded.data.role==APP_CONSTANTS.USER_ROLES.DELIVERY_TEAM){
            let userData = decoded.data;
            userData.accessToken = token;
            let checkTokenData = await checkDTToken(userData); 
            return checkTokenData;            
        }else if(decoded.data.role==APP_CONSTANTS.USER_ROLES.STORE_EMPLOYEE){
            let userData = decoded.data;
            userData.accessToken = token;
            let checkTokenData = await checkStoreEmpToken(userData); 
            return checkTokenData;            
        }
       

    }catch(err){ 
        console.log("==========catch=======errrrr====",err); 
        console.log("==========catch=======errrrr====",err); 
        console.log("==========catch=======errrrr====",err); 
        console.log("==========catch=======errrrr====",err); 
        console.log("==========catch=======errrrr====",err); 
        console.log("==========catch=======errrrr====",err); 
        console.log("==========catch=======errrrr====",err); 
        console.log("==========catch=======errrrr====",err); 
        console.log("==========catch=======errrrr====",err); 
        console.log("==========catch=======errrrr====",err); 
        return sendError(ERROR.INVALID_ACCESS_TOKEN);
        next();
    }
};

var AWS = require('aws-sdk')

let uploadDocumentOnLocalMachine = async (ImageData,UserData,filePrefix)=>{
     var timeStamp = Math.floor(Date.now() / 1000);
  AWS.config.update({
                    "accessKeyId": "##",
                    "secretAccessKey": "##/el//DPMv2DU7",
                    "region": "us-west-2"
                });
                var s3 = new AWS.S3();
                let ext = ImageData.hapi.filename.substr(ImageData.hapi.filename.lastIndexOf('.') + 1);
    let filename = filePrefix+generateRandomString(10)+"_"+Math.floor(Date.now() / 1000) +"_"+UserData._id+ "." + ext.substr(0, ext.length);
             console.log("ext", ext)
             console.log("filename", filename)
             console.log("ImageData.type", ImageData.type)
                var extension=filename.substr(filename.lastIndexOf(".") + 1);
                console.log("extension", extension)
                var params = {
                    Bucket: '##',
                    Key: timeStamp+"."+extension,
                    ContentType: "image/"+extension,
                    Body: ImageData,
                    ACL: 'public-read'
                };     
                 return new Promise((resolve, reject) => {
         s3.upload(params, function (err, res) {
        if (err) {
            reject(err)
        }; console.log("res",res);
            resolve(res.key);
        })   
               })



/*    let ext = ImageData.hapi.filename.substr(ImageData.hapi.filename.lastIndexOf('.') + 1);
    let filename = filePrefix+generateRandomString(10)+"_"+Math.floor(Date.now() / 1000) +"_"+UserData._id+ "." + ext.substr(0, ext.length);
    let fieSavePath= Path.join('./uploads', filename);
    return new Promise((resolve, reject) => {
        fs.writeFile(fieSavePath,ImageData['_data'], err => {
        if (err) {
            reject(err)
        }; 
          console.log("fieSavePath", fieSavePath)
        fieSavePath= fieSavePath.substring(8);
              console.log("fieSavePath", fieSavePath)
            resolve(fieSavePath);
        })
    })
*/

}

async function savePath(obj)
{
    let remove= await Service.StoreInventoryRecordsService.removeData({fileName: obj.fileName});
     let userData    =   await Service.StoreInventoryRecordsService.InsertData(obj);

}


let uploadDocumentOnLocalMachineCSV = async (ImageData,storeName,storeId,filePrefix)=>{
    

    let ext = ImageData.hapi.filename.substr(ImageData.hapi.filename.lastIndexOf('.') + 1);
    let filename = ImageData.hapi.filename;
    let d = new Date();
    let year= d.getFullYear();
    let month= d.getMonth() + 1;      
    let fieSavePath= Path.join('./uploads/'+storeName+'/'+year+'/'+month+'/', filename);
    return new Promise((resolve, reject) => {
        fs.writeFile(fieSavePath,ImageData['_data'], err => {
        if (err) {
            reject(err)
        }; 
          console.log("fieSavePath", fieSavePath)
        fieSavePath= fieSavePath.substring(8);   
       savePath({storeId: storeId, fileName:filename, folderPath: fieSavePath })      
            resolve(fieSavePath);
        })
    })


}



//sendMessageConceptsguru("+91","9988842200","hello node");

module.exports = {
  sendError                     :  sendError,
  checkDeviceTokenAndDelete     :  checkDeviceTokenAndDelete,
  generateRandomString          :  generateRandomString,
  encryptedPassword             :  encryptedPassword,
  generateAuthToken             :  generateAuthToken,
  sendSuccess                   :  sendSuccess,
  failActionFunction            :  failActionFunction,
  getTokenFromDB                :  getTokenFromDB,  
  uploadDocumentOnLocalMachine  :  uploadDocumentOnLocalMachine,
  uploadDocumentOnLocalMachineCSV:uploadDocumentOnLocalMachineCSV,
 

}