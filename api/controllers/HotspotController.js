/**
 * HotspotController
 *
 * @description :: Server-side logic for managing Hotspots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    findByZone: function(req,res){
     var zoneNum = req.param('zone');
    var zoneName = "noname"
    if(zoneNum == 1){
        zoneName = "zoneOne"
    }
        else if(zoneNum == 2){
            zoneName = "zoneTwo"    
        }
        else if(zoneNum == 3){
            zoneName = "zoneThree"
        }
     Hotspot.find({'zone': zoneName}).exec(function(err,records){
         if(err || !records  ){
             res.send('nada')
         }
         else{
             res.send(records)
         }
     })
    
    }


};

