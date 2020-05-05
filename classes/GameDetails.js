function GameDetails(id, title, description, image, fetchObj, genre, publisher, release) {
    Game.call(this, id, title, description, image, fetchObj)
    this.genre = genre;
    this.publisher = publisher;
    this.release = release;
}

GameDetails.prototype = Object.create(Game.prototype);

GameDetails.prototype.getValuesFromForm = function () {
    const valuesFromForm = {
        gameTitle: document.getElementById("gameTitle"),
        gameDescription: document.getElementById("gameDescription"),
        gameGenre: document.getElementById("gameGenre"),
        gamePublisher: document.getElementById("gamePublisher"),
        gameImageUrl: document.getElementById("gameImageUrl"),
        gameRelease: document.getElementById("gameRelease")
    }

    return valuesFromForm;
}

GameDetails.prototype.validateInputs = function (valuesFromForm) {
    const valuesForm = this.getValuesFromForm();
    validator.validateFormElement(valuesForm.gameTitle, "The title is required!");
    validator.validateFormElement(valuesForm.gameGenre, "The genre is required!");
    validator.validateFormElement(valuesForm.gameImageUrl, "The image URL is required!");
    validator.validateFormElement(valuesForm.gameRelease, "The release date is required!");
    validator.validateReleaseTimestampElement(valuesForm.gameRelease, "The release date you provided is not a valid timestamp!");
}

GameDetails.prototype.createGame = async function () {
    const valuesFromFormLocal = this.getValuesFromForm();
    this.validateInputs(valuesFromFormLocal);
    if (valuesFromFormLocal.gameTitle.value !== "" &&
        valuesFromFormLocal.gameGenre.value !== "" &&
        valuesFromFormLocal.gameImageUrl.value !== "" &&
        valuesFromFormLocal.gameRelease.value !== "") {
        const urlencoded = new URLSearchParams();
        urlencoded.append("title", valuesFromFormLocal.gameTitle.value);
        urlencoded.append("releaseDate", valuesFromFormLocal.gameRelease.value);
        urlencoded.append("genre", valuesFromFormLocal.gameGenre.value);
        urlencoded.append("publisher", valuesFromFormLocal.gamePublisher.value);
        urlencoded.append("imageUrl", valuesFromFormLocal.gameImageUrl.value);
        urlencoded.append("description", valuesFromFormLocal.gameDescription.value);

        try {
            const createGame = await fetchApi.createGameRequest(urlencoded);
            console.log(createGame);

            this.id = createGame.id;
            this.title = createGame.title;
            this.description = createGame.description;
            this.image = createGame.imageUrl;

            const gameDiv = this.createDomElement();
            document.querySelector(`.container`).appendChild(gameDiv);

        } catch {
            console.log("error");
        }
    }

}

GameDetails.prototype.initCreateGame = function () {
    const self = this;
    document.querySelector(".submitBtn").addEventListener("click", function (event) {
        event.preventDefault();
        self.createGame();
    })
}

