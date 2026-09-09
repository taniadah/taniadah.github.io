fetch("/html/components/navbar.html")
    .then(response => response.text())
    .then(navbarHTML => {
        const container = document.getElementById("navbar-container");
        container.innerHTML = navbarHTML;

        const navbar = document.getElementById("navbar");
        const trigger = document.querySelector(".navbar-trigger");       
        trigger.addEventListener("click", () => {           
            const x = navbar.classList.toggle("open");    
            if(x){
                trigger.title = 'Cerrar menú';
            }else{
                trigger.title = 'Abrir menú';
            }   
        });
    }
);