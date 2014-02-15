/**
 * Created by Vincent Peybernes on 12/02/14.
 */

var jsonivers = require('../libs/jsonivers').http;
var jsonExpect = {
	"name": "test",
	"number": 1,
	"boolean": true
};

var url = "http://localhost:8000/readTest.json";


module.exports = {
	getTest: function(test){
		test.expect(2);
		jsonivers.get(url, function(err, data){
			test.equals(err, undefined, "Error");
			test.deepEqual(data, jsonExpect, "Data");
			test.done();
		});
	},

	getErrorTest: function(test){
		test.expect(3);
		jsonivers.get(url+'/error', function(err, data){
			test.equals(typeof err, 'object', 'Error');
			test.equals(err.constructor.name, Error.name, 'Error.name');
			test.equals(data, undefined);
			test.done();
		});
	}
};