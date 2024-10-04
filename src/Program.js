/**
 * @file Class entry called in index.js.
 * @version 0.0.1.8
 */

package cvmd2html {

  abstract class Program {

    static function Main(): void {

      /** The application execution. */
      if (Param.Markdown) {
        Converter.Create(Package.HtmlLibraryPath, Package.JsLibraryPath);
        Converter.ConvertFrom(Param.Markdown);
        Quit(0);
      }

      /** Configuration and settings. */
      if (Param.Set || Param.Unset) {
        if (Param.Set) {
          Setup.Set();
          if (Param.NoIcon) {
            Setup.RemoveIcon();
          } else {
            Setup.AddIcon(Package.MenuIconPath);
          }
        } else if (Param.Unset) {
          Setup.Unset();
        }
        Quit(0);
      }

      Quit(1);
    }

    private static var _assemblyLocation: String = Assembly.GetExecutingAssembly().Location;

    /// <summary>The assembly full path.</summary>
    internal static function get Path(): String {
      return _assemblyLocation;
    }

    /// <summary>Clean up and quit.</summary>
    /// <param name="exitCode">The exit code.</param>
    internal static function Quit(exitCode: int) {
      GC.Collect();
      Environment.Exit(exitCode);
    }
  }
}