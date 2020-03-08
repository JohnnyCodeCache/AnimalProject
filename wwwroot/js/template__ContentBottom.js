function getHTML__ContentBottom(details, imageUrl) {

    let animalContentTop = `
<div class="row Content__Row">
    <div class="col-md-6 text-center">
        <p class="Content__Text">${details}</p>
    </div>
    <div class="col-md-6">
        <div class="text-center">
            <img src="${imageUrl}" class="Content__Bottom__Image" />
        </div>
    </div>
</div>


<div class="row Content__Row --buttonRow">
    <div class="col-12 text-center">
        <button class="GoBackButton" onclick="GoBack()">
            <img src="/images/Arrow.png" /> Go Back
        </button>
    </div>
</div>
`;

    return animalContentTop;
}