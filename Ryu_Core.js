//================================================================
// * Plugin Name    : Ryu_Core
// - Last updated   : 19/07/2024
// - Curent Version : 0.3.01
//================================================================
/*:
 * @target MZ
 * @plugindesc V0.3.01 Core plugin providing essential classes and functions for other Ryu plugins.
 * @author Ryuuji
 * @url https://github.com/RyuujiCA/RPGMZ
 * 
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
 * For a list of syntaxes used you can visit Caethyrill and Archeia's
 * spreadsheet here :
 * https://docs.google.com/spreadsheets/d/1-Oa0cRGpjC8L5JO8vdMwOaYMKO75dtfKDOetnvh7OHs/preview/sheet?gid=1186334695#rangeid=1435305468
 *
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
 * @param aliasSettings
 * @type struct<Alias>[]
 * @default []
 * @text Alias Settings
 * @desc List of alias settings for different types and methods.
 * @parent separator2
 *
 * @command SetAlias
 * @text Set Alias
 * @desc Set an alias for a game object (variable, switch, etc.)
 *
 * //Base param
 * @arg commandType
 * @type select
 * @option -- Game Objects --
 * @option $gameActors
 * @option $gameMap
 * @option $gameMessage
 * @option $gameParty
 * @option $gamePlayer
 * @option $gameScreen
 * @option $gameSelfSwitch
 * @option $gameScreen._pictures
 * @option $gameSwitch
 * @option $gameSystem
 * @option $gameTemp
 * @option $gameTimer
 * @option $gameTroop
 * @option $gameVariables
 * @option -- Data Objects --
 * @option $dataActors
 * @option $dataAnimations
 * @option $dataArmors
 * @option $dataClasses
 * @option $dataCommonEvents
 * @option $dataEnemies
 * @option $dataItems
 * @option $dataMapInfos
 * @option $dataMap
 * @option $dataSkills
 * @option $dataStates
 * @option $dataSystem
 * @option $dataTileSets
 * @option $dataTroops
 * @option $dataWeapons
 * @option -- Core Classes --
 * @option AudioManager
 * @option BattleManager
 * @option DataManager
 * @option EffectManager
 * @option Graphics
 * @option ImageManager
 * @option Input
 * @option SceneManager
 * @option SoundManager
 * @option StorageManager
 * @option TextManager
 * @option PluginManager
 * @option TouchInput
 * @option -- Below : Plugin Developpers help (Prototypes) --
 * @option -- Scene Classes --
 * @option Scene_Base
 * @option Scene_Boot
 * @option Scene_Title
 * @option Scene_Map
 * @option Scene_Menu
 * @option Scene_Item
 * @option Scene_Skill
 * @option Scene_Equip
 * @option Scene_Status
 * @option Scene_Options
 * @option Scene_File
 * @option Scene_Save
 * @option Scene_Load
 * @option Scene_GameEnd
 * @option Scene_Battle
 * @option -- Window Classes --
 * @option Window_Base
 * @option Window_Selectable
 * @option Window_Command
 * @option Window_HorzCommand
 * @option Window_Help
 * @option Window_Gold
 * @option Window_MenuCommand
 * @option Window_MenuStatus
 * @option Window_ItemCategory
 * @option Window_ItemList
 * @option Window_SkillType
 * @option Window_SkillStatus
 * @option Window_SkillList
 * @option Window_EquipCommand
 * @option Window_EquipSlot
 * @option Window_EquipStatus
 * @option Window_Status
 * @option Window_Options
 * @option Window_SavefileList
 * @option Window_ShopCommand
 * @option Window_ShopBuy
 * @option Window_ShopSell
 * @option Window_ShopNumber
 * @option Window_ShopStatus
 * @option Window_NameEdit
 * @option Window_NameInput
 * @option Window_Message
 * @option Window_ScrollText
 * @option Window_ChoiceList
 * @option Window_NumberInput
 * @option Window_EventItem
 * @option Window_PartyCommand
 * @option Window_ActorCommand
 * @option Window_BattleStatus
 * @option Window_BattleLog
 * @option Window_BattleActor
 * @option Window_BattleEnemy
 * @option Window_BattleSkill
 * @option Window_BattleItem
 * @option Window_TitleCommand
 * @option Window_GameEnd
 * @option -- Game Classes --
 * @option Game_Action
 * @option Game_ActionResult
 * @option Game_Actor
 * @option Game_Battler
 * @option Game_BattlerBase
 * @option Game_Character
 * @option Game_CharacterBase
 * @option Game_Enemy
 * @option Game_Event
 * @option Game_Follower
 * @option Game_Followers
 * @option Game_Interpreter
 * @option Game_Item
 * @option Game_Map
 * @option Game_Message
 * @option Game_Party
 * @option Game_Picture
 * @option Game_Player
 * @option Game_Screen
 * @option Game_SelfSwitches
 * @option Game_Switches
 * @option Game_System
 * @option Game_Temp
 * @option Game_Timer
 * @option Game_Troop
 * @option Game_Unit
 * @option Game_Variables
 * @option -- Sprite Classes --
 * @option Spriteset_Base
 * @option Spriteset_Battle
 * @option Spriteset_Map
 * @option Sprite_Actor
 * @option Sprite_Battler
 * @option Sprite_Base
 * @option Sprite_Character
 * @option Sprite_Damage
 * @option Sprite_Enemy
 * @option Sprite_Picture
 * @option Sprite_Timer
 * @option Sprite_StateIcon
 * @option Sprite_Weapon
 * @option Sprite_Animation
 * @option Sprite_AnimationMV
 * @default Variable
 * @text Type
 * @desc The type of game object to alias.
 * @parent separator2
 *
 * @arg commandAlias
 * @type string
 * @default V
 * @text Alias
 * @desc The alias to use for the game object.
 * @parent separator2
 *
 * @arg commandMethods
 * @type struct<MethodAlias>[]
 * @default []
 * @text Methods
 * @desc List of method aliases for the selected type.
 * @parent separator2
 */

