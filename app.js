const chooseMale = () => {
    $('.character-window').css('display', 'block');
    $('.character-portrait').css('background-image', 'url(images/MaleOrc.png)');
}

const chooseFemale = () => {
    $('.character-portrait').css('background-image', 'url(images/FemaleOrc.png)');
}

const experienceArray = ["There is no level 0", 1000, 1500, 2000, 2500]

const enemy = [];

class Player {
    constructor (name) {
        this.name = name;
        this.level = 1;
        this.experience = 0;
        this.experienceToLevel = experienceArray[this.level]
        this.maxHealth = this.stamina*5;
        this.currentHealth = this.stamina*5;
        this.strength = 8;
        this.stamina = 10;
        this.dexterity = 5;
        this.agility = 5;
        this.maxHit = this.strength*2;
        this.minHit = this.agility*2;
        this.accuracy = 70 + (agility/2)
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

const newEnemy = () => {

}