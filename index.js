/**
 * @file Converts to html from markdown using a JavaScript library.
 * @version 0.0.1.10
 */

/** The application execution. */
if (Param.Markdown) {
  CreateConverter(Package.HtmlLibraryPath).ConvertFrom(Param.Markdown);
  quit(0);
}