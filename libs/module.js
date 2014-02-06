/**
 * Created by vincent.peybernes on 05/02/14.
 */

var fsReader = require('./fs');

module.exports = {
	fs: {
		read: fsReader.readJsonFile,
		readSync: fsReader.readJsonFileSync
	}
};