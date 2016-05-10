module.exports = {
  signIn: function(req,res){
    var username = req.parameter('username')
    var password = req.parameter('password')
    User.findOne
    if (err || !userobject){
      res.send('User not found')
    }
  }
}
