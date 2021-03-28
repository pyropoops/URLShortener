# URL Shortener (Prototype)

## Getting started

- `cd` into `/backend`
- `npm i`
- `npm start`

The node server will now be running at port 3000.
There will be an `/api/shorten` endpoint that takes in "url" as a query parameter. The server will then generate it's own URL for the redirect.

In order to test the URL shortener:

- `cd` into `/testing`
- `python3 poster.py <URL> (URL must include "http://")`

The python script will send a HTTP post request to the node endpoints, telling node to create a new endpoint which will enforce a 301 redirect to the URL you specified.

Node will then spit this URL back to you, or an error message if you did not specify correct parameters.

Node will also never generate the same "shortened URL" twice because it caches in all redirects it creates, in order to make sure one shorten will never override another.
