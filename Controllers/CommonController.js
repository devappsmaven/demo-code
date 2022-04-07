
const Service = require('../Services');
const Models  = require('../Models');
const Config = require('../Config');
const UniversalFunctions = require('../Utils/UniversalFunctions');

const APP_CONSTANTS   =  Config.APP_CONSTANTS;
const DEVICE_TYPES    =  APP_CONSTANTS.DEVICE_TYPES;
const ALLOWED_DOC_EXT_DRIVER    =  APP_CONSTANTS.ALLOWED_DOC_EXT_DRIVER;
const STATUS_MSG      =  APP_CONSTANTS.STATUS_MSG;
const USER_ROLES      =  APP_CONSTANTS.USER_ROLES;
const DRIVER_DOCUMENT_TYPES  = APP_CONSTANTS.DRIVER_DOCUMENT_TYPES;
const DOCUMENT_IMAGES_PREFIX = APP_CONSTANTS.DOCUMENT_IMAGES_PREFIX;


const Mongoose = require('mongoose');
const promiseBluebird = require('bluebird');
const _ = require('underscore');
var fs = require('fs');
const Path = require('path');
const moment = require('moment');
const nodemailer = require('nodemailer');
const readFilePromise = require('fs-readfile-promise');
var fsExtra = require('fs-extra');

const uploadFiles  = async(document,imagePrefix="profileImage_")=>{
    try{
        
      let dataImageArray=[]; 
      if(Array.isArray(document)==true){
        for(var i=0;i<document.length;i++){
          let imageList= await UniversalFunctions.uploadDocumentOnLocalMachine(document[i],{_id:1},imagePrefix+i+"_");  
          dataImageArray.push(imageList);
        }
      }else{
        let imageList= await UniversalFunctions.uploadDocumentOnLocalMachine(document,{_id:1},imagePrefix);
        dataImageArray.push(imageList);
      };  //console.log("dataImageArray===",dataImageArray);
      return dataImageArray;
    }catch(err){
    	console.log(err)
       throw err;
    }
}

const uploadFilesCSV  = async(document,storeName,storeId,imagePrefix="profileImage_")=>{
    try{
        
      let dataImageArray=[]; 
    
        let imageList= await UniversalFunctions.uploadDocumentOnLocalMachineCSV(document,storeName,storeId,imagePrefix);
        dataImageArray.push(imageList);
        //console.log("dataImageArray===",dataImageArray);
      return dataImageArray;
    }catch(err){
        console.log(err)
       throw err;
    }
}



/*
const uploadImageToS3=async function(file){
    var AWS = require('aws-sdk')
 var timeStamp = Math.floor(Date.now() / 1000);
  AWS.config.update({
                    "accessKeyId": "AKIA2FFW7A6WZ6EXEBU5",
                    "secretAccessKey": "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",
                    "region": "us-west-2"
                });
                var s3 = new AWS.S3();
               var filename=file.name;
               // var extension=filename.substr(filename.lastIndexOf(".") + 1);
                var params = {
                    Bucket: 'smuggler',
                    Key: "123",
                     ContentType: file.type,
                    Body: file,
                    ACL: 'public-read'
                };     
                 return new Promise((resolve, reject) => {
         s3.putObject(params, function (err, res) {
        if (err) {
            console.log("errrrrrrrrrrrrrrrr",err)
            reject(err)
        }; //console.log("fieSavePath",fieSavePath);
            resolve(res);
        })   
               })
}
*/


const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    "accessKeyId": "####",
                    "secretAccessKey": "####"
});


const BUCKET_NAME = '###';


const uploadImageToS3 = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'cat.jpg', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            console.log(err)
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};




function saveFile(fileData, path, callback) {
    fsExtra.copy(fileData, path, callback);
}




module.exports ={
  uploadFiles                  : uploadFiles,
  uploadImageToS3                  :uploadImageToS3,
  uploadFilesCSV:uploadFilesCSV
  
}