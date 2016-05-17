/**
 * HotspotController
 *
 * @description :: Server-side logic for managing Hotspots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    find: function(req,res){
     var hotSpots = req.param('uniqId');
    
     Hotspot.findOne({'uniqId': hotSpots}).exec(function(err,records){
         if(err || !records){
             res.send("nothing")
         }
         else{
             res.send(records)
         }
     });
    
    }


};

