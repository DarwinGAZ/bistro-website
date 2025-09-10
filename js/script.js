const menu = document.querySelector(".menu");
const hamburguerSpan = document.querySelector(".hamburguer-div span");

const hamburguer = document
    .querySelector(".hamburguer-div")
    .addEventListener("click", () => {
        menu.classList.toggle("show");
        if (hamburguerSpan.innerHTML != "X") {
            hamburguerSpan.innerHTML = "X";
        } else {
            hamburguerSpan.innerHTML = "☰";
        }
    });

// MENU.HTML BUTTON
const menuBtn = document.querySelectorAll(".menu-btn");

menuBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
        menuBtn.forEach((btn) => {
            btn.classList.remove("active");
        });

        e.target.classList.add("active");
    });
});
