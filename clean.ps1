<#PSScriptInfo .VERSION 0.0.1.5#>

#Requires -Version 6.1
[CmdletBinding()]
Param ()

& {
  Get-ChildItem "$PSScriptRoot\*.js","$PSScriptRoot\*.html","$PSScriptRoot\*.ps*1","$PSScriptRoot\.gitignore","$PSScriptRoot\resource.rc" -Exclude *.min.js -Recurse | ForEach-Object {
    $content = @(Get-Content $_.FullName).TrimEnd() -join [Environment]::NewLine
    $bytes = Get-Content $_.FullName -AsByteStream -ReadCount 3 -TotalCount 3
    $content | Out-File $_.FullName -Encoding ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF ? 'utf8BOM':'utf8') -NoNewline
  }
}