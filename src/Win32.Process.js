/**
 * @file Process WMI class as inspired by mgmclassgen.exe.
 * @version 0.0.1.2
 */

package ROOT.CIMV2.WIN32 {

  abstract class Process {

    /**
     * Initializing the Process.CurrentDirectory causes an issue.
     * That is why I removed it from the method signature.
     */
    static function Create(CommandLine: String, ProcessStartupInformation: SWbemObject): uint {
      var stackTrace: StackTrace = new StackTrace();
      var methodName: String = Util.GetMethodName(stackTrace);
      var classObj: SWbemObject = (new SWbemLocatorClass()).ConnectServer().Get('Win32_Process');
      var inParams = null;
      inParams = classObj.Methods_.Item(methodName).InParameters.SpawnInstance_();
      inParams.Properties_.Item('CommandLine').Value = CommandLine;
      inParams.Properties_.Item('ProcessStartupInformation').Value = ProcessStartupInformation;
      try {
        return classObj.ExecMethod_(methodName, inParams).Properties_.Item('ProcessId').Value;
      } finally {
        Marshal.FinalReleaseComObject(classObj);
        Marshal.FinalReleaseComObject(inParams);
        classObj = null;
        inParams = null;
      }
    }

    /**
     * Use-case specific method. ProcessStartupInformation is made optional.
     */
    static function Create(CommandLine: String): uint {
      return Create(CommandLine, ProcessStartup.CreateInstance());
    }

    /**
     * Wait for the child process exit.
     * @param {number} ParentProcessId is the parent process identifier.
     */
    static function WaitForChildExit(ParentProcessId: uint) {
      var wmiService: SWbemServices = (new SWbemLocatorClass()).ConnectServer();
      var wmiQuery: String = 'SELECT * FROM Win32_Process WHERE Name="pwsh.exe" AND ParentProcessId=' + ParentProcessId;
      var getProcess = function() {
        return (new Enumerator(wmiService.ExecQuery(wmiQuery))).item();
      }
      // Wait for the process to start.
      while (getProcess() == null) { }
      // Wait for the process to exit.
      while (getProcess() != null) { }
      Marshal.FinalReleaseComObject(wmiService);
      wmiService = null;
    }
  }

  abstract class ProcessStartup {

    /**
     * We change the default value of the ProcessStartup instance to HIDDEN.
     */
    static function CreateInstance(): SWbemObject {
      var WINDOW_STYLE_HIDDEN: uint = 0;
      var startInfo = null;
      startInfo = (new SWbemLocatorClass()).ConnectServer().Get('Win32_ProcessStartup').SpawnInstance_();
      startInfo.Properties_.Item('ShowWindow').Value = WINDOW_STYLE_HIDDEN;
      return startInfo;
    }
  }
}