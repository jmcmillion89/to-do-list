const key = 'projects'
export const savedProjects = localStorage.getItem(key)

class Project {
    constructor(name) {
        this.name = name
        this.todos = []
        this.id = crypto.randomUUID();
    }
}

export let projectsArray = savedProjects ? JSON.parse(savedProjects) : [new Project('Default')]

console.log(projectsArray)

export const updateLocalStorage = () => {
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

export const removeProject = (index) => {
        projectsArray.splice(index, 1)
        updateLocalStorage()
    }