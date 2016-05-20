/**
 * Hotspot.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      zone: {
          type: 'string',
          enum: ['zoneOne','zoneTwo','zoneThree']
         },
      solveCount:  {
          type: 'integer'
      },
      uniqId: {
      type: 'integer'
    },

    generateImage: function(){
      var qr
      qr = require('qrcode-js')
      // this will be a b64 image
      if(this.uniqId) return qr.toDataURL(this.uniqId.toString(), 4)
      return ""
    }
  }
};

