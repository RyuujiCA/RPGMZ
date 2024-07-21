//================================================================
// * Plugin Name    : Ryu_AfkTimeCollector
// - Last updated   : 14/06/2021
//================================================================
/*:
 * @target MZ
 * @plugindesc version 1.02 Timer collection for players when they go AFK.
 * @author Ryuuji
 * @help 
 *
 * Plugin Name    : Ryu_AfkTimeCollector
 * Last Update	  : 14-06-2021
 *
 * UPDATES :
 * v1.01 :
 * - Adds the possibility to control said AFK time by linking it to a variable.
 * 
 * v1.02 :
 * - Allows to use this functionality throughout player disconnect/closing game.
 *
 * Description :
 * 
 * Allows you to compensate a player for being AFK.
 * This plugin will enable you to compensate a player when they have left the 
 * game.
 * This includes : 
 * - The player minimizing their window
 * - The player going out of focus
 * - The player closing their game and coming back later
 * This feature is save linked, meaning every save file will have their own 
 * respective compensation for the time the player went away.
 * 
 * How to use :
 *
 * This plugin is used in 3 phases.
 * Phase 1 :
 *
 * * Run a plugin command "TrackerInit"
 *   This will start the tracking of the player activity.
 *
 * - Set Variable ID (StartTimer):
 *   Set the starting time of the game to the selected variable (should be 
 *   left untouched afterwards).
 * 
 * Phase 2 :
 *
 * * Run a common event in parrallel mode
 *   When you call for "TrackerInit", use a switch to activate a common event 
 *   to keep track of player activity. This switch should be disabled only in 
 *   certain areas you don't want the player to be compensated for being AFK.
 *   A delay of 30 to 60 frames should be put at the beginning of the common 
 *   event as to call the script once or twice per second. 
 *   (60 frames recommended)
 * 
 * * Run plugin command "GetTrackerInfo"
 *   This will look at the variable status.
 * 
 * - Set Variable ID (TimerInfo):
 *   This variable should be the same as the one assigned in "TrackerInit" as 
 *   to retrieve the correct information.
 *   This feature allows the player to close their game and still 
 *   receive a compensation.
 * 
 * Phase 3 :
 *
 * * Run plugin command "TimeTracker"
 *   This will calculate the difference between the player's last activity and 
 *   the player's current activity.
 * 
 * - Timer Info Var ID (TimerInfo):
 *   This, again, should be the same variable as assigned in "TrackerInit".
 *   
 * - Timer Collect Var ID (TimerCollect):
 *   This variable will contain the player's inactivy value and should therefor 
 *   be a unique variable.
 *
 * - Amount of seconds (Buffer):
 *   This acts as a buffer.
 *   You are expected to put the minimum time a player should be AFK before 
 *   getting a compensation.
 *   This is enterly up to you and should be expressed in seconds.
 *   60 seconds : 1 minute
 *   3600 seconds : 1 hour
 *   86400 seconds : 1 day
 *   Note : When you check for "TimerCollect" in your eventing, you should 
 *   check for a higher number than your buffer. It won't detect lower states.
 *
 *
 * Main utility :
 *
 * Only use this plugin if you wish to give your players some kind of 
 * compensation (what compensation is enterly up to you and can be done 
 * through eventing).
 * It can be gold, items or anything you see fit as a compensation.
 * You should base your eventing on "TimerCollect".
 * The value of that variable should not be lower than the value of the buffer.
 * Example :
 * Buffer value : 5 seconds
 * Event :
 *
	* ◆If：Tracker Value ≥ 10
	*  ◆If：Tracker Value ≥ 20
	*    ◆Text：None, None, Windowed, Bottom
	*    ：     ：Whoops, you were afk for too long! 
	*    ：     ：(\V[1] seconds!)
	*    ◆Control variables：#0001 Tracker Value = 20
	*    ◆Control switches：#0020 TrackerCapReached = ON
	*    ◆
	*  ：End
	*  ◆Modify gold：+ {Tracker Value}
	*  ◆If：TrackerCapReached is ON
	*    ◆Text：None, None, Windowed, Bottom
	*    ：     ：You cannot collect more than :
	*    ：     ：+ \V[1] \G
	*    ：     ：Be sure to come back often! 
	*    ◆Control switches：#0020 TrackerCapReached = OFF
	*    ◆
	*  ：Else
	*    ◆Text：None, None, Windowed, Bottom
	*    ：     ：Looks like you were afk for \V[1] seconds!
	*    ：     ：Here is a compensation for you : 
	*    ：     ：+ \V[1] \G
	*    ◆
	*  ：END
	*  ◆Comment：Reset tracker
	*  ◆Control variables：#0002 AFK_GoldCollect += Tracker Value
	*  ◆Control variables：#0001 Tracker Value = 0
	*  ◆
	*  ：END
 *
 * Special Note :
 * 
 * Since this plugin requires a common event to run, you can activate or
 * deactivate this plugin at will through playing with the switch you used 
 * for that common event.
 * If you don't want a player to receive their compensation whenever you 
 * activate the switch again (say they are doing a quest and you don't want
 * them to get a compensation during that quest), 
 * you will need to use the "TrackerInit" command to reset the timer's 
 * starting point.
 *
 * Feel free to distribute or modify this plugin.
 * Credits (Ryuuji or Artille) are welcome but not a must.
 *
 * // End Help
 *
 * @command TrackerInit
 * @text Initialise
 * @desc Set original time frame for tracker.
 * 
 * @arg StartTimer
 * @text Set Variable ID
 * @type variable
 * @desc Set the starting time into a variable.
 * @default 1
 *
 *
 * @command GetTrackerInfo
 * @text Get Info
 * @desc Get original time frame for tracker.
 * 
 * @arg TimerInfo
 * @text Set variable ID
 * @type variable
 * @desc Get the starting time into a variable.
 * @default 1
 *
 *
 * @command TimeTracker
 * @text Tracking
 * @desc Keep track of how long the player has been idle.
 *
 * @arg TimerInfo
 * @text Timer Info var ID
 * @type variable
 * @desc Retrieve current timer state
 * @default 1
 *
 * @arg TimerCollect
 * @text Time collect var ID
 * @type variable
 * @desc Pass the tracked AFK value to a variable.
 * @default 1
 *
 * @arg Buffer
 * @text Amount of seconds
 * @desc Tracker will react if AFK value is higher than input (in seconds). Should not be lower than 2 seconds.
 * @default 30
 */

