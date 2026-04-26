import urllib.request
import json
import os
import time

teams = [
  "Arsenal F.C.", "Aston Villa F.C.", "A.F.C. Bournemouth", "Brentford F.C.", "Brighton & Hove Albion F.C.",
  "Chelsea F.C.", "Crystal Palace F.C.", "Everton F.C.", "Fulham F.C.", "Ipswich Town F.C.",
  "Leicester City F.C.", "Liverpool F.C.", "Manchester City F.C.", "Manchester United F.C.", "Newcastle United F.C.",
  "Nottingham Forest F.C.", "Southampton F.C.", "Tottenham Hotspur F.C.", "West Ham United F.C.", "Wolverhampton Wanderers F.C."
]

mapping = {
  "Arsenal F.C.": "Arsenal",
  "Aston Villa F.C.": "AstonVilla",
  "A.F.C. Bournemouth": "Bournemouth",
  "Brentford F.C.": "Brentford",
  "Brighton & Hove Albion F.C.": "BrightonHoveAlbion",
  "Chelsea F.C.": "Chelsea",
  "Crystal Palace F.C.": "CrystalPalace",
  "Everton F.C.": "Everton",
  "Fulham F.C.": "Fulham",
  "Ipswich Town F.C.": "IpswichTown",
  "Leicester City F.C.": "LeicesterCity",
  "Liverpool F.C.": "Liverpool",
  "Manchester City F.C.": "ManchesterCity",
  "Manchester United F.C.": "ManchesterUnited",
  "Newcastle United F.C.": "NewcastleUnited",
  "Nottingham Forest F.C.": "NottinghamForest",
  "Southampton F.C.": "Southampton",
  "Tottenham Hotspur F.C.": "TottenhamHotspur",
  "West Ham United F.C.": "WestHamUnited",
  "Wolverhampton Wanderers F.C.": "WolverhamptonWanderers"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

os.makedirs("assets/clubs", exist_ok=True)

for team in teams:
    safe_name = mapping[team]
    filename = f"assets/clubs/{safe_name}.png"
    
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(team)}&prop=pageimages&format=json&pithumbsize=200"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            pages = data['query']['pages']
            for page_id in pages:
                if 'thumbnail' in pages[page_id]:
                    img_url = pages[page_id]['thumbnail']['source']
                    req2 = urllib.request.Request(img_url, headers=headers)
                    with urllib.request.urlopen(req2) as img_resp:
                        with open(filename, 'wb') as f:
                            f.write(img_resp.read())
                    print(f"Downloaded {team}")
                else:
                    print(f"No image found for {team}")
    except Exception as e:
        print(f"Error for {team}: {e}")
    time.sleep(1)
