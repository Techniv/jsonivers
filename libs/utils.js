/**
 * Created by Vincent Peybernes on 12/03/2015.
 */

module.exports = {
	/**
	 * Format a JSON string to human readable JSON and copy on a writable stream.
	 * @param string {string}
	 * @param stream {Writable}
	 */
	jsonToHuman: function jsonToHuman(string, stream){
		var t = 0;
		var inStr = false;
		for(var i = 0; i < string.length; i++){
			var c = string[i];

			if(inStr){
				stream.write(c);
				if(c == "\"" && string[i-1] != "\\"){
					inStr = false;
				}
				continue;
			}

			if(c == "\""){
				inStr = true;
				stream.write(c);
			} else if (c == ":") {
				stream.write(c);
				stream.write(" ");
			} else if (c == '{' || c == "[") {
				stream.write(c);
				stream.write("\r\n");
				t += 2;
				writeTabs(stream, t);
			} else if (c == "}" || c == "]") {
				stream.write("\r\n");
				t -= 2;
				writeTabs(stream, t);
				stream.write(c);
			} else if (c == ",") {
				stream.write(c);
				stream.write("\r\n");
				writeTabs(stream, t);
			} else {
				stream.write(c);
			}
		}
	}
}

/**
 * @param stream {WriteStream}
 * @param n {number}
 */
function writeTabs(stream, n){
	for(var i = 0; i < n; i++){
		stream.write(" ");
	}
}