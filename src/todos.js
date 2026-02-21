import { Project, getProjects, removeToDo, updateLocalStorage } from "./projects.js"
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

// const testID = () => {
//     return projects[0].id
// }

// trying to figure out why my index is showing -1 instead of 0

// addNewToDo(testID(), 'test title1', 'test description1', '01/01/2027', 'Medium')
// addNewToDo('test title2', 'test description2', '01/01/2027', 'High', 'Default')
// addNewToDo('test title3', 'test description3', '01/01/2027', 'Medium', 'Default')
// addNewToDo('test title4', 'test description4', '01/01/2027', 'Low', 'Default')
// addNewToDo('test title5', 'test description5', '01/01/2027', 'Medium', 'Default')
// addNewToDo('test title6', 'test description6', '01/01/2027', 'High', 'Default')
