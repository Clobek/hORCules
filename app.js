let player = null;
let playerName = null;
let genderKey = false;
let changeLocation = 'Spiteful Forest';
let enemy = null;
let characterStats = false;
let inventory = false;
let map = false;
let enemyStats = false;

const goblinNames = ['Bylb', 'Oiz', 'Plokx', 'Glut', 'Ix', 'Drezlos', 'Ylserd', 'Fabukt', 'Gnirvazz', 'Glegract', 'Taassai', 'Clals', 'Myhx', 'Eaxa', 'Swiortee', 'Dysseaft', 'Ranviolda', 'Chertohx', 'Slokniag', 'Gritbenqea', 'Cliez', 'Firm', 'Akz', 'Trezz', 'Brisb', 'Kraakvurm', 'Azdaz', 'Gialzoil', 'Liliord', 'Jegherd'];

const skeletonNames = ["Jut", "Buz", "Vox", "Bilkrag", "Gotzaug", "Ukgouk", "Slatewalker", "Zax", "Khaujaz", "Bugox", "Rit", "Jax", "Khaq", "Ummoc", "Obat", "Khubnat", "Khuk", "Ruzzoq", "Kulgrat", "Uzboz", "Vaz", "Buq", "Rux", "Umgid", "Gojok", "Agzog", "Kic", "Guz", "Kaqut", "Bonzuc", "Chirdroq"];

const trollNames = ["Sollix", "Juma", "Nyabingi", "Matuna", "Kaijin", "Yawan", "Dorkuraz", "Equinus", "Rashi", "Yawan", "Zeti", "Benni", "Boonoo", "Moza", "Vanjin", "Kanjin", "Kizi", "Tsaijo", "Jozala", "Kululu", "Hoodah", "Zulbaljin", "Trezzahn", "Rapshider", "Mohanlal", "Tazingo", "Nyabingi", "Jinjin", "Paikei", "Venjo"];

const experienceArray = ["There is no level 0", 500, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000, 66000, 78000, 91000];

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
        opponent = enemy;
        const dmg = Math.floor(Math.random()*(this.maxHit - this.minHit)) + this.minHit;
        if (enemy === null || enemy === undefined) {
            alert('You do not currently have an enemy to attack.')
        } else {
            if (player.accuracy > Math.floor(Math.random()*100)+1) {
                enemy.currentHealth -= dmg;
                $('.enemy-health').text(`Health: ${enemy.currentHealth}/${enemy.maxHealth}`)
                $('.enemy-damage').text(`-${dmg}`);
                $('.enemy-damage').css('display', 'block')           
                if(enemy.currentHealth <= 0) {
                    $('.enemy-window').css('display', 'none');
                    player.experience += enemy.giveExperience
                    $('.character-experience').text(`Experience: ${player.experience}/${player.experienceToLevel}`);
                    enemy = null;
                    $('.enemy-damage').text('');
                    $('.character-damage').text('');
                    if (player.experience >= player.experienceToLevel) {
                        player.experience -= player.experienceToLevel;
                        player.levelUp();
                    }
                } else {
                    enemy.attack()
                }
            } else {
                $('.enemy-damage').text(`Miss`)
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
        player.heal();
        if (this.level >= 40) {
            this.accuracy = 100;
        } else {
            this.accuracy = 80 + (this.agility/2);
        }
    }
    run() {
        if (enemy === null) {
            alert('There is nothing to run from.')
        } else {
            $('.enemy-window').css('display', 'none');
            $('.character-damage').text('');
            enemy = null;
        }
    }
    rest() {
        player.currentHealth += player.maxHealth - player.currentHealth;
        $('.character-health').text(`Health: ${player.currentHealth}/${player.maxHealth}`);
        alert('You feel rested.');
    }
    heal() {
        player.currentHealth += player.maxHealth - player.currentHealth;
        $('.character-health').text(`Health: ${player.currentHealth}/${player.maxHealth}`);
    }
}

