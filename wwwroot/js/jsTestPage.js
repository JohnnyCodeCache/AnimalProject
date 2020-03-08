const uri = '/api/Animals';
let outArr = [];

$(document).ready(function () {

    $("#species__add").val("Cat");
    $("#name__add").val("Bengal");
    $("#location__add").val("Asia");
    $("#details__add").val("The Bengal cat is a domesticated cat breed created from hybrids of domestic cats and the Asian leopard cat – the breed name comes from the taxonomic name. Back-crossing to domestic cats is then done with the goal of creating a healthy, and docile cat with wild-looking, high-contrast coat. Bengals have a wild appearance and may show spots, rosettes, arrowhead markings, or marbling.");
    $("#imageUrl__add").val("https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Paintedcats_Red_Star_standing.jpg/187px-Paintedcats_Red_Star_standing.jpg");
    $("#type__add").val("Domestic");

    let updateData = {
        "id": "5e61c74ada8dfe585a65f37e",
        "species": "Cat",
        "name": "Arabian Mau",
        "location": "Arabian Peninsula",
        "details": "The Arabian Mau is a formal breed of domestic cat, originated from the desert cat, a short-haired landrace native to the desert of the Arabian Peninsula. It lives there in the streets and has adapted very well to the extreme climate. The Arabian Mau is recognized as a formal breed by few fancier and breeder organization and cat registry, World Cat Federation (WCF) and Emirates Feline Federation (EFF). Based on one landrace, the Arabian Mau is a natural breed.",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Bex_Arabian_Mau.jpg",
        "type": "Domestic"
    };

    $("#id__update").val(updateData.id);
    $("#species__update").val(updateData.species);
    $("#name__update").val(updateData.name);
    $("#location__update").val(updateData.location);
    $("#details__update").val(updateData.details);
    $("#imageUrl__update").val(updateData.imageUrl);
    $("#type__update").val(updateData.type);

});


function GetAllItems() {
    let jsonData = getAllItems();

    jsonData
        .then(data => {
            console.log(data);
            _displayItems(data);
            return data;
        })
        .catch (error => console.error('Unable to get items.', error));
}


//function getAllItems() {
//    fetch(uri)
//        .then(response => response.json())
//        .then(data => _displayItems(data))
//        .catch(error => console.error('Unable to get items.', error));
//}

function addItem() {

    let species = $("#species__add").val();
    let name = $("#name__add").val();
    let location = $("#location__add").val();
    let details = $("#details__add").val();
    let imageUrl = $("#imageUrl__add").val();
    let type = $("#type__add").val();

    const item = {
        species: species,
        name: name,
        location: location,
        details: details,
        imageUrl: imageUrl, 
        type: type
    };

    //console.log(JSON.stringify(item));

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getAllItems();
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem() {
    let id = $("#DeleteID").val();

    let fullURI = `${uri}/${id}`;
    console.log(fullURI);

    fetch(fullURI, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function updateItem() {
    let id = $("#id__update").val();
    let species = $("#species__update").val();
    let name = $("#name__update").val();
    let location = $("#location__update").val();
    let details = $("#details__update").val();
    let imageUrl = $("#imageUrl__update").val();
    let type = $("#type__update").val();

    const item = {
        id: id,
        species: species,
        name: name,
        location: location,
        details: details,
        imageUrl: imageUrl,
        type: type
    };

    let fullURI = `${uri}/${id}`;
    console.log(fullURI);

    fetch(fullURI, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getAllItems())
        .catch(error => console.error('Unable to update item.', error));

    return false;
}



function _displayItems(data) {
    console.log(data);

    $("#DataDump").html("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
}