<#PSScriptInfo .VERSION 0.0.1.9#>

#Requires -Version 6.1
[CmdletBinding()]
Param ()

& {
  Get-ChildItem "$PSScriptRoot\*.js" -Exclude *.min.js -Recurse | ForEach-Object {
    try {
      [version](Get-Content $_.FullName).where{ $_.StartsWith(' * @version ') }.Substring(12).Trim()
    } catch { }
  } | Sort-Object | Where-Object Revision -GT 0 | Measure-Object -Property Revision -Sum | ForEach-Object {
    $infoFilePath = "$PSScriptRoot\cvmd2html.jsproj"
    $jsprojXml = [xml] (Get-Content $infoFilePath)
    $jsprojXml.Project.PropertyGroup.VersionRevision = $_.Sum
    $jsprojXml.Save($infoFilePath)
  }
}