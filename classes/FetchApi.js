class FetchApi {
    constructor(url) {
        this.apiUrl = url;
    }
    async getGamesList() {
        const response = await fetch(`${this.apiUrl}` + "/games", {
            method: "GET",
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        const arrayOfGames = await response.json();
        return arrayOfGames;
    }
    async deleteGame(gameID) {
        const r = await fetch(`${this.apiUrl}` + "/games/" + `${gameID}`, {
            method: "DELETE"
        });
        const apiresponse = await r.text();
        return apiresponse;
    }
    async createGameRequest(gameObj) {
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
    async updateGameRequest(gameid, updatedGameObj) {
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
}




