$teams = @(
    @{ name = "AstonVilla"; url = "https://upload.wikimedia.org/wikipedia/en/9/9f/Aston_Villa_logo.svg" },
    @{ name = "CrystalPalace"; url = "https://upload.wikimedia.org/wikipedia/en/a/a2/Crystal_Palace_FC_logo_%282022%29.svg" },
    @{ name = "Everton"; url = "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg" },
    @{ name = "IpswichTown"; url = "https://upload.wikimedia.org/wikipedia/en/4/43/Ipswich_Town.svg" },
    @{ name = "WolverhamptonWanderers"; url = "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers_crest.svg" }
)

$assetsDir = "assets/clubs"
if (!(Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir
}

$userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

foreach ($team in $teams) {
    $name = $team.name
    $url = $team.url
    $outputPath = Join-Path $assetsDir "$name.svg"
    
    # We force overwrite for these missing ones to ensure a fresh try
    Write-Host "Downloading logo for ${name}..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath -Headers @{"User-Agent"=$userAgent} -ErrorAction Stop
        Write-Host "Successfully downloaded ${name}."
        Start-Sleep -Seconds 5 # Longer delay for the last few
    } catch {
        $msg = $_.Exception.Message
        Write-Warning "Failed to download logo for ${name}: $msg"
    }
}

Write-Host "Logo download process completed."
