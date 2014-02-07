/**
 * Created by vincent.peybernes on 05/02/14.
 */

var jsonExpect = {
	"name": "test",
	"number": 1,
	"boolean": true
}
var jsonPath = "test/resources/readTest.json",
	jsonWritePath = "test/resources/writeTest.json",
	jsonUnWritePath = "test/resources/";

var path = require('path');
var jsonivers = require('../libs/jsonivers').fs;
var fs = require('fs');

module.exports = {
	getJSON: function(test){
		test.expect(2);

		jsonivers.readJsonFile(jsonPath,function(err, json){
			test.equals(err, undefined, 'Error');
			test.deepEqual(json, jsonExpect, 'JSON expect');
			test.done();
		});
	}
	, getJSONSync: function(test){
		test.expect(2);

		test.doesNotThrow(function(){
			var json = jsonivers.readJsonFileSync(jsonPath);
			test.deepEqual(json, jsonExpect, 'JSON expect');
		});

		test.done();
	}
	, getJSONError: function(test){
		test.expect(2);

		jsonivers.readJsonFile(jsonPath+'s',function(err, json){
			test.equals(typeof err, 'object', 'Error');
			test.equals(json, undefined, 'JSON expect');
			test.done();
		});
	}
	, getJSONSyncError: function(test){
		test.expect(1);

		test.throws(function(){
			var json = jsonivers.readJsonFileSync(jsonPath+'s');
			test.equals(json, undefined, 'JSON expect');
		});

		test.done();
	}

	, writeJSON: function (test){
		test.expect(3);
		jsonivers.writeJsonFile(jsonWritePath, jsonExpect, function(err){
			test.equals(err, undefined, 'Error');
			test.ok(fs.existsSync(jsonWritePath));

			if(fs.existsSync(jsonWritePath))
				var writeData = fs.readFileSync(jsonWritePath);

			test.equals(writeData.toString().replace(/^(\s|[\r\n])*((.|\r\n])*?)(\s|[\r\n])*$/, "$2"), JSON.stringify(jsonExpect), "Content");
			fs.unlinkSync(jsonWritePath);
			test.done();
		});
	}
	, writeJSONError: function (test){
		test.expect(3);
		jsonivers.writeJsonFile(jsonUnWritePath, jsonExpect, function(err){
			test.equals(typeof err, 'object', 'Error');
			test.equals(err.constructor.name, 'Error', 'Error');
			test.ok(fs.existsSync(jsonUnWritePath));

			test.done();
		});
	}

	, writeJSONSync: function (test){
		test.expect(2);
		jsonivers.writeJsonFileSync(jsonWritePath, jsonExpect);
		test.ok(fs.existsSync(jsonWritePath));

		if(fs.existsSync(jsonWritePath))
			var writeData = fs.readFileSync(jsonWritePath);

		test.equals(writeData.toString().replace(/^(\s|[\r\n])*((.|\r\n])*?)(\s|[\r\n])*$/, "$2"), JSON.stringify(jsonExpect), "Content");

		fs.unlinkSync(jsonWritePath);
		test.done();
	}
	, writeJSONSyncError: function (test){
		test.expect(1);
		test.throws(function(){
			jsonivers.writeSync(jsonUnWritePath, jsonExpect);
		}, 'Error');
		test.done();
	}
}