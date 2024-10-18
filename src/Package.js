/**
 * @file returns information about the resource files used by the project.
 * @version 0.0.1.8
 */

package cvmd2html {

  internal abstract class Package {

    /// <summary>The project root path.</summary>
    private static var _root: String = System.AppContext.BaseDirectory;

    private static var _resourcePath: String = Path.Combine(_root, 'rsc');

    private static var _menuIconPath: String = Program.Path;

    /// <summary>The project resources directory path.</summary>
    internal static function get ResourcePath(): String {
      return _resourcePath;
    }

    /// <summary>The shortcut menu icon path.</summary>
    internal static function get MenuIconPath(): String {
      return _menuIconPath;
    }
  }
}