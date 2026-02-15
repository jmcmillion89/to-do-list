const key = 'todos'

export let toDos = []
console.log(toDos)



const populateToDos = (() => {
    const savedToDos = JSON.parse(localStorage.getItem(key))
    if (savedToDos !== null) {
        toDos = []
        savedToDos.forEach((todo) => {
        toDos.push(todo)
    })
    }
})()

const updateLocalStorage = () => {
    localStorage.setItem(key, JSON.stringify(toDos))
}


class toDo {
    constructor(title, description, dueDate, priority, project) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.project = project
        this.complete = false
        this.id = crypto.randomUUID();
    }

    updateComplete() {
        this.complete = this.complete === false ? true : false;
    }

}

export const addNewToDo = (title, description, dueDate, priority, project) => {
    toDos.push(new toDo(title, description, dueDate, priority, project))
    updateLocalStorage()
}

export const removeProjectToDos = (projectName) => {
    toDos = toDos.filter((todo) => todo.project !== projectName)
    updateLocalStorage()
}

const findIndex = (id) => {
    let value;
    toDos.forEach((toDo, index) => {
        if (toDo.id === id) {
            value = index
        }
    }
)
    return value
}

export const removeToDo = (id) => {
    let index = findIndex(id)
    toDos.splice(index, 1)
    updateLocalStorage()
}



// addNewToDo('test title1', 'test description1', '01/01/2027', 'Medium', 'Default')
// addNewToDo('test title2', 'test description2', '01/01/2027', 'High', 'Default')
// addNewToDo('test title3', 'test description3', '01/01/2027', 'Medium', 'Default')
// addNewToDo('test title4', 'test description4', '01/01/2027', 'Low', 'Default')
// addNewToDo('test title5', 'test description5', '01/01/2027', 'Medium', 'Default')
// addNewToDo('test title6', 'test description6', '01/01/2027', 'High', 'Default')
