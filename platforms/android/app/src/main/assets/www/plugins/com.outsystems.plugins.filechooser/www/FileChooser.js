cordova.define("com.outsystems.plugins.filechooser.FileChooser", function(require, exports, module) {
/**
 * OutSystems R&D
 */
 (function(cordova){
    var FileChooser = function() {

    };

    FileChooser.prototype.open = function(params, success, fail) {
        return cordova.exec(function(args) {
            success(args);
        }, function(args) {
            fail(args);
        }, 'FileChooser', 'open', [params||{}]);
    };

    FileChooser.prototype.select = function(params, success, fail) {
        return cordova.exec(function(args) {
            success(args);
        }, function(args) {
            fail(args);
        }, 'FileChooser', 'select', [params||{}]);
    };

    window.filechooser = new FileChooser();
    
    // backwards compatibility
    window.plugins = window.plugins || {};
    window.plugins.filechooser = window.filechooser;
})(window.PhoneGap || window.Cordova || window.cordova);
});
