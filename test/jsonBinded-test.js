/**
 * Created by Vincent Peybernes on 20/02/14.
 */

var fs = require('fs');
var JsonBinded = require('../libs/model/jsonBinded');
var jsonExpect = {
	"name": "test",
	"number": 1,
	"boolean": true
};
var jsonReadFile = "test/resources/readTest.json";
var jsonWriteFile = "test/resources/writeTest.json";

module.exports = {
	enumTest: function(test){
		var bind = new JsonBinded(jsonExpect);
		for(var key in bind){
			test.ok(typeof jsonExpect[key] != "undefined", "Enum "+key);
			test.deepEqual(bind[key], jsonExpect[key], "Value "+key);
		}
		test.equals(typeof bind._save, "function", "Save");
		test.done();
	},

	fs: {
		get: function(test){
			var bind = new JsonBinded({}, new JsonBinded.FSAdapter({path:jsonReadFile}));
			bind._get(function(err){
				test.equals(err, undefined, "JSON get err");
				test.deepEqual(this, jsonExpect, 'JSON get');
				test.done();
			});
		},
		save: function(test){
			var bind = new JsonBinded(jsonExpect, new JsonBinded.FSAdapter({path:jsonWriteFile}));
			bind._save(function(err){
				test.equals(err, undefined, "JSON save err");
				var file = fs.readFileSync(jsonWriteFile);
				test.equals(file, JSON.stringify(jsonExpect), "JSON save");
				fs.unlinkSync(jsonWriteFile);
				test.done();
			});
		}
	}
};