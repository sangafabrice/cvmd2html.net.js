/**
 * @file Class entry called in index.js.
 * @version 0.0.1.12
 */

package cvmd2html {

  abstract class Program {

    static function Main(): void {

      /** The application execution. */
      if (Param.Markdown) {
        RunRunspace(Param.Markdown);
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

    private static var _runspaceIsComplete: Boolean = false;

    /// <summary>Execute the target powershell script in a runspace.</summary>
    /// <param name="markdownPath">The input markdown path.</param>
    private static function RunRunspace(markdownPath: String) {
      var sessionState: InitialSessionState = InitialSessionState.CreateDefault2();
      sessionState.Variables.Add(new SessionStateVariableEntry('MarkdownPath', markdownPath, ""));
      var powershell: PowerShell = PowerShell.Create(sessionState);
      powershell.add_InvocationStateChanged(OnStateChanged);
      // Execute the target PowerShell script with the markdown path argument in the runspace.
      powershell.AddScript(Resource.cvmd2html).BeginInvoke();
      while (!_runspaceIsComplete) {
        Thread.Sleep(1000);
      }
    }

    /// <summary>The runspace StateChanged event handler.</summary>
    private static function OnStateChanged(sender: Object, e: PSInvocationStateChangedEventArgs) {
      try {
        if (e.InvocationStateInfo.State == PSInvocationState.Failed) {
        (function() {
          var error = e.InvocationStateInfo.Reason;
          var errorText: StringBuilder = new StringBuilder(e.InvocationStateInfo.Reason.Message);
          // Handle validation error on the MarkdownPath parameter.
          if (error.GetType().FullName == 'System.Management.Automation.ParameterBindingValidationException' && !String.Compare(ParameterBindingException(error).ParameterName, 'MarkdownPath', true) && String(errorText).StartsWith('Cannot Validate', StringComparison.InvariantCultureIgnoreCase)) {
            var errorTextSegments: String[] = String(errorText).Split(String[](['. ']), StringSplitOptions.RemoveEmptyEntries);
            errorText.Clear();
            errorText.Append(errorTextSegments[0] + '. ');
            var errorTextEnd: String = errorTextSegments[errorTextSegments.length - 1];
            var textFormat: String = null;
            if (errorTextEnd.StartsWith('Supply an argument that matches', StringComparison.InvariantCultureIgnoreCase)) {
              textFormat = 'The extension of "{0}" is invalid. ".md" is required.';
            } else if (errorTextEnd.StartsWith('Determine why the validation script failed', StringComparison.InvariantCultureIgnoreCase)) {
              textFormat = 'The input file "{0}" is not found.';
            }
            if (!String.IsNullOrEmpty(textFormat)) {
              MessageBox.Show(errorText.AppendFormat(textFormat, Param.Markdown), 'Convert to HTML', MessageBoxButtons.OK, MessageBoxIcon.Error);
              return;
            }
          }
          throw error;
        })();
        }
      } finally {
        if (System.Array.BinarySearch(System.Array([PSInvocationState.NotStarted, PSInvocationState.Running, PSInvocationState.Running]), e.InvocationStateInfo.State) < 0) {
          _runspaceIsComplete = true;
        }
      }
    }
  }
}