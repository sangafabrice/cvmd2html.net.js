/**
 * @file the imports and the assembly location.
 * @version 0.0.1.4
 */

import System;
import System.Runtime.InteropServices;
import System.Reflection;
import Microsoft.VisualBasic.FileIO;
import Microsoft.VisualBasic;

var AssemblyLocation = Assembly.GetExecutingAssembly().Location;

/** @typedef {object} WshShell */
var WshShell = Interaction.CreateObject('WScript.Shell');
/** @typedef {object} Scriptlet */
var Scriptlet = Interaction.CreateObject('Scriptlet.TypeLib');
/** @typedef {object} StdRegProv */
var StdRegProv = Interaction.GetObject('winmgmts:StdRegProv');