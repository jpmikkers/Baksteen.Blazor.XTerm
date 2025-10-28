
import { Terminal } from './js/xterm.esm.js';
import { FitAddon } from "./js/addon-fit.esm.js";
import { WebLinksAddon } from './js/addon-web-links.esm.js';

export function initXterm(containerId, dotNetRef) {
    const term = new Terminal();
    term.open(document.getElementById(containerId));

    term.onData(data => {
        // Send the data back to .NET
        dotNetRef.invokeMethodAsync("OnTerminalData", data);
    });
}

export function initTerminal(containerId, dotNetRef) {
    //const link = document.createElement("link");
    //link.rel = "stylesheet";
    //link.href = "./js/xterm.css";
    //document.head.appendChild(link);

    //alert("Initializing terminal...");
    const terminal = new Terminal();
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(new WebLinksAddon());
    //alert("addon installed...");
    terminal.open(document.getElementById(containerId));
    fitAddon.fit();

    terminal.write('Welcome to xterm.js see: http://www.github.com/\r\n');

    //    const { key, domEvent } = e;
    //    terminal.write("Key pressed:" + key + "Event:" + domEvent);
    // Example: intercept Ctrl+C
    //    if (domEvent.ctrlKey && key === "c") {
    //        console.log("Ctrl+C detected!");
    //        domEvent.preventDefault();
    //    }
    //});

    // Listen for key presses
    //const disposable = terminal.onKey(e => {
    //    const { key, domEvent } = e;
    //    terminal.write("Key pressed:" + key + "Event:" + domEvent);
    // Example: intercept Ctrl+C
    //    if (domEvent.ctrlKey && key === "c") {
    //        console.log("Ctrl+C detected!");
    //        domEvent.preventDefault();
    //    }
    //});

    // Listen for key presses
    const disposable = terminal.onKey(e => {
        const { key, domEvent } = e;

        // Create a serializable object
        const payload = {
            key: key,
            code: domEvent.code,
            ctrl: domEvent.ctrlKey,
            alt: domEvent.altKey,
            shift: domEvent.shiftKey,
            meta: domEvent.metaKey
        };
        dotNetRef.invokeMethodAsync("OnTerminalKey", payload);
    });

    terminal.onData(data => {
        // Send the data back to .NET
        dotNetRef.invokeMethodAsync("OnTerminalData", data);
    });

    // Later, unsubscribe if needed
    // disposable.dispose();

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