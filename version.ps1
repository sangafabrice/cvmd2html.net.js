<#PSScriptInfo .VERSION 0.0.1.2#>

[CmdletBinding()]
Param ()

& {
  $infoFilePath = "$PSScriptRoot\src\AssemblyInfo.js"
  $infoContent = Get-ChildItem "$PSScriptRoot\*.js" -Recurse | ForEach-Object {
    try {
      [version](Get-Content $_.FullName).where{ $_.StartsWith(' * @version ') }.Substring(12).Trim()
    } catch { }
  } | Sort-Object | Where-Object Revision -GT 0 | Measure-Object -Property Revision -Sum | ForEach-Object {
@"
@cc_on

@set @MAJOR = $(0)
@set @MINOR = $(0)
@set @BUILD = $(1)
@set @REVISION = $($_.Sum)

"@ + (@(Get-Content $infoFilePath | Select-Object -Skip 6).TrimEnd() -join [Environment]::NewLine)
  }
  $infoContent | Out-File $infoFilePath utf8BOM -NoNewline
}