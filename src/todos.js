import { getProjects } from "./projects.js"
const projects = getProjects()

class toDo {
    constructor(title, description, dueDate, priority, project) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.complete = false
        this.id = crypto.randomUUID();
    }

    updateComplete() {
        this.complete = this.complete === false ? true : false;
    }

}

const getProjectIndex = (id) => {
    return projects.map(() => {return id}).indexOf(id)
}

const getToDoIndex = (index, id) => {
    return projects[index].todos.map(() => {return id}).indexOf(id)

}

export const addNewToDo = 
    (id,  
    title, 
    description, 
    dueDate, 
    priority) => {
    const index = getProjectIndex(id)
    projects[index].addToDo(new toDo(title, description, dueDate, priority))
}

export const removeThisToDo = (projectID, toDoID) => {
    const projectIndex = getProjectIndex(projectID)
    const toDoIndex = getToDoIndex(projectIndex, toDoID)
    projects[projectIndex].removeToDo(toDoIndex)
}