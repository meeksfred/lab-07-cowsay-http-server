#Cowsay HTTP Server

This is an HTTP Server which we setup to run with simple GET and POST commands, using the Cowsay npm module to display some of the responses.

To get a different cowsay animal/picture, run: f==(animal). Put this as an additional query string. If nothing is passed, it will default to cow.
  - ex: http localhost:(port#)/cowsay text==(string) f==dragon
  - ex: http localhost:(port#)/cowsay text==(string) (default)
  - Possible animals/pictures:
    - beavis.zen  bong  bud-frogs  bunny  cheese  cower  daemon  default  doge  dragon-and-cow  dragon  elephant-in-snake  elephant  eyes  flaming-sheep  ghostbusters  goat  head-in  hedgehog  hellokitty  kiss  kitty  koala  kosh  luke-koala  mech-and-cow  meow  milk  moofasa  moose  mutilated  ren  satanic  sheep  skeleton  small  sodomized  squirrel  stegosaurus  stimpy  supermilker  surgery  telebears  turkey  turtle  tux  vader-koala  vader  www

For this project run: brew install httpie

- npm modules used:
  - cowsay
  - gulp
  - gulp-eslint

- Node modules used:
  - http
  - url
  - querystring

To start the server, in the command line type: node server.js.
  - The default port is 3000, but you can also set a custom port by running: node server.js PORT=(number).

Open another tab in shell, in the same home directory.

GET requests:
  - /
    - http localhost:(port#)/
    - Should just return:
      - HTTP/1.1 200 OK
        Connection: keep-alive
        Content-Type: text/plain
        Date: Tue, 20 Sep 2016 23:09:08 GMT
        Transfer-Encoding: chunked

        "hello world"
  - /cowsay text==(string)
    - http localhost:(port#)/cowsay text==(string) f==(animal) << (optional)
    - This will return:
      - HTTP/1.1 200 OK
        Connection: keep-alive
        Content-Type: text/plain
        Date: Tue, 20 Sep 2016 23:09:08 GMT
        Transfer-Encoding: chunked

        then the cowsay image with what you passed in as (string)

POST requests:
  - You need to pipe a JSON object with key/value pair of {"text":"message"}.
    - ex: cat data.json | http localhost:(port#)/cowsay f==(animal) << (optional)
