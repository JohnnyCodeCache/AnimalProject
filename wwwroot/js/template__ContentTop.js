function getHTML__ContentTop(title, location, highlightMapSrc) {

    let thisHighlightMap = "blank";
    if (highlightMapSrc !== "") {
        thisHighlightMap = highlightMapSrc;
    }

    let animalContentTop = `
<div class="row Content__Row">
    <div class="col-md-6 text-center py-lg-5 --topContentRowLeft">
        <p class="Content__Title">${title}</p>
        <p class="Content__Location">${location}</p>
    </div>
    <div class="col-md-6 Content__MapContainerBlock">
        <div class="Content__MapContainer">
            <img src="/images/maps/world.png" class="Img100 Content__Map --world" />
            <img id="HighlightMap" src="/images/maps/${thisHighlightMap}.png" class="Img100 Content__Map --highlight" />
        </div>
    </div>
</div>
`;

    return animalContentTop;
}