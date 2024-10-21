<#PSScriptInfo .VERSION 0.0.1.10#>

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
  Copy-Item "$PSScriptRoot\App.config" -Destination "$BinDir\cvmd2html.exe.config" -Recurse
  Copy-Item "$(($LibDir = "$PSScriptRoot\lib"))\*" -Destination $BinDir -Recurse

  # Set the windows resources file with the resource compiler.
  & "$PSScriptRoot\rc.exe" /nologo /fo $(($ResFile = "$BinDir\resource.res")) "$PSScriptRoot\resource.rc"

  # Compile the source code with jsc.
  $FrameworkRoot = "$Env:windir\Microsoft.NET\Framework$(If ([Environment]::Is64BitOperatingSystem) { '64' })\v4.0.30319\"
  $process = Start-Process -FilePath "$FrameworkRoot\jsc.exe" -ArgumentList @(
    "/nologo /target:$($DebugPreference -eq 'Continue' ? 'exe':'winexe') /win32res:$ResFile"
    Get-ChildItem @(
      "$LibDir\*"
      'PresentationFramework','WindowsBase','PresentationCore' | ForEach-Object { "$FrameworkRoot\WPF\${_}.dll" }
    ) | ForEach-Object { '/reference:"{0}"' -f $_.FullName }
    '/reference:System.Xaml.dll /reference:System.Numerics.dll'
    "/out:$(($ConvertExe = "$BinDir\cvmd2html.exe"))"
    Get-ChildItem "$PSScriptRoot\src\*","$PSScriptRoot\index.js" | ForEach-Object { '"{0}"' -f $_.FullName }
  ) -Wait -NoNewWindow -PassThru

  If ($process.ExitCode -eq 0) {
    Write-Host "Output file $ConvertExe written." @HostColorArgs
    (Get-Item $ConvertExe).VersionInfo | Format-List * -Force
  }

  Remove-Item "$BinDir\*.res" -Recurse -ErrorAction SilentlyContinue
}