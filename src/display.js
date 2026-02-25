import { getProjects, removeProject, addProject, updateLocalStorage } from "./projects.js"
import { addNewToDo, removeThisToDo } from "./todos.js"

const projects = getProjects()

const key = 'projectIndex'
const savedProjectIndex = localStorage.getItem(key)

let currentProject = savedProjectIndex ? projects[savedProjectIndex] : projects[0]

const getCurrentProject = () => {
    return currentProject
}

const setCurrentProject = (index) => {
        localStorage.setItem(key, JSON.stringify(index))
        currentProject = projects[index]
    }

export const renderDisplay = () => {
    buildProjectList()
    displayProjectHeader()
    displayToDos()
}

const toggleDescription = (element) => {
    element.hidden = element.hidden === true ? false : true;
}

const toggleExpand = (element) => {
    element.textContent = element.textContent === '⬇️' ? '⬆️' : '⬇️'
}

const bgColorLogic = (element, todo) => {
    if (todo.complete === true) {
        changeBackgroundColor(element, '#C5D89D')
    }

    else if (todo.priority === 'High') {
        changeBackgroundColor(element, '#ff793f')
    }

    else if (todo.priority === 'Medium') {
        changeBackgroundColor(element, '#ffb347')
    }

    else if (todo.priority === 'Low') {
        changeBackgroundColor(element, '#ffda79')
    }

}

const changeBackgroundColor = (element, color) => {
    element.style.background = color

}

const displayComplete = (element) => {
    element.textContent = element.textContent === '✔️' ? '❌' : '✔️'
}

const changeComplete = (element, todo) => {
    todo.complete = todo.complete === false ? true : false;
    updateLocalStorage()
    bgColorLogic(element.parentNode.parentNode, todo)
}

const handleSubmitToDo = () => {
    const form = document.querySelector('#todo-form')
    const id = getCurrentProject().id
    const title = document.querySelector('#title').value
    const description = document.querySelector('#description').value
    const due = document.querySelector('#due').value
    const priority = document.querySelector('#priority').value
    addNewToDo(id, title, description, due, priority)
    updateLocalStorage()
    displayToDos()
    form.reset()
}

const openToDoDialog = () => {
    const dialog = document.querySelector('#todo-dialog')
    const form = document.querySelector('#todo-form')
    const closeBtn = document.querySelector('#close-button')
    dialog.showModal()
    form.addEventListener('submit', handleSubmitToDo)
    closeBtn.addEventListener('click', closeToDoDialog)
    
}

const closeToDoDialog = () => {
    const dialog = document.querySelector('#todo-dialog')
    const form = document.querySelector('#todo-form')
    form.reset()
    dialog.close()
}

const addNewToDoBtn = () => {
    const contentDiv = document.querySelector('content')
    const btn = document.createElement('button')
    btn.textContent = '➕'
    contentDiv.appendChild(btn)
    btn.addEventListener(('click'), (e) => {
        openToDoDialog()
    })
}

const displayProjectHeader = () => {
    const contentDiv = document.querySelector('content')
    if (projects.length === 0) {
        contentDiv.textContent = '⬅️ Create a project to get started.'}
    else {
        const newH2 = document.createElement('h2')
        newH2.textContent = 
        `Project: ${getCurrentProject().name}`
        contentDiv.appendChild(newH2)
    }
}

const createToDosDiv = () => {
    const contentDiv = document.querySelector('content')
    const newDiv = document.createElement('div')
    newDiv.classList.add('todos')
    newDiv.textContent = ''
    contentDiv.appendChild(newDiv)
}

const completeToDoBtn = (element, todo) => {
    const newBtn = document.createElement('button')
    newBtn.textContent = '✔️'
    newBtn.classList.add('complete-button')
    newBtn.addEventListener(('click'), () => {
        changeComplete(element, todo)
        displayComplete(newBtn)
    })
    element.appendChild(newBtn)
}

const toggleDescriptionBtn = (element) => {
    const newBtn = document.createElement('button')
    newBtn.textContent = '⬇️'
    newBtn.classList.add('toggle-button')
    newBtn.addEventListener(('click'), (e) => {
        const descriptionDiv = e.target.parentNode.parentNode.parentNode.lastChild
        toggleDescription(descriptionDiv)
        toggleExpand(newBtn)
    })
    element.appendChild(newBtn)
}

