/**
 * Created by Vincent Peybernes on 16/02/14.
 * @module jsonivers/model/jsonbind
 */

/**
 * @class JsonBind
 * This is a constructor to create an object bound on a source. The binding
 * is provided by a JsonAdapter what interface the object with the source.
 * @param {object} dataSrc
 * @param {JsonAdapter} adapter
 */
function JsonBind(dataSrc, adapter){
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
	 * @memberOf JsonBind
	 * @instance
	 * @param {jsonBindCallback} callback
	 */
	function _save(callback){
		synchronize();
		adapter.save(data, function(err){
			callback.call(that, err);
		});
	};
	Object.defineProperty(that, '_save', {
		value: _save.bind(that)
	});

	/**
	 * Get the data from source.
	 * @memberOf JsonBind
	 * @instance
	 * @param {jsonBindCallback} callback
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


	function synchronize(){
		var externalKeys = Object.getOwnPropertyNames(that);
		var internalKeys = Object.getOwnPropertyNames(data);
		dataSrc = {};
		for(var i in externalKeys){
			var key = externalKeys[i];
			if( key == "_save" || key == "_get"
				|| internalKeys.indexOf(key) != -1)
				continue;

			dataSrc[key] = that[key];
		}

		init();
	}

	init();
}

JsonBind.FSAdapter = require('../adapter/fs-adapter');

module.exports = JsonBind;

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
 * Callback for getting JsonBind. The context 'this' is the JsonBind object.
 * @callback jsonBindCallback
 * @param {Error} err Undefined if success.
 */
