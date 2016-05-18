module.exports = {
  //signIn: function(req,res){
    //var userName = req.parameter('username')
    //var passWord = req.parameter('password')
    //User.findOne({'password':passWord}).execfunction(err,userobject)
    //if (err || !userobject){
      //res.send('User not found')
       //}
      //else {
        //  res.send('user is existent')
      //}
  //}
   
'LogIn': function(req,res){
    
    res.view('signin');
},
     Signin: function (req, res, next) {
	    
        // Check for username and password in params sent via the form, if none
        // redirect the browser back to the sign-in form.
        if (!req.param('username') || !req.param('password')) {

            var usernamePasswordRequiredError = [{
                name: 'usernamePasswordRequired',
                message: 'You must enter both a username and password.'
            }];
	        
            // Remember that err is the object being passed down, whose value is another object with
            // the key of usernamePasswordRequiredError
            req.session.flash = {
                err: usernamePasswordRequiredError
            };

            return res.redirect('signin');
        }
        
        // Try to find the user by their email address.
        // findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.
        User.findOne(req.param('username'), function foundUser(err, user) {
            if (err) return next(err);

            if (!user) {
                var noAccountError = [{
                    name: 'noAccount',
                    message: 'The username ' + req.param('userName') + ' not found.'
                }];
                req.session.flash = {
                    err: noAccountError
                };
                return res.redirect('signin');
            }
           
            // Compare password from the form params to the encrypted password of the user found.
            require('bcrypt').compare(req.param('password'), user.encryptedPassword, function (err, valid) {
                if (err) return next(err);

                if (!valid) {
                    var usernamePasswordMismatchError = [{
                        name: 'usernamePasswordMismatch',
                        message: 'Invalid username and password combination.'
                    }];
                    req.session.flash = {
                        err: usernamePasswordMismatchError
                    };
                    return res.redirect('signin');
                }
                
                // Log user in
                req.session.authenticated = true;
                req.session.User = user;
                
                // Redirect to their profile page
                return res.redirect('homepage');
            });
        });
    },

    destroy: function (req, res, next) {
        
        // Wipe out the session (log out)
        req.session.destroy();
        res.redirect('signin');
    }



};
