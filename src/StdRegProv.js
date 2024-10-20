/**
 * @file StdRegProv WMI class as inspired by mgmclassgen.exe.
 * @version 0.0.1.3
 */

package cvmd2html {

  abstract class StdRegProv {

    private static var CreatedClassName: String = 'StdRegProv';

    static function DeleteKey(hDefKey: uint, sSubKeyName: String): uint {
      var stackTrace: StackTrace = new StackTrace();
      var methodName: String = Util.GetMethodName(stackTrace);
      var classObj: SWbemObject = (new SWbemLocatorClass()).ConnectServer().Get(CreatedClassName);
      var inParams = null;
      inParams = classObj.Methods_.Item(methodName).InParameters.SpawnInstance_();
      inParams.Properties_.Item('hDefKey').Value = int(hDefKey);
      inParams.Properties_.Item('sSubKeyName').Value = sSubKeyName;
      try {
        return classObj.ExecMethod_(methodName, inParams).Properties_.Item('ReturnValue').Value;
      } finally {
        Marshal.FinalReleaseComObject(classObj);
        Marshal.FinalReleaseComObject(inParams);
        classObj = null;
        inParams = null;
      }
    }

    static function EnumKey(hDefKey: uint, sSubKeyName: String): String[] {
      var stackTrace: StackTrace = new StackTrace();
      var methodName: String = Util.GetMethodName(stackTrace);
      var classObj: SWbemObject = (new SWbemLocatorClass()).ConnectServer().Get(CreatedClassName);
      var inParams = null;
      inParams = classObj.Methods_.Item(methodName).InParameters.SpawnInstance_();
      inParams.Properties_.Item('hDefKey').Value = int(hDefKey);
      inParams.Properties_.Item('sSubKeyName').Value = sSubKeyName;
      try {
        var sNames = classObj.ExecMethod_(methodName, inParams).Properties_.Item('sNames').Value;
        if (sNames == null) {
          return null;
        }
        var sNameStr: String[] = new String[sNames.length];
        for (var index = 0; index < sNames.length; index++) {
          sNameStr[index] = sNames[index];
        }
        return sNameStr;
      } finally {
        Marshal.FinalReleaseComObject(classObj);
        Marshal.FinalReleaseComObject(inParams);
        classObj = null;
        inParams = null;
      }
    }

    /**
     * Remove the key and all descendant subkeys.
     * @borrows DeleteKey as DeleteKeyTree
     */
    static function DeleteKeyTree(hDefKey: uint, sSubKeyName: String): uint {
      var returnValue: uint = 0;
      var sNames = EnumKey(hDefKey, sSubKeyName);
      if (sNames != null) {
        for (var index = 0; index < sNames.length; index++) {
          returnValue += DeleteKeyTree(hDefKey, sSubKeyName + '\\' + sNames[index]);
        }
      }
      return (returnValue += DeleteKey(hDefKey, sSubKeyName));
    }
  }

  internal abstract class Util {

    /**
     * Get the name of the method calling this method.
     * NOTE: the method should initialize the stackTrace variable in its scope
     * before calling GetMethodName. So avoid GetMethodName(new stackTrace()).
     * @param stackTrace is the stack trace from the calling method.
     * @returns the name of the caller method.
     */
    public static function GetMethodName(stackTrace: StackTrace): String {
      return stackTrace.GetFrame(0).GetMethod().Name;
    }
  }
}