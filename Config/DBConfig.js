


'use strict';
const MongoClient = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

MongoClient.set("useNewUrlParser", true);
MongoClient.set("useFindAndModify", true);
MongoClient.set("useCreateIndex", true);
MongoClient.set("useUnifiedTopology", true);
MongoClient.set('useFindAndModify', false);
 
const url = '######';  

let mongodb = (payloadData) => { console.log("here");
  return new Promise(async (resolve, reject) => {
      try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
          console.log('*************************************************mongodb db connected sucessfully*************************************************');
          return resolve(client);
      }
      catch (error) {
          console.log(error, '====db connection Error==');
          return reject(error);
      }
  })
};
mongodb();


module.exports ={
  
}; 


