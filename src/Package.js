/**
 * @file returns information about the resource files used by the project.
 * @version 0.0.1.8
 */

package cvmd2html {

  internal abstract class Package {

    private static var _menuIconPath: String = Program.Path;

    /// <summary>The shortcut menu icon path.</summary>
    internal static function get MenuIconPath(): String {
      return _menuIconPath;
    }
  }
}