class Goblin {
    constructor (name) {
        this.name = name;
        this.level = Math.floor(Math.random()*(5-1+1)+1);
        this.giveExperience = 50+this.level*50;
        this.strength = 2+this.level;
        this.stamina = 1+this.level;
        this.dexterity = this.level;
        this.agility = this.level;
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
            $('.character-damage').text(`-${dmg}`);
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
            $('.character-damage').text(`Miss`)
        }
    }
}

class Skeleton {
    constructor (name) {
        this.name = name;
        this.level = Math.floor(Math.random()*(10-5+1)+5);
        this.giveExperience = 100+this.level*100;
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
            $('.character-health').text(`Health: ${player.currentHealth}/${player.maxHealth}`);
            $('.character-damage').text(`-${dmg}`);   
            if(player.currentHealth <= 0) {
                alert('You died! Luckily the gods favor you and have brought you back... your penalty is half of your experience.')
                player.experience -= Math.floor(player.experience/2)
                $('.character-experience').text(`Experience: ${player.experience}/${player.experienceToLevel}`);
                player.currentHealth += player.maxHealth - player.currentHealth
                $('.character-health').text(`Health: ${player.currentHealth}/${player.maxHealth}`);
                enemy = null;
                $('.enemy-window').css('display', 'none');
                $('.character-damage').text('');
            }
        } else {
            $('.character-damage').text(`Miss`)
        }
    }
}

