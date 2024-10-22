<#PSScriptInfo .VERSION 0.0.1.14#>

[CmdletBinding()]
Param ()

Start-Process "$Env:windir\Microsoft.NET\Framework$(If ([Environment]::Is64BitOperatingSystem) { '64' })\v4.0.30319\msbuild.exe" -ArgumentList @(
  '-nologo "{0}"' -f "$PSScriptRoot\cvmd2html.jsproj"
  If ($DebugPreference -eq 'Continue') { "-property:OutputType=exe" }
) -NoNewWindow -Wait