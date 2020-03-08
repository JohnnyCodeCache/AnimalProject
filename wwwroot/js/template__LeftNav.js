function BuildLeftNav(navData) {

    let outNav = "";
    for (let i = 0; i < navData.length; i++) {
        outNav += BuildNavButton(navData[i].animal, navData[i].selected, navData[i].domesticWild); 
    }

    return outNav;
}

function BuildNavButton(animal, selected, domesticWild) {

    let active = "";
    if (selected === true) {
        active = "--active";
    }

    let leftNavOut = `
<button type="button" id="LeftNav__${animal}" class="LeftNavButton TabNav --Line__${animal} ${active}" data-animal="${animal}">
    <p>${animal}</p>
    <img src="/images/Icon_${animal}.png" class="Icon" />
    <div class="TabNav__DomesticWild --${domesticWild}">${domesticWild}</div>
</button>
`;
    return leftNavOut; 
}