let currentAnimalList = []; 

let leftNavData = [
    {
        animal: "Bears",
        selected: false,
        domesticWild: "wild"
    },
    {
        animal: "Cats",
        selected: false,
        domesticWild: "domestic"
    },
    {
        animal: "Dogs",
        selected: false,
        domesticWild: "domestic"
    },
    {
        animal: "Elephants",
        selected: false,
        domesticWild: "wild"
    },
    {
        animal: "Monkeys",
        selected: false,
        domesticWild: "wild"
    }];


$(document).ready(function () {
    LeftNav_Populate(leftNavData);

    CheckQuerystring();
});


function CheckQuerystring() {
    var urlParams = new URLSearchParams(window.location.search);

    let thisName = urlParams.get('name');
    if (thisName !== null) {
        if (thisName !== "") {
            LeftNavClicked(thisName);
        }
    }

}

function attachLeftNav() {
    $(".LeftNavButton").off("click");

    $(".LeftNavButton").click(function () {
        //alert("Handler for .click() called.");
        let whichAnimal = $(this).data("animal");
        LeftNavClicked(whichAnimal);
    });
}

function LeftNavClicked(animal) {
    // update leftNavData
    LeftNav_Update_Data(animal, "selected", true);

    let item = leftNavData.find((v) => {
        return v.animal === animal;
    });

    TopNavChange(item);

    setGetParam('name', animal); 
    setGetParam('id', "");

    // get all animals of that species, populate Content
    AnimalContent_PopulateWithList(animal);

}



function TopNavChange(item) {
    // change topNavColor
    let newColor = item.domesticWild;
    if (newColor === "wild") {
        $("#SearchBarTop").addClass("--wild");
        $("#SearchBarTop").removeClass("--domestic");
        $("#SearchBar__Nav__DomesticWild").html("Wild");
    } else {
        $("#SearchBarTop").removeClass("--wild");
        $("#SearchBarTop").addClass("--domestic");
        $("#SearchBar__Nav__DomesticWild").html("Domestic");
    }

    $("#SearchBar__Nav__Separator").removeClass("hidden");

    // change SearchBarTop text
    $("#SearchBar__Nav__Animal").html(item.animal);
}


function AnimalContent_PopulateWithList(animal) {
    //const uri = '/AnimalData/GetAllAnimalsFromClass/' + animal;

    // animal is no longer case sensitive for this URI
    const uri = '/api/animals/getbyspecies/' + animal;

    fetch(uri)
        .then(response => response.json())
        .then(data => {
            currentAnimalList = data;

            var urlParams = new URLSearchParams(window.location.search);
            let thisId = urlParams.get('id');
            if (thisId !== null) {
                if (thisId !== "") {
                    AnimalContent__PopulateWithDetails(thisId);
                    return;
                }
            }

            // filter data
            let allButtons = "<div id='AnimalNamesButtonBlock'>";
            data.forEach((item) => {
                allButtons += `<button id='${item.id}' class='AnimalNameButton --animalButton__${item.species}' data-location='${item.location}'>${item.name}<br><img src='/images/Icon_${item.species}.png' class="Icon__Small"><br>${item.location}</button>`;
            });
            allButtons += "</div>";

            // populate top
            let topContent = getHTML__ContentTop(data[0].species, "select a button below", "");
            $("#AnimalContent__Top").html(topContent);


            $("#AnimalContent__Bottom").html(allButtons);

            // attach buttons for clicks and hovers
            AttachAnimalNameButtons();


        })
        .catch(error => console.error('Unable to get items.', error));
}

function AttachAnimalNameButtons() {
    $(".AnimalNameButton").mouseenter(function () {
        let normalizedCountry = $(this).data("location");
        normalizedCountry = normalizedCountry.replace(/[^a-zA-Z]/gi, '');

        //console.log(normalizedCountry);

        if (normalizedCountry !== 'Extinct') {
            $("#HighlightMap").removeClass("hidden");
            $("#HighlightMap").attr("src", "/images/maps/" + normalizedCountry + ".png");
        }
    });

    $(".AnimalNameButton").mouseleave(function () {
        $("#HighlightMap").addClass("hidden");
    });

    $(".AnimalNameButton").click(function () {
        AnimalContent__PopulateWithDetails($(this).attr("id"));
    });
}


