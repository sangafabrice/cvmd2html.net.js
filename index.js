/**
 * @file Watches the console host running the shortcut target powershell script.
 * @version 0.0.1.7
 */

/** The application execution. */
if (Param.Markdown) {
  CreateConsoleHost(Package.PwshExePath, Package.PwshScriptPath).StartWith(Param.Markdown);
  quit(0);
}