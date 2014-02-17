/**
 * Created by Vincent Peybernes on 16/02/14.
 * @module jsonivers/model/jsonbinded
 */

/**
 * @class
 */
function JsonBinded(dataSrc, adapter){
	var that = this;
	var data = {};

	function init(){
		var keys = Object.getOwnPropertyNames(dataSrc);
		for(var i=0; i<keys.length; i++){
			var name = keys[i];
			var value = dataSrc[name];
			var desc = Object.getOwnPropertyDescriptor(dataSrc, name);

			if(desc.enumerable){
				addDataProperty(name, value);
			} else {
				addUtilsProperty(name, value);
			}
		}
	}

	// Utils
	function addDataProperty(name, value){
		data[name] = value;

		var desc = Object.getOwnPropertyDescriptor(that, name);
		if(desc == undefined || desc.writable == true){
			Object.defineProperty(that, name, {
				get: function(){return data[name];},
				set: function(value){data[name] = value;},
				configurable: true, enumerable: true
			});
		}
	}

	function addUtilsProperty(name, value){
		Object.defineProperty(that, name, {
			value: value,
			writable: true, configurable: true
		});
	}
}