function AnimalContent__PopulateWithDetails(id) {

    //DataDump(currentAnimalList);

    let animalData = currentAnimalList.find((v) => {
        return v.id === id;
    });

    let normalizedLocation = animalData.location.replace(/[^a-zA-Z]/gi, '');

    // populate content top
    let topContent = getHTML__ContentTop(animalData.name, animalData.location, normalizedLocation);
    $("#AnimalContent__Top").html(topContent);

    //populate bottom
    let contentBottom = getHTML__ContentBottom(animalData.details, animalData.imageUrl);
    $("#AnimalContent__Bottom").html(contentBottom);

    setGetParam('id', id);

}


function LeftNav_Update_Data(animal) {

    for (let i = 0; i < leftNavData.length; i++) {
        if (leftNavData[i].animal === animal) {
            leftNavData[i].selected = true;
            $("#LeftNav__" + leftNavData[i].animal).addClass("--active");
        } else {
            leftNavData[i].selected = false;
            $("#LeftNav__" + leftNavData[i].animal).removeClass("--active");
        }
    }

}

function LeftNav_Populate(navData) {
    let leftNavHtml = BuildLeftNav(navData); 
    $("#LeftNav").html(leftNavHtml); 
    attachLeftNav();
}

function GoBack() {
    var urlParams = new URLSearchParams(window.location.search);
    setGetParam('id', "");

    LeftNavClicked(urlParams.get('name'));
}

function Search() {
    let thisSearch = $("#Search").val();

    // animal is no longer case sensitive for this URI
    const uri = '/api/animals/search/' + thisSearch;

    fetch(uri)
        .then(response => response.json())
        .then(data => {
            currentAnimalList = data;

            //var urlParams = new URLSearchParams(window.location.search);
            setGetParam('id', "");
            setGetParam('name', "");
            setGetParam('search', "thisSearch");

            DrawAnimalList(data, "Search Results");

        })
        .catch(error => console.error('Unable to get items.', error));

}

function DrawAnimalList(data, contentTitle) {
    // filter data
    let allButtons = "<div id='AnimalNamesButtonBlock'>";
    data.forEach((item) => {
        allButtons += `<button id='${item.id}' class='AnimalNameButton --animalButton__${item.species}' data-location='${item.location}'>${item.name}<br><img src='/images/Icon_${item.species}.png' class="Icon__Small"><br>${item.location}</button>`;
    });
    allButtons += "</div>";

    // populate top
    let topContent = getHTML__ContentTop(contentTitle, "select a button below", "");
    $("#AnimalContent__Top").html(topContent);


    $("#AnimalContent__Bottom").html(allButtons);

    // attach buttons for clicks and hovers
    AttachAnimalNameButtons();
}



////////////////////////////////
//
// library functions

function GetAllNormalizedLocations() {
    //alert("GetAllNormalizedLocations");
    const uri = '/AnimalData/GetAllDistinctLocationData/';

        fetch(uri)
        .then(response => response.json())
            .then(data => {
                let newArr = [];
                for (let i = 0; i < data.length; i++) {
                    let thisLoc = data[i].replace(/[^a-zA-Z]/gi, '');
                    newArr.push(thisLoc); 
                }
                DataDump(newArr);
            })
        .catch(error => console.error('Unable to get items.', error));
}

function DataDump(data) {
    $("#DataDump").html("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
}


function setGetParam(key, value) {
    if (history.pushState) {
        var params = new URLSearchParams(window.location.search);
        params.set(key, value);
        var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params.toString();
        window.history.pushState({ path: newUrl }, '', newUrl);
    }
}
