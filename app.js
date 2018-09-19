class Ship{
    constructor(hull, firepower, accuracy, name){
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.name = name;
    }
    attack(target) { // placing the attack function in the class ship because the attack function is the same for all players in the game
        if (this.hull > 0){
            if(Math.random() < this.accuracy) { // this is just refrencing whatever ship the attack function applies to
                target.hull = target.hull - this.firepower
                console.log(`${this.name} hit ${target.name} for ${this.firepower} much damage!`)
            } else {
                console.log(`You missed ${target.name}.`)
            }
        }
        else if( this.hull <= 0){
            console.log(`${this.name} has been destroyed`);
        } 
    }
    
}

const fleet = {  // factory is used to generate multiple of the same class i.e. alienShips  
    aliens: [],
    generate(name){
        const alienShip = new Ship(Math.floor(((Math.random()*3)+3)), (Math.floor((Math.random()*2)+2)), ((Math.random()*.2)+.6), name);
        // used Math.floor on hull and firePower so that they were whole numbers
        this.aliens.push(alienShip);
        return alienShip;
    },
    generateFleet(num){
        for (let i =0; i < num; i++){
            this.generate("alien ship " + i);
        }
    },
    getShip(index){
        return this.aliens[index];
    }
}




const ussAssembly = new Ship (20, 5, .7, "Uss Assembly");



game = {  // game will be set up inside one full game property
    playing: true,
    shieldRegenAmt: 0,

    startGame() { 
        let which = 0;
        fleet.generateFleet();
        while (game.playing) {
            game.round(which);
                which++;
            }
        },


    round(index) {//two parameters to represent two alien ships
        if(fleet.aliens.length <= index){
            console.log("You Win!")
            game.playing = false
        } 
        while( (game.playing === true) && (ussAssembly.hull > 0) && (fleet.aliens[index].hull > 0)) {
            ussAssembly.attack(fleet.aliens[index]);
            fleet.aliens[index].attack(ussAssembly);
            //your shields regenerate
            shieldRegenAmt = Math.floor(Math.random()*3)
            ussAssembly.hull += shieldRegenAmt;
            console.log("Your shields regenerate your hull by " + shieldRegenAmt + ".");
        if(ussAssembly.hull <= 0) {
            console.log("LOSER")
            game.playing = false
        } else if(fleet.aliens[index].hull <= 0){
            if(ussAssembly.hull <= 5){
                console.log("Retreat");
                game.playing = false

            } else {
                console.log("Next alien coming");
            } 

        }
    }
    
    }

}


game.startGame(fleet.generateFleet(Math.floor(Math.random()*7)+4));//random number of enemy ships at start
