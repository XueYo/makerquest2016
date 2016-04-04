/**
 * HotspotController
 *
 * @description :: Server-side logic for managing Hotspots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	find: function(req,res){
		var uniqId = req.param('id')
		console.log(uniqId)

		Hotspot.findOne({'unqId': uniqId}).exec(function(err, record)
		{
			if(err || !record) {
				res.send("not found, try again")
				
			}
			else{
				res.send("found one!")
			}
		})

	

	}
};

