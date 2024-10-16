/**
 * @file returns the method to convert from markdown to html.
 * @version 0.0.1.8
 */

package cvmd2html {

  internal abstract class Converter {

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
      // Build the HTML document that will load the showdown.js library.
      with (new WebBrowser()) {
        ScriptErrorsSuppressed = true;
        Navigate('about:blank');
        var document = Document;
      }
      document.Write(new ResourceManager('Resource', Assembly.GetExecutingAssembly()).GetString('LoadHtml'));
      return document.InvokeScript('convertMarkdown', Object[]([markdownContent]));
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
}