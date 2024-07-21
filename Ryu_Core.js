//================================================================
// * Plugin Name    : Ryu_Core
// - Last updated   : 19/07/2024
// - Curent Version : 0.1.05
//================================================================
/*:
 * @target MZ
 * @plugindesc V0.1.05 Core plugin providing essential classes and functions for other Ryu plugins.
 * @author Ryuuji
 * @url https://github.com/RyuujiCA/RPGMZ
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
 * @option gameMessage
 * @default variable
 * @text Type
 * @desc The type of game object to alias.
 *
 * @arg alias
 * @type string
 * @default V
 * @text Alias
 * @desc The alias to use for the game object.
 * 
 * @help
 * This is the core plugin for Ryu plugins. 
 * It must be installed and placed above all other Ryu plugins.
 * Will be automatically updated through github from now on.
 * 
 * The core plugin allows to overwrite game objects call and simplifies the 
 * syntaxes.
 * Call the command "SetAlias" and chose "variable", then set V (for example)
 * You will now be able to write v.value() and v.setValue() instead of 
 * $gameVariables.value() and $gameVariables.setValue()
 * 
 * For a list of syntaxes used go to : github link to syntaxes
 * 
 * 
 */

// Declare
var Ryu = Ryu || {};
Ryu.Core = Ryu.Core || {};
Ryu.Core.Git = {name: 'Ryu_Core', url: 'https://raw.githubusercontent.com/RyuujiCA/RPGMZ/main/Ryu_Core.js'} || {};  // TODO implement cleaner logic

// ¨Parameter exist?
if (typeof PluginManager !== 'undefined' && PluginManager.parameters) {
    Ryu.Core.parameters = PluginManager.parameters('Ryu_Core');
} else {
    console.error('PluginManager.parameters is not defined');
}


/* ========================================================================== */
/*                                 PARAMETERS                                 */
/* ========================================================================== */
Ryu.Core.AutoUpdate = Ryu.Core.parameters['AutoUpdate'] === 'true';

/*Ryu.Core.UpdateScripts = function() {
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
};*/

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

    // Auto update function for scripts
    update: function (script, link) {
        //let name = script;
        //let url = link;

        const scripts = [
            { name: script, url: link },
            //{ name: 'Ryu_ChangeBG', url: 'https://raw.githubusercontent.com/username/RPGMakerMZ-Scripts/main/Ryu_ChangeBG.js' },
            //{ name: 'Ryu_AfkTimeCollector', url: 'https://raw.githubusercontent.com/RyuujiCA/RPGMZ/main/Ryu_AfkTimeCollector.js' }
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
    },

    parseCustomNotetags: function () {
        // Test with data items
        // Todo Scale this up!
        $dataItems.forEach(item => {
            if (item && item.note) {
                const names = Ryu.Utils.parseNotetags(item.note, 'setName');
                names.forEach(name => {
                    Ryu.Utils.log(`Item ${item.id} has name: ${name}`);
                });

                const strengths = Ryu.Utils.parseNotetags(item.note, 'Strength');
                strengths.forEach(strength => {
                    Ryu.Utils.log(`Item ${item.id} has strength: ${strength}`);
                });
            }
        });
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

/* ========================================================================== */
/*                             AUTO UPDATE FILES                              */
/* ========================================================================== */
if (Ryu.Core.AutoUpdate === true) {
    //Ryu.Core.UpdateScripts();
    Ryu.Utils.update(Ryu.Core.Git.name, Ryu.Core.Git.url);
} else {
    Ryu.Utils.log("Auto Update inactive!");
}


/* ========================================================================== */
/*                             CORE SPECIFIC PLUGIN                           */
/* ========================================================================== */
// Hook into DataManager to call parseCustomNotetags when data is loaded
const _DataManager_onLoad = DataManager.onLoad;
DataManager.onLoad = function (object) {
    _DataManager_onLoad.call(this, object);
    //TODO : Add all classes
    if (object === $dataItems) {
        Ryu.Utils.parseCustomNotetags();
    }
};

PluginManager.registerCommand('Ryu_Core', 'SetAlias', args => {
    const type = args.type;
    const alias = args.alias;

    Ryu.Utils.log(`Setting alias for ${type} as ${alias}`);
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
        case 'gameMessage':
            window[alias] = {
                setFaceImg: (faceName, faceIndex) => $gameMessage.setFaceImage(faceName, faceIndex),
                setBg: (bgType) => $gameMessage.setBackground(bgType),
                setPos: (posType) => $gameMessage.setPositionType(posType),
                setName: (speakerName) => $gameMessage.setSpeakerName(speakerName),
                setNamePos: (speakerName, posType) => {
                    $gameMessage.setSpeakerName(speakerName);
                    $gameMessage.setPositionType(posType);
                },
                setMsg: (text) => $gameMessage.add(text)
            };
            break;
        // Add more cases for other types such as actors, classes, etc.
        default:
            throw new Error(`Unknown type: ${type}`);
    }
});

// Example of registering a command to set variable alias V
PluginManager.registerCommand('Ryu_Core', 'SetAliasVariable', args => {
    const alias = args.alias || 'V';
    window[alias] = {
        value: (id) => $gameVariables.value(id),
        setValue: (id, val) => $gameVariables.setValue(id, val)
    };
});
