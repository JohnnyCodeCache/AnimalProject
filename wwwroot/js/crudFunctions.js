//function getAllItems() {
//    fetch(uri)
//        .then((response) => {
//            return response.json().then((data) => {
//                console.log(data);
//                return data;
//            }).catch((err) => {
//                console.log(err);
//            });
//        });
//}

async function getAllItems() {
    const response = await fetch(uri);
    const data = await response.json();
    return data;
}