/*~struct~Alias:
 * @param type
 * @type select
 * @option -- Game Objects --
 * @option $gameActors
 * @option $gameMap
 * @option $gameMessage
 * @option $gameParty
 * @option $gamePlayer
 * @option $gameScreen
 * @option $gameSelfSwitch
 * @option $gameScreen._pictures
 * @option $gameSwitch
 * @option $gameSystem
 * @option $gameTemp
 * @option $gameTimer
 * @option $gameTroop
 * @option $gameVariables
 * @option -- Data Objects --
 * @option $dataActors
 * @option $dataAnimations
 * @option $dataArmors
 * @option $dataClasses
 * @option $dataCommonEvents
 * @option $dataEnemies
 * @option $dataItems
 * @option $dataMapInfos
 * @option $dataMap
 * @option $dataSkills
 * @option $dataStates
 * @option $dataSystem
 * @option $dataTileSets
 * @option $dataTroops
 * @option $dataWeapons
 * @option -- Core Classes --
 * @option AudioManager
 * @option BattleManager
 * @option DataManager
 * @option EffectManager
 * @option Graphics
 * @option ImageManager
 * @option Input
 * @option SceneManager
 * @option SoundManager
 * @option StorageManager
 * @option TextManager
 * @option PluginManager
 * @option TouchInput
 * @option -- Below : Plugin Developpers help (prototypes)--
 * @option -- Scene Classes --
 * @option Scene_Base
 * @option Scene_Boot
 * @option Scene_Title
 * @option Scene_Map
 * @option Scene_Menu
 * @option Scene_Item
 * @option Scene_Skill
 * @option Scene_Equip
 * @option Scene_Status
 * @option Scene_Options
 * @option Scene_File
 * @option Scene_Save
 * @option Scene_Load
 * @option Scene_GameEnd
 * @option Scene_Battle
 * @option -- Window Classes --
 * @option Window_Base
 * @option Window_Selectable
 * @option Window_Command
 * @option Window_HorzCommand
 * @option Window_Help
 * @option Window_Gold
 * @option Window_MenuCommand
 * @option Window_MenuStatus
 * @option Window_ItemCategory
 * @option Window_ItemList
 * @option Window_SkillType
 * @option Window_SkillStatus
 * @option Window_SkillList
 * @option Window_EquipCommand
 * @option Window_EquipSlot
 * @option Window_EquipStatus
 * @option Window_Status
 * @option Window_Options
 * @option Window_SavefileList
 * @option Window_ShopCommand
 * @option Window_ShopBuy
 * @option Window_ShopSell
 * @option Window_ShopNumber
 * @option Window_ShopStatus
 * @option Window_NameEdit
 * @option Window_NameInput
 * @option Window_Message
 * @option Window_ScrollText
 * @option Window_ChoiceList
 * @option Window_NumberInput
 * @option Window_EventItem
 * @option Window_PartyCommand
 * @option Window_ActorCommand
 * @option Window_BattleStatus
 * @option Window_BattleLog
 * @option Window_BattleActor
 * @option Window_BattleEnemy
 * @option Window_BattleSkill
 * @option Window_BattleItem
 * @option Window_TitleCommand
 * @option Window_GameEnd
 * @option -- Game Classes --
 * @option Game_Action
 * @option Game_ActionResult
 * @option Game_Actor
 * @option Game_Battler
 * @option Game_BattlerBase
 * @option Game_Character
 * @option Game_CharacterBase
 * @option Game_Enemy
 * @option Game_Event
 * @option Game_Follower
 * @option Game_Followers
 * @option Game_Interpreter
 * @option Game_Item
 * @option Game_Map
 * @option Game_Message
 * @option Game_Party
 * @option Game_Picture
 * @option Game_Player
 * @option Game_Screen
 * @option Game_SelfSwitches
 * @option Game_Switches
 * @option Game_System
 * @option Game_Temp
 * @option Game_Timer
 * @option Game_Troop
 * @option Game_Unit
 * @option Game_Variables
 * @option -- Sprite Classes --
 * @option Spriteset_Base
 * @option Spriteset_Battle
 * @option Spriteset_Map
 * @option Sprite_Actor
 * @option Sprite_Battler
 * @option Sprite_Base
 * @option Sprite_Character
 * @option Sprite_Damage
 * @option Sprite_Enemy
 * @option Sprite_Picture
 * @option Sprite_Timer
 * @option Sprite_StateIcon
 * @option Sprite_Weapon
 * @option Sprite_Animation
 * @option Sprite_AnimationMV
 * @default Variable
 * @text Type
 * @desc The type of game object to alias.
 * 
 * @param alias
 * @type string
 * @default V
 * @text Alias
 * @desc The alias to use for the game object.
 * 
 * @param methods
 * @type struct<MethodAlias>[]
 * @default []
 * @text Methods
 * @desc List of method aliases for the selected type.
 */

