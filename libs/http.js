/**
 * Created by Vincent Peybernes on 12/02/14.
 * @module jsonivers/http
 */

var http = require('http');
var contentTypeRegExp = /([a-z]*\/[a-z]*)(;.*?charset=([a-zA-Z0-9\-]*))?/;
var acceptedMime= [
	"application/json",
	"text/json",
	"text/plain"
];

module.exports = {

	get: function(url, callback){
		http.get(url, function(res){
			if(res.statusCode != 200){
				callback(new Error("Bad HTTP status code: "+res.statusCode));
				return;
			}
			var contentType = contentTypeRegExp.exec(res.headers["content-type"]);


			if(contentType == null){
				callback(new Error("Error on response header parsing."));
				return;
			}

			if(acceptedMime.indexOf(contentType[1]) == -1){
				callback(new Error("The response have unaccepted MIME type: "+contentType[1]));
				return;
			}
			res.on('data', function(data){
				try{
					var json = JSON.parse(data);
					callback(undefined, json);
				} catch (e){
					callback(e);
					return;
				}
			});
		}).on("error", function(err){
			callback(err);
		});
	}
};