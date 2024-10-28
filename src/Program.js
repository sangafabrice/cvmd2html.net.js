/**
 * @file Class entry called in index.js.
 * @version 0.0.1.41
 */

package cvmd2html {

  abstract class Program {

    static function Main(args: String[]): void {
      Param.Parse(args);

      /** The application execution. */
      if (Param.Markdown) {
        Converter.ConvertFrom(Param.Markdown);
        App.Quit(0);
      }

      /** Configuration and settings. */
      if (Param.Set || Param.Unset) {
        if (Param.Set) {
          Setup.Set();
          if (Param.NoIcon) {
            Setup.RemoveIcon();
          } else {
            Setup.AddIcon();
          }
        } else if (Param.Unset) {
          Setup.Unset();
        }
        App.Quit(0);
      }

      App.Quit(1);
    }

    private static abstract class App {

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

    private static abstract class MessageBox {

      /// <summary>The warning message type.</summary>
      internal static function get WARNING(): MessageBoxImage {
        return MessageBoxImage.Exclamation;
      }

      /// <summary>The help message type.</summary>
      internal static function get HELP(): MessageBoxImage {
        return MessageBoxImage.None;
      }

      /// <summary>Show a warning message or an error message box.</summary>
      /// <remarks>The function quits the application if the message box is an error.</remarks>
      /// <param name="message">The message text.</param>
      /// <param name="messageType">The message box type.</param>
      internal static function Show(message: String, messageType: MessageBoxImage) {
        if (System.Array.BinarySearch(EXPECTED_MESSAGETYPE, messageType) < 0) {
          messageType = CRITICAL;
        }
        // The error message box shows the OK button alone.
        // The warning message box shows the alternative Yes or No buttons.
        if (System.Array.BinarySearch(EXPECTED_DIALOGRESULT, System.Windows.MessageBox.Show(message, MESSAGE_BOX_TITLE, MessageBoxButton(messageType == CRITICAL || messageType == HELP ? MessageBoxButton.OK:MessageBoxButton.YesNo), messageType)) >= 0) {
          App.Quit(1);
        }
      }

      /// <see cref="Show">Set the Error message type as the default.</see>
      internal static function Show(message: String): void {
        Show(message, CRITICAL);
      }

      /// <summary>The uniform message box title.</summary>
      private static var MESSAGE_BOX_TITLE: String = 'Convert to HTML';

      /// <summary>The list of Dialog Results that lead to quit the application.</summary>
      /// <remarks>Do not remove repetition. It is there to solve a bug.</remarks>
      private static var EXPECTED_DIALOGRESULT: System.Array = [MessageBoxResult.OK, MessageBoxResult.No, MessageBoxResult.No];

      /// <summary>The list of expected message types.</summary>
      /// <remarks>Do not remove repetition. It is there to solve a bug.</remarks>
      private static var EXPECTED_MESSAGETYPE: System.Array = [CRITICAL, WARNING, HELP, HELP];

      /// <summary>The error message type.</summary>
      private static var CRITICAL: MessageBoxImage = MessageBoxImage.Error;
    }

    private static abstract class Param {

      /// <summary>Parse the command line arguments.</summary>
      /// <param name="args">The command line arguments array.</param>
      internal static function Parse(args: String[]) {
        _param = ParseCommandLine(args)
      }

      /// <summary>The parameter object.</summary>
      private static var _param: Object = null;

      /// <summary>Get the input markdown path.</summary>
      /// <remarks>It is an object as an alternative to nullable string.</remarks>
      internal static function get Markdown(): Object {
        return _param.Markdown;
      }

      /// <summary>Specify to configure the shortcut in the registry.</summary>
      internal static function get Set(): Boolean {
        return _param.Set;
      }

      /// <summary>Specify to remove the shortcut menu.</summary>
      internal static function get Unset(): Boolean {
        return _param.Unset;
      }

      /// <summary>Specify to configure the shortcut without the icon.</summary>
      internal static function get NoIcon(): Boolean {
        return _param.NoIcon;
      }

      /// <summary>Parse the command line arguments.</summary>
      /// <param name="args">The command line arguments array.</param>
      /// <returns>The application parameters.</returns>
      private static function ParseCommandLine(args: String[]): Object {
        if (args.length == 1) {
          var arg: String = args[0];
          var paramNameValue: String[] = arg.Split(char[]([':']),2);
          var paramMarkdown: String = '';
          if (paramNameValue.length == 2 && !String.Compare(paramNameValue[0], '/Markdown', true) && (paramMarkdown = paramNameValue[1]).length > 0) {
            return {
              Markdown: paramMarkdown
            }
          }
          switch (arg.ToLower()) {
            case '/set':
              return {
                Set: true,
                NoIcon: false
              }
            case '/set:noicon':
              return {
                Set: true,
                NoIcon: true
              }
            case '/unset':
              return {
                Unset: true
              }
            default:
              return {
                Markdown: arg
              }
          }
        } else if (args.length == 0) {
          return {
            Set: true,
            NoIcon: false
          }
        }
        ShowHelp();
      }

      /// <summary>Show help and quit.</summary>
      private static function ShowHelp() {
        var helpTextBuilder: StringBuilder = new StringBuilder();
        with (helpTextBuilder) {
          AppendLine('The MarkdownToHtml shortcut launcher.');
          AppendLine('It starts the shortcut menu target script in a hidden window.');
          AppendLine();
          AppendLine('Syntax:');
          AppendLine('  Convert-MarkdownToHtml /Markdown:<markdown file path>');
          AppendLine('  Convert-MarkdownToHtml [/Set[:NoIcon]]');
          AppendLine('  Convert-MarkdownToHtml /Unset');
          AppendLine('  Convert-MarkdownToHtml /Help');
          AppendLine();
          AppendLine("<markdown file path>  The selected markdown's file path.");
          AppendLine('                 Set  Configure the shortcut menu in the registry.');
          AppendLine('              NoIcon  Specifies that the icon is not configured.');
          AppendLine('               Unset  Removes the shortcut menu.');
          AppendLine('                Help  Show the help doc.');
        }
        MessageBox.Show(helpTextBuilder, MessageBox.HELP);
        App.Quit(1);
      }
    }

    private static abstract class Converter {

      /// <summary>Convert the content of the markdown file and write it to an html file.</summary>
      /// <param name="markdownPath">The input markdown file path.</param>
      internal static function ConvertFrom(markdownPath: String) {
        // Validate the input markdown path string.
        if (String.Compare(Path.GetExtension(markdownPath), '.md', true)) {
          MessageBox.Show(String.Format('"{0}" is not a markdown (.md) file.', markdownPath));
        }
        SetHtmlContent(GetHtmlPath(markdownPath), ConvertToHtml(GetContent(markdownPath)));
      }

      /// <summary>Convert a markdown content to an html document.</summary>
      /// <param name="markdownContent">The content to convert.</param>
      /// <returns>The output html document content.</returns>
      private static function ConvertToHtml(markdownContent: String): String {
        return Markdown.ToHtml(markdownContent);
      }

      /// <summary>Returns the output path when it is unique without prompts or when the user
      /// accepts to overwrite an existing HTML file. Otherwise, it exits the script.</summary>
      /// <param name="markdownPath">The input markdown file path.</param>
      /// <returns>The output html document content.</returns>
      private static function GetHtmlPath(markdownPath: String): String {
        var htmlPath: String = Path.ChangeExtension(markdownPath, '.html');
        if (File.Exists(htmlPath)) {
          MessageBox.Show(String.Format('The file "{0}" already exists.\n\nDo you want to overwrite it?', htmlPath), MessageBox.WARNING);
        } else if (Directory.Exists(htmlPath)) {
          MessageBox.Show(String.Format('"{0}" cannot be overwritten because it is a directory.', htmlPath));
        }
        return htmlPath;
      }

      /// <summary>Get the content of a file.</summary>
      /// <param name="filePath">The path that is read.</param>
      /// <returns>The content of the file.</returns>
      private static function GetContent(filePath: String): String {
        try {
          return File.ReadAllText(filePath);
        } catch (error: UnauthorizedAccessException) {
          if (!Directory.Exists(filePath)) {
            MessageBox.Show(error.Message);
          }
          MessageBox.Show(String.Format("Access to the path '{0}' is denied.", filePath));
        } catch (error: Exception) {
          MessageBox.Show(error.Message);
        }
      }

      /// <summary>Write the html text to the output HTML file.</summary>
      /// <remarks>It notifies the user when the operation did not complete with success.</remarks>
      /// <param name="htmlPath">The output html path.</param>
      /// <param name="htmlContent">The content of the html file.</param>
      /// <returns>The content of the file.</returns>
      private static function SetHtmlContent(htmlPath: String, htmlContent: String) {
        try {
          File.WriteAllText(htmlPath, htmlContent);
        } catch (error: Exception) {
          MessageBox.Show(error.Message);
        }
      }
    }

    private static abstract class Setup {

      /// <summary>The HKCU hive.</summary>
      private static var HKCU: RegistryKey = Registry.CurrentUser;

      /// <summary>The shell subkey.</summary>
      private static var SHELL_SUBKEY: String = 'SOFTWARE\\Classes\\SystemFileAssociations\\.md\\shell';

      /// <summary>The verb to configure.</summary>
      private static var VERB: String = 'cthtml';

      /// <summary>The verb subkey.</summary>
      private static var VERB_SUBKEY: String = String.Format('{0}\\{1}', SHELL_SUBKEY, VERB);

      /// <summary>The verb full key.</summary>
      private static var VERB_KEY: String = String.Format('{0}\\{1}', HKCU, VERB_SUBKEY);

      /// <summary>The icon property name of the the verb registry key.</summary>
      private static var ICON_VALUENAME: String = 'Icon';

      /// <summary>Configure the shortcut menu in the registry.</summary>
      internal static function Set() {
        var COMMAND_KEY: String = VERB_KEY + '\\command';
        var command: String = String.Format('"{0}" /Markdown:"%1"', App.Path);
        Registry.SetValue(COMMAND_KEY, '', command);
        Registry.SetValue(VERB_KEY, '', 'Convert to &HTML');
      }

      /// <summary>Add an icon to the shortcut menu in the registry.</summary>
      internal static function AddIcon() {
        Registry.SetValue(VERB_KEY, ICON_VALUENAME, App.Path);
      }

      /// <summary>Remove the shortcut icon menu.</summary>
      /// <param name="menuIconPath">The shortcut menu icon file path.</param>
      internal static function RemoveIcon() {
        var VERB_KEY_OBJ: RegistryKey = HKCU.CreateSubKey(VERB_SUBKEY);
        if (VERB_KEY_OBJ) {
          VERB_KEY_OBJ.DeleteValue(ICON_VALUENAME, false);
          VERB_KEY_OBJ.Close();
        }
      }

      /// <summary>Remove the shortcut menu by removing the verb key and subkeys.</summary>
      internal static function Unset() {
        var SHELL_KEY_OBJ: RegistryKey = HKCU.CreateSubKey(SHELL_SUBKEY);
        if (SHELL_KEY_OBJ) {
          SHELL_KEY_OBJ.DeleteSubKeyTree(VERB, false);
          SHELL_KEY_OBJ.Close();
        }
      }
    }
  }
}