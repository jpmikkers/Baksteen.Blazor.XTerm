
You can import the whole , but it depends on which build of xterm.js you’re using. 
The file you copied into  is almost certainly the UMD/CommonJS build, which doesn’t expose . 
That’s why you saw the error. To use , you must point to the ESM build of xterm.js.

import { Terminal } from "https://cdn.jsdelivr.net/npm/@xterm/xterm/+esm";
import "https://cdn.jsdelivr.net/npm/@xterm/xterm/css/xterm.css";

import { Terminal } from "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/+esm";
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/css/xterm.css">