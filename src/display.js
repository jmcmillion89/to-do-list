import { projects } from "./projects.js"

export const renderDisplay = () => {
    buildProjectList()
}

const buildProjectList = () => {
    const projectNav = document.querySelector('.project-list')
    projects.forEach((project) => {
        const newLi = document.createElement('li')
        newLi.textContent = project
        projectNav.appendChild(newLi)
    })
}