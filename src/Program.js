/**
 * @file Class entry called in index.js.
 * @version 0.0.1.6
 */

package cvmd2html {

  abstract class Program {

    static function Main(): void {

      /** The application execution. */
      if (Param.Markdown) {
        Package.IconLink.Create(Param.Markdown);
        if (RunIconLink(Package.IconLink.Path, ErrorLog.Path)) {
          ErrorLog.Read();
          ErrorLog.Delete();
        }
        Package.IconLink.Delete();
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

    /// <summary>Execute the icon link.</summary>
    /// <param name="iconLinkPath">The icon link file path.</param>
    /// <param name="errorLogPath">The error log file path.</param>
    /// <returns>The exit status.</returns>
    private static function RunIconLink(iconLinkPath: String, errorLogPath: String): uint {
      var appStartInfo: ProcessStartInfo = new ProcessStartInfo('C:\\Windows\\System32\\cmd.exe', String.Format('/d /c ""{0}" 2> "{1}""', iconLinkPath, errorLogPath));
      appStartInfo.WindowStyle = ProcessWindowStyle.Hidden;
      with (Process.Start(appStartInfo)) {
        WaitForExit();
        return ExitCode;
      }
    }
  }
}