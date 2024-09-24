/**
 * @file Converts to html from markdown using a JavaScript library.
 * @version 0.0.1.8
 */

/** The application execution. */
if (Param.Markdown) {
  CreateConverter(Package.JsLibraryPath).ConvertFrom(Param.Markdown);
  quit(0);
}