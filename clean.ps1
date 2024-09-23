<#PSScriptInfo .VERSION 0.0.1#>

[CmdletBinding()]
Param ()

& {
  Get-ChildItem "$PSScriptRoot\*.js","$PSScriptRoot\*.ps1","$PSScriptRoot\.gitignore" -Recurse | ForEach-Object {
    $content = @(Get-Content $_.FullName).TrimEnd() -join [Environment]::NewLine
    Set-Content $_.FullName $content -NoNewLine
  }
}