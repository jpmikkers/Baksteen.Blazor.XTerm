Invoke-WebRequest "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/css/xterm.css" -OutFile "wwwroot\css\xterm.css"

Invoke-WebRequest "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/+esm" -OutFile "wwwroot\js\xterm.esm.js"
Invoke-WebRequest "https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/+esm" -OutFile "wwwroot\js\addon-fit.esm.js"
Invoke-WebRequest "https://cdn.jsdelivr.net/npm/@xterm/addon-clipboard@0.1.0/+esm" -OutFile "wwwroot\js\addon-clipboard.esm.js"
Invoke-WebRequest "https://cdn.jsdelivr.net/npm/@xterm/addon-web-links@0.11.0/+esm" -OutFile "wwwroot\js\addon-web-links.esm.js"
