import requests
import json
import sys

if len(sys.argv) <= 1:
    print("Usage: " + sys.argv[0] + " <url>")
    sys.exit(0)

data = {
    "url": sys.argv[1]
}
print("Sending:", data)
res = requests.post("http://localhost:3000/api/shorten", data).json()
print(json.dumps(res, indent=2))
