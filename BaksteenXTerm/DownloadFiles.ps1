
Invoke-WebRequest "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/css/xterm.css" -OutFile "wwwroot\css\xterm.css"

Invoke-WebRequest "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/+esm" -OutFile "wwwroot\js\xterm.esm.js"
Invoke-WebRequest "https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/+esm" -OutFile "wwwroot\js\addon-fit.esm.js"
Invoke-WebRequest "https://cdn.jsdelivr.net/npm/@xterm/addon-clipboard@0.1.0/+esm" -OutFile "wwwroot\js\addon-clipboard.esm.js"
Invoke-WebRequest "https://cdn.jsdelivr.net/npm/@xterm/addon-web-links@0.11.0/+esm" -OutFile "wwwroot\js\addon-web-links.esm.js"

# You can import the whole , but it depends on which build of xterm.js you’re using. 
# The file you copied into  is almost certainly the UMD/CommonJS build, which doesn’t expose . 
# That’s why you saw the error. To use , you must point to the ESM build of xterm.js.
# import { Terminal } from "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/+esm";
# <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/css/xterm.css">
