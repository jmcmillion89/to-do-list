const key = 'projects'
export const savedProjects = localStorage.getItem(key)

import { removeProjectToDos } from "./todos.js"

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


let projectsArray = savedProjects ? JSON.parse(savedProjects) : [new Project('Default')]

const updateLocalStorage = () => {
    localStorage.setItem(key, JSON.stringify(projectsArray))
}

export const getProjects = () => {
        return projectsArray
    }

export const addProject = (projectName) => {
        if (projectName !== '') {
        projectsArray.push(new Project(projectName))
        updateLocalStorage()
    }
    }

export const removeProject = (id) => {
        const index = projectsArray.map((element) => {return element.id}).indexOf(id)
        projectsArray.splice(index, 1)
        updateLocalStorage()
    }

