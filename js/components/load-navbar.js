fetch("html/components/navbar.html")
    .then(response => response.text())
    .then(navbarHTML => {
        const container = document.getElementById("navbar-container");
        container.innerHTML = navbarHTML;

        const navbar = document.getElementById("navbar");
        const trigger = document.querySelector(".navbar-trigger");

        trigger.addEventListener("click", () => {           
            navbar.classList.toggle("open");            
        });
    }
);