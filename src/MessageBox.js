/**
 * @file returns the markdown conversion message box.
 * @version 0.0.1.4
 */

package cvmd2html {

  internal abstract class MessageBox {

    /// <summary>The warning message type.</summary>
    static var WARNING: MessageBoxIcon = MessageBoxIcon.Exclamation;

    /// <summary>The help message type.</summary>
    static var HELP: MessageBoxIcon = MessageBoxIcon.None;

    /// <summary>Show a warning message or an error message box.</summary>
    /// <remarks>The function quits the application if the message box is an error.</remarks>
    /// <param name="message">The message text.</param>
    /// <param name="messageType">The message box type.</param>
    static function Show(message: String, messageType: MessageBoxIcon): String {
      if (System.Array.BinarySearch(EXPECTED_MESSAGETYPE, messageType) < 0) {
        messageType = CRITICAL;
      }
      // The error message box shows the OK button alone.
      // The warning message box shows the alternative Yes or No buttons.
      if (System.Array.BinarySearch(EXPECTED_DIALOGRESULT, System.Windows.Forms.MessageBox.Show(message, MESSAGE_BOX_TITLE, MessageBoxButtons(messageType == CRITICAL || messageType == HELP ? MessageBoxButtons.OK:MessageBoxButtons.YesNo), messageType)) >= 0) {
        Program.Quit(1);
      }
    }

    /// <see cref="Show">Set the Error message type as the default.</see>
    static function Show(message: String): void {
      Show(message, CRITICAL);
    }

    /// <summary>The uniform message box title.</summary>
    private static var MESSAGE_BOX_TITLE: String = 'Convert to HTML';

    /// <summary>The list of Dialog Results that lead to quit the application.</summary>
    /// <remarks>Do not remove repetition. It is there to solve a bug.</remarks>
    private static var EXPECTED_DIALOGRESULT: System.Array = [DialogResult.OK, DialogResult.No, DialogResult.No];

    /// <summary>The list of expected message types.</summary>
    /// <remarks>Do not remove repetition. It is there to solve a bug.</remarks>
    private static var EXPECTED_MESSAGETYPE: System.Array = [CRITICAL, WARNING, HELP, HELP];

    /// <summary>The error message type.</summary>
    private static var CRITICAL: MessageBoxIcon = MessageBoxIcon.Error;
  }
}