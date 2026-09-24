// console.log("hello")

let darkmode = localStorage.getItem("darkmode")
const themeSwitch = document.getElementById("theme-Switch");

const enabelDarkmode = () => {
  document.body.classList.add("darkmode")
  localStorage.setItem("darkmode", "active")
}

const disableDarkmode = () => {
  document.body.classList.remove("darkmode")
  localStorage.setItem("darkmode", "null")
}

if(darkmode === "active") enabelDarkmode()

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode")
  darkmode !== "active" ? enabelDarkmode() : disableDarkmode()
})
