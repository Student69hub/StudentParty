$teams = @(
    @{ name = "Arsenal"; url = "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
    @{ name = "AstonVilla"; url = "https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg" },
    @{ name = "Bournemouth"; url = "https://upload.wikimedia.org/wikipedia/en/e/e5/AFC_Bournemouth_%282013%29.svg" },
    @{ name = "Brentford"; url = "https://upload.wikimedia.org/wikipedia/en/2/2a/Brentford_FC_crest.svg" },
    @{ name = "BrightonHoveAlbion"; url = "https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg" },
    @{ name = "Chelsea"; url = "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" },
    @{ name = "CrystalPalace"; url = "https://upload.wikimedia.org/wikipedia/en/a/a2/Crystal_Palace_FC_logo_%282013%29.svg" },
    @{ name = "Everton"; url = "https://upload.wikimedia.org/wikipedia/en/f/f9/Everton_FC_logo.svg" },
    @{ name = "Fulham"; url = "https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg" },
    @{ name = "IpswichTown"; url = "https://upload.wikimedia.org/wikipedia/en/4/43/Ipswich_Town.svg" },
    @{ name = "LeicesterCity"; url = "https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg" },
    @{ name = "Liverpool"; url = "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" },
    @{ name = "ManchesterCity"; url = "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" },
    @{ name = "ManchesterUnited"; url = "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" },
    @{ name = "NewcastleUnited"; url = "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg" },
    @{ name = "NottinghamForest"; url = "https://upload.wikimedia.org/wikipedia/en/e/e5/Nottingham_Forest_F.C._logo.svg" },
    @{ name = "Southampton"; url = "https://upload.wikimedia.org/wikipedia/en/c/c9/FC_Southampton.svg" },
    @{ name = "TottenhamHotspur"; url = "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" },
    @{ name = "WestHamUnited"; url = "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg" },
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
    
    if (Test-Path $outputPath) {
        Write-Host "Logo for ${name} already exists. Skipping..."
        continue
    }

    Write-Host "Downloading logo for ${name}..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath -Headers @{"User-Agent"=$userAgent} -ErrorAction Stop
        Write-Host "Successfully downloaded ${name}."
        Start-Sleep -Seconds 3 # Delay to respect rate limits
    } catch {
        $msg = $_.Exception.Message
        Write-Warning "Failed to download logo for ${name}: $msg"
    }
}

Write-Host "Logo download process completed."