const removeToDoBtn = (element, todo) => {
    const newBtn = document.createElement('button')
    newBtn.textContent = '🗑️'
    newBtn.classList.add('remove-todo-button')
    newBtn.addEventListener(('click'), () => {
        removeThisToDo(currentProject.id, todo.id)
        displayToDos()
    })
    element.appendChild(newBtn)
}

const addToDoBtns = (element, todo) => {
    const newDiv = document.createElement('div')
    newDiv.classList.add('todo-buttons')
    completeToDoBtn(newDiv, todo)
    toggleDescriptionBtn(newDiv, todo)
    removeToDoBtn(newDiv, todo)
    element.appendChild(newDiv)

}

const displayToDoDescription = (element, todo) => {
    const newDiv = document.createElement('div')
    newDiv.classList.add('todo-description')
    newDiv.textContent = todo.description
    newDiv.hidden = true
    element.appendChild(newDiv)
}

const displayToDoDetails = (element, todo) => {
    const toDoDiv = document.createElement('div')
    toDoDiv.classList.add('todo-details')
    const titleDiv = document.createElement('div')
    titleDiv.textContent = todo.title
    toDoDiv.appendChild(titleDiv)
    const dueDiv = document.createElement('div')
    dueDiv.textContent = `Due: ${todo.dueDate}`
    toDoDiv.appendChild(dueDiv)
    const priorityDiv = document.createElement('div')
    priorityDiv.textContent = `Priority: ${todo.priority}`
    toDoDiv.appendChild(priorityDiv)
    element.appendChild(toDoDiv)
    addToDoBtns(toDoDiv, todo)
}

const displayToDos = () => {
    const contentDiv = document.querySelector('content')
    contentDiv.textContent = '';
    displayProjectHeader()
    if (projects.length !== 0) {
    createToDosDiv()
    const project = getCurrentProject()
    const toDosDiv = document.querySelector('.todos')
    project.todos.forEach((todo) => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('todo')        
        displayToDoDetails(newDiv, todo)
        displayToDoDescription(newDiv, todo)
        toDosDiv.appendChild(newDiv)
        bgColorLogic(newDiv, todo)
    })
    addNewToDoBtn()
    }
    
}

const buildProjectList = () => {
    const projectList = document.querySelector('.project-list')
    projectList.textContent = ''
    projects.forEach((project, index) => {
        const newDiv = document.createElement('div')
        const projectName = document.createElement('div')
        projectName.textContent = project.name
        newDiv.appendChild(projectName)
        projectList.appendChild(newDiv)
        projectName.addEventListener(('click'), () => {
            handleProjectClick(index)
        })
        removeProjectBtn(newDiv, project, index)
    })
}

const handleProjectClick = (index) => {
    setCurrentProject(index)
    displayProjectHeader()
    displayToDos()
    
}

const removeProjectBtn = (element, project, index) => {
    const newBtn = document.createElement('button')
    newBtn.textContent = '❌'
    element.appendChild(newBtn)
    newBtn.addEventListener('click', () => {
        handleRemoveProjectBtn(project, index)
    })
}

const handleRemoveProjectBtn = (project, index) => {
    removeProject(index)
    if (project.id === getCurrentProject().id) {
        setCurrentProject(0)
        displayToDos()
    }
    buildProjectList()

}

const addProjectBtn = document.querySelector('.add-project-btn')
addProjectBtn.addEventListener('click', () => {
    addNewProject()
})

const addNewProject = () => {
    const projectList = document.querySelector('.project-list')
    toggleAddProjectBtn()
    const newDiv = document.createElement('div')
    projectList.appendChild(newDiv)
    newDiv.classList.add('project-input')
    const newInput = document.createElement('input')
    newDiv.appendChild(newInput)
    const addBtn = document.createElement('button')
    addBtn.textContent = '✔️'
    newDiv.appendChild(addBtn)
    addBtn.addEventListener(('click'), (e) => {
        handleNewProjectBtn(e, newInput.value.toString())
    })
}

const handleNewProjectBtn = (e, newProjectName) => {
    e.preventDefault()
    addProject(newProjectName)
    buildProjectList()
    setCurrentProject(projects.length - 1)
    displayToDos()
    toggleAddProjectBtn()
}

const toggleAddProjectBtn = () => {
    addProjectBtn.style.visibility = addProjectBtn.style.visibility === 'hidden' ? 'visible' : 'hidden'
}

