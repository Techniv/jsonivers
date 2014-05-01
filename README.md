# JSONivers

![build-status](http://status.ci.techniv.fr/jsonivers)

JSONivers is a sub-modules collection to to manage JSON data.

## Modules

All sub-modules are organised in namespace.

 - **[fs](https://github.com/Techniv/jsonivers/wiki/Module---FS)**
 - **[http](#http)**
 - *...*


## FS
```javascript
var jsoniverFS = require("jsonivers").fs;
```

This module provide utilities to read and write JSON data on filesystem.

 - [readJsonFile( *{string}* filePath, *{function}* callback ) → *{void}*]
   (https://github.com/Techniv/jsonivers/wiki/Module---FS#wiki-readjsonfile-string-filepath-function-callback---void)
 - [readJsonFileSync( *{string}* filePath ) → *{object}*]
   (https://github.com/Techniv/jsonivers/wiki/Module---FS#wiki-readjsonfilesync-string-filepath---object)
 - [writeJsonFile( *{string}* filePath, *{object}* data, *{function}* callback ) → *{void}*]
   (https://github.com/Techniv/jsonivers/wiki/Module---FS#wiki-writejsonfile-string-filepath-object-data-function-callback---void)
 - [writeJsonFileSync( *{string}* filePath, *{object}* data ) → *{void}*]
   (https://github.com/Techniv/jsonivers/wiki/Module---FS#wiki-writejsonfilesync-string-filepath-object-data---void)


## HTTP
```javascript
var jsoniverFS = require("jsonivers").http;
```
This module provide utilities to get and send JSON data by HTTP request.
*Only get for yet.*

 - [get( {string} url, {function} callback) → {void}]
   (https://github.com/Techniv/jsonivers/wiki/Module---HTTP#wiki-get-string-url-function-callback--void)

## JsonBind
The JsonBind object provide an object like a literal basic object but with internal binding system to a data source (FS, HTTP, other).
```javascript
var JsonBind = require("jsonivers").JsonBind;
```
This is a constructor to create an object bound on a source. The binding
is provided by a JsonAdapter what interface the object with the source.

The first parameter is the original data object. Use an empty object to create
an empty JsonBind or load the data from the source.

The second parameter is an instance of JsonAdapter.

[More detail on Wiki](https://github.com/Techniv/jsonivers/wiki/JsonBinded)
