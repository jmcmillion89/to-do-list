export let toDos = []

class toDo {
    constructor(title, description, dueDate, priority, project) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.project = project
        this.complete = false
    }

    updateComplete() {
        this.complete = this.complete === false ? true : false;
    }

}

export const addNewToDo = (title, description, dueDate, priority, project) => {
    toDos.push(new toDo(title, description, dueDate, priority, project))
}