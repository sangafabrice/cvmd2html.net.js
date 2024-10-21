/**
 * @file Class entry called in index.js.
 * @version 0.0.1.11
 */

package cvmd2html {

  abstract class Program {

    static function Main(): void {

      /** The application execution. */
      if (Param.Markdown) {
        RunRunspace(Package.PwshScriptPath, Param.Markdown);
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

    private static var _runspace: Runspace;

    private static var _runspaceIsComplete: Boolean = false;

    /// <summary>Execute the target powershell script in a runspace.</summary>
    /// <param name="pwshScriptPath">The powershell path.</param>
    /// <param name="markdownPath">The input markdown path.</param>
    private static function RunRunspace(pwshScriptPath: String, markdownPath: String) {
      _runspace = RunspaceFactory.CreateRunspace();
      _runspace.Open();
      var pipeline: Pipeline = _runspace.CreatePipeline();
      // Execute the target PowerShell script with the markdown path argument in the runspace.
      pipeline.Commands.AddScript('$input | ForEach-Object { try { & $_[0] -Markdown $_[1] } catch { throw $_.Exception } }');
      var pipWriter: PipelineWriter = pipeline.Input;
      pipWriter.Write([pwshScriptPath, markdownPath]);
      pipWriter.Close();
      pipeline.add_StateChanged(OnStateChanged);
      pipeline.InvokeAsync();
      while (!_runspaceIsComplete) {
        System.Threading.Thread.Sleep(1000);
      }
    }

    /// <summary>The runspace StateChanged event handler.</summary>
    private static function OnStateChanged(sender: Object, e: PipelineStateEventArgs) {
      try {
        if (e.PipelineStateInfo.State == PipelineState.Failed) {
        (function() {
          var error = e.PipelineStateInfo.Reason;
          var errorText: StringBuilder = new StringBuilder(e.PipelineStateInfo.Reason.Message);
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
        if (System.Array.BinarySearch(System.Array([PipelineState.NotStarted, PipelineState.Running, PipelineState.Running]), e.PipelineStateInfo.State) < 0) {
          // Clean up
          _runspace.Close();
          _runspace.Dispose();
          _runspaceIsComplete = true;
        }
      }
    }
  }
}