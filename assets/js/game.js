var playerName = window.prompt("What is your robot's name?");
var playerHealth =100;
var playerAttack= 10;

var enemyName = "Roborto";
var enemyHealth= 50;
var enemyAttack= 12;

var fight = function() {
    //Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");

    //Subract the value of playerAttack from the value of enemyHealth and use that result to update the value in the enemyHealth var
    enemyHealth = enemyHealth -playerAttack;

    //Log a resulting message to the console so we know that it workd.
    console.log(
        playerName + " attacked" + enemyName +". " +enemyName + " now has "+ enemyHealth + " health remaining."
    );

    // Subtract the value of enemyAttack from the value of playerHelath and use that result to update the value in the playerhelath var
    playerHealth = playerHealth - enemyAttack;

    //log resulting msg to sonsole so we know it workd
    console.log(
        enemyName + " attacked " + playerName+". "+ playerName + " now has " + playerHealth + " health remaining."
    );

    if (playerHealth <=0) {
        window.alert(playerName + " has died!");
    }
    else {
        window.alert(playerName+ " still has "+ playerHealth+ " health left.");
    }

    //check enemys health
    if (enemyHealth <=0) {
        window.alert(enemyName + " has died!");
    }
    else {
        window.alert(enemyName+ " still has "+ enemyHealth+ " health left.");
    }
};

fight();