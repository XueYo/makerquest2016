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
   
    LogIn: function(req,res){
    
        if(req.session.User){
            return res.redirect("/User/home")
        }
        res.view('signin');
    },
    
    Signin: function (req, res, next) {
	    
        // Check for username and password in params sent via the form, if none
        // redirect the browser back to the sign-in form.
        if (!req.param('fieldUser') || !req.param('fieldPassword')) {

            var usernamePasswordRequiredError = [{
                name: 'usernamePasswordRequired',
                message: 'You must enter both a username and password.'
            }];
	        
            // Remember that err is the object being passed down, whose value is another object with
            // the key of usernamePasswordRequiredError
            req.session.flash = {
                err: usernamePasswordRequiredError
            };

            
            return res.redirect('/signin/login');
        }
        var formUserName, formPassword;
        formUserName = req.param('fieldUser')
        formPassword = req.param('fieldPassword')
        // Try to find the user by their email address.
        // findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.
        User.findOne({'username': formUserName}, function foundUser(err, user) {
            if (err) return next(err);

            if (!user) {
                var noAccountError = [{
                    name: 'noAccount',
                    message: 'The username ' + req.param('userName') + ' User does not exist'
                }];
                req.session.flash = {
                    err: noAccountError
                };
                return res.redirect('/Signin/login');
            }
           
            // Compare password from the form params to the encrypted password of the user found.
            //require('bcrypt').compare(req.param('password'), user.encryptedPassword, function (err, valid) {
            if(user.password === formPassword){
                
                // Log user in
                req.session.authenticated = true;
                req.session.User = user;
                
                // Redirect to their profile page
                res.redirect('/User/home');
            }
            else{
                // password doesn't match
                res.redirect('/Signin/Login')
            }
        });
    },

    destroy: function (req, res, next) {
        
        // Wipe out the session (log out)
        req.session.destroy();
        res.redirect('/signin/login');
    },

    signUp: function(req, res){
        if (req.session.User){
            // someone is already signed in
            res.redirect('user/home')
        }
        else{
            res.view("signup")

        }

    }



};
