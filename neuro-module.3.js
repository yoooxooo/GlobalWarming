export {insertImage};

function insertImage(parentElement) {
    parentElement.append(createSeagullImage("./src/seagull.gif"));
}

function createSeagullImage(path) {
    const elementSeagullImage = document.createElement("img");

    elementSeagullImage.setAttribute("src", path);
    elementSeagullImage.style.width = "60px";

    return elementSeagullImage;
}
