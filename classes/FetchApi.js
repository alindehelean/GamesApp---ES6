function FetchApi(url) {
    this.apiUrl = url;
}

FetchApi.prototype.getGamesList = async function () {
    const response = await fetch(`${this.apiUrl}` + "/games", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    const arrayOfGames = await response.json();
    return arrayOfGames;
}

FetchApi.prototype.deleteGame = async function (gameID) {
    const r = await fetch(`${this.apiUrl}` + "/games/" + `${gameID}`, {
        method: "DELETE"
    });
    const apiresponse = await r.text();
    return apiresponse;
}

FetchApi.prototype.createGameRequest = async function (gameObj) {
    const response = await fetch(`${this.apiUrl}` + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObj
    });
    const createdGame = await response.json();
    return createdGame;
}

FetchApi.prototype.updateGameRequest = async function (gameid, updatedGameObj) {
    const response = await fetch(`${this.apiUrl}` + "/games/" + `${gameid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: updatedGameObj
    });
    const updatedResponse = await response.json();
    console.log(updatedResponse);
    return updatedResponse;
}