// All the variables for the game UI
// we only have one game info so everything is static
class GameInfo {
    // settings variables
    static width = 1366;
    static height = 800;

    static loading = true;

    // data
    static game;

    static playerPosition;
    static oppPosition;

    static artifactsOnBoard;

    static playerListArtifacts;
    static oppListArtifacts;

    static playerDeck;
    static oppDeck;

    static images = {};
    static sounds = {};

    //Drop Card
    static dropping = false;

    // renderers
    static scoreBoard;
    static scoreWindow;
    static board;

    // buttons
    static movePawn;
    static drawCard;
    static surrend;

    //windows
    static scoreWindow;

    // Write your UI settings for each game state here
    // Call the method every time there is a game state change
    static prepareUI() {
        if (GameInfo.game.player.state == "Playing") {
            GameInfo.movePawn.show();
            GameInfo.drawCard.show();
            GameInfo.dropCard.show();
            GameInfo.surrend.show();
        } else if (GameInfo.game.player.state == "Waiting") {
            GameInfo.movePawn.hide();
            GameInfo.drawCard.hide();
            GameInfo.dropCard.hide();
            GameInfo.surrend.show();
        }else if (GameInfo.game.player.state == "Score") {
            GameInfo.movePawn.hide();
            GameInfo.drawCard.hide();
            GameInfo.dropCard.hide();
            GameInfo.surrend.hide();
            GameInfo.scoreWindow.open();
        }
    }
}