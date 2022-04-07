'use strict';
let SuperAdminRoute                       =  require('./SuperAdminRoute');
let StoreAdminRoute                       =  require('./StoreAdminRoute');
let StoreEmployeeRoute                       =  require('./StoreEmployeeRoute');
let UserRoute                       =  require('./UserRoute');
//let UserRouteV1                       =  require('./UserRouteV1');
let DeliveryTeamRoute                       =  require('./DeliveryTeamRoute');
let all = [].concat(SuperAdminRoute,UserRoute,StoreAdminRoute,DeliveryTeamRoute,StoreEmployeeRoute);

module.exports = all;