/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = { 
    
Progress: function (req, res) {
        var userid = req.param('user')
          User.findOne({'username': userid}).populate('accomplished').exec(function(err, user){
              if (err || !user){
                  res.send({error: err})
              }
              else{
                  res.send({data: user.accomplished.length})
              }
          });
        
    }
    
	
};

