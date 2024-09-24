/**
 * @file returns the methods for managing the shortcut menu option: install and uninstall.
 * @version 0.0.1.3
 */

/**
 * @typedef {object} Setup
 */

/** @class */
var Setup = (function() {
  var HKCU = 0x80000001;
  var VERB_KEY = 'SOFTWARE\\Classes\\SystemFileAssociations\\.md\\shell\\cthtml';
  /** @typedef {object} StdRegProv */
  var StdRegProv = GetObject('winmgmts:StdRegProv');
  return {
    /**
     * Configure the shortcut menu in the registry.
     * @param {boolean} paramNoIcon specifies that the menu icon should not be set.
     * @param {string} menuIconPath is the shortcut menu icon file path.
     */
    Set: function (paramNoIcon, menuIconPath) {
      var COMMAND_KEY = VERB_KEY + '\\command';
      var command = format('"{0}" /Markdown:"%1"', AssemblyLocation);
      StdRegProv.CreateKey(HKCU, COMMAND_KEY);
      StdRegProv.SetStringValue(HKCU, COMMAND_KEY, Missing.Value, command);
      StdRegProv.SetStringValue(HKCU, VERB_KEY, Missing.Value, 'Convert to &HTML');
      var iconValueName = 'Icon';
      if (paramNoIcon) {
        StdRegProv.DeleteValue(HKCU, VERB_KEY, iconValueName);
      } else {
        StdRegProv.SetStringValue(HKCU, VERB_KEY, iconValueName, menuIconPath);
      }
    },
    /** Remove the shortcut menu by removing the verb key and subkeys. */
    Unset: function () {
      var enumKeyMethod = StdRegProv.Methods_.Item('EnumKey');
      var inParam = enumKeyMethod.InParameters.SpawnInstance_();
      inParam.hDefKey = int(HKCU);
      // Recursion is used because a key with subkeys cannot be deleted.
      // Recursion helps removing the leaf keys first.
      var deleteVerbKey = function(key) {
        var recursive = function func(key) {
          inParam.sSubKeyName = key;
          var sNames = StdRegProv.ExecMethod_(enumKeyMethod.Name, inParam).sNames;
          if (sNames != null) {
            for (var index = 0; index < sNames.length; index++) {
              func(format('{0}\\{1}', [key, sNames[index]]));
            }
          }
          StdRegProv.DeleteKey(HKCU, key);
        }
        recursive(key);
      }
      deleteVerbKey(VERB_KEY);
      deleteVerbKey = null;
      Marshal.FinalReleaseComObject(enumKeyMethod);
      Marshal.FinalReleaseComObject(inParam);
      enumKeyMethod = null;
      inParam = null;
    },
    /**
     * Destroy the object.
     */
    Dispose: function () {
      Marshal.FinalReleaseComObject(StdRegProv);
      StdRegProv = null;
    }
  }
})();