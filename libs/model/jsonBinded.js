/**
 * Created by Vincent Peybernes on 16/02/14.
 * @module jsonivers/model/jsonbinded
 */

/**
 * @class JsonBinded
 * @param {object} dataSrc
 * @param {JsonAdapter} adapter
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

	// API
	/**
	 * Save the data.
	 * @memberOf JsonBinded
	 * @instance
	 * @param {jsonBindedCallback} callback
	 */
	function _save(callback){
		adapter.save(data, function(err){
			callback.call(that, err);
		});
	};
	Object.defineProperty(that, '_save', {
		value: _save.bind(that)
	});

	/**
	 * Get the data from source.
	 * @memberOf JsonBinded
	 * @instance
	 * @param {jsonBindedCallback} callback
	 */
	function _get(callback){
		adapter.get(function(err, getData){
			if(err) throw err;
			dataSrc = getData;
			init();
			callback.call(that, err);
		});
	}
	Object.defineProperty(that, '_get', {
		value: _get.bind(that)
	});

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


	init();
}

JsonBinded.FSAdapter = require('../adapter/fs-adapter');

module.exports = JsonBinded;

/**
 * @class JsonAdapter
 * @abstract
 */
/**
 * Get the data from the source.
 * @method get
 * @instance
 * @abstract
 * @memberOf JsonAdapter
 * @param {string} path
 * @param {readCallback} callback
 */
/**
 * Save the data to the source.
 * @method save
 * @instance
 * @abstract
 * @memberOf JsonAdapter
 * @param {string} path
 * @param {object} data
 * @param {writeCallback} callback
 */

/**
 * Callback for getting JsonBinded. The context 'this' is the JsonBinded object.
 * @callback jsonBindedCallback
 * @param {Error} err Undefined if success.
 */