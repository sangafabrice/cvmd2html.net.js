/**
 * @file the imports and the assembly location.
 * @version 0.0.1.8
 */

import System.Runtime.InteropServices;
import System.Diagnostics;
import WbemScripting;
import System;
import System.Reflection;
import System.Reflection.Emit;
import IWshRuntimeLibrary;
import mshtml;
import ADODB;
import ROOT.CIMV2;

var AssemblyLocation = Assembly.GetExecutingAssembly().Location;

var FileSystem = new FileSystemObjectClass();
var WshShell = new WshShellClass();