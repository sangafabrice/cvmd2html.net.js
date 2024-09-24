/**
 * @file the imports and the assembly location.
 * @version 0.0.1.4
 */

import System;
import System.Runtime.InteropServices;
import System.Reflection;

var AssemblyLocation = Assembly.GetExecutingAssembly().Location;

/** @typedef {object} FileSystem */
var FileSystem = new ActiveXObject('Scripting.FileSystemObject');
/** @typedef {object} WshShell */
var WshShell = new ActiveXObject('WScript.Shell');