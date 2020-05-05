const apiUrl = "https://games-app-siit.herokuapp.com";

const fetchApi = new FetchApi(apiUrl);
const createNewGame = new GameDetails("", "", "","",fetchApi, "", "", "");
createNewGame.initCreateGame();

async function startApp() {
    const arrayOfGames = await fetchApi.getGamesList();
    const container1 = document.querySelector('.container');

    for (let i = 0; i < arrayOfGames.length; i++) {
        let games = new Game(arrayOfGames[i]._id, arrayOfGames[i].title, arrayOfGames[i].description, arrayOfGames[i].imageUrl, fetchApi)
        let gameObj = games.createDomElement();
        container1.appendChild(gameObj);
        games.initEvents();
    }
}

startApp();













    
