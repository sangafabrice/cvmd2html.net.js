/**
 * @file Converts to html from markdown using a JavaScript library.
 * @version 0.0.1.6
 */

/** The application execution. */
if (Param.Markdown) {
  CreateConverter(Package.HtmlLibraryPath, Package.JsLibraryPath).ConvertFrom(Param.Markdown);
  quit(0);
}