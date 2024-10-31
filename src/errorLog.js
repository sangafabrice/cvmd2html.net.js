/**
 * @file manages the error log file and content.
 * @version 0.0.1.1
 */

/**
 * @typedef {object} ErrorLog
 * @property {string} Path is the randomly generated error log file path.
 */

/** @class */
var ErrorLog = {
  Path: FileSystem.BuildPath(WshShell.ExpandEnvironmentStrings('%TEMP%'), generateGuid() + '.tmp.log'),
  /**
   * Display the content of the error log file in a message box if it is not empty.
   */
  Read: function () {
    try {
      var txtStream = FileSystem.OpenTextFile(this.Path, IOMode.ForReading);
      // Read the error message and remove the ANSI escaped character for red coloring.
      var errorMessage = txtStream.ReadAll().replace(/(\x1B\[31;1m)|(\x1B\[0m)/g, '');
      if (errorMessage.length) {
        var OKONLY_BUTTON = 0;
        var ERROR_ICON = 16;
        var NO_TIMEOUT = 0;
        WshShell.Popup(errorMessage, NO_TIMEOUT, 'Convert to HTML', OKONLY_BUTTON + ERROR_ICON);
      }
    } catch (error) { }
    finally {
      if (txtStream) {
        txtStream.Close();
        Marshal.FinalReleaseComObject(txtStream);
        txtStream = null;
      }
    }
  },
  /**
   * Delete the error log file.
   */
  Delete: function () {
    try {
      FileSystem.DeleteFile(this.Path);
    } catch (error) { }
  }
}