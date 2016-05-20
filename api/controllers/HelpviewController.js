/**
 * HelpviewController
 *
 * @description :: Server-side logic for managing Helpviews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    View:function(req,res)
    {
        res.view("help")
    }
	
};

