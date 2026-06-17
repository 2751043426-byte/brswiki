// Decoding utilities for puzzle solving

function base64Decode(str) {
    try {
        return atob(str.trim());
    } catch (e) {
        return "Error: Invalid base64 string";
    }
}

function base64Encode(str) {
    return btoa(str);
}

function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function(c) {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
}

function hexDecode(str) {
    try {
        return str.trim().replace(/\s+/g, '').match(/.{2}/g).map(function(hex) {
            return String.fromCharCode(parseInt(hex, 16));
        }).join('');
    } catch (e) {
        return "Error: Invalid hex string";
    }
}

function hexEncode(str) {
    return str.split('').map(function(c) {
        return c.charCodeAt(0).toString(16).padStart(2, '0');
    }).join(' ');
}

function morseDecode(str) {
    const morseMap = {
        '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
        '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
        '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
        '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
        '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
        '--..': 'Z', '-----': '0', '.----': '1', '..---': '2', '...--': '3',
        '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8',
        '----.': '9'
    };
    return str.trim().split(/\s+/).map(function(c) {
        return morseMap[c] || '?';
    }).join('');
}

function morseEncode(str) {
    const morseMap = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
        'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
        'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
        'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
        'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
        'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        '9': '----.', ' ': '/'
    };
    return str.toUpperCase().split('').map(function(c) {
        return morseMap[c] || '?';
    }).join(' ');
}

function caesarDecode(str, shift) {
    return str.replace(/[a-zA-Z]/g, function(c) {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base - shift + 26) % 26) + base);
    });
}

// URL parameter parser
function getUrlParams() {
    const params = {};
    const hash = window.location.hash.split('?')[1];
    if (hash) {
        hash.split('&').forEach(function(pair) {
            const [key, val] = pair.split('=');
            if (key) params[decodeURIComponent(key)] = decodeURIComponent(val || '');
        });
    }
    return params;
}

// Store decoded data in session
function storeDecoded(key, value) {
    sessionStorage.setItem('backrooms_' + key, value);
}

function getDecoded(key) {
    return sessionStorage.getItem('backrooms_' + key);
}

function clearDecoded() {
    Object.keys(sessionStorage).forEach(function(key) {
        if (key.startsWith('backrooms_')) sessionStorage.removeItem(key);
    });
}
