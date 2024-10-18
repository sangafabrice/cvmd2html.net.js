<#PSScriptInfo .VERSION 0.0.1#>

#Requires -Version 6.1
[CmdletBinding()]
Param ()

& "$PSScriptRoot\nuget.exe" install "$PSScriptRoot\packages.config" -Outputdirectory "$PSScriptRoot\lib" -verbosity quiet
Get-ChildItem "$PSScriptRoot\lib\net46*" -Directory -Recurse |
Where-Object Parent -Like *\lib |
ForEach-Object {
  Copy-Item (Get-ChildItem $_ -File -Filter *.dll).FullName .\lib\
}
Get-ChildItem "$PSScriptRoot\lib\*" -Directory | Remove-Item -Recurse -Force