class Game{
    constructor(){

    }
    getState(){
        var gsRef = database.ref('gameState');
        gsRef.on("value", function(data){
            gameState = data.val() 
        })
    }

    update(state){
        database.ref('/').update({
            gameState: state

        })
    }

    async start(){
        if(gameState === 0){
            player = new Player()
            var pcRef = await database.ref('playerCount').once("value")
            if(pcRef.exists()){
                playerCount = pcRef.val()
                player.getCount()
            }
            form = new Form()
            form.display()
            
        }
    }

    play(){
        form.hide()
        textSize(35)
        text("GAME STARTS",120,100)
        Player.getPlayerInfo()
        if(allPlayers !== undefined){
            var ypos = 130
            for(var plr in allPlayers){
                if(plr === "player" + player.index){
                    fill ("red")
                    
                }

                else{
                    fill("black")
                }

                textSize(20)
                text(allPlayers[plr].name + " == " + allPlayers[plr].distance, 120 , ypos)
                ypos = ypos + 20
            }
        }

        if(keyIsDown(UP_ARROW)&&player.index !== null ){
            player.distance += 50 
            player.update()
        }
    }

}