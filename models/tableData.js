var util = require('util');
var config = require('../config');
var mongoose = require('../lib/mongoose'), Schema = mongoose.Schema;

var Work = new Schema({
    "workID": Schema.ObjectId,
    "startTime": Date,
    "endTime": Date,
    "workName": String
});

Work.virtual('startCell').get(function () {
    var minutes = (this.startTime.getMinutes() / 60) >= 0.5 ? 1.0: 0.5;
    return (this.startTime.getHours() - config.get('startWorkingDay') + minutes) / 0.5;
});

Work.virtual('endCell').get(function () {
    var minutes = (this.endTime.getMinutes() / 60) >= 0.5 ? 0.5: 0.0;
    return (this.endTime.getHours() - config.get('startWorkingDay') + minutes) / 0.5;
});

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
                    "works": [Work]
                }]
        }]
});

exports.Works = mongoose.model('Works', schema);