/**
 * @file Entry point
 * @version 0.0.1.7
 */

import cvmd2html;

Program.Main(Convert.ToNativeArray(Environment.GetCommandLineArgs(), Type.GetTypeHandle(new String())).slice(1));