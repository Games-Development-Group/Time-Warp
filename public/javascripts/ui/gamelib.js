
async function refresh() {
    if (GameInfo.game.player.state == "Waiting") { 
        // Every time we are waiting
        await  getGameInfo();
        await  getPawnsPositions();
        await getArtifactsOnBoard();
        await getCollectedArtifacts();
        await getCards();
        if (GameInfo.game.player.state != "Waiting") {
            // The moment we pass from waiting to play
            GameInfo.prepareUI();
        }
    } 
    // Nothing to do when we are playing since we control all that happens 
    // so no update is needed from the server
}

function preload() {
    GameInfo.images.playerPawn = loadImage("./assets/WhitePawn.png");
    GameInfo.images.oppPawn = loadImage("./assets/BlackPawn.png");
}


async function setup() {
    let canvas = createCanvas(GameInfo.width, GameInfo.height);
    canvas.parent('game');
    // preload  images
    
    await getGameInfo();
    await getPawnsPositions();
    await getArtifactsOnBoard();
    await getCollectedArtifacts();
    await getCards();
    setInterval(refresh,1000);

    //buttons (create a separated function if they are many)
    GameInfo.movePawn = createButton('Move Pawn');
    GameInfo.movePawn.parent('game');
    GameInfo.movePawn.position(GameInfo.width-150,GameInfo.height-50);
    GameInfo.movePawn.mousePressed(movePawnAction);
    GameInfo.movePawn.addClass('game');

    GameInfo.drawCard = createButton('Draw card');
    GameInfo.drawCard.parent('game');
    GameInfo.drawCard.position(GameInfo.width-150,GameInfo.height-100);
    GameInfo.drawCard.mousePressed(drawCardAction);
    GameInfo.drawCard.addClass('game');

    GameInfo.surrend = createButton('Surrender');
    GameInfo.surrend.parent('game');
    GameInfo.surrend.position(GameInfo.width-120,20);
    GameInfo.surrend.mousePressed(surrendAction);
    GameInfo.surrend.addClass('game')

    GameInfo.prepareUI();
    

    GameInfo.loading = false;
}

function draw() {
    background(220);
    if (GameInfo.loading) {
        textAlign(CENTER, CENTER);
        textSize(40);
        fill('black');
        text('Loading...', GameInfo.width/2, GameInfo.height/2);
    } else {
        GameInfo.scoreBoard.draw();
        GameInfo.board.draw();
        GameInfo.playerDeck.draw();
        GameInfo.playerListArtifacts.draw();
        GameInfo.oppListArtifacts.draw();
    }
}

async function mouseClicked() {
    if ( GameInfo.playerDeck) { 
        GameInfo.playerDeck.click(); 
    }
}

