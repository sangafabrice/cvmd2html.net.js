/**
 * @file returns information about the resource files used by the project.
 * It also provides a way to manage the custom icon link that can be installed and uninstalled.
 * @version 0.0.1.3
 */

/**
 * @typedef {object} Package
 * @property {string} Root is the project root path.
 * @property {string} ResourcePath is the project resources directory path.
 * @property {string} MenuIconPath is the shortcut menu icon path.
 * @property {string} PwshExePath is the powershell core runtime path.
 * @property {string} PwshScriptPath is the shortcut target powershell script path.
 * @property {object} IconLink represents an adapted link object.
 * @property {string} IconLink.DirName is the parent directory path of the custom icon link.
 * @property {string} IconLink.Name is the custom icon link file name.
 * @property {string} IconLink.Path is the custom icon link full path.
 */

/** @class */
var Package = (function() {
  var fs = new ActiveXObject('Scripting.FileSystemObject');
  var resource = {
    Root: fs.GetParentFolderName(AssemblyLocation),
    MenuIconPath: AssemblyLocation,
    PwshExePath: (function() {
      var registry = GetObject('winmgmts:StdRegProv');
      var getStringValueMethod = registry.Methods_.Item('GetStringValue');
      var inParam = getStringValueMethod.InParameters.SpawnInstance_();
      // The HKLM registry subkey stores the PowerShell Core application path.
      inParam.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\pwsh.exe';
      try {
        return registry.ExecMethod_(getStringValueMethod.Name, inParam).sValue;
      } finally {
        Marshal.FinalReleaseComObject(getStringValueMethod);
        Marshal.FinalReleaseComObject(inParam);
        Marshal.FinalReleaseComObject(registry);
        registry = null;
        inParam = null;
        getStringValueMethod = null;
      }
    })(),
    /**
     * Destroy the object.
     */
    Dispose: function () {
      Marshal.FinalReleaseComObject(fs);
      fs = null;
    }
  }
  resource.ResourcePath = fs.BuildPath(resource.Root, 'rsc');
  resource.PwshScriptPath = fs.BuildPath(resource.ResourcePath, 'cvmd2html.ps1');
  resource.IconLink = {
    DirName: (new ActiveXObject('WScript.Shell')).ExpandEnvironmentStrings('%TEMP%'),
    Name: (new ActiveXObject('Scriptlet.TypeLib')).Guid.substr(1, 36).toLowerCase() + '.tmp.lnk',
    /**
     * Create the custom icon link file.
     * @method @memberof resource.IconLink
     * @param {string} markdownPath is the input markdown file path.
     */
    Create: function (markdownPath) {
      fs.CreateTextFile(this.Path).Close();
      var link = (new ActiveXObject('Shell.Application')).NameSpace(this.DirName).ParseName(this.Name).GetLink;
      link.Path = resource.PwshExePath;
      link.Arguments = format('-ep Bypass -nop -w Hidden -f "{0}" -Markdown "{1}"', [resource.PwshScriptPath, markdownPath]);
      link.SetIconLocation(resource.MenuIconPath, 0);
      link.Save();
      Marshal.FinalReleaseComObject(link);
      link = null;
    },
    /**
     * Delete the custom icon link file.
     * @method @memberof resource.IconLink
     */
    Delete: function () {
      try {
        fs.DeleteFile(this.Path);
      } catch (error) { }
    }
  }
  resource.IconLink.Path = fs.BuildPath(resource.IconLink.DirName, resource.IconLink.Name);
  return resource;
})();