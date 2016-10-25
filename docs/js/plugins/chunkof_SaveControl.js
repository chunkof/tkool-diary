//=============================================================================
// chunkof_SaveControl.js
//=============================================================================

(function() {

DataManager.isThisGameFile = function(savefileId) {
    var savefile = this.loadSavefileInfo(savefileId);
    if (!savefile) {
        return false;
    }
    if (StorageManager.isLocalMode()) {
        return true;
    }

    var CHECK_CHAR_NUM = 2; // タイトルを先頭何文字までチェックするか
    return (savefile.globalId === this._globalId &&
            savefile.title.substr(0,CHECK_CHAR_NUM) === $dataSystem.gameTitle.substr(0,CHECK_CHAR_NUM));
};

})();