var Ryu = Ryu || {};

// Check if Ryu_CORE is loaded
if (!Ryu || !Ryu.Utils || !Ryu.BaseMenu) {
    throw new Error("Ryu_AfkTimeCollector requires Ryu_CORE.js to be loaded first.");
} else {
    Ryu.Core.Git = { name: 'Ryu_AfkTimeCollector', url: 'https://raw.githubusercontent.com/RyuujiCA/RPGMZ/main/Ryu_AfkTimeCollector.js' } || {};  // TODO implement cleaner logic
    if (Ryu.Core.AutoUpdate === true) {
        Ryu.Utils.update(Ryu.Core.Git.name, Ryu.Core.Git.url);
    }/* else {
        Ryu.Utils.log("Auto Update inactive!");
    }*/
}


	PluginManager.registerCommand('Ryu_AfkTimeCollector', "TrackerInit", args => {
	
		var d = new Date();
		n = d.getTime(); // Initial time of the player based on local time
		$gameVariables.setValue(args.StartTimer, n)

	});
	
	PluginManager.registerCommand('Ryu_AfkTimeCollector', "GetTrackerInfo", args => {
	
		n = $gameVariables.value(args.TimerInfo)

	});
	
	PluginManager.registerCommand('Ryu_AfkTimeCollector', "TimeTracker", args => {
		
		function reboot(){
			difference = 0;
			n = n2;
			$gameVariables.setValue(args.TimerInfo, n)
		};
	
	var d = new Date();
	var n2 = d.getTime();
	var difference = n2 - n;

		if (difference >= (args.Buffer*1000)) { 
			var timeCollect = Math.round(difference/1000); 
			$gameVariables.setValue(args.TimerCollect, timeCollect)
			//console.log("player has come back")
			reboot();
		} else {
			//console.log("player is active")
			reboot();
		};

	});
