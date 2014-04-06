"use strict";

var path = require("path"),
    execFile = require("child_process").execFile,
    fs = require('fs');

module.exports = function ifcConvert(source, dest, options, callback) {

    if (!callback) {
        callback = options;
        options = undefined;
    }

    var ifcConvertPath;

    if (options && options.path) {
        ifcConvertPath = options.path + '/IfcConvert';
    } else {
        ifcConvertPath = 'IfcConvert';
    }

    if (!fs.existsSync(source)) {
        callback(new Error('Unable to open the source file.'));
        return;
    }

    var args = [source, dest];


    execFile(ifcConvertPath, args, function(err, stdout, stderr) {

        if (err) {
            callback(err);
        } else if (stderr.lenght > 0) {
            console.log(stderr.toString());
            callback(new Error(stderr.toString()));
        } else {
            callback(null);
        }
    });
};