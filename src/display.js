import { projects, addProject, removeProject } from "./projects.js"
import { addNewToDo, toDos, removeToDo } from "./todos.js"

export const renderDisplay = () => {
    buildProjectList()
}

const toggleExtraItems = (element) => {
    element.hidden = element.hidden === true ? false : true;
}

const toggleExpand = (element) => {
    element.textContent = element.textContent === '⬇️' ? '⬆️' : '⬇️'
}

const bgColorLogic = (element, todo) => {
    if (todo.complete === true) {
        changeBackgroundColor(element, '#3fff89')
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

const changeComplete = (div, todo) => {
    todo.updateComplete()
    bgColorLogic(div, todo)
}

const handleSubmitToDo = (project) => {
    const title = document.querySelector('#title').value
    const description = document.querySelector('#description').value
    const due = document.querySelector('#due').value
    const priority = document.querySelector('#priority').value
    addNewToDo(title, description, due, priority, project)
    displayToDos(project)
}

const closeToDoDialog = () => {
    const dialog = document.querySelector('#todo-dialog')
    const form = document.querySelector('#todo-form')
    dialog.close()
    form.reset()
}

const openToDoDialog = (project) => {
    const dialog = document.querySelector('#todo-dialog')
    dialog.showModal()
    const submitBtn = document.querySelector('#submit-todo')
    submitBtn.addEventListener(('click'), (e) => {
        e.preventDefault
        handleSubmitToDo(project)
        closeToDoDialog()
    }, {once: true})
    
}

const addNewToDoBtn = (project) => {
    const contentDiv = document.querySelector('content')
    const btn = document.createElement('button')
    btn.textContent = '➕'
    contentDiv.appendChild(btn)
    btn.addEventListener(('click'), () => {
        openToDoDialog(project)
    })
}

const displayToDos = (project) => {
    const contentDiv = document.querySelector('content')
    contentDiv.textContent = ''
    const newH1 = document.createElement('h1')
    newH1.textContent = `Project: ${project}`
    contentDiv.appendChild(newH1)
    const toDosList = document.createElement('div')
    toDosList.classList.add('todos')
    contentDiv.appendChild(toDosList)
    const filteredToDos = toDos.filter((todo) => todo.project === project)
    if (projects.length === 0) {
        contentDiv.textContent = '⬅️Choose or create a project to get started'
    }
    

    else {
    filteredToDos.forEach((todo, index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('todo')
            const toDoDetails = document.createElement('div')
            toDoDetails.classList.add('todo-details')
            const titleDiv = document.createElement('div')
            titleDiv.textContent = todo.title
            toDoDetails.appendChild(titleDiv)
            const dueDateDiv = document.createElement('div')
            dueDateDiv.textContent = `Due: ${todo.dueDate}`
            toDoDetails.appendChild(dueDateDiv)
            const priorityDiv = document.createElement('div')
            priorityDiv.textContent = `Priority: ${todo.priority}`
            toDoDetails.appendChild(priorityDiv)
            const btnDiv = document.createElement('div')
            btnDiv.classList.add('todo-buttons')
            const completeBtn = document.createElement('button')
            completeBtn.classList.add('complete-button')
            completeBtn.textContent = '✔️'
            completeBtn.addEventListener(('click'), (e) => {
                displayComplete(e.target)
                changeComplete(newDiv, todo)
            })
            btnDiv.appendChild(completeBtn)
            const toggleBtn = document.createElement('button')
            toggleBtn.classList.add('toggle-button')
            toggleBtn.textContent = '⬇️'
            btnDiv.appendChild(toggleBtn)
            const cancelBtn = document.createElement('button')
            cancelBtn.classList.add('remove-button')
            cancelBtn.textContent = '🗑️'
            cancelBtn.addEventListener(('click'), () => {
                removeToDo(todo.id)
                displayToDos(project)
            })
            btnDiv.appendChild(cancelBtn)
            const toggleDiv = document.createElement('div')
            toggleDiv.hidden = true
            toggleDiv.classList.add('todo-toggle')
            const descriptionDiv = document.createElement('div')
            descriptionDiv.textContent = todo.description
            toggleDiv.appendChild(descriptionDiv)
                toggleBtn.addEventListener(('click'), (e) => {
                    toggleExpand(e.target)
                    toggleExtraItems(toggleDiv)
            })
            toDoDetails.appendChild(btnDiv)
            newDiv.appendChild(toDoDetails)
            newDiv.appendChild(toggleDiv)
            toDosList.appendChild(newDiv)
            bgColorLogic(newDiv, todo)
    })
    addNewToDoBtn(project)
}
    
}

const addNewProject = () => {
    const projectBtn = document.querySelector('.add-project-btn')
    const projectNav = document.querySelector('.project-list')
    projectBtn.remove()
    const newDiv = document.createElement('div')
    newDiv.classList.add('project-input')
    const newInput = document.createElement('input')
    newDiv.appendChild(newInput)
    const addBtn = document.createElement('button')
    addBtn.textContent = '✔️'
    addBtn.addEventListener(('click'), (e) => {
        e.preventDefault()
        addProject(newInput.value)
        buildProjectList()
        if (projects.length === 1) {
            displayToDos(projects[0])
        }
    })
    newDiv.appendChild(addBtn)
    projectNav.appendChild(newDiv)
}

const buildProjectList = () => {
    let currentProject = 'Default'
    const projectNav = document.querySelector('.project-list')
    projectNav.textContent = ''
    projects.forEach((project) => {
        const newDiv = document.createElement('div')
        const newProjectDiv = document.createElement('div')
        const removeBtn = document.createElement('button')
        newProjectDiv.textContent = project
        newProjectDiv.addEventListener('click', () => {
            currentProject = project
            displayToDos(currentProject)
        })
        removeBtn.textContent = '❌'
        removeBtn.addEventListener(('click'), () => {
            removeProject(project)
            buildProjectList()
            if (project === currentProject || projects.length === 0) {
                displayToDos(projects[0])
            }
        })
        newDiv.appendChild(newProjectDiv)
        newDiv.appendChild(removeBtn)
        projectNav.appendChild(newDiv)
    })
    const addProjectBtn = document.createElement('button')
        addProjectBtn.classList.add('add-project-btn')
        addProjectBtn.textContent = '➕'
        addProjectBtn.addEventListener(('click'), () => {
            addNewProject()
        })
        projectNav.appendChild(addProjectBtn)
        displayToDos(currentProject)
}

