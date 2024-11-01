/**
 * @file Launches the shortcut target PowerShell script with the selected markdown as an argument.
 * It aims to eliminate the flashing console window when the user clicks on the shortcut menu.
 * @version 0.0.1.5
 */

/** The application execution. */
if (Param.Markdown) {
  var WINDOW_STYLE_HIDDEN = 0;
  var startInfo = SWbemService.Get('Win32_ProcessStartup').SpawnInstance_();
  startInfo.ShowWindow = WINDOW_STYLE_HIDDEN;
  var processService = SWbemService.Get('Win32_Process');
  var createMethod = processService.Methods_.Item('Create');
  var inParam = createMethod.InParameters.SpawnInstance_();
  inParam.CommandLine = format('C:\\Windows\\System32\\cmd.exe /d /c ""{0}" 2> "{1}""', [Package.IconLink.Path, ErrorLog.Path]);
  inParam.ProcessStartupInformation = startInfo;
  Package.IconLink.Create(Param.Markdown);
  waitForChildExit(processService.ExecMethod_(createMethod.Name, inParam).ProcessId);
  Package.IconLink.Delete();
  ErrorLog.Read();
  ErrorLog.Delete();
  Marshal.FinalReleaseComObject(inParam);
  Marshal.FinalReleaseComObject(createMethod);
  Marshal.FinalReleaseComObject(processService);
  Marshal.FinalReleaseComObject(startInfo);
  startInfo = null;
  processService = null;
  createMethod = null;
  inParam = null;
  quit(0);
}

/**
 * Wait for the child process exit.
 * @param {number} parentProcessId is the parent process identifier.
 */
function waitForChildExit(parentProcessId) {
  // The process termination event query.
  // Select the process whose parent is the intermediate process used for executing the link.
  var wmiQuery = 'SELECT * FROM __InstanceDeletionEvent WITHIN 0.1 WHERE TargetInstance ISA "Win32_Process" AND TargetInstance.Name="pwsh.exe" AND TargetInstance.ParentProcessId=' + parentProcessId;
  // Wait for the process to exit.
  SWbemService.ExecNotificationQuery(wmiQuery).NextEvent();
}