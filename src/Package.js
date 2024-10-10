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

    private static var _pwshScriptPath: String = Path.Combine(_resourcePath, 'cvmd2html.ps1');

    private static var _menuIconPath: String = Program.Path;

    /// <summary>The shortcut target powershell script path.</summary>
    internal static function get PwshScriptPath(): String {
      return _pwshScriptPath;
    }

    /// <summary>The shortcut menu icon path.</summary>
    internal static function get MenuIconPath(): String {
      return _menuIconPath;
    }
  }
}