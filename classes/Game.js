function Game(id, title, description, image, fetchObj) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.fetchObj = fetchObj;
}


Game.prototype.createDomElement = function () {
    const gameELement = document.createElement("div");
    gameELement.setAttribute("id", `${this.id}`)
    gameELement.innerHTML = `<h1>${this.title}</h1> 
                            <img src="${this.image}" />
                            <p>${this.description}</p> 
                            <button class="delete-btn">Delete Game</button>
                            <button class="update-btn">Edit Game</button>`;

    return gameELement;

}

Game.prototype.removeElementFromDOM = function (domElement) {
    domElement.remove();
}

Game.prototype.createEditForm = function () {
    const updateGameElement = document.createElement("div");
    updateGameElement.setAttribute("class", "update");
    updateGameElement.innerHTML = `<form class="updateForm">
                                    <label for="gameTitle">Title *</label>
                                    <input type="text" value="" name="gameTitle" id="gameTitle"/>
                                    <label for="gameDescription">Description</label>
                                    <textarea name="gameDescription" id="gameDescription"></textarea>
                                    <label for="gameImageUrl">Image URL *</label>
                                    <input type="text" name="gameImageUrl" id="gameImageUrl"/>
                                    <button class="editBtn">Save Changes</button>
                                    <button class="cancelBtn">Cancel</button>
                                  </form>`;
    return updateGameElement;
}

Game.prototype.eraseGame = async function (gameDiv) {

    try {
        const apiresponse = await fetchApi.deleteGame(gameDiv.getAttribute("id"));
        console.log(apiresponse);
        this.removeElementFromDOM(gameDiv);
    } catch{
        console.log("Error");
    }



}

Game.prototype.createUpdateForm = function (gameDiv) {
    const updateGameElement = document.createElement("div");
    updateGameElement.setAttribute("class", "update");
    updateGameElement.innerHTML = `<form class="updateForm">
                                    <label for="gameTitle">Title *</label>
                                    <input type="text" value="" name="gameTitle" id="gameTitle"/>
                                    <label for="gameDescription">Description</label>
                                    <textarea name="gameDescription" id="gameDescription"></textarea>
                                    <label for="gameImageUrl">Image URL *</label>
                                    <input type="text" name="gameImageUrl" id="gameImageUrl"/>
                                    <button class="editBtn">Save Changes</button>
                                    <button class="cancelBtn">Cancel</button>
                                  </form>`;

    gameDiv.appendChild(updateGameElement);
    this.importValues(gameDiv, updateGameElement);
}

Game.prototype.importValues = function (divELement, updateDivElement) {
    const copiedGameTitle = divELement.querySelector("h1").innerText;
    const copiedGameDescription = divELement.querySelector("p").innerText;
    const copiedGameUrl = divELement.querySelector("img").getAttribute("src");
    const newGameTitle = updateDivElement.querySelector('input[name="gameTitle"]');
    newGameTitle.value += copiedGameTitle;
    const newGameDescription = updateDivElement.querySelector('textarea');
    newGameDescription.value += copiedGameDescription;
    const newImageUrl = updateDivElement.querySelector('input[name="gameImageUrl"]');
    newImageUrl.value += copiedGameUrl;
}

Game.prototype.updateGame = async function (valueObj) {
    const urlEncoded = new URLSearchParams();
    urlEncoded.append("title", valueObj.updatedGameTitle);
    urlEncoded.append("description", valueObj.updatedGameDescription);
    urlEncoded.append("imageUrl", valueObj.updatedGameImage);

    try {
        const updatedResponse = await fetchApi.updateGameRequest(`${this.id}`, urlEncoded)
        console.log(updatedResponse);
    } catch {
        console.log("Error");
    }
}

Game.prototype.updateGameInDom = function (gameForm, gameDiv) {

    const gameValues = {
        updatedGameTitle: gameForm.querySelector('#gameTitle').value,
        updatedGameDescription: gameForm.querySelector('#gameDescription').value,
        updatedGameImage: gameForm.querySelector('#gameImageUrl').value
    }
    gameDiv.parentElement.querySelector('h1').innerHTML = gameValues.updatedGameTitle;
    gameDiv.parentElement.querySelector('p').innerHTML = gameValues.updatedGameDescription;
    gameDiv.parentElement.querySelector('img').src = gameValues.updatedGameImage;

    return gameValues;

}

Game.prototype.initEvents = function () {

    document.getElementById(`${this.id}`).addEventListener("click", (event) => {
        const gameDiv = event.target.parentElement;
        console.log(gameDiv);
        if (event.target.classList.contains('delete-btn')) {
            this.eraseGame(gameDiv);
        } else if (event.target.classList.contains('update-btn')) {
            this.createUpdateForm(gameDiv);
        } else if (event.target.classList.contains('cancelBtn')) {
            this.removeElementFromDOM(gameDiv.parentElement);
        } else if (event.target.classList.contains('editBtn')) {
            event.preventDefault();

            const formImportedValues = this.updateGameInDom(gameDiv, gameDiv.parentElement)

            this.updateGame(formImportedValues);
            this.removeElementFromDOM(gameDiv.parentElement);
        }

    });
}


