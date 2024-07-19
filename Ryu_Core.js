//================================================================
// * Plugin Name    : Ryu_Core
// - Last updated   : 19/07/2024
// - Curent Version : 0.1.04b
//================================================================
/*:
 * @target MZ
 * @plugindesc V0.1.04b Core plugin providing essential classes and functions for other Ryu plugins.
 * @author Ryuuji
 * 
 * @param separator1
 * @text Auto Update
 * 
 * @param AutoUpdate
 * @text Auto-Update
 * @type boolean
 * @default true
 * @desc Update Ryu_Core file automatically through github
 * @parent separator1
 * 
 * @param separator2
 * @text Set Aliases
 * @desc Create custom aliases for popular methods such as V for $gameVariables
 * 
 * @command SetAlias
 * @text Set Alias
 * @desc Set an alias for a game object (variable, switch, etc.)
 *
 * @arg type
 * @type select
 * @option variable
 * @option switch
 * @option actor
 * @option class
 * @default variable
 * @text Type
 * @desc The type of game object to alias.
 * @parent separator2
 *
 * @arg alias
 * @type string
 * @default V
 * @text Alias
 * @desc The alias to use for the game object.
 * @parent separator2
 * 
 * @help
 * This is the core plugin for Ryu plugins. It must be installed and placed above all other Ryu plugins.
 * Will be automatically updated through github from now on.
 * 
 */

var Ryu = Ryu || {};
Ryu.Core = Ryu.Core || {};

if (typeof PluginManager !== 'undefined' && PluginManager.parameters) {
    Ryu.Core.parameters = PluginManager.parameters('Ryu_Core');
} else {
    console.error('PluginManager.parameters is not defined');
}


/* ========================================================================== */
/*                                AUTO UPDATE                                 */
/* ========================================================================== */
Ryu.Core.AutoUpdate = Ryu.Core.parameters['AutoUpdate'] === 'true';

Ryu.Core.UpdateScripts = function() {
    const scripts = [
        { name: 'Ryu_Core', url: 'https://raw.githubusercontent.com/RyuujiCA/RPGMZ/main/Ryu_Core.js' },
        //{ name: 'Ryu_ChangeBG', url: 'https://raw.githubusercontent.com/username/RPGMakerMZ-Scripts/main/Ryu_ChangeBG.js' },
        { name: 'Ryu_AfkTimeCollector', url: 'https://raw.githubusercontent.com/RyuujiCA/RPGMZ/main/Ryu_AfkTimeCollector.js' }
    ];

    function downloadScript(script) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', script.url, true);
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject(new Error(`Failed to download ${script.name}: ${xhr.statusText}`));
                }
            };
            xhr.onerror = function () {
                reject(new Error(`Network error while downloading ${script.name}`));
            };
            xhr.send();
        });
    }

    function updateScripts() {
        let updated = false;
        const promises = scripts.map(script => downloadScript(script).then(content => {
            const filename = `${script.name}.js`;
            const path = require('path');
            const fs = require('fs');
            const scriptPath = path.join(process.cwd(), 'js/plugins', filename);
            const currentContent = fs.existsSync(scriptPath) ? fs.readFileSync(scriptPath, 'utf8') : null;

            if (currentContent !== content) {
                fs.writeFileSync(scriptPath, content);
                console.log(`Updated ${filename}`);
                updated = true;
            }
        }));

        Promise.all(promises).then(() => {
            if (updated) {
                console.log('Scripts updated successfully.');
                // TODO : Reload the game after update scripts
            } else {
                console.log('All scripts are already up to date.');
            }
        }).catch(error => {
            console.error(`Error updating scripts: ${error.message}`);
        });
    }

    // Call the update function when the game starts
    updateScripts();
};

/* ========================================================================== */
/*                             CORE UTILITIES                                 */
/* ========================================================================== */
Ryu.Utils = {
    // Example utility function
    log: function (message) {
        console.log("[Ryu_CORE] " + message);
    },

    // Additional utility functions
    formatDate: function (date) {
        return date.toISOString();
    },

    // Function to parse notetags
    parseNotetags: function (note, tag) {
        const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g');
        const matches = [];
        let match;
        while ((match = regex.exec(note)) !== null) {
            matches.push(match[1].trim());
        }
        return matches;
    }
    // More utility functions...
};

// Base Classes
Ryu.BaseMenu = class {
    constructor() {
        // Base properties and methods
    }

    // Example method
    open() {
        Ryu.Utils.log("Base Menu opened.");
    }

    // More base methods...
};

// Base Window Class
Ryu.BaseWindow = class {
    constructor() {
        // Initialization code
    }

    // Example method
    show() {
        Ryu.Utils.log("Base Window shown.");
    }

    // More base methods...
};

// Modified commands and methods
PluginManager.registerCommand('Ryu_CORE', 'SetAlias', args => {
    const type = args.type;
    const alias = args.alias;

    switch (type) {
        case 'variable':
            window[alias] = {
                value: (id) => $gameVariables.value(id),
                setValue: (id, val) => $gameVariables.setValue(id, val)
            };
            break;
        case 'switch':
            window[alias] = {
                value: (id) => $gameSwitches.value(id),
                setValue: (id, val) => $gameSwitches.setValue(id, val)
            };
            break;
        // Add more cases for other types such as actors, classes, etc.
        default:
            throw new Error(`Unknown type: ${type}`);
    }
});

/* ========================================================================== */
/*                             AUTO UPDATE FILES                              */
/* ========================================================================== */
if (Ryu.Core.AutoUpdate === true) {
    Ryu.Core.UpdateScripts();
} else {
    Ryu.Utils.log("Auto Update inactive!");
}

// Example of registering a command to set variable alias V
/*PluginManager.registerCommand('Ryu_CORE', 'SetAliasVariable', args => {
    const alias = args.alias || 'V';
    window[alias] = {
        value: (id) => $gameVariables.value(id),
        setValue: (id, val) => $gameVariables.setValue(id, val)
    };
});*/
