/**
 * Gestiona la lógica y comportamiento del módulo "El Taller".
 *
 * Este archivo se encarga de:
 * - Gestionar la selección de experiencias laborales.
 * - Cargar la información desde experiences.json.
 * - Actualizar dinámicamente el contenido de la experiencia.
 * - Gestionar la navegación de la experiencia.
 *
 * @file taller.js
 * @author Tania Del Angel
 */

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
const technologiesContent = document.getElementById("tecnologies-content");
const technologyPrevious = document.getElementById("technology-previous");
const technologyNext = document.getElementById("technology-next");
const experienceBack = document.getElementById("experience-back");
let currentTechnologyPage = 0;
let technologyPages = [];

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

technologyPrevious.addEventListener("click", () => {

    if (technologyPages.length === 0) {
        return;
    }

    currentTechnologyPage--;

    if (currentTechnologyPage < 0) {
        currentTechnologyPage = technologyPages.length - 1;
    }

    showTechnologyPage();
});
technologyNext.addEventListener("click", () => {

    if (technologyPages.length === 0) {
        return;
    }

    currentTechnologyPage++;

    if (currentTechnologyPage >= technologyPages.length) {
        currentTechnologyPage = 0;
    }

    showTechnologyPage();
});

setInterval(() => {
    if (technologyPages.length <= 1) {
        return;
    }
    currentTechnologyPage++;
    if (currentTechnologyPage >= technologyPages.length) {
        currentTechnologyPage = 0;
    }
    showTechnologyPage();
}, 4000);

experienceBack.addEventListener("click", () => {

    experienceView.classList.remove("visible");

    workshop.classList.remove("zooming");

    setTimeout(() => {
        experienceView.hidden = true;
    }, 500);
});

/**
 * Actualiza la tarjeta de experiencia con la información
 * correspondiente a la empresa seleccionada.
 *
 * @param {Object} companyData - Datos de la experiencia laboral.
 * @param {string} compName - Identificador de la empresa.
 * @returns {void}
 */
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
   // buildTechnologies(companyData.technologies);
   buildTechnologyPages(companyData.technologies);
}
/**
 * Divide las tecnologías de una experiencia en grupos
 * para mostrarlas de forma paginada en el carrusel.
 *
 * @param {string[]} technologies - Lista de tecnologías.
 * @returns {void}
 */
function buildTechnologyPages(technologies) {

    technologyPages = [];

    for (
        let i = 0;
        i < technologies.length;
        i += TECHNOLOGIES_PER_PAGE
    ) {
        technologyPages.push(
            technologies.slice(i, i + TECHNOLOGIES_PER_PAGE)
        );
    }
    currentTechnologyPage = 0;
    showTechnologyPage();
}
/**
 * Muestra el grupo de tecnologías correspondiente
 * a la página actual del carrusel.
 *
 * @returns {void}
 */
function showTechnologyPage() {

    technologiesContent.innerHTML = "";

    const currentPage = technologyPages[currentTechnologyPage];

    if (!currentPage) {
        return;
    }

    currentPage.forEach(technology => {

        const icon = TECHNOLOGY_ICONS.get(technology);

        if (!icon) {
            return;
        }

        const technologyItem = document.createElement("div");

        technologyItem.classList.add("technology-item");

        technologyItem.innerHTML = `
            <img
                src="${icon}"
                alt="${technology}"
                class="technology-icon"
            >
        `;

        technologiesContent.appendChild(technologyItem);
    });
}
/**
 * Construye la linea del tiempo de la experiencia.
 *
 * @param {string[]} technologies - Lista de tecnologías de la experiencia.
 * @returns {void}
 */
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