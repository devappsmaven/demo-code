const Joi      = require('joi');
//var async = require('async');
const MD5      = require('md5');
const Boom     = require('boom');
const jwt      = require('jsonwebtoken');
const CONFIG   = require('../Config');
const APP_CONSTANTS   =  CONFIG.APP_CONSTANTS;
const STATUS_MSG      = APP_CONSTANTS.STATUS_MSG;
const ERROR           = STATUS_MSG.ERROR
const SUCCESS         = STATUS_MSG.SUCCESS

const UniversalFunctions = require('./UniversalFunctions');
const Service = require('../Services');
const Models  = require('../Models');

const async = require("async");
const Mongoose = require('mongoose');



bootstrapAdmin = async ()=> {
    let adminData = {
        email: 'baljinder@gmail.com',
        password: 'qwerty@123',//321321
        name: 'Sidhu',
        //phoneNo:
    };

    try{
        let criteria = {
          email:adminData.email
        }
        let checkAdminData = await Service.AdminService.getData(criteria, {}, {lean:true}); 
        if(checkAdminData.length>0){
          return true;
        }
        adminData.password= UniversalFunctions.encryptedPassword(adminData.password);
        let Admin = await Service.AdminService.InsertData(adminData);
        return Admin; 
    }catch(err){  
          throw err;
    }     
};

module.exports = {
  //insertResturantData:insertResturantData,
  bootstrapAdmin:bootstrapAdmin,
}