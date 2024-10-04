/**
 * @file returns information about the resource files used by the project.
 * @version 0.0.1.7
 */

package cvmd2html {

  internal abstract class Package {

    /// <summary>The project root path.</summary>
    private static var _root: String = System.AppContext.BaseDirectory;

    /// <summary>The project resources directory path.</summary>
    private static var _resourcePath: String = Path.Combine(_root, 'rsc');

    private static var _htmlLibraryPath: String = Path.Combine(_resourcePath, 'showdown.html');

    private static var _jsLibraryPath: String = Path.Combine(_resourcePath, 'showdown.min.js');

    private static var _menuIconPath: String = Program.Path;

    /// <summary>The html file that embeds the JS library path.</summary>
    internal static function get HtmlLibraryPath(): String {
      return _htmlLibraryPath;
    }

    /// <summary>The showdown.js library path.</summary>
    internal static function get JsLibraryPath(): String {
      return _jsLibraryPath;
    }

    /// <summary>The shortcut menu icon path.</summary>
    internal static function get MenuIconPath(): String {
      return _menuIconPath;
    }
  }
}