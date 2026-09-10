import {
    TECHNOLOGIES_PER_PAGE,
    COMPANIES_ICONS,
    TECHNOLOGY_ICONS
} from "../constants/constanst_taller.js";

const companies = document.querySelectorAll(".trajectory-company");
const experienceView = document.querySelector(".experience-view");
const companyName = document.querySelector(".company-infoname");
const companyPeriod = document.querySelector(".company-infoperiod");
const companyIconCard = document.querySelector(".company-iconcard");
const aboutContent = document.getElementById("about-content");
const grownContent = document.getElementById("learning-content");
const rolesContent = document.querySelector(".roles-content");
const timeline = document.querySelector(".experience-timeline");
const workshop = document.querySelector(".workshop-container");

fetch("../../data/experiences.json")
    .then(response => response.json())
    .then(experiences => {       
        buildTimeline(experiences);
        companies.forEach(company => {
            company.addEventListener("click", () => {               
                const companyData = experiences[company.dataset.company];                
                workshop.classList.add("zooming");
                experienceView.hidden = false;
                setTimeout(() => {
                    experienceView.classList.add("visible");
                }, 300)
                fillExperience(companyData,company.dataset.company);
            });
        });
    });

function fillExperience(companyData, compName) {
    console.log(companyData)
    companyName.textContent = companyData.company;
    companyPeriod.textContent = companyData.period;
    aboutContent.textContent = companyData.about;
    grownContent.textContent = companyData.learning;
    console.log( COMPANIES_ICONS.get(compName));
    companyIconCard.src = COMPANIES_ICONS.get(compName);
    rolesContent.innerHTML = "";
    companyData.roles.forEach(role => {
    const roleBlock = document.createElement("div");
    roleBlock.classList.add("role-block");
    roleBlock.innerHTML = `
        <h4 class="role-title">${role.title}</h4>
        <ul class="activities-list">
            ${role.activities
                .map(activity => `<li>${activity}</li>`)
                .join("")}
        </ul>
    `;
    rolesContent.appendChild(roleBlock);
    });
}

function buildTimeline(experiences) {
    timeline.innerHTML = "";
    Object.entries(experiences).forEach(([key, companyData], index) => {
        const item = document.createElement("div");
        item.classList.add("timeline-item");
        item.dataset.company = key;
        item.innerHTML = `
            <div class="timeline-node">
                <img 
                    src="${COMPANIES_ICONS.get(key)}" 
                    alt="${companyData.company}"
                >
            </div>
            <div class="timeline-info">
                <h3>${companyData.company}</h3>
                <p>${companyData.period}</p>
            </div>
        `;
        timeline.appendChild(item);
    });
}