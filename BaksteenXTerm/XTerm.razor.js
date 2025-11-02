import { Terminal } from './js/xterm.esm.js';
import { FitAddon } from "./js/addon-fit.esm.js";
import { WebLinksAddon } from './js/addon-web-links.esm.js';

export class XTermInteropHelper {
    #terminal;
    #fitAddon;
    #webLinksAddon
    #resizeObserver;

    constructor(elementRef) {
        //alert("Initializing terminal...");
        this.#terminal = new Terminal();
        this.#fitAddon = new FitAddon();
        this.#webLinksAddon = new WebLinksAddon();
        this.#terminal.loadAddon(this.#fitAddon);
        this.#terminal.loadAddon(this.#webLinksAddon);

        //terminal.open(document.getElementById(containerId));
        this.#terminal.open(elementRef);
        this.#fitAddon.fit();

        this.#resizeObserver = new ResizeObserver(() => {
            const dims = this.#fitAddon.proposeDimensions();
            if (dims.cols < this.#terminal.cols) {
                // width is shrinking, so resize to minimum first to avoid issues
                this.#terminal.resize(10, this.#terminal.rows);
            }
            this.#fitAddon.fit();
        });
        this.#resizeObserver.observe(elementRef);

    //    this.#terminal.onBell(() => {
    //        alert("bell");

    //        // Create a new Audio object with the sound file URL
    //        //const sound = new Audio('./buzzer.mp3');
    //        // Play the sound
    //        //sound.play();
    //    })
    }

    fit() {
        this.#fitAddon.fit();
    }

    write(data) {
        this.#terminal.write(data);
    }

    clear() {
        this.#terminal.clear();
    }

    reset() {
        this.#terminal.reset();
    }

    blur() {
        this.#terminal.blur();
    }

    focus() {
        this.#terminal.focus();
    }

    resize(cols, rows) {
        // Defensive: ensure numbers
        const c = Number(cols) || 0;
        const r = Number(rows) || 0;
        if (c > 0 && r > 0) {
            this.#terminal.resize(c, r);
            // After a manual resize, refit to ensure layout if using fit addon
            try { this.#fitAddon.fit(); } catch {}
        }
    }

    hasSelection() {
        return this.#terminal.hasSelection();
    }

    getSelection() {
        try {
            // returns a string (empty string if none)
            return this.#terminal.getSelection();
        } catch {
            return "";
        }
    }

    getSelectionPosition() {
        const pos = this.#terminal.getSelectionPosition();
        if (!pos) return null;
        // Normalize to a plain object (start/end with x/y) so it serializes cleanly
        const normalizePos = p => p ? { x: p.x, y: p.y } : null;
        return {
            start: normalizePos(pos.start),
            end: normalizePos(pos.end)
        };
    }

    clearSelection() {
        this.#terminal.clearSelection();
    }

    select(column, row, length) {
        try {
            const c = Number(column) || 0;
            const r = Number(row) || 0;
            const l = Number(length) || 0;
            // xterm.js expects 1-based columns/rows in some versions; pass through as provided.
            this.#terminal.select(c, r, l);
        } catch {
            // swallow
        }
    }

    selectAll() {
        this.#terminal.selectAll();
    }

    dispose() {
        this.#resizeObserver.disconnect();
        this.#terminal.dispose();
    }

    registerOnKey(dotNetRef) {
        const disposable = this.#terminal.onKey(e => {
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
        return disposable;
    }

    registerOnData(dotNetRef) {
        const disposable =  this.#terminal.onData(data => {
            // Send the data back to .NET
            dotNetRef.invokeMethodAsync("OnTerminalData", data);
        });
        return disposable;
    }

    registerOnSelectionChange(dotNetRef) {
        const disposable = this.#terminal.onSelectionChange(() => {
            try {
                const payload = {
                    hasSelection: this.hasSelection(),
                    selection: this.getSelection(),
                    position: this.getSelectionPosition()
                };
                dotNetRef.invokeMethodAsync("OnSelectionChange", payload);
            } catch {
                // swallow any errors to avoid breaking terminal behavior
            }
        });
        return disposable;
    }
}

export function createXTermInteropHelper(elementRef) {
    return new XTermInteropHelper(elementRef);
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