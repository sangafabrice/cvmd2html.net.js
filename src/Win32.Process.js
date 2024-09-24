/**
 * @file Process WMI class as inspired by mgmclassgen.exe.
 * @version 0.0.1.6
 */

package cvmd2html {

  internal abstract class Process {

    /// <remarks>
    /// Initializing the Process.CurrentDirectory causes an issue.
    /// That is why I removed it from the method signature.
    /// </remarks>
    static function Create(CommandLine: String): uint {
      var methodName: String = (new StackTrace()).GetFrame(0).GetMethod().Name;
      var classObj: ManagementClass = new ManagementClass('Win32_Process');
      var inParams: ManagementBaseObject = classObj.GetMethodParameters(methodName);
      inParams['CommandLine'] = CommandLine;
      var WINDOW_STYLE_HIDDEN: uint = 0;
      var startInfo: ManagementBaseObject = (new ManagementClass('Win32_ProcessStartup')).CreateInstance();
      startInfo['ShowWindow'] = WINDOW_STYLE_HIDDEN;
      inParams['ProcessStartupInformation'] = startInfo;
      return classObj.InvokeMethod(methodName, inParams, null).Properties['ProcessId'].Value;
    }

    /// <summary>Wait for the child process exit.</summary>
    /// <param name="ParentProcessId">The parent process identifier.</param>
    static function WaitForChildExit(ParentProcessId: uint) {
      // The process termination event query.
      // Select the process whose parent is the intermediate process used for executing the link.
      var wmiQuery = 'SELECT * FROM __InstanceDeletionEvent WITHIN 0.1 WHERE TargetInstance ISA "Win32_Process" AND TargetInstance.Name="pwsh.exe" AND TargetInstance.ParentProcessId=' + ParentProcessId;
      // Wait for the process to exit.
      (new ManagementEventWatcher(wmiQuery)).WaitForNextEvent();
    }
  }
}