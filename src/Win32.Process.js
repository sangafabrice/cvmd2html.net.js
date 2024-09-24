/**
 * @file Process WMI class as inspired by mgmclassgen.exe.
 * @version 0.0.1.4
 */

package ROOT.CIMV2.WIN32 {

  abstract class Process {

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
      var wmiQuery = 'SELECT * FROM Win32_Process WHERE Name="pwsh.exe" AND ParentProcessId=' + ParentProcessId;
      var getProcessCount: Function = function() {
        return (new ManagementObjectSearcher(wmiQuery)).Get().Count;
      }
      // Wait for the process to start.
      while (getProcessCount() == 0) { }
      // Wait for the process to exit.
      while (getProcessCount()) { }
    }
  }
}