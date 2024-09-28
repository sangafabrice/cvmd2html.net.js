/**
 * @file the imports and the assembly location.
 * @version 0.0.1.5
 */

import System;
import System.Runtime.InteropServices;
import System.Reflection;
import System.Drawing;
import System.Windows.Forms;

var AssemblyLocation = Assembly.GetExecutingAssembly().Location;

/** @typedef {object} FileSystem */
var FileSystem = new ActiveXObject('Scripting.FileSystemObject');
/** @typedef {object} WshShell */
var WshShell = new ActiveXObject('WScript.Shell');