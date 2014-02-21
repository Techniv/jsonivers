/**
 * Created by Vincent Peybernes on 20/02/14.
 */

var JsonBinded = require('../libs/model/jsonBinded');
var jsonExpect = {
	"name": "test",
	"number": 1,
	"boolean": true
};

module.exports = {
	enumTest: function(test){
		var bind = new JsonBinded(jsonExpect);
		for(var key in bind){
			test.ok(typeof jsonExpect[key] != "undefined", "Enum "+key);
			test.deepEqual(bind[key], jsonExpect[key], "Value "+key);
		}
		test.equals(typeof bind.save, "function", "Save");
		test.done();
	},

	fs: {
		get: function(test){

		}
	}
};