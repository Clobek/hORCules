let player = null;
let playerName = null;
let genderKey = false;
let location = 'Spiteful Hills';

const goblinNames = ['Bylb', 'Oiz', 'Plokx', 'Glut', 'Ix', 'Drezlos', 'Ylserd', 'Fabukt', 'Gnirvazz', 'Glegract', 'Taassai', 'Clals', 'Myhx', 'Eaxa', 'Swiortee', 'Dysseaft', 'Ranviolda', 'Chertohx', 'Slokniag', 'Gritbenqea']

const experienceArray = ["There is no level 0", 1000, 1500, 2000, 2500]

const enemy = null;

class Player {
    constructor (name) {
        this.name = name;
        this.level = 1;
        this.experience = 0;
        this.experienceToLevel = experienceArray[this.level]
        this.strength = 8;
        this.stamina = 10;
        this.dexterity = 5;
        this.agility = 5;
        this.maxHealth = this.stamina*5;
        this.currentHealth = this.stamina*5;
        this.maxHit = this.strength*2;
        this.minHit = this.agility*2;
        this.accuracy = 70 + (this.agility/2)
    }
    attack(opponent){
        opponent = enemy[0]
        const dmg = Math.floor(Math.random()*(this.maxHit - this.minHit)) + this.minHit;
    }
    levelUp() {
        // this.strength +=;
        // this.stamina +=;
        // this.dexterity +=;
        // this.agility +=;
    }
}

class Goblin {
    constructor (name) {
        this.name = name;
        this.level = Math.floor(Math.random()(5-1)+1);
        this.experience = 0;
        this.experienceToLevel = experienceArray[this.level]
        this.strength = 2+this.level;
        this.stamina = 5+this.level;
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
        $('.character-level').text(`Level: ${player.level}  ${player.experience}/${player.experienceToLevel}`);
    } else {
        alert('Please select a gender.');
    }
}

const newEnemy = () => {
    if (location === 'Spiteful Hills' && enemy === null) {
        enemy = new Goblin(goblinNames[Math.floor(Math.random()*goblinNames.length-1)]);
        $('.enemy-portriat').css('background-image', 'url(images/Goblin.png)');
        $('.enemy-window').css('display', 'block');
    } else if (location === 'Necropolis' && enemy === null) {

    } else if (location === 'Troll Caves' && enemy === null) {

    } else {
        alert('Defeat your current enemy before moving to another!')
    }
}