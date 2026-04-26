import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    req = urllib.request.Request('https://efootball-student-league-default-rtdb.asia-southeast1.firebasedatabase.app/policies.json')
    response = urllib.request.urlopen(req, context=ctx)
    data = json.loads(response.read())
    
    if data:
        print(f"✅ Found {len(data.keys())} policies in Firebase.")
        for key, val in data.items():
            print(f"Policy: {val.get('title')} ({val.get('category')}) - Has Image: {'Yes' if val.get('imageUrl') else 'No'}")
    else:
        print("❌ Firebase 'policies' node is empty.")
except Exception as e:
    print(f"ERROR: {e}")
