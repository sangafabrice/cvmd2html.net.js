/**
 * @file returns information about the resource files used by the project.
 * @version 0.0.1.7
 */

/**
 * @typedef {object} Package
 * @property {string} Root is the project root path.
 * @property {string} ResourcePath is the project resources directory path.
 * @property {string} MenuIconPath is the shortcut menu icon path.
 * @property {string} JsLibraryPath is the showdown.js library path.
 */

/** @class */
var Package = (function() {
  var resource = {
    Root: FileSystem.GetParentFolderName(AssemblyLocation),
    MenuIconPath: AssemblyLocation
  };
  resource.ResourcePath = FileSystem.BuildPath(resource.Root, 'rsc');
  resource.JsLibraryPath = FileSystem.BuildPath(resource.ResourcePath, 'showdown.min.js');
  return resource;
})();