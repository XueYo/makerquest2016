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
        
    },

  CreateNew: function(req, res){
    var userName, firstName, lastName, password;

    userName = req.param("fieldUser")
    firstName = req.param("fieldfirstName")
    lastName = req.param("fieldlastName")
    password = req.param("fieldPassword")

    if(!userName || !firstName || !lastName || !password){
      
      res.view("Siginin/SignUp")
      // they need to enter all the fields
    }

    User.findOne({"username": userName }).exec(function(err, theUser){
      
      if(theUser){
        res.send("Sorry, Username is taken")
        
        
      }
      else{
        // the user doesn't exist, so we can create this.
        User.create().exec(function(err, newUser){
        newUser.username = userName
        newUser.firstName = firstName
        newUser.lastName = lastName
        newUser.password = password // irl this should be encrypted
        newUser.save()
        req.session.User = newUser // sign the user in
        req.session.authenticated = true
        res.redirect("User/home") // send them to the game
      })
    }

    })

  },

  home: function(req, res){
    var signedInUser = req.session.User
    
    if(signedInUser){
      User.findOne({'id': signedInUser.id}).populate('accomplished').exec(
        function(err, signedInUser2){
          if(err){
            req.session.destroy()
            res.redirect("/Sigin/Login")
          }
          
          req.session.User = signedInUser2
          data = {
            "firstName": signedInUser2.firstName,
            "progress": signedInUser2.accomplished.length,
            

         }
          res.view('userStats', data)  
      })
      
    }
    else{
      res.redirect("signin/login")
    }
  }
    
	
};

