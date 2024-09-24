/**
 * @file Entry point
 * @version 0.0.1.3
 */

Program.Main(Convert.ToNativeArray(Environment.GetCommandLineArgs(), Type.GetTypeHandle(new String())).slice(1));