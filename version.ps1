<#PSScriptInfo .VERSION 0.0.1.5#>

[CmdletBinding()]
Param ()

& {
  $htmlRevision = ([version] @((Get-Content "$PSScriptRoot\rsc\showdown.html" -ReadCount 1 -TotalCount 1) -split ' ')[2]).Revision
  $htmlRevision = $htmlRevision -lt 0 ? 0:$htmlRevision
  Get-ChildItem "$PSScriptRoot\*.js" -Exclude *.min.js -Recurse | ForEach-Object {
    try {
      [version](Get-Content $_.FullName).where{ $_.StartsWith(' * @version ') }.Substring(12).Trim()
    } catch { }
  } | Sort-Object | Where-Object Revision -GT 0 | Measure-Object -Property Revision -Sum | ForEach-Object {
    $version = $_.Sum + $htmlRevision
@"
#define VER_VERSION 0,0,1,$($version)
#define VER_VERSION_STR "0.0.1.$($version)"

"@ | Out-File "$PSScriptRoot\version.h" -NoNewline
  }
}