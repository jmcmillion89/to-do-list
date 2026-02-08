import { removeProjectToDos } from "./todos.js"

export let projects = ['Default']

export const addProject = (projectName) => {
    if (projectName !== '') {
        projects.push(projectName)
    }
}

export const removeProject = (projectName) => {
    let index = projects.indexOf(projectName)
    projects.splice(index, 1)
    removeProjectToDos(projectName)
}
