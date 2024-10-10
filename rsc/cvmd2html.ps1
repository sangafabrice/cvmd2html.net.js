<#PSScriptInfo .VERSION 0.0.1#>

<#
.SYNOPSIS
Convert a Markdown file to an HTML file.
.DESCRIPTION
The script converts the specified Markdown file to an HTML file. It shows an overwrite prompt window when the HTML already exists. It also displays thrown error messages in a message box and exits without further operation.
.PARAMETER MarkdownPath
Specifies the path of an existing .md Markdown file.
.PARAMETER HtmlFilePath
Specifies the path of the output HTML file.
By default, the output HTML file has the same parent directory and base name as the input Markdown file.
.PARAMETER OverWrite
Specifies that the output file should be overriden.
.EXAMPLE
"Here's the link to the [team session](https://fromthetechlab.blogspot.com)." > .\Readme.md
PS> .\Convert-MarkdownToHtml .\Readme.md
PS> Get-Content .\Readme.html
<p>Here's the link to the <a href="https://fromthetechlab.blogspot.com">team session</a>.</p>
#>
using namespace System.IO
using namespace System.Windows
[CmdletBinding()]
Param (
  [Parameter(Mandatory, Position=0)]
  [ValidateScript({Test-Path $_ -PathType Leaf} <#, ErrorMessage = 'The input file "{0}" is not found.'#> )]
  [ValidatePattern('\.md$' <#, ErrorMessage = 'The extension of "{0}" is invalid. ".md" is required.'#> )]
  [string] $MarkdownPath,
  [Parameter(Position=1)]
  [ValidatePattern('\.html?$' <#, ErrorMessage = 'The extension of "{0}" is invalid. ".htm" or "html" is required.'#> )]
  [string] $HtmlPath = [Path]::ChangeExtension($MarkdownPath, '.html'),
  [switch] $OverWrite
)

# Show the specified text message in a WPF Message Box.
# The message type specifies the icon and buttons to display.
Function ShowMessageBox($Message, $HtmlPath, $MessageType) {
  $DefaultType = 'Error'
  If ([string]::IsNullOrEmpty($MessageType)) {
    $MessageType = $DefaultType
  }
  Add-Type -AssemblyName PresentationFramework
  If (
    [MessageBox]::Show(
      ($Message -f $HtmlPath),
      'Convert Markdown to HTML',
      # If the message type is Error, the box shows an OK button.
      # If the message type is Exclamation, the box shows a Yes and a No button.
      $(
        If ($MessageType -eq $DefaultType) {
          'OK'
        } Else {
          'YesNo'
        }
      ),
      $MessageType
    ) -in ('No','OK')
  ) {
    # Exit when the user clicks No or OK.
    Exit
  }
}
# Handle exceptions when the HTML file already exists or the output path is a directory.
If (Test-Path $HtmlPath -PathType Leaf) {
  If (-not $OverWrite) {
    ShowMessageBox ('The file "{0}" already exists.' + "`n`nDo you want to overwrite it?") $HtmlPath 'Exclamation'
  }
} ElseIf (Test-Path $HtmlPath) {
  ShowMessageBox '"{0}" cannot be overwritten because it is a directory.' $HtmlPath
}
Try {
  # The path to PowerShell Core is store in the registry key below.
  # Get uniform error messages format by handling them in a catch statement.
  $CommandOutput = & (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\pwsh.exe\').'(default)' -nol -ep Bypass -noni -nop -cwa 'try { (ConvertFrom-Markdown $args[0] -ErrorAction Stop).Html } catch { Write-Error $_.Exception.Message }' $MarkdownPath 2>&1
  # Throw the error passed to $CommandOutput if the exit code is not 0.
  If ($LASTEXITCODE -ne 0) {
    # Remove the ANSI escaped character for red coloring.
    Write-Host $CommandOutput
    Throw ($CommandOutput -replace '(\x1B\[31;1m)|(\x1B\[0m)').Substring('Write-Error:'.Length + 1)
  }
  # Conversion from Markdown to HTML.
  $CommandOutput | Out-File $HtmlPath
} Catch {
  ShowMessageBox $_.Exception.Message
}