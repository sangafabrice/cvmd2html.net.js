/**
 * @file the imports and the assembly location.
 * @version 0.0.1.5
 */

@cc_on

import System.Management;
@if (@Win32ProcessWim)
import System.Diagnostics;
@else
import System.Reflection;
import System;
import System.IO;
import System.Text;
import System.Drawing;
import System.Windows.Forms;
import System.Runtime.InteropServices;
import Microsoft.Win32;
import Shell32;
import ROOT.CIMV2.WIN32;
@end