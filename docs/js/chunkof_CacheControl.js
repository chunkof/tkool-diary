/*:
 * @usage Load scripts in the following order.
 *        js/plugins.js
 *        js/chunkof_FileHashList.js
 *        js/chunkof_CacheControl.js
 *        js/main.js
 *
 * @author chunkof
 */

/*:ja;
 * @usage 以下の順番で読みこんでください。
 *        js/plugins.js
 *        js/chunkof_FileHashList.js
 *        js/chunkof_CacheControl.js
 *        js/main.js
 *
 * @author chunkof
 */

(function() {
  //------------
  // settings
  //------------
  var ENABLE_DEBUG_LOG = false;

  //------------
  // Over ride
  //------------

  // Load data file
  var _DataManager_loadDataFile = DataManager.loadDataFile;
  DataManager.loadDataFile = function(name, src_org) {
    var src = src_org + "?v=" + getHash(src_org);
    debugLog("append hash:" + src_org + "->" + src);

    _DataManager_loadDataFile.call(this, name, src);
  };

  // Load script
  var _PluginManager_loadScript = PluginManager.loadScript;
  PluginManager.loadScript = function(name_org) {
    var name = name_org + "?v=" + getHash(name_org);
    debugLog("append hash:" + name_org + "->" + name);

    _PluginManager_loadScript.call(this, name);
  };

  //------------
  // Utility
  //------------
  var getHash = function(name){
    var list = chunkof_FileHashList;
    for (var i=0; i<list.length; ++i){
      if (list[i].name == name){
        return list[i].hash;
      }
    }
    return "no_hash";
  };

  var debugLog = function(log){
    if (ENABLE_DEBUG_LOG){
      console.log(log);
    }
  };
})();

