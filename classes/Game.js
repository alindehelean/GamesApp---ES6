class Game {
    constructor(id, title, description, image, fetchObj) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.fetchObj = fetchObj;
    }
    createDomElement() {
        const gameELement = document.createElement("div");
        gameELement.setAttribute("id", `${this.id}`);
        gameELement.innerHTML = `<h1>${this.title}</h1> 
                            <img src="${this.image}" />
                            <p>${this.description}</p> 
                            <button class="delete-btn">Delete Game</button>
                            <button class="update-btn">Edit Game</button>`;
        return gameELement;
    }
    removeElementFromDOM(domElement) {
        domElement.remove();
    }
    createEditForm() {
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
    async eraseGame(gameDiv) {
        try {
            const apiresponse = await fetchApi.deleteGame(gameDiv.getAttribute("id"));
            console.log(apiresponse);
            this.removeElementFromDOM(gameDiv);
        }
        catch {
            console.log("Error");
        }
    }
    createUpdateForm(gameDiv) {
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
    importValues(divELement, updateDivElement) {
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
    async updateGame(valueObj) {
        const urlEncoded = new URLSearchParams();
        urlEncoded.append("title", valueObj.updatedGameTitle);
        urlEncoded.append("description", valueObj.updatedGameDescription);
        urlEncoded.append("imageUrl", valueObj.updatedGameImage);
        try {
            const updatedResponse = await fetchApi.updateGameRequest(`${this.id}`, urlEncoded);
            console.log(updatedResponse);
        }
        catch {
            console.log("Error");
        }
    }
    updateGameInDom(gameForm, gameDiv) {
        const gameValues = {
            updatedGameTitle: gameForm.querySelector('#gameTitle').value,
            updatedGameDescription: gameForm.querySelector('#gameDescription').value,
            updatedGameImage: gameForm.querySelector('#gameImageUrl').value
        };
        gameDiv.parentElement.querySelector('h1').innerHTML = gameValues.updatedGameTitle;
        gameDiv.parentElement.querySelector('p').innerHTML = gameValues.updatedGameDescription;
        gameDiv.parentElement.querySelector('img').src = gameValues.updatedGameImage;
        return gameValues;
    }
    initEvents() {
        document.getElementById(`${this.id}`).addEventListener("click", (event) => {
            const gameDiv = event.target.parentElement;
            if (event.target.classList.contains('delete-btn')) {
                this.eraseGame(gameDiv);
            }
            else if (event.target.classList.contains('update-btn')) {
                this.createUpdateForm(gameDiv);  
            }
            else if (event.target.classList.contains('cancelBtn')) {
                this.removeElementFromDOM(gameDiv.parentElement);
            }
            else if (event.target.classList.contains('editBtn')) {
                event.preventDefault();
                const formImportedValues = this.updateGameInDom(gameDiv, gameDiv.parentElement);
                this.updateGame(formImportedValues);
                this.removeElementFromDOM(gameDiv.parentElement);
            }
        });
    }

    localStorageTheme() {
        const buttons = document.getElementsByName("theme");
        buttons.forEach(function (element, index) {
            if (buttons[index].value === localStorage.theme) {
                buttons[index].checked = "checked";
            }
            if (buttons[index].value === "light" && buttons[index].checked === true) {
                document.body.style.backgroundColor = "#f0ffff";
            }
            if (buttons[index].value === "dark" && buttons[index].checked === true) {
                document.body.style.backgroundColor = "#660000";
            }
            element.addEventListener('click', (event) => {
                localStorage.setItem("theme", `${event.target.value}`)
                if (event.target.value === "light") {
                    document.body.style.backgroundColor = "#f0ffff";
                } else if (event.target.value === "dark") {
                    document.body.style.backgroundColor = "#660000";
                }
            })
        })
    }
}












