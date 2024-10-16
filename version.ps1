<#PSScriptInfo .VERSION 0.0.1.7#>

[CmdletBinding()]
Param ()

& {
  Get-ChildItem "$PSScriptRoot\*.js" -Exclude *.min.js -Recurse | ForEach-Object {
    try {
      [version](Get-Content $_.FullName).where{ $_.StartsWith(' * @version ') }.Substring(12).Trim()
    } catch { }
  } | Sort-Object | Where-Object Revision -GT 0 | Measure-Object -Property Revision -Sum | ForEach-Object {
@"
#define VER_VERSION 0,0,1,$($_.Sum)
#define VER_VERSION_STR "0.0.1.$($_.Sum)"

"@ | Out-File "$PSScriptRoot\version.h" -NoNewline
  }
}