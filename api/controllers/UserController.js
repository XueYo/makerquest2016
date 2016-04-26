/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = { 
    
    Progress: function(req,res){
        var userid = req.param('user')
        User.findOne({'username': userid}).exec(function(err,userobject)){
                if(err || !userobject){
                    res.send('user not found')
                        }
                else{
                    res.send(userobject.accomplished.length)
                }
        
                                             }
    }
    
	
};

