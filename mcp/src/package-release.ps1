param([Parameter(Mandatory=$true)][string]$Inventory)
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$spec=[IO.File]::ReadAllText($Inventory)|ConvertFrom-Json
$stream=[IO.File]::Open($spec.output,[IO.FileMode]::CreateNew)
$zip=New-Object IO.Compression.ZipArchive($stream,[IO.Compression.ZipArchiveMode]::Create,$false)
try{
 foreach($file in $spec.files){
  if($file.name -match '(^[\\/]|^[A-Za-z]:|(^|[\\/])\.\.([\\/]|$))'){throw 'Unsafe package entry.'}
  $entry=$zip.CreateEntry($file.name,[IO.Compression.CompressionLevel]::Optimal)
  $sourceStream=[IO.File]::OpenRead($file.source);$targetStream=$entry.Open()
  try{$sourceStream.CopyTo($targetStream)}finally{$targetStream.Dispose();$sourceStream.Dispose()}
 }
}finally{$zip.Dispose();$stream.Dispose()}
$zip=[IO.Compression.ZipFile]::OpenRead($spec.output)
try{
 if($zip.Entries.Count -ne $spec.files.Count){throw 'Release archive entry count differs.'}
 foreach($file in $spec.files){
  $entry=$zip.GetEntry($file.name);if(-not $entry){throw 'Release archive entry is missing.'}
  $entryStream=$entry.Open();$hasher=[Security.Cryptography.SHA256]::Create()
  try{$actual=[BitConverter]::ToString($hasher.ComputeHash($entryStream)).Replace('-','').ToLowerInvariant()}finally{$hasher.Dispose();$entryStream.Dispose()}
  if($actual -ne $file.sha256){throw 'Release archive bytes differ from the collected source.'}
 }
}finally{$zip.Dispose()}
