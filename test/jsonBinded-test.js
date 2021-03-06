/**
 * Created by Vincent Peybernes on 20/02/14.
 */

var fs = require('fs');
var JsonBinded = require('../libs/model/jsonBind');
var FSAdapter = require('../libs/adapter/fs-adapter');
var jsonExpect = {
	"name": "test",
	"number": 1,
	"boolean": true,
	"object": {
		"name": "test",
		"number": 1
	}
}, jsonLength = Object.getOwnPropertyNames(jsonExpect).length;
var jsonReadFile = "test/resources/readTest.json";
var jsonWriteFile = "test/resources/writeTest.json";

var jsonPath = "test/resources/readTest.json",
	jsonWritePath = "test/resources/writeTest.json",
	jsonUnWritePath = "test/resources/";

module.exports = {
	enumTest: function(test){
		var bind = new JsonBinded(undefined, jsonExpect);
		test.deepEqual(bind, jsonExpect);
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
		},
		synchronize: function(test){
			var jsonExpect = {foo: 'bar'};
			var bind = new JsonBinded(jsonExpect, new JsonBinded.FSAdapter({path:jsonWriteFile}));
			jsonExpect.test = 'test';
			bind.test = jsonExpect.test;

			bind._save(function(err){
				test.equals(err, undefined, 'Synch error')
				var file = fs.readFileSync(jsonWriteFile);
				test.equals(file, JSON.stringify(jsonExpect), 'Synch');

				fs.unlinkSync(jsonWriteFile);
				test.done();
			});
		}
	}
};