class Troll{
    constructor (name) {
        this.name = name;
        this.level = Math.floor(Math.random()*(15-10+1)+10);
        this.giveExperience = 300+this.level*200;
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
            $('.character-damage').text(`-${dmg}`);
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
            $('.character-damage').text(`Miss`)
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

const test = () => {
    $('.enemy-damage').css('display', 'none');
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
    if (changeLocation === 'Spiteful Forest' && enemy === null) {
        enemy = new Goblin(goblinNames[Math.floor(Math.random()*goblinNames.length-1)]);
        $('.enemy-portrait').css('background-image', 'url(images/Goblin.png)');
        $('.enemy-window').css('display', 'block');
        $('.enemy-name').text(`Name: ${enemy.name}`);
        $('.enemy-level').text(`Level: ${enemy.level}`)
        $('.enemy-health').text(`Health: ${enemy.currentHealth}/${enemy.maxHealth}`)
        $('.character-damage').text('');
    } else if (changeLocation === 'Necropolis' && enemy === null) {
        enemy = new Skeleton(skeletonNames[Math.floor(Math.random()*skeletonNames.length-1)]);
        $('.enemy-portrait').css('background-image', 'url(images/Skeleton.png)');
        $('.enemy-window').css('display', 'block');
        $('.enemy-name').text(`Name: ${enemy.name}`);
        $('.enemy-level').text(`Level: ${enemy.level}`)
        $('.enemy-health').text(`Health: ${enemy.currentHealth}/${enemy.maxHealth}`)
        $('.character-damage').text('');
    } else if (changeLocation === 'Troll Caves' && enemy === null) {
        enemy = new Troll(trollNames[Math.floor(Math.random()*trollNames.length-1)]);
        $('.enemy-portrait').css('background-image', 'url(images/Troll.png)');
        $('.enemy-window').css('display', 'block');
        $('.enemy-name').text(`Name: ${enemy.name}`);
        $('.enemy-level').text(`Level: ${enemy.level}`)
        $('.enemy-health').text(`Health: ${enemy.currentHealth}/${enemy.maxHealth}`)
        $('.character-damage').text('');
    } else if (changeLocation === 'Tavern' && enemy === null) {
        alert('There are no enemies here.')
    } else {
        alert('Defeat your current enemy before moving to another!')
    }
}

$('.character-wrap').on('click', ()=>{
    $('.character-strength').text(`Strength: ${player.strength}`)
    $('.character-stamina').text(`Stamina: ${player.stamina}`)
    $('.character-dexterity').text(`Dexterity: ${player.dexterity}`)
    $('.character-agility').text(`Agility: ${player.agility}`)
    $('.character-hit-range').text(`Damage Range: ${player.minHit}-${player.maxHit}`)
    $('.character-hit-chance').text(`Accuracy: ${player.accuracy}%`)
    $('.character-stats-modal').css('display', 'block')
})

$('.exit-character-stats').on('click', ()=>{
    $('.character-stats-modal').css('display', 'none')
})

$('.enemy-wrap').on('click', ()=>{
    $('.enemy-strength').text(`Strength: ${enemy.strength}`)
    $('.enemy-stamina').text(`Stamina: ${enemy.stamina}`)
    $('.enemy-dexterity').text(`Dexterity: ${enemy.dexterity}`)
    $('.enemy-agility').text(`Agility: ${enemy.agility}`)
    $('.enemy-hit-range').text(`Damage Range: ${enemy.minHit}-${enemy.maxHit}`)
    $('.enemy-hit-chance').text(`Accuracy: ${enemy.accuracy}%`)
    $('.enemy-stats-modal').css('display', 'block')
})

$('.exit-enemy-stats').on('click', ()=>{
    $('.enemy-stats-modal').css('display', 'none')
})

$('.map-wrap').on('click', ()=>{
    if (enemy !== null) {
        alert('You cannot travel while in combat.')
    } else {
        $('.map-modal').css('display', 'block')
    }
})

$('.exit-map').on('click', ()=>{
    $('.map-modal').css('display', 'none')
})

$('.round-button-spiteful-forest').on('click', ()=>{
    changeLocation = 'Spiteful Forest';
    $('.round-button-spiteful-forest').css('background-image', 'url(none)');
    $('.round-button-tavern').css('background-image', 'url(images/Tavern.jpg)')
    $('.round-button-necropolis').css('background-image', 'url(images/Necropolis.jpeg)')
    $('.round-button-troll-caves').css('background-image', 'url(images/TrollCaves.jpg)')
    $('.game-window').css('background-image', 'url(images/SpitefulForest.jpeg)')
    $('.map-modal').css('display', 'none')
    $('.tavern-options').css('display', 'none');
    $('.character-window').css('display', 'block');
})

$('.round-button-tavern').on('click', ()=>{
    changeLocation = 'Tavern';
    $('.round-button-tavern').css('background-image', 'url(none)');
    $('.round-button-spiteful-forest').css('background-image', 'url(images/SpitefulForest.jpeg)')
    $('.round-button-necropolis').css('background-image', 'url(images/Necropolis.jpeg)')
    $('.round-button-troll-caves').css('background-image', 'url(images/TrollCaves.jpg)')
    $('.game-window').css('background-image', 'url(images/Tavern.jpg)')
    $('.map-modal').css('display', 'none');
    $('.tavern-options').css('display', 'block');
    $('.character-window').css('display', 'none');
})

$('.round-button-necropolis').on('click', ()=>{
    changeLocation = 'Necropolis';
    $('.round-button-necropolis').css('background-image', 'url(none)');
    $('.round-button-spiteful-forest').css('background-image', 'url(images/SpitefulForest.jpeg)')
    $('.round-button-tavern').css('background-image', 'url(images/Tavern.jpg)')
    $('.round-button-troll-caves').css('background-image', 'url(images/TrollCaves.jpg)')
    $('.game-window').css('background-image', 'url(images/Necropolis.jpeg)')
    $('.map-modal').css('display', 'none')
    $('.tavern-options').css('display', 'none');
    $('.character-window').css('display', 'block');
})

$('.round-button-troll-caves').on('click', ()=>{
    changeLocation = 'Troll Caves';
    $('.round-button-troll-caves').css('background-image', 'url(none)');
    $('.round-button-spiteful-forest').css('background-image', 'url(images/SpitefulForest.jpeg)')
    $('.round-button-necropolis').css('background-image', 'url(images/Necropolis.jpeg)')
    $('.round-button-tavern').css('background-image', 'url(images/Tavern.jpg)')
    $('.game-window').css('background-image', 'url(images/TrollCaves.jpg)')
    $('.map-modal').css('display', 'none')
    $('.tavern-options').css('display', 'none');
    $('.character-window').css('display', 'block');
})

$('.inventory-wrap').on('click', ()=>{
    comingSoon()
})

const comingSoon = () => {
    alert('Coming soon!')
}