/**
 * Created by Vincent Peybernes on 12/03/2015.
 */

var data = {
	"name": "test",
	"number": 1,
	"boolean": true,
	"symbolString": "String: with \"symbol\" \r\n[like {this}]",
	"object": {
		"name": "test",
		"number": 1
	},
	"array": [
		1,
		2,
		3
	]
};
var jsonExpect = "{\r\n"
	+"  \"name\": \"test\",\r\n"
	+"  \"number\": 1,\r\n"
	+"  \"boolean\": true,\r\n"
	+"  \"symbolString\": \"String: with \\\"symbol\\\" \\r\\n[like {this}]\",\r\n"
	+"  \"object\": {\r\n"
	+"    \"name\": \"test\",\r\n"
	+"    \"number\": 1\r\n"
	+"  },\r\n"
	+"  \"array\": [\r\n"
	+"    1,\r\n"
	+"    2,\r\n"
	+"    3\r\n"
	+"  ]\r\n"
	+"}";

var utils = require("../libs/utils");

module.exports = {
	jsonToHuman: function (test){
		var json = JSON.stringify(data);
		var stream = getStream();
		utils.jsonToHuman(json, stream);
		console.log(stream.str);
		test.equals(jsonExpect, stream.str);
		test.done();
	}
};

function getStream(){
	var stream = {
		str: ""
	};

	stream.write = function write(data){
		stream.str += data;
	};

	return stream;
}