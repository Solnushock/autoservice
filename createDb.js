var mongoose = require('./lib/mongoose.js');
var async = require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
    createTableData
], function(err) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./models/tableData');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);

    }, callback);
}


function createTableData(callback) {
    var tableData = [
        {
            cells:[{
                columns:[1,2],
                name: "Задача 1"
            },
            {
                columns:[4],
                name: "Задача 2"
            },
            {
                columns:[5],
                name: "Задача 3"
            }]
        },
        {
            cells:[{
                columns:[1],
                name: "Задача 4"
            },
                {
                    columns:[3],
                    name: "Задача 5"
                }]
        },
        {
            cells:[{
                columns:[2,3,4],
                name: "Задача 6"
            }]
        }]

    async.each(tableData, function(userData, callback) {
        var data = new mongoose.models.TableData(userData);
        data.save(callback);
    }, callback);
}