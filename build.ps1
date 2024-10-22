<#PSScriptInfo .VERSION 0.0.1.13#>

#Requires -Version 5.1
#Requires -PSEdition Desktop
using namespace System.Management.Automation
using namespace Microsoft.Jscript
using assembly Microsoft.Jscript
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
  $CompilerParams = [System.CodeDom.Compiler.CompilerParameters] @{
    OutputAssembly = ($ConvertExe = "$BinDir\cvmd2html.exe")
    GenerateInMemory = $False
    GenerateExecutable = $True
    Win32Resource = $ResFile
    CompilerOptions = "/target:$(If ($DebugPreference -eq 'Inquire') { 'exe' } Else { 'winexe' })"
  }
  $CompilerParams.ReferencedAssemblies.AddRange(@(
    Get-ChildItem @(
      "$LibDir\*"
      'PresentationFramework','WindowsBase','PresentationCore' |
      ForEach-Object { "$Env:windir\Microsoft.NET\Framework$(If ([Environment]::Is64BitOperatingSystem) { '64' })\v4.0.30319\WPF\${_}.dll" }
    ) | ForEach-Object { $_.FullName }
    'System.Xaml.dll','System.Numerics.dll'
  ))
  $Results = [JScriptCodeProvider]::new().CompileAssemblyFromFile($CompilerParams, [string[]](Get-ChildItem "$PSScriptRoot\src\*","$PSScriptRoot\index.js").FullName)

  If ($Results.Errors.Count -eq 0 -and 0 -eq $Error.Count) {
    Write-Host "Output file $ConvertExe written." @HostColorArgs
    (Get-Item $ConvertExe).VersionInfo | Format-List * -Force
  } ElseIf ($Results.Errors.Count -ne 0) {
    $HostColorArgs.BackgroundColor = 'Red'
    ForEach ($ErrResult in $Results.Errors) {
      Write-Host ('Error {1}: {2}' -f $ErrResult.ErrorNumber,$ErrResult.ErrorText) @HostColorArgs
    }
  }

  Remove-Item "$BinDir\*.res" -Recurse -ErrorAction SilentlyContinue
}