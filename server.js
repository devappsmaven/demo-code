


'use strict';

const dotenv = require('dotenv');
dotenv.config();


const Hapi        = require('hapi');

const HapiSwagger = require('hapi-swagger');
const Inert       = require('inert');
//const HapiError   = require('hapi-error');
const Vision      = require('vision')
const Pack = require('./package');
var cors = require('cors');

const Routes = require('./Routes');
const UniversalFunctions = require('./Utils/UniversalFunctions');
const Bootstrap = require('./Utils/BootStrap');

var server = new Hapi.Server({ port: process.env.PORT, host: 'localhost' });

var io = require('socket.io')(server.listener);

const HapiCron = require('hapi-cron');
const init = async () => {
    try {
        const server = Hapi.server({  
            port: process.env.PORT,
            routes: {
        cors:  {
    origin: ['*'] 
     } 
    }
            //host: '127.0.0.1'
        });



        const swaggerOptions = {
            info: {
                title: 'API Documentation ($$$)',
                version: Pack.version,
            },
           // grouping: 'tags'
        };
  /*      await server.register(Inert);
        await server.register(require('vision'));
        await server.register(require('hapi-error'));
        
        await server.register({
            plugin: HapiSwagger,
            options: swaggerOptions
        });
     */


       await server.register([
    require('inert'),
    require('vision'),
    {
      plugin: require('hapi-swaggered'),
      options: swaggerOptions
    },
    {
      plugin: require('hapi-swaggered-ui'),
      options: {
        title: '### REST APIs',
        path: '/docs',
        basePath: '/######/',
        authorization: {
          field: 'apiKey',
          scope: 'query', // header works as well
          // valuePrefix: 'bearer '// prefix incase
          defaultValue: 'demoKey',
          placeholder: 'Enter your apiKey here'
        },
        swaggerOptions: {
          validatorUrl: null
        }
      }
    }
    ,
    {
 plugin: HapiCron,  
            options: {
                jobs: [{
                    name: 'testcron',
                    time: '* * * * *',
                    timezone: 'Europe/London',
                    request: {
                        method: 'POST',
                        url: '/api/v1/driver/scheduleOrderNotifications'
                    },
                    onComplete: (res) => {
                     
                    }
                },
               ]  
            }

}     

  ])
     
        server.route({
            path: "/uploads/{path*}",
            method: "GET",
            handler: {
                directory: {
                    path: "./uploads",
                    listing: false,
                    index: false
                }
            }
        });
        server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return '#### server is working!';
            }
        });

        server.route(Routes);
        await server.start(); console.log('Server running on %s', server.info.uri);
        return server;
    }catch (e) {
      throw e;
    }    
};

/*Bootstrap.bootstrapAdmin().then(response =>{ console.log("response",response);
       return  UniversalFunctions.sendSuccess(null, response);
    }).catch(error => {  
        return error;   
});
*/


io.on("connect", function (socket) {

    console.log('connected ###');
    
    
})
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});



init();  


