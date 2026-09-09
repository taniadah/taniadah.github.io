const companies = document.querySelectorAll(".trajectory-company");
const workshop = document.querySelector(".workshop-container");
const experienceView = document.querySelector(".experience-view");
const experienceCompany = document.querySelector(".experience-company");
const experienceStatus = document.querySelector(".experience-status");

fetch("../../data/experiences.json")
    .then(response => response.json())
    .then(experiences => {
        companies.forEach(company => {
            company.addEventListener("click", () => {
                const companyData = experiences[company.dataset.company];
                console.log(companyData);
                workshop.classList.add("zooming");
                experienceView.hidden = false;
                setTimeout(() => {
    experienceView.classList.add("visible");
}, 300);
            });
        });
    });

function fillExperience(company, status) {

    experienceCompany.textContent = company;
    experienceStatus.textContent = status;

}