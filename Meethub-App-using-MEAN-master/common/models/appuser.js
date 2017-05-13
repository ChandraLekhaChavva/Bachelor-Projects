'use strict';
var app = require('../../server/server');
module.exports = function(Appuser) {
var users = app.models.users
Appuser.afterRemote ('create', function (context, modelInstance, next) {    
  var newuser = context.result;
  console.log(newuser)
  
//   users.create(newuser, function(err, resp){
//       if(err){
//           console.log()
//       }
//       conole.log("before new user: ", err, resp)
//   })
  next()
}); 
};
