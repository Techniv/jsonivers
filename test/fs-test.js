/**
 * Created by vincent.peybernes on 05/02/14.
 */

var jsonExpect = {
	"name": "test",
	"number": 1,
	"boolean": true
}
var jsonPath = "test/resources/test.json"

var path = require('path');
var jsonivers = require('../libs/module').fs;

module.exports = {
	getJSON: function(test){
		test.expect(2);

		jsonivers.read(jsonPath,function(err, json){
			test.equals(err, undefined, 'Error');
			test.equals(JSON.stringify(json), JSON.stringify(jsonExpect), 'JSON expect');
			test.done();
		});
	}
	, getJSONSync: function(test){
		test.expect(2);

		test.doesNotThrow(function(){
			var json = jsonivers.readSync(jsonPath);
			test.equals(JSON.stringify(json), JSON.stringify(jsonExpect), 'JSON expect');
		});

		test.done();
	}
	, getJSONError: function(test){
		test.expect(2);

		jsonivers.read(jsonPath+'s',function(err, json){
			test.equals(typeof err, 'object', 'Error');
			test.equals(json, undefined, 'JSON expect');
			test.done();
		});
	}
	, getJSONSyncError: function(test){
		test.expect(1);

		test.throws(function(){
			var json = jsonivers.readSync(jsonPath+'s');
			test.equals(json, undefined, 'JSON expect');
		});

		test.done();
	}
}