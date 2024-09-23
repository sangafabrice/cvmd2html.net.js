<#PSScriptInfo .VERSION 0.0.1.2#>

using namespace System.Management.Automation
[CmdletBinding()]
Param ()

& {
  $HostColorArgs = @{
    ForegroundColor = 'Black'
    BackgroundColor = 'Green'
    NoNewline = $True
  }

  Try {
    Remove-Item ($BinDir = "$PSScriptRoot\bin") -Recurse -ErrorAction Stop
  } Catch [ItemNotFoundException] {
    Write-Host $_.Exception.Message @HostColorArgs
    Write-Host
  } Catch {
    $HostColorArgs.BackgroundColor = 'Red'
    Write-Host $_.Exception.Message @HostColorArgs
    Write-Host
    Return
  }
  New-Item $BinDir -ItemType Directory -ErrorAction SilentlyContinue | Out-Null
  Copy-Item "$PSScriptRoot\rsc" -Destination $BinDir -Recurse

  $SrcDir = "$PSScriptRoot\src"
  $AssemblyInfoJS = "$SrcDir\AssemblyInfo.js"

  Function ImportTypeLibrary {
    <#
    .DESCRIPTION
    This function imports the specified type library.
    .NOTES
    This function must be called after initializing $BinDir
    .PARAMETER TypeLibPath
    The specified type library path.
    .PARAMETER Namespace
    The namespace used for imports in the AssemblyInfo.
    #>
    Param (
      [string] $TypeLibPath,
      [string] $Namespace
    )
    & "$PSScriptRoot\TlbImp.exe" /nologo /silent $TypeLibPath /out:$(($InteropLibPath = "$BinDir\Interop.$Namespace.dll")) /namespace:$Namespace
    Return $InteropLibPath
  }

  Function ImportMgmtClass {
    <#
    .DESCRIPTION
    This function compiles a Management Class' source code to dll libraries.
    .NOTES
    This function must be called after initializing $SrcDir and $AssemblyInfoJS.
    It must also be called after the csc.exe path is added to PATH environment variable.
    .\mgmtclassgen.exe <Class_Name> /l cs /n root\cimv2 /p .\src\<Class.Name>.cs
    <Class_Name> means the name of the class may have an underscore '_'
    which is replaced with '.' in the source code base name <Class.Name>.
    .PARAMETER ClassName
    The specified Management class name.
    #>
    Param (
      [string] $ClassName
    )
    jsc.exe /nologo /target:library /out:$(($MgmtClassPath = "$BinDir\$ClassName.dll")) /define:"$($ClassName.Replace('.', ''))Wim" $AssemblyInfoJS "$SrcDir\$ClassName.js"
    Return $MgmtClassPath
  }

  # Compile the source code with jsc.exe.
  $EnvPath = $Env:Path
  $Env:Path = "$Env:windir\Microsoft.NET\Framework$(If ([Environment]::Is64BitOperatingSystem) { '64' })\v4.0.30319\;$Env:Path"
  jsc.exe /nologo /target:$($DebugPreference -eq 'Continue' ? 'exe':'winexe') /reference:$(ImportMgmtClass 'StdRegProv') /reference:$(ImportMgmtClass 'Win32.Process') /reference:$(ImportTypeLibrary 'C:\Windows\System32\wshom.ocx' 'IWshRuntimeLibrary') /out:$(($ConvertExe = "$BinDir\cvmd2html.exe")) $AssemblyInfoJS "$PSScriptRoot\index.js" "$SrcDir\Program.js" "$SrcDir\ErrorLog.js" "$SrcDir\Package.js" "$SrcDir\Param.js" "$SrcDir\Setup.js"
  $Env:Path = $EnvPath

  If ($LASTEXITCODE -eq 0) {
    Write-Host "Output file $ConvertExe written." @HostColorArgs
    (Get-Item $ConvertExe).VersionInfo | Format-List * -Force
  }
}