/**
 * @file the imports and the assembly location.
 * @version 0.0.1.9
 */

import System.Runtime.InteropServices;
import System.Diagnostics;
import System;
import System.Reflection;
import System.Reflection.Emit;
import cvmd2html;

var AssemblyLocation = Assembly.GetExecutingAssembly().Location;

var FileSystem = new FileSystemObjectClass();
var WshShell = new WshShellClass();