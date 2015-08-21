var fs = require("fs");
var mysql = require("mysql");
var Promise = require("bluebird");
var task = require('promise-util-task');
var munin = require('munin-plugin');

var config = JSON.parse(fs.readFileSync(__dirname + '/config/mysql.json'));


var main = function(mysqlconfig){
    var conn = mysql.createConnection(mysqlconfig);
    task.limit([], 10).then(function(r){
        conn.end();
        var multi = [];

        multi.push(function(){
            var g = new munin.Graph('title','unit','genre');
            g.add(new munin.Model.Default('name').setValue(0));
            g.sortValue();
            return g;
        })

        munin.create(multi.map(function(v){ return v() }));
    })
}
main(config);

