const knapp = document.getElementById("randomknapp");
const kort = document.querySelectorAll(".box2");

let forrigeKort = -1;

knapp.addEventListener("click", () => {
  kort.forEach((card) => {
    card.classList.remove("valgt");
  });

  let tilfeldigKort;

  do {
    tilfeldigKort = Math.floor(Math.random() * kort.length);
  } while (tilfeldigKort === forrigeKort);

  forrigeKort = tilfeldigKort;
  kort[tilfeldigKort].classList.add("valgt");
});