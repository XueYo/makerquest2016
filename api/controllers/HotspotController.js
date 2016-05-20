/**
 * HotspotController
 *
 * @description :: Server-side logic for managing Hotspots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    findHotspot: function(req, res){
     var hotSpotPublicId = req.param('uniqId');
    
     Hotspot.findOne({'uniqId': hotSpotPublicId}).exec(function(err, record){
         if(err || !record){
             res.send({"message": 'No record could be found',
                        'error': err
                      })
         }
         else{
             res.send(record)
         }
     });
    
    },

    image: function(req, res){
        var intenralID, data 
        internalID = req.param("id")
        data = {
            "errorMessage": "",
            "imgData": ""
        }

        Hotspot.findOne({"id": internalID}).exec(function(err, record){
            var imgData;
            if (err || !record){
                data['errorMessage']= "Not found"
            }
            else{
                imgData = record.generateImage()
                if(imgData){
                    data["imgData"] = imgData
                }
                else{
                    data['errorMessage'] = "This hotspot doesn't have an identifier"
                }
            }

            res.view("showQRCode",data)
        })
    }


};

