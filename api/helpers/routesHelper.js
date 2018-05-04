'use strict';

exports.allowOnly = function(accessLevel, callback) {
    function checkUserRole(req, res) {
        if(!(accessLevel & req.user.role)) {
            res.status(403).send({message : 'you have no such permission to access this route '});
            return;
        }

        callback(req, res);
    }

    return checkUserRole;
};