var fightOrSkip = function () {
    //ask player if theyd like to figh tor skip
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    //Conditional Recursive Function Call
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    // if player picks "skip" confirm and then stop the loop
    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
            // subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true; //return true if palyer wants to leave
        }
    }
    return false;
}

var fight = function (enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;

    // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            // ask player if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }

            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // remove enemy's health by subtracting the amount we set in the damage variable
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name +" attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            // player gets attacked first
        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            // remove player's health by subtracting the amount we set in the damage variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // leave while() loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};

var startGame = function () {
    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            //let player know what round they are in, array starts at 0 so thats why we add 1  
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            //pick new enemy to fight based on the index of the enemy name array
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            //pass the pickedenemy.name variables value into the fiht functio, where it assujmes the value of the enemy.name parameter
            fight(pickedEnemyObj);
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //play again
    endGame();
};

var endGame = function () {
    window.alert("The game has now ended. Lets's see how you did!");

    //check localStorage for high score, if its not ther use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }
    //if player has more money than the high score. player has new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    //ask player if theyd like to play again
    var playAgainConfirm = window.confirm("would you like to play agian?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function () {
    //ask player what theyd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");
    shopOptionPrompt = parseInt(shopOptionPrompt);

    //use swithc to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2: //new case   
            playerInfo.upgradeAttack();
            break;
        case 3: //new case
            window.alert("Leaving the store.");
            //do nothing so fucntion will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

//function to generate a random numeric value 
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

//function to set name
var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, //comma!
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough moeny!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You dont't have enough money!");
        }

    }
};

var enemyInfo = [{
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

startGame();