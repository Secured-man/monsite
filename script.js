let input = document.querySelector("input");
let btn = document.querySelector("button");
let body = document.querySelector("body");
let result = document.createElement("div");
body.appendChild(result);
input.value = input.value.trim().toLowerCase();
input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
async function meteo(ville) {
    if(!ville){
        result.innerText="Ecrivez le nom d'une ville";
        return;
    }
    result.innerText=""
    result.innerText="Chargement...."
    try {
        let url = `https://wttr.in/${ville}`;
        let response = await fetch(url);
        let data = await response.text();
        result.innerHTML= "Météo : "+ data;
        input.value="";
    } catch (error) {
        result.innerHTML="Erreur : ville innexistante!";
        return;
    }
}
btn.addEventListener("click",()=> meteo(input.value));
input.addEventListener('keydown', (e) => {
if (e.key === 'Enter') meteo(input.value);
});
