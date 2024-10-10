<#PSScriptInfo .VERSION 0.0.1.7#>

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

  # Set the windows resources file with the resource compiler.
  & "$PSScriptRoot\rc.exe" /nologo /fo $(($ResFile = "$BinDir\resource.res")) "$PSScriptRoot\resource.rc"

  # Compile the source code with jsc.
  $EnvPath = $Env:Path
  $Env:Path = "$Env:windir\Microsoft.NET\Framework$(If ([Environment]::Is64BitOperatingSystem) { '64' })\v4.0.30319\;$Env:Path"
  $CoreDll = 'C:\Windows\Microsoft.Net\assembly\GAC_MSIL\System.Core\v4.0_4.0.0.0__b77a5c561934e089\System.Core.dll'
  $AutomationDll = 'C:\Windows\Microsoft.Net\assembly\GAC_MSIL\System.Management.Automation\v4.0_3.0.0.0__31bf3856ad364e35\System.Management.Automation.dll'
  jsc.exe /nologo /target:$($DebugPreference -eq 'Continue' ? 'exe':'winexe') /win32res:$ResFile /reference:$CoreDll /reference:$AutomationDll /out:$(($ConvertExe = "$BinDir\cvmd2html.exe")) "$(($SrcDir = "$PSScriptRoot\src"))\AssemblyInfo.js" "$PSScriptRoot\index.js" "$SrcDir\Program.js" "$SrcDir\Package.js" "$SrcDir\Param.js" "$SrcDir\Setup.js"
  $Env:Path = $EnvPath

  If ($LASTEXITCODE -eq 0) {
    Write-Host "Output file $ConvertExe written." @HostColorArgs
    (Get-Item $ConvertExe).VersionInfo | Format-List * -Force
  }

  Remove-Item "$BinDir\*.res" -Recurse -ErrorAction SilentlyContinue
}