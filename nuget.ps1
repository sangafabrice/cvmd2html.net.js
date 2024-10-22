<#PSScriptInfo .VERSION 0.0.1.2#>

[CmdletBinding()]
Param ()

& {
  $LibDir = "$PSScriptRoot\lib"
  Remove-Item $LibDir -Recurse -ErrorAction SilentlyContinue -Force
  & "$PSScriptRoot\nuget.exe" install "$PSScriptRoot\packages.config" -Outputdirectory $LibDir -verbosity quiet
  Get-ChildItem "$PSScriptRoot\lib\net46*" -Directory -Recurse |
  Where-Object Parent -Like *\lib |
  ForEach-Object {
    Copy-Item (Get-ChildItem $_ -File -Filter *.dll).FullName .\lib\
  }
  Get-ChildItem "$LibDir\*" -Directory | Remove-Item -Recurse -Force
  'PresentationFramework','WindowsBase','PresentationCore' |
  ForEach-Object {
    Copy-Item "$Env:windir\Microsoft.NET\Framework$(If ([Environment]::Is64BitOperatingSystem) { '64' })\v4.0.30319\WPF\${_}.dll" $LibDir
  }
}