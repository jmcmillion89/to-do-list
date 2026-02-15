const key = 'projects'
export const savedProjects = JSON.parse(localStorage.getItem(key))

import { removeProjectToDos } from "./todos.js"

export let projects = savedProjects === null ? ['Default'] : savedProjects

const populateProjects = (() => {

    if (savedProjects !== null) {
        projects = []
        savedProjects.forEach((project) => {
        projects.push(project)
    })
    }
})()

const updateLocalStorage = () => {
    localStorage.setItem(key, JSON.stringify(projects))
}

export const addProject = (projectName) => {
    if (projectName !== '') {
        projects.push(projectName)
        updateLocalStorage()
    }
}

export const removeProject = (projectName) => {
    let index = projects.indexOf(projectName)
    projects.splice(index, 1)
    updateLocalStorage()
    removeProjectToDos(projectName)
}
