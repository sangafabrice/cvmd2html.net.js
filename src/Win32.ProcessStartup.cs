namespace ROOT.CIMV2.Win32 {
    using System;
    using System.ComponentModel;
    using System.Management;
    using System.Collections;
    using System.Globalization;
    
    
    // Functions ShouldSerialize<PropertyName> are functions used by VS property browser to check if a particular property has to be serialized. These functions are added for all ValueType properties ( properties of type Int32, BOOL etc.. which cannot be set to null). These functions use Is<PropertyName>Null function. These functions are also used in the TypeConverter implementation for the properties to check for NULL value of property so that an empty value can be shown in Property browser in case of Drag and Drop in Visual studio.
    // Functions Is<PropertyName>Null() are used to check if a property is NULL.
    // Functions Reset<PropertyName> are added for Nullable Read/Write properties. These functions are used by VS designer in property browser to set a property to NULL.
    // Every property added to the class for WMI property has attributes set to define its behavior in Visual Studio designer and also to define a TypeConverter to be used.
    // An Early Bound class generated for the WMI class.Win32_ProcessStartup
    public class ProcessStartup : System.ComponentModel.Component {
        
        // Private property to hold the WMI namespace in which the class resides.
        private static string CreatedWmiNamespace = "root\\cimv2";
        
        // Private property to hold the name of WMI class which created this class.
        private static string CreatedClassName = "Win32_ProcessStartup";
        
        // Private member variable to hold the ManagementScope which is used by the various methods.
        private static System.Management.ManagementScope statMgmtScope = null;
        
        private ManagementSystemProperties PrivateSystemProperties;
        
        // Underlying lateBound WMI object.
        private System.Management.ManagementObject PrivateLateBoundObject;
        
        // Member variable to store the 'automatic commit' behavior for the class.
        private bool AutoCommitProp;
        
        // Private variable to hold the embedded property representing the instance.
        private System.Management.ManagementBaseObject embeddedObj;
        
        // The current WMI object used
        private System.Management.ManagementBaseObject curObj;
        
        // Flag to indicate if the instance is an embedded object.
        private bool isEmbedded;
        
        // Below are different overloads of constructors to initialize an instance of the class with a WMI object.
        public ProcessStartup() {
            this.InitializeObject(null, null, null);
        }
        
        public ProcessStartup(System.Management.ManagementPath path, System.Management.ObjectGetOptions getOptions) {
            this.InitializeObject(null, path, getOptions);
        }
        
        public ProcessStartup(System.Management.ManagementScope mgmtScope, System.Management.ManagementPath path) {
            this.InitializeObject(mgmtScope, path, null);
        }
        
        public ProcessStartup(System.Management.ManagementPath path) {
            this.InitializeObject(null, path, null);
        }
        
        public ProcessStartup(System.Management.ManagementScope mgmtScope, System.Management.ManagementPath path, System.Management.ObjectGetOptions getOptions) {
            this.InitializeObject(mgmtScope, path, getOptions);
        }
        
        public ProcessStartup(System.Management.ManagementObject theObject) {
            Initialize();
            if ((CheckIfProperClass(theObject) == true)) {
                PrivateLateBoundObject = theObject;
                PrivateSystemProperties = new ManagementSystemProperties(PrivateLateBoundObject);
                curObj = PrivateLateBoundObject;
            }
            else {
                throw new System.ArgumentException("Class name does not match.");
            }
        }
        
        public ProcessStartup(System.Management.ManagementBaseObject theObject) {
            Initialize();
            if ((CheckIfProperClass(theObject) == true)) {
                embeddedObj = theObject;
                PrivateSystemProperties = new ManagementSystemProperties(theObject);
                curObj = embeddedObj;
                isEmbedded = true;
            }
            else {
                throw new System.ArgumentException("Class name does not match.");
            }
        }
        
        // Property returns the namespace of the WMI class.
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string OriginatingNamespace {
            get {
                return "root\\cimv2";
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string ManagementClassName {
            get {
                string strRet = CreatedClassName;
                if ((curObj != null)) {
                    if ((curObj.ClassPath != null)) {
                        strRet = ((string)(curObj["__CLASS"]));
                        if (((strRet == null) 
                                    || (strRet == string.Empty))) {
                            strRet = CreatedClassName;
                        }
                    }
                }
                return strRet;
            }
        }
        
        // Property pointing to an embedded object to get System properties of the WMI object.
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public ManagementSystemProperties SystemProperties {
            get {
                return PrivateSystemProperties;
            }
        }
        
        // Property returning the underlying lateBound object.
        [Browsable(false)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public System.Management.ManagementBaseObject LateBoundObject {
            get {
                return curObj;
            }
        }
        
        // ManagementScope of the object.
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public System.Management.ManagementScope Scope {
            get {
                if ((isEmbedded == false)) {
                    return PrivateLateBoundObject.Scope;
                }
                else {
                    return null;
                }
            }
            set {
                if ((isEmbedded == false)) {
                    PrivateLateBoundObject.Scope = value;
                }
            }
        }
        
        // Property to show the commit behavior for the WMI object. If true, WMI object will be automatically saved after each property modification.(ie. Put() is called after modification of a property).
        [Browsable(false)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public bool AutoCommit {
            get {
                return AutoCommitProp;
            }
            set {
                AutoCommitProp = value;
            }
        }
        
        // The ManagementPath of the underlying WMI object.
        [Browsable(true)]
        public System.Management.ManagementPath Path {
            get {
                if ((isEmbedded == false)) {
                    return PrivateLateBoundObject.Path;
                }
                else {
                    return null;
                }
            }
            set {
                if ((isEmbedded == false)) {
                    if ((CheckIfProperClass(null, value, null) != true)) {
                        throw new System.ArgumentException("Class name does not match.");
                    }
                    PrivateLateBoundObject.Path = value;
                }
            }
        }
        
        // Public static scope property which is used by the various methods.
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public static System.Management.ManagementScope StaticScope {
            get {
                return statMgmtScope;
            }
            set {
                statMgmtScope = value;
            }
        }
        
        [Browsable(false)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public bool IsCreateFlagsNull {
            get {
                if ((curObj["CreateFlags"] == null)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description("The CreateFlags property specifies additional values that control the priority cl" +
            "ass and the creation of the process. The following creation values can be specif" +
            "ied in any combination, except as noted:\nCreate_Default_Error_Mode - Newly creat" +
            "ed processes are given the system default error mode of the calling process inst" +
            "ead of inheriting the error mode of the parent process.  This flag is useful for" +
            " multi-threaded shell applications that run with hard errors disabled.\nCreate_Ne" +
            "w_Console - The new process has a new console, instead of inheriting the parent\'" +
            "s console. This flag cannot be used with the Detached_Process flag.\nCreate_New_P" +
            "rocess_Group - The new process is the root process of a new process group. The p" +
            "rocess group includes all processes that are descendants of this root process. T" +
            "he process identifier of the new process group is the same as the process identi" +
            "fier (returned in the ProcessID property of the Win32_Process class).  Process g" +
            "roups are used by the GenerateConsoleCtrlEvent function to enable sending a CTRL" +
            "+C or CTRL+BREAK signal to a group of console processes.\nCreate_Suspended - The " +
            "primary thread of the new process is created in a suspended state and does not r" +
            "un until the ResumeThread function is called.\nCreate_Unicode_Environment - The e" +
            "nvironment settings listed in the EnvironmentVariables property use Unicode char" +
            "acters. If clear, the environment block uses ANSI characters.\nDebug_Process - If" +
            " this flag is set, the calling process is treated as a debugger, and the new pro" +
            "cess is a process being debugged.  The system notifies the debugger of all debug" +
            " events that occur in the process being debugged.  On Windows 95 and Windows 98 " +
            "systems, this flag is not valid if the new process is a 16-bit application.\nDebu" +
            "g_Only_This_Process - If not set and the calling process is being debugged, the " +
            "new process becomes another process being debugged by the process of the calling" +
            " debugger. If the calling process is not a process being debugged, no debugging " +
            "related actions occur.\nDetached_Process - For console processes, the new process" +
            " does not have access to the console of the parent process.  This flag cannot be" +
            " used if the Create_New_Console flag is set.")]
        [TypeConverter(typeof(WMIValueTypeConverter))]
        public CreateFlagsValues CreateFlags {
            get {
                if ((curObj["CreateFlags"] == null)) {
                    return ((CreateFlagsValues)(System.Convert.ToInt32(52)));
                }
                return ((CreateFlagsValues)(System.Convert.ToInt32(curObj["CreateFlags"])));
            }
            set {
                if ((CreateFlagsValues.NULL_ENUM_VALUE == value)) {
                    curObj["CreateFlags"] = null;
                }
                else {
                    curObj["CreateFlags"] = value;
                }
                if (((isEmbedded == false) 
                            && (AutoCommitProp == true))) {
                    PrivateLateBoundObject.Put();
                }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description(@"The EnvironmentVariables property contains a list of settings for the configuration of a computer.  Environment variables specify search paths for files, directories for temporary files, application-specific options, and other similar information.  The system maintains a block of environment settings for each user and one for the computer.  The system environment block represents environment variables for all users of the particular computer.  A user's environment block represents the environment variables the system maintains for that particular user, including the set of system environment variables.  By default, each process receives a copy of the environment block for its parent process.  Typically, this is the environment block for the user who is logged on.  A process can specify different environment blocks for its child processes.")]
        public string[] EnvironmentVariables {
            get {
                return ((string[])(curObj["EnvironmentVariables"]));
            }
            set {
                curObj["EnvironmentVariables"] = value;
                if (((isEmbedded == false) 
                            && (AutoCommitProp == true))) {
                    PrivateLateBoundObject.Put();
                }
            }
        }
        
        [Browsable(false)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public bool IsErrorModeNull {
            get {
                if ((curObj["ErrorMode"] == null)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description("The ErrorMode property controls how the operating system handles several types of" +
            " serious errors.  You can specify that the operating system handle these errors " +
            "or that the application receives and handles them.  On some non-x86 processors, " +
            "misaligned memory references cause an alignment fault exception.  The No_Alignme" +
            "nt_Fault_Except flag lets you control whether the system automatically fixes suc" +
            "h alignment faults or makes them visible to an application.  On a MIPS platform," +
            " an application must explicitly call SetErrorMode with the No_Alignment_Fault_Ex" +
            "cept flag to have the operating system automatically fix alignment faults.  The " +
            "default setting is for the operating system to make alignment faults visible to " +
            "an application.  Since the x86 platform does not make alignment faults visible t" +
            "o an application, the No_Alignment_Fault_Except flag will not make the operating" +
            " system raise an alignment fault error even if the flag is not set.  The default" +
            " state for ErrorMode is to set all flags to 0.  Defined values for this flag are" +
            " are:\nFail_Critical_Errors - If this flag is set, the operating system does not " +
            "display the critical-error-handler message box when such an error occurs. Instea" +
            "d, the operating system sends the error to the calling process.\nNo_Alignment_Fau" +
            "lt_Except - (RISC only) If this flag is set, the operating system automatically " +
            "fixes memory alignment faults and makes them invisible to the application. It do" +
            "es this for the calling process and any descendant processes.  This flag has no " +
            "effect on x86 processors.\nNo_GP_Fault_Error_Box - If this flag is set, the opera" +
            "ting system does not display the general-protection-fault message box when such " +
            "an error occurs. This flag should only be set by debugging applications that han" +
            "dle general protection (GP) faults themselves via an appropriate exception handl" +
            "er.\nNo_Open_File_Error_Box - If this flag is set, the operating system does not " +
            "display a message box when it fails to find a file.  Instead, the error is retur" +
            "ned to the calling process.  Note, this flag is currently ignored.")]
        [TypeConverter(typeof(WMIValueTypeConverter))]
        public ErrorModeValues ErrorMode {
            get {
                if ((curObj["ErrorMode"] == null)) {
                    return ((ErrorModeValues)(System.Convert.ToInt32(16)));
                }
                return ((ErrorModeValues)(System.Convert.ToInt32(curObj["ErrorMode"])));
            }
            set {
                if ((ErrorModeValues.NULL_ENUM_VALUE == value)) {
                    curObj["ErrorMode"] = null;
                }
                else {
                    curObj["ErrorMode"] = value;
                }
                if (((isEmbedded == false) 
                            && (AutoCommitProp == true))) {
                    PrivateLateBoundObject.Put();
                }
            }
        }
        
        [Browsable(false)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public bool IsFillAttributeNull {
            get {
                if ((curObj["FillAttribute"] == null)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description("The FillAttribute property specifies the initial text and background colors if a " +
            "new console window is created in a console application.  These values are ignore" +
            "d in GUI applications.")]
        [TypeConverter(typeof(WMIValueTypeConverter))]
        public FillAttributeValues FillAttribute {
            get {
                if ((curObj["FillAttribute"] == null)) {
                    return ((FillAttributeValues)(System.Convert.ToInt32(256)));
                }
                return ((FillAttributeValues)(System.Convert.ToInt32(curObj["FillAttribute"])));
            }
            set {
                if ((FillAttributeValues.NULL_ENUM_VALUE == value)) {
                    curObj["FillAttribute"] = null;
                }
                else {
                    curObj["FillAttribute"] = value;
                }
                if (((isEmbedded == false) 
                            && (AutoCommitProp == true))) {
                    PrivateLateBoundObject.Put();
                }
            }
        }
        
        [Browsable(false)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public bool IsPriorityClassNull {
            get {
                if ((curObj["PriorityClass"] == null)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description("The PriorityClass property controls the priority class of the new process (used t" +
            "o determine the scheduling priorities of the threads in the process).  If the Pr" +
            "iorityClass property is left null, the priority class defaults to Normal unless " +
            "the priority class of the creating process is Idle or Below_Normal. In these cas" +
            "es, the child process receives the default priority class of the calling process" +
            ". One of the following values can be specified:\nHigh - Indicates a process that " +
            "performs time-critical tasks that must be executed immediately for it to run cor" +
            "rectly. The threads of a high-priority class process preempt the threads of norm" +
            "al-priority or idle-priority class processes. An example is Windows Task List, w" +
            "hich must respond quickly when called by the user, regardless of the load on the" +
            " operating system. Use extreme care when using the high-priority class, because " +
            "a high-priority class CPU-bound application can use nearly all available cycles." +
            "  Only Realtime priority will preempt threads set to this level\nIdle - Indicates" +
            " a process whose threads run only when the system is idle and are preempted by t" +
            "he threads of any process running in a higher priority class. An example is a sc" +
            "reen saver. The idle priority class is inherited by child processes.\nNormal - In" +
            "dicates a normal process with no special scheduling needs.\nRealtime - Indicates " +
            "a process that has the highest possible priority. The threads of a real-time pri" +
            "ority class process preempt the threads of all other processes, including operat" +
            "ing system processes performing important tasks, and high priority threads. For " +
            "example, a real-time process that executes for more than a very brief interval c" +
            "an cause disk caches not to flush or cause the mouse to be unresponsive.\nAbove_N" +
            "ormal - (Windows 2000 and later) Indicates a process that has priority higher th" +
            "an Normal but lower than High.\nBelow_Normal - (Windows 2000 and later): Indicate" +
            "s a process that has priority higher than Idle but lower than Normal.")]
        [TypeConverter(typeof(WMIValueTypeConverter))]
        public PriorityClassValues PriorityClass {
            get {
                if ((curObj["PriorityClass"] == null)) {
                    return ((PriorityClassValues)(System.Convert.ToInt32(0)));
                }
                return ((PriorityClassValues)(System.Convert.ToInt32(curObj["PriorityClass"])));
            }
            set {
                if ((PriorityClassValues.NULL_ENUM_VALUE == value)) {
                    curObj["PriorityClass"] = null;
                }
                else {
                    curObj["PriorityClass"] = value;
                }
                if (((isEmbedded == false) 
                            && (AutoCommitProp == true))) {
                    PrivateLateBoundObject.Put();
                }
            }
        }
        
        [Browsable(false)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public bool IsShowWindowNull {
            get {
                if ((curObj["ShowWindow"] == null)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description("The ShowWindow property specifies how the window is to be displayed to the user.")]
        [TypeConverter(typeof(WMIValueTypeConverter))]
        public ShowWindowValues ShowWindow {
            get {
                if ((curObj["ShowWindow"] == null)) {
                    return ((ShowWindowValues)(System.Convert.ToInt32(12)));
                }
                return ((ShowWindowValues)(System.Convert.ToInt32(curObj["ShowWindow"])));
            }
            set {
                if ((ShowWindowValues.NULL_ENUM_VALUE == value)) {
                    curObj["ShowWindow"] = null;
                }
                else {
                    curObj["ShowWindow"] = value;
                }
                // if (((isEmbedded == false) 
                //             && (AutoCommitProp == true))) {
                //     PrivateLateBoundObject.Put();
                // }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description(@"The Title property used for console processes contains the string displayed in the title bar if a new console window is created.  If NULL, the name of the executable file is used as the window title instead.  This property must be NULL for GUI or console processes that do not create a new console window.")]
        public string Title {
            get {
                return ((string)(curObj["Title"]));
            }
            set {
                curObj["Title"] = value;
                if (((isEmbedded == false) 
                            && (AutoCommitProp == true))) {
                    PrivateLateBoundObject.Put();
                }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description(@"(For Windows NT only) The WinstationDesktop property specifies either the name of the desktop only or the name of both the desktop and window station for the process.  A backslash in the string indicates that the string includes both desktop and window station names.  If WinstationDesktop is NULL, the new process inherits the desktop and window station of its parent process.  If WinstationDesktop is an empty string, the process does not inherit the desktop and window station of its parent process; instead, the system determines if a new desktop and window station need to be created.  A window station is a secure object that contains a clipboard, a set of global atoms and a group of desktop objects. The interactive window station assigned to the logon session of the interactive user also contains the keyboard, mouse, and display device. A desktop is a secure object contained within a window station.  A desktop has a logical display surface and contains windows, menus, and hooks.  A window station can have multiple desktops. Only the desktops of the interactive window station can be visible and receive user input. ")]
        public string WinstationDesktop {
            get {
                return ((string)(curObj["WinstationDesktop"]));
            }
            set {
                curObj["WinstationDesktop"] = value;
                if (((isEmbedded == false) 
                            && (AutoCommitProp == true))) {
                    PrivateLateBoundObject.Put();
                }
            }
        }
        
        [Browsable(false)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public bool IsXNull {
            get {
                if ((curObj["X"] == null)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description(@"The X property specifies the x offset, in pixels, of the upper left corner of a window if a new window is created.  The offsets are from the upper left corner of the screen.  For GUI processes, the specified position is used the first time the new process calls CreateWindow to create an overlapped window if the x parameter of CreateWindow is CW_USEDEFAULT.  Note, X and Y cannot be specified independently.")]
        [TypeConverter(typeof(WMIValueTypeConverter))]
        public uint X {
            get {
                if ((curObj["X"] == null)) {
                    return System.Convert.ToUInt32(0);
                }
                return ((uint)(curObj["X"]));
            }
            set {
                curObj["X"] = value;
                if (((isEmbedded == false) 
                            && (AutoCommitProp == true))) {
                    PrivateLateBoundObject.Put();
                }
            }
        }
        
        [Browsable(false)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public bool IsXCountCharsNull {
            get {
                if ((curObj["XCountChars"] == null)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description("The XCountChars property, used for processes creating a console window, specifies" +
            " the screen buffer width in character columns. These values are ignored in GUI p" +
            "rocesses.  Note, XCountChars and YCountChars cannot be specified independently.")]
        [TypeConverter(typeof(WMIValueTypeConverter))]
        public uint XCountChars {
            get {
                if ((curObj["XCountChars"] == null)) {
                    return System.Convert.ToUInt32(0);
                }
                return ((uint)(curObj["XCountChars"]));
            }
            set {
                curObj["XCountChars"] = value;
                if (((isEmbedded == false) 
                            && (AutoCommitProp == true))) {
                    PrivateLateBoundObject.Put();
                }
            }
        }
        
        [Browsable(false)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public bool IsXSizeNull {
            get {
                if ((curObj["XSize"] == null)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description(@"The XSize property specifies the width, in pixels, of the window if a new window is created. For GUI processes, this is used only the first time the new process calls CreateWindow to create an overlapped window if the nWidth parameter of CreateWindow is CW_USEDEFAULT.  Note, XSize and YSize cannot be specified independently.")]
        [TypeConverter(typeof(WMIValueTypeConverter))]
        public uint XSize {
            get {
                if ((curObj["XSize"] == null)) {
                    return System.Convert.ToUInt32(0);
                }
                return ((uint)(curObj["XSize"]));
            }
            set {
                curObj["XSize"] = value;
                if (((isEmbedded == false) 
                            && (AutoCommitProp == true))) {
                    PrivateLateBoundObject.Put();
                }
            }
        }
        
        [Browsable(false)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public bool IsYNull {
            get {
                if ((curObj["Y"] == null)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description(@"The Y property specifies the y offset, in pixels, of the upper left corner of a window if a new window is created. The offsets are from the upper left corner of the screen.  For GUI processes, the specified position is used the first time the new process calls CreateWindow to create an overlapped window if the y parameter of CreateWindow is CW_USEDEFAULT.  Note, X and Y cannot be specified independently.")]
        [TypeConverter(typeof(WMIValueTypeConverter))]
        public uint Y {
            get {
                if ((curObj["Y"] == null)) {
                    return System.Convert.ToUInt32(0);
                }
                return ((uint)(curObj["Y"]));
            }
            set {
                curObj["Y"] = value;
                if (((isEmbedded == false) 
                            && (AutoCommitProp == true))) {
                    PrivateLateBoundObject.Put();
                }
            }
        }
        
        [Browsable(false)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public bool IsYCountCharsNull {
            get {
                if ((curObj["YCountChars"] == null)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description("The YCountChars property, used for processes creating a console window, specifies" +
            " the screen buffer height in character rows.  These values are ignored in GUI pr" +
            "ocesses.  Note, XCountChars and YCountChars cannot be specified independently.")]
        [TypeConverter(typeof(WMIValueTypeConverter))]
        public uint YCountChars {
            get {
                if ((curObj["YCountChars"] == null)) {
                    return System.Convert.ToUInt32(0);
                }
                return ((uint)(curObj["YCountChars"]));
            }
            set {
                curObj["YCountChars"] = value;
                if (((isEmbedded == false) 
                            && (AutoCommitProp == true))) {
                    PrivateLateBoundObject.Put();
                }
            }
        }
        
        [Browsable(false)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public bool IsYSizeNull {
            get {
                if ((curObj["YSize"] == null)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        
        [Browsable(true)]
        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        [Description(@"The YSize property specifies the height, in pixels, of the window if a new window is created. For GUI processes, this is used only the first time the new process calls CreateWindow to create an overlapped window if the nWidth parameter of CreateWindow is CW_USEDEFAULT.  Note, XSize and YSize cannot be specified independently.")]
        [TypeConverter(typeof(WMIValueTypeConverter))]
        public uint YSize {
            get {
                if ((curObj["YSize"] == null)) {
                    return System.Convert.ToUInt32(0);
                }
                return ((uint)(curObj["YSize"]));
            }
            set {
                curObj["YSize"] = value;
                if (((isEmbedded == false) 
                            && (AutoCommitProp == true))) {
                    PrivateLateBoundObject.Put();
                }
            }
        }
        
        private bool CheckIfProperClass(System.Management.ManagementScope mgmtScope, System.Management.ManagementPath path, System.Management.ObjectGetOptions OptionsParam) {
            if (((path != null) 
                        && (string.Compare(path.ClassName, this.ManagementClassName, true, System.Globalization.CultureInfo.InvariantCulture) == 0))) {
                return true;
            }
            else {
                return CheckIfProperClass(new System.Management.ManagementObject(mgmtScope, path, OptionsParam));
            }
        }
        
        private bool CheckIfProperClass(System.Management.ManagementBaseObject theObj) {
            if (((theObj != null) 
                        && (string.Compare(((string)(theObj["__CLASS"])), this.ManagementClassName, true, System.Globalization.CultureInfo.InvariantCulture) == 0))) {
                return true;
            }
            else {
                System.Array parentClasses = ((System.Array)(theObj["__DERIVATION"]));
                if ((parentClasses != null)) {
                    int count = 0;
                    for (count = 0; (count < parentClasses.Length); count = (count + 1)) {
                        if ((string.Compare(((string)(parentClasses.GetValue(count))), this.ManagementClassName, true, System.Globalization.CultureInfo.InvariantCulture) == 0)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        
        private bool ShouldSerializeCreateFlags() {
            if ((this.IsCreateFlagsNull == false)) {
                return true;
            }
            return false;
        }
        
        private void ResetCreateFlags() {
            curObj["CreateFlags"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        private void ResetEnvironmentVariables() {
            curObj["EnvironmentVariables"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        private bool ShouldSerializeErrorMode() {
            if ((this.IsErrorModeNull == false)) {
                return true;
            }
            return false;
        }
        
        private void ResetErrorMode() {
            curObj["ErrorMode"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        private bool ShouldSerializeFillAttribute() {
            if ((this.IsFillAttributeNull == false)) {
                return true;
            }
            return false;
        }
        
        private void ResetFillAttribute() {
            curObj["FillAttribute"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        private bool ShouldSerializePriorityClass() {
            if ((this.IsPriorityClassNull == false)) {
                return true;
            }
            return false;
        }
        
        private void ResetPriorityClass() {
            curObj["PriorityClass"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        private bool ShouldSerializeShowWindow() {
            if ((this.IsShowWindowNull == false)) {
                return true;
            }
            return false;
        }
        
        private void ResetShowWindow() {
            curObj["ShowWindow"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        private void ResetTitle() {
            curObj["Title"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        private void ResetWinstationDesktop() {
            curObj["WinstationDesktop"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        private bool ShouldSerializeX() {
            if ((this.IsXNull == false)) {
                return true;
            }
            return false;
        }
        
        private void ResetX() {
            curObj["X"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        private bool ShouldSerializeXCountChars() {
            if ((this.IsXCountCharsNull == false)) {
                return true;
            }
            return false;
        }
        
        private void ResetXCountChars() {
            curObj["XCountChars"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        private bool ShouldSerializeXSize() {
            if ((this.IsXSizeNull == false)) {
                return true;
            }
            return false;
        }
        
        private void ResetXSize() {
            curObj["XSize"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        private bool ShouldSerializeY() {
            if ((this.IsYNull == false)) {
                return true;
            }
            return false;
        }
        
        private void ResetY() {
            curObj["Y"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        private bool ShouldSerializeYCountChars() {
            if ((this.IsYCountCharsNull == false)) {
                return true;
            }
            return false;
        }
        
        private void ResetYCountChars() {
            curObj["YCountChars"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        private bool ShouldSerializeYSize() {
            if ((this.IsYSizeNull == false)) {
                return true;
            }
            return false;
        }
        
        private void ResetYSize() {
            curObj["YSize"] = null;
            if (((isEmbedded == false) 
                        && (AutoCommitProp == true))) {
                PrivateLateBoundObject.Put();
            }
        }
        
        [Browsable(true)]
        public void CommitObject() {
            if ((isEmbedded == false)) {
                PrivateLateBoundObject.Put();
            }
        }
        
        [Browsable(true)]
        public void CommitObject(System.Management.PutOptions putOptions) {
            if ((isEmbedded == false)) {
                PrivateLateBoundObject.Put(putOptions);
            }
        }
        
        private void Initialize() {
            AutoCommitProp = true;
            isEmbedded = false;
        }
        
        private static string ConstructPath() {
            string strPath = "root\\cimv2:Win32_ProcessStartup";
            return strPath;
        }
        
        private void InitializeObject(System.Management.ManagementScope mgmtScope, System.Management.ManagementPath path, System.Management.ObjectGetOptions getOptions) {
            Initialize();
            if ((path != null)) {
                if ((CheckIfProperClass(mgmtScope, path, getOptions) != true)) {
                    throw new System.ArgumentException("Class name does not match.");
                }
            }
            PrivateLateBoundObject = new System.Management.ManagementObject(mgmtScope, path, getOptions);
            PrivateSystemProperties = new ManagementSystemProperties(PrivateLateBoundObject);
            curObj = PrivateLateBoundObject;
        }
        
        // Different overloads of GetInstances() help in enumerating instances of the WMI class.
        public static ProcessStartupCollection GetInstances() {
            return GetInstances(null, null, null);
        }
        
        public static ProcessStartupCollection GetInstances(string condition) {
            return GetInstances(null, condition, null);
        }
        
        public static ProcessStartupCollection GetInstances(string[] selectedProperties) {
            return GetInstances(null, null, selectedProperties);
        }
        
        public static ProcessStartupCollection GetInstances(string condition, string[] selectedProperties) {
            return GetInstances(null, condition, selectedProperties);
        }
        
        public static ProcessStartupCollection GetInstances(System.Management.ManagementScope mgmtScope, System.Management.EnumerationOptions enumOptions) {
            if ((mgmtScope == null)) {
                if ((statMgmtScope == null)) {
                    mgmtScope = new System.Management.ManagementScope();
                    mgmtScope.Path.NamespacePath = "root\\cimv2";
                }
                else {
                    mgmtScope = statMgmtScope;
                }
            }
            System.Management.ManagementPath pathObj = new System.Management.ManagementPath();
            pathObj.ClassName = "Win32_ProcessStartup";
            pathObj.NamespacePath = "root\\cimv2";
            System.Management.ManagementClass clsObject = new System.Management.ManagementClass(mgmtScope, pathObj, null);
            if ((enumOptions == null)) {
                enumOptions = new System.Management.EnumerationOptions();
                enumOptions.EnsureLocatable = true;
            }
            return new ProcessStartupCollection(clsObject.GetInstances(enumOptions));
        }
        
        public static ProcessStartupCollection GetInstances(System.Management.ManagementScope mgmtScope, string condition) {
            return GetInstances(mgmtScope, condition, null);
        }
        
        public static ProcessStartupCollection GetInstances(System.Management.ManagementScope mgmtScope, string[] selectedProperties) {
            return GetInstances(mgmtScope, null, selectedProperties);
        }
        
        public static ProcessStartupCollection GetInstances(System.Management.ManagementScope mgmtScope, string condition, string[] selectedProperties) {
            if ((mgmtScope == null)) {
                if ((statMgmtScope == null)) {
                    mgmtScope = new System.Management.ManagementScope();
                    mgmtScope.Path.NamespacePath = "root\\cimv2";
                }
                else {
                    mgmtScope = statMgmtScope;
                }
            }
            System.Management.ManagementObjectSearcher ObjectSearcher = new System.Management.ManagementObjectSearcher(mgmtScope, new SelectQuery("Win32_ProcessStartup", condition, selectedProperties));
            System.Management.EnumerationOptions enumOptions = new System.Management.EnumerationOptions();
            enumOptions.EnsureLocatable = true;
            ObjectSearcher.Options = enumOptions;
            return new ProcessStartupCollection(ObjectSearcher.Get());
        }
        
        [Browsable(true)]
        public static ProcessStartup CreateInstance() {
            System.Management.ManagementScope mgmtScope = null;
            if ((statMgmtScope == null)) {
                mgmtScope = new System.Management.ManagementScope();
                mgmtScope.Path.NamespacePath = CreatedWmiNamespace;
            }
            else {
                mgmtScope = statMgmtScope;
            }
            System.Management.ManagementPath mgmtPath = new System.Management.ManagementPath(CreatedClassName);
            System.Management.ManagementClass tmpMgmtClass = new System.Management.ManagementClass(mgmtScope, mgmtPath, null);
            return new ProcessStartup(tmpMgmtClass.CreateInstance());
        }
        
        [Browsable(true)]
        public void Delete() {
            PrivateLateBoundObject.Delete();
        }
        
        public enum CreateFlagsValues {
            
            Debug_Process = 0,
            
            Debug_Only_This_Process = 1,
            
            Create_Suspended = 2,
            
            Detached_Process = 3,
            
            Create_New_Console = 4,
            
            Create_New_Process_Group = 9,
            
            Create_Unicode_Environment = 10,
            
            Create_Default_Error_Mode = 26,
            
            NULL_ENUM_VALUE = 52,
        }
        
        public enum ErrorModeValues {
            
            Fail_Critical_Errors = 1,
            
            No_GP_Fault_Error_Box = 2,
            
            No_Alignment_Fault_Except = 4,
            
            No_Open_File_Error_Box = 8,
            
            NULL_ENUM_VALUE = 16,
        }
        
        public enum FillAttributeValues {
            
            Foreground_Blue = 1,
            
            Foreground_Green = 2,
            
            Foreground_Red = 4,
            
            Foreground_Intensity = 8,
            
            Background_Blue = 16,
            
            Background_Green = 32,
            
            Background_Red = 64,
            
            Background_Intensity = 128,
            
            NULL_ENUM_VALUE = 256,
        }
        
        public enum PriorityClassValues {
            
            Normal = 32,
            
            Idle = 64,
            
            High = 128,
            
            Realtime = 256,
            
            Below_Normal = 16384,
            
            Above_Normal = 32768,
            
            NULL_ENUM_VALUE = 0,
        }
        
        public enum ShowWindowValues {
            
            SW_HIDE = 0,
            
            SW_NORMAL = 1,
            
            SW_SHOWMINIMIZED = 2,
            
            SW_SHOWMAXIMIZED = 3,
            
            SW_SHOWNOACTIVATE = 4,
            
            SW_SHOW = 5,
            
            SW_MINIMIZE = 6,
            
            SW_SHOWMINNOACTIVE = 7,
            
            SW_SHOWNA = 8,
            
            SW_RESTORE = 9,
            
            SW_SHOWDEFAULT = 10,
            
            SW_FORCEMINIMIZE = 11,
            
            NULL_ENUM_VALUE = 12,
        }
        
        // Enumerator implementation for enumerating instances of the class.
        public class ProcessStartupCollection : object, ICollection {
            
            private ManagementObjectCollection privColObj;
            
            public ProcessStartupCollection(ManagementObjectCollection objCollection) {
                privColObj = objCollection;
            }
            
            public virtual int Count {
                get {
                    return privColObj.Count;
                }
            }
            
            public virtual bool IsSynchronized {
                get {
                    return privColObj.IsSynchronized;
                }
            }
            
            public virtual object SyncRoot {
                get {
                    return this;
                }
            }
            
            public virtual void CopyTo(System.Array array, int index) {
                privColObj.CopyTo(array, index);
                int nCtr;
                for (nCtr = 0; (nCtr < array.Length); nCtr = (nCtr + 1)) {
                    array.SetValue(new ProcessStartup(((System.Management.ManagementObject)(array.GetValue(nCtr)))), nCtr);
                }
            }
            
            public virtual System.Collections.IEnumerator GetEnumerator() {
                return new ProcessStartupEnumerator(privColObj.GetEnumerator());
            }
            
            public class ProcessStartupEnumerator : object, System.Collections.IEnumerator {
                
                private ManagementObjectCollection.ManagementObjectEnumerator privObjEnum;
                
                public ProcessStartupEnumerator(ManagementObjectCollection.ManagementObjectEnumerator objEnum) {
                    privObjEnum = objEnum;
                }
                
                public virtual object Current {
                    get {
                        return new ProcessStartup(((System.Management.ManagementObject)(privObjEnum.Current)));
                    }
                }
                
                public virtual bool MoveNext() {
                    return privObjEnum.MoveNext();
                }
                
                public virtual void Reset() {
                    privObjEnum.Reset();
                }
            }
        }
        
        // TypeConverter to handle null values for ValueType properties
        public class WMIValueTypeConverter : TypeConverter {
            
            private TypeConverter baseConverter;
            
            private System.Type baseType;
            
            public WMIValueTypeConverter(System.Type inBaseType) {
                baseConverter = TypeDescriptor.GetConverter(inBaseType);
                baseType = inBaseType;
            }
            
            public override bool CanConvertFrom(System.ComponentModel.ITypeDescriptorContext context, System.Type srcType) {
                return baseConverter.CanConvertFrom(context, srcType);
            }
            
            public override bool CanConvertTo(System.ComponentModel.ITypeDescriptorContext context, System.Type destinationType) {
                return baseConverter.CanConvertTo(context, destinationType);
            }
            
            public override object ConvertFrom(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value) {
                return baseConverter.ConvertFrom(context, culture, value);
            }
            
            public override object CreateInstance(System.ComponentModel.ITypeDescriptorContext context, System.Collections.IDictionary dictionary) {
                return baseConverter.CreateInstance(context, dictionary);
            }
            
            public override bool GetCreateInstanceSupported(System.ComponentModel.ITypeDescriptorContext context) {
                return baseConverter.GetCreateInstanceSupported(context);
            }
            
            public override PropertyDescriptorCollection GetProperties(System.ComponentModel.ITypeDescriptorContext context, object value, System.Attribute[] attributeVar) {
                return baseConverter.GetProperties(context, value, attributeVar);
            }
            
            public override bool GetPropertiesSupported(System.ComponentModel.ITypeDescriptorContext context) {
                return baseConverter.GetPropertiesSupported(context);
            }
            
            public override System.ComponentModel.TypeConverter.StandardValuesCollection GetStandardValues(System.ComponentModel.ITypeDescriptorContext context) {
                return baseConverter.GetStandardValues(context);
            }
            
            public override bool GetStandardValuesExclusive(System.ComponentModel.ITypeDescriptorContext context) {
                return baseConverter.GetStandardValuesExclusive(context);
            }
            
            public override bool GetStandardValuesSupported(System.ComponentModel.ITypeDescriptorContext context) {
                return baseConverter.GetStandardValuesSupported(context);
            }
            
            public override object ConvertTo(System.ComponentModel.ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, System.Type destinationType) {
                if ((baseType.BaseType == typeof(System.Enum))) {
                    if ((value.GetType() == destinationType)) {
                        return value;
                    }
                    if ((((value == null) 
                                && (context != null)) 
                                && (context.PropertyDescriptor.ShouldSerializeValue(context.Instance) == false))) {
                        return  "NULL_ENUM_VALUE" ;
                    }
                    return baseConverter.ConvertTo(context, culture, value, destinationType);
                }
                if (((baseType == typeof(bool)) 
                            && (baseType.BaseType == typeof(System.ValueType)))) {
                    if ((((value == null) 
                                && (context != null)) 
                                && (context.PropertyDescriptor.ShouldSerializeValue(context.Instance) == false))) {
                        return "";
                    }
                    return baseConverter.ConvertTo(context, culture, value, destinationType);
                }
                if (((context != null) 
                            && (context.PropertyDescriptor.ShouldSerializeValue(context.Instance) == false))) {
                    return "";
                }
                return baseConverter.ConvertTo(context, culture, value, destinationType);
            }
        }
        
        // Embedded class to represent WMI system Properties.
        [TypeConverter(typeof(System.ComponentModel.ExpandableObjectConverter))]
        public class ManagementSystemProperties {
            
            private System.Management.ManagementBaseObject PrivateLateBoundObject;
            
            public ManagementSystemProperties(System.Management.ManagementBaseObject ManagedObject) {
                PrivateLateBoundObject = ManagedObject;
            }
            
            [Browsable(true)]
            public int GENUS {
                get {
                    return ((int)(PrivateLateBoundObject["__GENUS"]));
                }
            }
            
            [Browsable(true)]
            public string CLASS {
                get {
                    return ((string)(PrivateLateBoundObject["__CLASS"]));
                }
            }
            
            [Browsable(true)]
            public string SUPERCLASS {
                get {
                    return ((string)(PrivateLateBoundObject["__SUPERCLASS"]));
                }
            }
            
            [Browsable(true)]
            public string DYNASTY {
                get {
                    return ((string)(PrivateLateBoundObject["__DYNASTY"]));
                }
            }
            
            [Browsable(true)]
            public string RELPATH {
                get {
                    return ((string)(PrivateLateBoundObject["__RELPATH"]));
                }
            }
            
            [Browsable(true)]
            public int PROPERTY_COUNT {
                get {
                    return ((int)(PrivateLateBoundObject["__PROPERTY_COUNT"]));
                }
            }
            
            [Browsable(true)]
            public string[] DERIVATION {
                get {
                    return ((string[])(PrivateLateBoundObject["__DERIVATION"]));
                }
            }
            
            [Browsable(true)]
            public string SERVER {
                get {
                    return ((string)(PrivateLateBoundObject["__SERVER"]));
                }
            }
            
            [Browsable(true)]
            public string NAMESPACE {
                get {
                    return ((string)(PrivateLateBoundObject["__NAMESPACE"]));
                }
            }
            
            [Browsable(true)]
            public string PATH {
                get {
                    return ((string)(PrivateLateBoundObject["__PATH"]));
                }
            }
        }
    }
}
