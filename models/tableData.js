var util = require('util');

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var Work = new Schema({
    "workID": Schema.ObjectId,
    "startTime": Date,
    "endTime": Date,
    "workName": String
});

Work.virtual('startCell').get(function () {
    var startWorkingDay = 8; // вынести в конфиг файл
    var minutes = (this.startTime.getMinutes() / 60) >= 0.5 ? 1.0: 0.5;
    return (this.startTime.getHours() - startWorkingDay + minutes) / 0.5;
});

Work.virtual('endCell').get(function () {
    var startWorkingDay = 8; // вынести в конфиг файл
    var minutes = (this.endTime.getMinutes() / 60) >= 0.5 ? 0.5: 0.0;
    return (this.endTime.getHours() - startWorkingDay + minutes) / 0.5;
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


/*schema.virtual('box.clients.works.cellNumbers').get(function () {
    var startWorkingDay = 8; // вынести в конфиг файл
    var wrk = this.box.clients.works.startTime;
    console.log("ВЫВОД: wrk")
    //var wrk = new Date("2017-01-01T08:00:00.000Z");
    var min = (wrk.getUTCMinutes() / 60) >= 0.5 ? 1.0: 0.5;
    var input = (wrk.getUTCHours() - startWorkingDay + min) / 0.5;

    return 89;
});
*/
exports.Works = mongoose.model('Works', schema);