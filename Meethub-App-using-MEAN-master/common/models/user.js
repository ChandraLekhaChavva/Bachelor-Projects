'use strict';

module.exports = function(User) {
     User.getallusers = function(cb) {
         User.find(function(err, resp){
 cb(err, resp);
         })
     
    }

    User.remoteMethod('getallusers', {
          returns: {arg: 'data', type: 'object'},
          http: {path: '/getallusers', verb: 'get'}
    });
};
