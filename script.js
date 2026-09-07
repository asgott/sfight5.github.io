let currentHP = 63;
let maxHP = 63;

let tempHP = 0;


function changeHP(amount) {

    currentHP = currentHP + amount;

    if (currentHP < 0) {
        currentHP = 0;
    }

    if (currentHP > maxHP) {
        currentHP = maxHP;
    }

    document.getElementById("current-hp").textContent = currentHP;
}


function changeTempHP(amount) {

    tempHP = tempHP + amount;

    if (tempHP < 0) {
        tempHP = 0;
    }

    document.getElementById("temp-hp").textContent = tempHP;
}


function addTestEffect() {

    const effectsList = document.getElementById("effects-list");

    effectsList.innerHTML = `
        <p>Shield of Faith: +2 AC</p>
    `;
}