/*~struct~MethodAlias:
 * @param original
 * @type string
 * @default $object.method
 * @text Original Method
 * @desc The original method name to alias.
 *
 * @param alias
 * @type string
 * @default v
 * @text Alias Method
 * @desc The alias to use for the method.
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

/* ========================================================================== */
/*                             CORE UTILITIES                                 */
/* ========================================================================== */
// Let them know!
Ryu.Core.aliasesReady = new Promise((resolve) => {
    Ryu.Core._resolveAliasesReady = resolve;
});

// Utilities!
Ryu.Utils = {
    // Pro logs and errors...
    log: function (message) {
        console.log("[Ryu_CORE] " + message);
    },
    error: function (messages) {
        console.error("! [Ryu_CORE] ! ", ...messages);
    },

    // Time? Why not...
    formatDate: function (date) {
        return date.toISOString();
    },

    // Auto update function for scripts
    update: function (script, link) {
        //let name = script;
        //let url = link;

        const scripts = [
            { name: script, url: link }
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
                    this.log(`Updated ${filename}`);
                    updated = true;
                }
            }));

            Promise.all(promises).then(() => {
                if (updated) {
                    this.log('Scripts updated successfully.');
                    // TODO : Reload the game after update scripts if possible
                } else {
                    this.log('All scripts are already up to date.');
                }
            }).catch(error => {
                this.error(`Error updating scripts: ${error.message}`);
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

    // Function to get info between notetags
    parseCustomNotetags: function () {
        // Test with data items
        // Todo Scale this up!
        // TODO : On my way...
        $dataItems.forEach(item => {
            if (item && item.note) {
                const names = Ryu.Utils.parseNotetags(item.note, 'setName');
                names.forEach(name => {
                    //this.log(`Item ${item.id} has name: ${name}`);
                });

                const strengths = Ryu.Utils.parseNotetags(item.note, 'Strength');
                strengths.forEach(strength => {
                   // this.log(`Item ${item.id} has strength: ${strength}`);
                });
            }
        });
    },

    //Function to set Aliases and methods
    setAlias: function (type, alias, methods) {
        //TODO : Add cases for $gameMap.event.XXX (recursive function)
        const targetMap = {
            // Game Objects
            '$gameActors': $gameActors,
            '$gameMap': $gameMap,
            '$gameMessage': $gameMessage,
            '$gameParty': $gameParty,
            '$gamePlayer': $gamePlayer,
            '$gameScreen': $gameScreen,
            '$gameSelfSwitches': $gameSelfSwitches,
            '$gameSwitches': $gameSwitches,
            '$gameSystem': $gameSystem,
            '$gameTemp': $gameTemp,
            '$gameTimer': $gameTimer,
            '$gameTroop': $gameTroop,
            '$gameVariables': $gameVariables,
            '$gameScreen._pictures': $gameScreen._pictures,

            // Data Objects 
            '$dataActors': $dataActors,
            '$dataAnimations': $dataAnimations,
            '$dataArmors': $dataArmors,
            '$dataClasses': $dataClasses,
            '$dataCommonEvents': $dataCommonEvents,
            '$dataEnemies': $dataEnemies,
            '$dataItems': $dataItems,
            '$dataMapInfos': $dataMapInfos,
            '$dataMap': $dataMap,
            '$dataSkills': $dataSkills,
            '$dataStates': $dataStates,
            '$dataSystem': $dataSystem,
            '$dataTilesets': $dataTilesets,
            '$dataTroops': $dataTroops,
            '$dataWeapons': $dataWeapons,
            '$dataTilesets': $dataTilesets,

            // Core Classes
            'AudioManager': AudioManager,
            'BattleManager': BattleManager,
            'DataManager': DataManager,
            'EffectManager': EffectManager,
            'Graphics': Graphics,
            'ImageManager': ImageManager,
            'Input': Input,
            'SceneManager': SceneManager,
            'SoundManager': SoundManager,
            'StorageManager': StorageManager,
            'TextManager': TextManager,
            'PluginManager': PluginManager,
            'TouchInput': TouchInput,

            // Global Classes
            // Scene Classes
            'Scene_Base': Scene_Base.prototype,
            'Scene_Boot': Scene_Boot.prototype,
            'Scene_Title': Scene_Title.prototype,
            'Scene_Map': Scene_Map.prototype,
            'Scene_Menu': Scene_Menu.prototype,
            'Scene_Item': Scene_Item.prototype,
            'Scene_Skill': Scene_Skill.prototype,
            'Scene_Equip': Scene_Equip.prototype,
            'Scene_Status': Scene_Status.prototype,
            'Scene_Options': Scene_Options.prototype,
            'Scene_File': Scene_File.prototype,
            'Scene_Save': Scene_Save.prototype,
            'Scene_Load': Scene_Load.prototype,
            'Scene_GameEnd': Scene_GameEnd.prototype,
            'Scene_Battle': Scene_Battle.prototype,

            // Window Classes
            'Window_Base': Window_Base.prototype,
            'Window_Selectable': Window_Selectable.prototype,
            'Window_Command': Window_Command.prototype,
            'Window_HorzCommand': Window_HorzCommand.prototype,
            'Window_Help': Window_Help.prototype,
            'Window_Gold': Window_Gold.prototype,
            'Window_MenuCommand': Window_MenuCommand.prototype,
            'Window_MenuStatus': Window_MenuStatus.prototype,
            'Window_ItemCategory': Window_ItemCategory.prototype,
            'Window_ItemList': Window_ItemList.prototype,
            'Window_SkillType': Window_SkillType.prototype,
            'Window_SkillStatus': Window_SkillStatus.prototype,
            'Window_SkillList': Window_SkillList.prototype,
            'Window_EquipCommand': Window_EquipCommand.prototype,
            'Window_EquipSlot': Window_EquipSlot.prototype,
            'Window_EquipStatus': Window_EquipStatus.prototype,
            'Window_Status': Window_Status.prototype,
            'Window_Options': Window_Options.prototype,
            'Window_SavefileList': Window_SavefileList.prototype,
            'Window_ShopCommand': Window_ShopCommand.prototype,
            'Window_ShopBuy': Window_ShopBuy.prototype,
            'Window_ShopSell': Window_ShopSell.prototype,
            'Window_ShopNumber': Window_ShopNumber.prototype,
            'Window_ShopStatus': Window_ShopStatus.prototype,
            'Window_NameEdit': Window_NameEdit.prototype,
            'Window_NameInput': Window_NameInput.prototype,
            'Window_Message': Window_Message.prototype,
            'Window_ScrollText': Window_ScrollText.prototype,
            'Window_ChoiceList': Window_ChoiceList.prototype,
            'Window_NumberInput': Window_NumberInput.prototype,
            'Window_EventItem': Window_EventItem.prototype,
            'Window_PartyCommand': Window_PartyCommand.prototype,
            'Window_ActorCommand': Window_ActorCommand.prototype,
            'Window_BattleStatus': Window_BattleStatus.prototype,
            'Window_BattleLog': Window_BattleLog.prototype,
            'Window_BattleActor': Window_BattleActor.prototype,
            'Window_BattleEnemy': Window_BattleEnemy.prototype,
            'Window_BattleSkill': Window_BattleSkill.prototype,
            'Window_BattleItem': Window_BattleItem.prototype,
            'Window_TitleCommand': Window_TitleCommand.prototype,
            'Window_GameEnd': Window_GameEnd.prototype,

            // Game Classes
            'Game_Action': Game_Action.prototype,
            'Game_ActionResult': Game_ActionResult.prototype,
            'Game_Actor': Game_Actor.prototype,
            'Game_Battler': Game_Battler.prototype,
            'Game_BattlerBase': Game_BattlerBase.prototype,
            'Game_Character': Game_Character.prototype,
            'Game_CharacterBase': Game_CharacterBase.prototype,
            'Game_Enemy': Game_Enemy.prototype,
            'Game_Event': Game_Event.prototype,
            'Game_Follower': Game_Follower.prototype,
            'Game_Followers': Game_Followers.prototype,
            'Game_Interpreter': Game_Interpreter.prototype,
            'Game_Item': Game_Item.prototype,
            'Game_Map': Game_Map.prototype,
            'Game_Message': Game_Message.prototype,
            'Game_Party': Game_Party.prototype,
            'Game_Picture': Game_Picture.prototype,
            'Game_Player': Game_Player.prototype,
            'Game_Screen': Game_Screen.prototype,
            'Game_SelfSwitches': Game_SelfSwitches.prototype,
            'Game_Switches': Game_Switches.prototype,
            'Game_System': Game_System.prototype,
            'Game_Temp': Game_Temp.prototype,
            'Game_Timer': Game_Timer.prototype,
            'Game_Troop': Game_Troop.prototype,
            'Game_Unit': Game_Unit.prototype,
            'Game_Variables': Game_Variables.prototype,

            // Sprite Classes
            'Spriteset_Base': Spriteset_Base.prototype,
            'Spriteset_Battle': Spriteset_Battle.prototype,
            'Spriteset_Map': Spriteset_Map.prototype,
            'Sprite_Actor': Sprite_Actor.prototype,
            'Sprite_Battler': Sprite_Battler.prototype,
            //'Sprite_Base': Sprite_Base.prototype, //TODO : find a way to include this one without bug
            'Sprite_Character': Sprite_Character.prototype,
            'Sprite_Damage': Sprite_Damage.prototype,
            'Sprite_Enemy': Sprite_Enemy.prototype,
            'Sprite_Picture': Sprite_Picture.prototype,
            'Sprite_Timer': Sprite_Timer.prototype,
            'Sprite_StateIcon': Sprite_StateIcon.prototype,
            'Sprite_Weapon': Sprite_Weapon.prototype,
            'Sprite_Animation': Sprite_Animation.prototype,
            'Sprite_AnimationMV': Sprite_AnimationMV.prototype,
            // Others ?
        };

        const target = targetMap[type];

        if (!target) {
            this.error(`Target for type ${type} is not initialized.`);
            return;
        }

        const aliasObject = {};
        //original methods
        for (const method in target) {
            if (typeof target[method] === 'function') {
                aliasObject[method] = target[method].bind(target);
            }
        }

        //custom methods
        methods.forEach(method => {
            const originalMethod = method.original;
            const aliasMethod = method.alias;
            if (typeof target[originalMethod] === 'function') {
                aliasObject[aliasMethod] = target[originalMethod].bind(target);
            } else {
                this.error(`Method ${originalMethod} does not exist on target object : ${type}`);
            }
        });

        window[alias] = aliasObject;
    },
    
    // Base plugins aliases if set
    initializeAliasesFromParams: function () {
        const aliasSettings = JSON.parse(Ryu.Core.parameters['aliasSettings'] || '[]');
        aliasSettings.forEach(setting => {
            try {
                const parsedSetting = JSON.parse(setting);
                const type = parsedSetting.type;
                const alias = parsedSetting.alias;
                let methods = JSON.parse(parsedSetting.methods);

                // Ensure methods is an array before using map
                if (!Array.isArray(methods)) {
                    methods = [];
                }

                // Parse all methods
                methods = methods.map(method => {
                    if (typeof method === 'string') {
                        return JSON.parse(method);
                    }
                    return method;
                });

                Ryu.Utils.setAlias(type, alias, methods);
            } catch (error) {
                Ryu.Utils.error(`Failed to initialize alias from settings: ${error}`);
            }
        });

        // Aliases set and ready!
        Ryu.Core._resolveAliasesReady();
    }

    // More utility functions... yay!
};

/* ========================================================================== */
/*                             AUTO UPDATE FILES                              */
/* ========================================================================== */
if (Ryu.Core.AutoUpdate === true) {
    // TODO : Update logic to be less repetitive
    //Ryu.Core.UpdateScripts();
    Ryu.Utils.update(Ryu.Core.Git.name, Ryu.Core.Git.url);
} else {
    Ryu.Utils.log("Auto Update inactive!");
}


/* ========================================================================== */
/*                             CORE SPECIFIC PLUGIN                           */
/* ========================================================================== */
// Call parseCustomNotetags when data is loaded
const _DataManager_onLoad = DataManager.onLoad;
DataManager.onLoad = function (object) {
    _DataManager_onLoad.call(this, object);
    //TODO : Add all classes
    if (object === $dataItems) {
        Ryu.Utils.parseCustomNotetags();
    }
};

// Initialize aliases from plugin parameters on game start
Ryu.Core.initializeAliasesFromParams = function () {
    Ryu.Utils.initializeAliasesFromParams();
};

// Call initializeAliasesFromParams when the first scene is created
const _Scene_Base_create = Scene_Base.prototype.create;
Scene_Base.prototype.create = function () {
    _Scene_Base_create.call(this);
    if (SceneManager._scene instanceof Scene_Map) {
        Ryu.Core.initializeAliasesFromParams();
    }
};


/* ========================================================================== */
/*                               COMMAND CALLS                                */
/* ========================================================================== */
PluginManager.registerCommand('Ryu_Core', 'SetAlias', args => {
    const type = args.commandType;
    const alias = args.commandAlias;
    let methods;

    console.log(" type :", args.commandType + " alias :", args.commandAlias + " method :", JSON.parse(args.commandMethods));

    if (!args.commandMethods || args.commandMethods === 'undefined') {
        Ryu.Utils.error('Methods argument is missing or undefined.');
        methods = [];
    } else {
        try {
            // Handle deeply nested JSON strings
            methods = JSON.parse(args.commandMethods);
            if (typeof methods === 'string') {
                methods = JSON.parse(methods);
            }
            methods = methods.map(method => {
                if (typeof method === 'string') {
                    return JSON.parse(method);
                }
                return method;
            });
        } catch (error) {
            Ryu.Utils.error("Failed to parse methods:", error);
            methods = [];
        }
    }

    //Ryu.Utils.log(`Setting alias for ${type} as ${alias}`);
    Ryu.Utils.setAlias(type, alias, methods);
});
