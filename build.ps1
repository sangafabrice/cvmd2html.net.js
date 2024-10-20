<#PSScriptInfo .VERSION 0.0.1.3#>

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

  Function CompileResource {
    <#
    .DESCRIPTION
    This function compiles the resource file.
    .NOTES
    This function must be called after initializing $BinDir.
    .PARAMETER FileBaseName
    The base name of the compiled resource file.
    #>
    Param (
      [string] $FileBaseName
    )
    & "$PSScriptRoot\rc.exe" /nologo /fo $(($ResourceFile = "$BinDir\$FileBaseName.res")) "$PSScriptRoot\resource.rc"
    Return $ResourceFile
  }

  # Compile the source code with jsc.
  $EnvPath = $Env:Path
  $Env:Path = "$Env:windir\Microsoft.NET\Framework$(If ([Environment]::Is64BitOperatingSystem) { '64' })\v4.0.30319\;$Env:Path"
  jsc.exe /nologo /target:$($DebugPreference -eq 'Continue' ? 'exe':'winexe') /win32res:$(CompileResource 'cvmd2html') /reference:$(ImportTypeLibrary 'C:\Windows\System32\wbem\wbemdisp.tlb' 'WbemScripting') /reference:$(ImportTypeLibrary 'C:\Windows\System32\wshom.ocx' 'IWshRuntimeLibrary') /out:$(($ConvertExe = "$BinDir\cvmd2html.exe")) "$(($SrcDir = "$PSScriptRoot\src"))\AssemblyInfo.js" "$SrcDir\errorLog.js" "$SrcDir\package.js" "$SrcDir\parameters.js" "$PSScriptRoot\index.js" "$SrcDir\StdRegProv.js" "$SrcDir\setup.js" "$SrcDir\utils.js"
  $Env:Path = $EnvPath

  If ($LASTEXITCODE -eq 0) {
    Write-Host "Output file $ConvertExe written." @HostColorArgs
    (Get-Item $ConvertExe).VersionInfo | Format-List * -Force
  }

  Remove-Item "$BinDir\*.res" -Recurse -ErrorAction SilentlyContinue
}