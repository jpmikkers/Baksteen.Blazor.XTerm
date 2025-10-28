
import { Terminal } from './js/xterm.esm.js';
import { FitAddon } from "./js/addon-fit.esm.js";
import { WebLinksAddon } from './js/addon-web-links.esm.js';

export function initTerminal() {
    //const link = document.createElement("link");
    //link.rel = "stylesheet";
    //link.href = "./js/xterm.css";
    //document.head.appendChild(link);

    alert("Initializing terminal...");
    const terminal = new Terminal();
    terminal.loadAddon(new FitAddon());
    terminal.loadAddon(new WebLinksAddon());
    alert("addon installed...");
    terminal.open(document.getElementById('terminal'));
    terminal.write('Welcome to xterm.js see: http://www.github.com/\r\n');
    return terminal;
}

export function getJsProperty(item,path) {
    try {
        const parts = path.split('.');
        let value = item; // Start from global scope

        for (const part of parts) {
            if (value && part in value) {
                value = value[part];
            } else {
                return null;
            }
        }
        //alert(JSON.stringify(value, null, 2));
        return value;
    } catch {
        return null;
    }
}