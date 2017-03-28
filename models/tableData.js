var util = require('util');

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    "date": Date,
    "box": [{
            "boxId": Schema.ObjectId,
            "boxName": String,
            "clients": [{
                    "carInfo": {
                        "carModel": String,
                        "licensePlate": String,
                        "comments": String
                    },
                    "mechanic": {
                        "mechanicId": Schema.ObjectId,
                        "FIO": String
                    },
                    "works": [{
                            "workID": Schema.ObjectId,
                            "cells" : [],
                            "startTime": Date,
                            "endTime": Date,
                            "workName": String
                        }]
                }]
        }]

});

exports.Works = mongoose.model('Works', schema);