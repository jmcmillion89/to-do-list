const key = 'projects'
export const savedProjects = JSON.parse(localStorage.getItem(key))

import { removeProjectToDos } from "./todos.js"

export let projects = savedProjects === null ? [] : savedProjects



class Project {
    constructor(name) {
        this.name = name
        this.todos = []
        this.id = crypto.randomUUID();
    }

    addToDo(todo) {
        this.todos.push(todo)
    }

    removeToDo(index) {
        this.todos.splice(index, 1)
    }
}

const defaultProject = (() => {
    if (savedProjects === null) {
        projects.push(new Project('Default'))
    }
    
})()

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
        projects.push(new Project(projectName))
        updateLocalStorage()
    }
}

export const removeProject = (id) => {
    const index = projects.indexOf(id)
    projects.splice(index, 1)
    updateLocalStorage()
}
