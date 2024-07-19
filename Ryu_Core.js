/*:
 * @target MZ
 * @plugindesc Core plugin providing essential classes and functions for other Ryu plugins.
 * @author YourName
 * 
 * @param separator1
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
 *
 * @arg alias
 * @type string
 * @default V
 * @text Alias
 * @desc The alias to use for the game object.
 * 
 * @help
 * This is the core plugin for Ryu plugins. It must be installed and placed above all other Ryu plugins.
 * Will be automatically updated through github from now on.
 * 
 */

var Ryu = Ryu || {};

// Core Utility Functions
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

// Example of registering a command to set variable alias V
/*PluginManager.registerCommand('Ryu_CORE', 'SetAliasVariable', args => {
    const alias = args.alias || 'V';
    window[alias] = {
        value: (id) => $gameVariables.value(id),
        setValue: (id, val) => $gameVariables.setValue(id, val)
    };
});*/