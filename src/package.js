/**
 * @file returns information about the resource files used by the project.
 * @version 0.0.1.7
 */

/**
 * @typedef {object} Package
 * @property {string} Root is the project root path.
 * @property {string} MenuIconPath is the shortcut menu icon path.
 * @property {string} PwshExePath is the powershell core runtime path.
 * @property {string} PwshScriptPath is the shortcut target powershell script path.
 */

/** @class */
var Package = (function() {
  var resource = {
    Root: FileSystem.GetParentPath(AssemblyLocation),
    MenuIconPath: AssemblyLocation,
    PwshExePath: WshShell.RegRead('HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\pwsh.exe\\')
  }
  resource.PwshScriptPath = FileSystem.CombinePath(resource.Root, 'cvmd2html.psd1');
  return resource;
})();