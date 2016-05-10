module.exports = {
  signIn: function(req,res){
    var userName = req.parameter('username')
    var passWord = req.parameter('password')
    User.findOne({'username':userName}).execfunction(err,userobject)
    if (err || !userobject){
      res.send('User not found')
       }
      else {
          res.send('user is existent')
      }
  }
   
};
