export function initTerminal() {
    //alert("Initializing terminal..."); 
    const term = new Terminal();
    term.open(document.getElementById('terminal'));
    term.write('Welcome to xterm.js\r\n');
    return term;
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