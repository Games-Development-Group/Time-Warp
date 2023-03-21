async function getGameInfo() {
    let result = await requestPlayerGame();
    if (!result.successful) {
        alert("Something is wrong with the game please login again!");
        window.location.pathname = "index.html";
    } else {
        GameInfo.game = result.game;
        if (GameInfo.scoreBoard) GameInfo.scoreBoard.update(GameInfo.game); 
        else GameInfo.scoreBoard = new ScoreBoard(GameInfo.game);
    }
}

async function getPawnsPositions(){
    let positions = await requestPawnsPositions();
    GameInfo.playerPosition = positions.result.playerPawn.position;
    GameInfo.oppPosition = positions.result.oppPawn.position;
    if (GameInfo.board) GameInfo.board.update(GameInfo.playerPosition, GameInfo.oppPosition); 
    else GameInfo.board = new Board(GameInfo.playerPosition, GameInfo.oppPosition, 350, 150, 600, 400, GameInfo.images.playerPawn, GameInfo.images.oppPawn);
}

async function getArtifactsOnBoard(){
    let artifactsOnBoard = await requestArtifactsOnBoard();
    GameInfo.artifactsOnBoard = artifactsOnBoard.result;
}

async function getCollectedArtifacts(){
    let collectedArtifacts = await requestCollectedArtifacts();
    GameInfo.playerListArtifacts = new ListArtifacts("Player", collectedArtifacts.result.playerArtifacts);
    GameInfo.oppListArtifacts = new ListArtifacts("Opponent", collectedArtifacts.result.oppArtifacts);
}

async function getCards(){
    let result = await requestCards();
    if (GameInfo.playerDeck) GameInfo.playerDeck.update(result.result.playerCards); 
    else GameInfo.playerDeck = new Deck(result.result.playerCards, 370, 600, await playCardAction);
}

//Actions
async function movePawnAction() {
    let result = await requestMovePawn();
    if (result.successful) {
        await endturnAction();
    } else alert("Something went wrong when moving a pawn.");
}

async function drawCardAction() {
    let result = await requestDrawCard();
    if(result.maxCards)
        alert("You can't have more than 5 cards.");
    if (result.successful) {
        await endturnAction();
    } else alert("Something went wrong when drawing a card.");
}

async function playCardAction(selectedCard) {
    if (confirm(`Do you want to play the "${selectedCard.name}" card?`)) {
        let result = await requestPlayCard(selectedCard.id);
        if (result.successful) {
            await endturnAction();
        } else alert("Something went wrong when playing a card.");
    }
}

async function endturnAction() {
    let result = await requestEndTurn();
    if (result.successful) {
        await  getGameInfo();
        await  getPawnsPositions();
        GameInfo.prepareUI();
    } else alert("Something went wrong when ending the turn.");
}