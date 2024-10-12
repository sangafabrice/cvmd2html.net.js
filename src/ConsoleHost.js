/**
 * @file returns the shortcut target script runner watcher.
 * @version 0.0.1.4
 */

package cvmd2html {

  internal abstract class ConsoleHost {

    private static var _pwshExePath: String;

    private static var _pwshScriptPath: String;

    /// <summary>A factory method to construct the runner host object.</summary>
    /// <param name="pwshExePath">The powershell core path.</param>
    /// <param name="pwshScriptPath">The target powershell script path.</param>
    internal static function Create(pwshExePath: String, pwshScriptPath: String) {
      _pwshExePath = pwshExePath;
      _pwshScriptPath = pwshScriptPath;
    }

    /// <summary>Execute the runner of the shortcut target script and wait for its exit.</summary>
    /// <param name="markdownPath">The input markdown file path.</param>
    internal static function StartWith(markdownPath: String) {
      var pwshStartInfo: ProcessStartInfo = new ProcessStartInfo(_pwshExePath, String.Format('-nop -ep Bypass -w Hidden -cwa "try {{ Import-Module $args[0]; {2} -MarkdownPath $args[1] }} catch {{ Write-Error $_.Exception.Message }}" "{0}" "{1}"', _pwshScriptPath, markdownPath, Path.GetFileNameWithoutExtension(_pwshScriptPath)));
      // Redirect streams to the launcher process.
      with (pwshStartInfo) {
        RedirectStandardOutput = true;
        RedirectStandardInput = true;
        RedirectStandardError = true;
        CreateNoWindow = true;
        UseShellExecute = false;
      }
      WaitForExit(pwshStartInfo);
    }

    /// <summary>Observe when the child process exits with or without an error.</summary>
    /// <param name="pwshStartInfo">The PowerShell Core process or child process startup configuration.</param>
    private static function WaitForExit(pwshStartInfo: ProcessStartInfo) {
      var pwshExe: Process = new Process();
      pwshExe.StartInfo = pwshStartInfo;
      // Register the event handlers.
      pwshExe.EnableRaisingEvents = true;
      pwshExe.add_OutputDataReceived((new ConsoleData(MessageBox.GetMethod('Show', BindingFlags(BindingFlags.Static | BindingFlags.NonPublic), null, Type[](["".GetType(), MessageBox.WARNING.GetType()]), new ParameterModifier[2]), MessageBox.WARNING)).HandleOutputDataReceived);
      // Start the child process.
      with (pwshExe) {
        Start();
        BeginOutputReadLine();
        WaitForExit();
      }
      // When the process terminated with an error.
      if (pwshExe.ExitCode) {
        HandleErrorDataReceived(pwshExe.StandardError.ReadToEnd());
      }
      with (pwshExe) {
        Close();
        Dispose();
      }
    }

    private static class ConsoleData {

      /// <summary>The expected prompt from the console host.</summary>
      private var _overwritePromptText: StringBuilder = new StringBuilder();
      
      /// <summary>The message box method.</summary>
      private var _messageBoxMethod: MethodInfo;
      
      /// <summary>The message box type.</summary>
      private var _messageBoxType: MessageBoxIcon;

      private var MESSAGEBOX_CLASS_BINDING: Object = null;

      function ConsoleData(messageBoxMethod: MethodInfo, messageBoxType: MessageBoxIcon) {
        _messageBoxMethod = messageBoxMethod;
        _messageBoxType = messageBoxType;
      }

      /// <summary>Show the overwrite prompt that the child process sends. Handle the event when the
      /// PowerShell Core (child) process redirects output to the parent Standard Output stream.</summary>
      function HandleOutputDataReceived(pwshExe: Object, e: DataReceivedEventArgs) {
        var outData: String = e.Data;
        if (!String.IsNullOrEmpty(outData)) {
          // Show the message box when the text line is a question.
          // Otherwise, append the text line to the overall message text variable.
          if (outData.TrimEnd().EndsWith('?')) {
            _overwritePromptText.AppendLine();
            _overwritePromptText.AppendLine(outData);
            // Write the user's choice to the child process console host.
            pwshExe.StandardInput.WriteLine(_messageBoxMethod.Invoke(null, [_overwritePromptText.ToString(), _messageBoxType]));
            // Optional
            _overwritePromptText.Clear();
          } else {
            _overwritePromptText.AppendLine(outData);
          }
        }
      }
    }

    /// <summary>Show the error message that the child process writes on the console host.</summary>
    /// <param name="errData">The error message text.</param>
    private static function HandleErrorDataReceived(errData: String) {
      if (errData.length) {
        // Remove the ANSI color tag characters from the error message data text.
        errData = errData.replace(/(\x1B\[31;1m)|(\x1B\[0m)/g, '');
        MessageBox.Show(errData.Substring(errData.IndexOf(':') + 2));
      }
    }
  }
}