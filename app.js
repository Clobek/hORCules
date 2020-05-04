let player = null;
let playerName = null;
let genderKey = false;
let changeLocation = 'Spiteful Hills';
let enemy = null;

const goblinNames = ['Bylb', 'Oiz', 'Plokx', 'Glut', 'Ix', 'Drezlos', 'Ylserd', 'Fabukt', 'Gnirvazz', 'Glegract', 'Taassai', 'Clals', 'Myhx', 'Eaxa', 'Swiortee', 'Dysseaft', 'Ranviolda', 'Chertohx', 'Slokniag', 'Gritbenqea']

const experienceArray = ["There is no level 0", 1000, 1500, 2000, 2500, 5000, 6000, 7000, 8500, 10000]

class Player {
    constructor (name) {
        this.name = name;
        this.level = 1;
        this.experience = 0;
        this.experienceToLevel = experienceArray[this.level];
        this.gold = 0;
        this.strength = 8;
        this.stamina = 10;
        this.dexterity = 5;
        this.agility = 5;
        this.maxHealth = this.stamina*5;
        this.currentHealth = this.stamina*5;
        this.maxHit = this.strength*2;
        this.minHit = this.dexterity*2;
        this.accuracy = 80 + (this.agility/2)
    }
    attack(opponent){
        opponent = enemy
        const dmg = Math.floor(Math.random()*(this.maxHit - this.minHit)) + this.minHit;
        if (enemy === null || enemy === undefined) {
            alert('You do not currently have an enemy to attack.')
        } else {
            if (player.accuracy > Math.floor(Math.random()*100)+1) {
                enemy.currentHealth -= dmg;
                $('.enemy-health').text(`Health: ${enemy.currentHealth}/${enemy.maxHealth}`)
                if(enemy.currentHealth <= 0) {
                    $('.enemy-window').css('display', 'none');
                    player.experience += enemy.giveExperience
                    $('.character-experience').text(`Experience: ${player.experience}/${player.experienceToLevel}`);
                    enemy = null;
                    if (player.experience >= player.experienceToLevel) {
                        player.experience -= player.experienceToLevel;
                        player.levelUp();
                    }
                } else {
                    enemy.attack()
                }
            } else {
                alert('You missed!')
                enemy.attack()
            }
        }
    }
    levelUp() {
        this.level += 1;
        player.experienceToLevel = experienceArray[this.level];
        $('.character-experience').text(`Experience: ${player.experience}/${player.experienceToLevel}`);
        $('.character-level').text(`Level: ${player.level}`);
        this.strength += 1;
        this.stamina += 3;
        this.dexterity += 1;
        this.agility += 1;
        this.maxHealth = this.stamina*5;
        this.currentHealth = this.stamina*5;
        this.maxHit = this.strength*2;
        this.minHit = this.dexterity*2;
        this.accuracy = 80 + (this.agility/2)
        $('.character-health').text(`Health: ${player.currentHealth}/${player.maxHealth}`);
    }
    run() {
        if (enemy === null) {
            alert('There is nothing to run from.')
        } else {
            $('.enemy-window').css('display', 'none');
            enemy = null;
        }
    }
}

class Goblin {
    constructor (name) {
        this.name = name;
        this.level = Math.floor(Math.random()*(5-1)+1);
        this.giveExperience = 50+this.level*40;
        this.strength = 2+this.level;
        this.stamina = 2+this.level;
        this.dexterity = 1+this.level;
        this.agility = 1+this.level;
        this.maxHealth = this.stamina*5;
        this.currentHealth = this.stamina*5;
        this.maxHit = this.strength*2;
        this.minHit = this.agility*2;
        this.accuracy = 70 + (this.agility/2)
    }
    attack(opponent){
        opponent = player
        const dmg = Math.floor(Math.random()*(this.maxHit - this.minHit)) + this.minHit;
        if (enemy.accuracy > Math.floor(Math.random()*100)+1) {
            player.currentHealth -= dmg;
            $('.character-health').text(`Health: ${player.currentHealth}/${player.maxHealth}`)
            if(player.currentHealth <= 0) {
                alert('You died! Luckily the gods favor you and have brought you back... your penalty is half of your experience.')
                player.experience -= Math.floor(player.experience/2)
                $('.character-experience').text(`Experience: ${player.experience}/${player.experienceToLevel}`);
                player.currentHealth += player.maxHealth - player.currentHealth
                $('.character-health').text(`Health: ${player.currentHealth}/${player.maxHealth}`);
                enemy = null;
                $('.enemy-window').css('display', 'none');
            }
        } else {
            alert('Enemy missed!')
        }
    }
}

const nextModal = () => {
    $('.modal-intro').css('display', 'none')
}

const setName = () => {
    if ($('#nameInput').val() === '') {
        alert('Please enter a name!')
    } else if ($('#nameInput').val().length > 15) {
        alert('Please enter a shorter name')
    } else {
        playerName = $('#nameInput').val();
        $('.character-name').text(`Name: ${playerName}`);
        $('.modal-name').css('display', 'none');
        player = new Player(playerName);
    }
}

const chooseMale = () => {
    $('.character-portrait').css('background-image', 'url(images/MaleOrc.png)');
    $('#maleButton').css('background-color', 'blue');
    $('#femaleButton').css('background-color', 'grey');
    genderKey = true;
}

const chooseFemale = () => {
    $('.character-portrait').css('background-image', 'url(images/FemaleOrc.png)');
    $('#femaleButton').css('background-color', 'blue');
    $('#maleButton').css('background-color', 'grey');
    genderKey = true;
}

const finalize = () => {
    if (genderKey === true) {
        $('.modal').css('display', 'none');
        $('.character-window').css('display', 'block');
        $('.character-level').text(`Level: ${player.level}`);
        $('.character-experience').text(`Experience: ${player.experience}/${player.experienceToLevel}`);
        $('.character-health').text(`Health: ${player.currentHealth}/${player.maxHealth}`);
        $('.user-options').css('display', 'block');
        $('.user-interface').css('display', 'block');
    } else {
        alert('Please select a gender.');
    }
}

const newEnemy = () => {
    if (changeLocation === 'Spiteful Hills' && enemy === null) {
        enemy = new Goblin(goblinNames[Math.floor(Math.random()*goblinNames.length-1)]);
        $('.enemy-portrait').css('background-image', 'url(images/Goblin.png)');
        $('.enemy-window').css('display', 'block');
        $('.enemy-name').text(`Name: ${enemy.name}`);
        $('.enemy-level').text(`Level: ${enemy.level}`)
        $('.enemy-health').text(`Health: ${enemy.currentHealth}/${enemy.maxHealth}`)
    } else if (changeLocation === 'Necropolis' && enemy === null) {

    } else if (changeLocation === 'Troll Caves' && enemy === null) {

    } else {
        alert('Defeat your current enemy before moving to another!')
    }
}