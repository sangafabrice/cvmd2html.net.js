@set @MAJOR = 0
@set @MINOR = 0
@set @BUILD = 1
@set @REVISION = 13

import System.Reflection;
import System.Management;
import System;
import System.IO;
import System.Text;
import System.Drawing;
import System.Windows.Forms;
import System.Runtime.InteropServices;
import IWshRuntimeLibrary;
import ROOT.CIMV2;
import ROOT.CIMV2.Win32;

[assembly: AssemblyProduct('CvMd2Html Shortcut')]
[assembly: AssemblyInformationalVersion(@MAJOR + '.' + @MINOR + '.' + @BUILD + '.' + @REVISION)]
[assembly: AssemblyCopyright('© 2024 sangafabrice')]
[assembly: AssemblyCompany('sangafabrice')]
[assembly: AssemblyVersion(@MAJOR + '.' + @MINOR + '.' + @BUILD + '.' + @REVISION)]
[assembly: AssemblyTitle('CvMd2Html')]