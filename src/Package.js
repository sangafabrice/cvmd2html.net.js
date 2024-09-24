/**
 * @file returns information about the resource files used by the project.
 * @version 0.0.1.6
 */

package cvmd2html {

  internal abstract class Package {

    /// <summary>The project root path.</summary>
    private static var _root: String = System.AppContext.BaseDirectory;

    private static var _pwshScriptPath: String = Path.Combine(_root, 'cvmd2html.psd1');

    private static var _pwshExePath: String = Registry.GetValue('HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\pwsh.exe', null, null);

    private static var _menuIconPath: String = Program.Path;

    /// <summary>The shortcut target powershell script path.</summary>
    internal static function get PwshScriptPath(): String {
      return _pwshScriptPath;
    }

    /// <summary>The powershell core runtime path.</summary>
    internal static function get PwshExePath(): String {
      return _pwshExePath;
    }

    /// <summary>The shortcut menu icon path.</summary>
    internal static function get MenuIconPath(): String {
      return _menuIconPath;
    }
  }
}