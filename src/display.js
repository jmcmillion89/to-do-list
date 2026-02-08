import { projects } from "./projects.js"
import { toDos } from "./todos.js"

export const renderDisplay = () => {
    buildProjectList()
}

const toggleExtraItems = (element) => {
    element.hidden = element.hidden === true ? false : true;
}

const toggleExpand = (element) => {
    element.textContent = element.textContent === '↓' ? '↑' : '↓'
}

const bgColorLogic = (element, todo) => {
    if (todo.complete === true) {
        changeBackgroundColor(element, 'green')
    }

    else if (todo.priority === 'High') {
        changeBackgroundColor(element, 'red')
    }

    else if (todo.priority === 'Medium') {
        changeBackgroundColor(element, 'orange')
    }

    else if (todo.priority === 'Low') {
        changeBackgroundColor(element, 'yellow')
    }

}

const changeBackgroundColor = (element, color) => {
    element.style.background = color

}

const displayComplete = (todo) => {
    let complete = todo.complete === true ? '✘' : '✔'
    return complete
}

const changeComplete = (button, todo) => {
    todo.updateComplete()
    button.textContent = displayComplete(todo)
    bgColorLogic(button.parentNode.parentNode, todo)
}

const displayToDos = (project) => {
    const toDosList = document.querySelector('.todos')
    toDosList.textContent = ''
    const filteredToDos = toDos.filter((todo) => todo.project === project)
    filteredToDos.forEach((todo) => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('todo')
        const toDoDetails = document.createElement('div')
        toDoDetails.classList.add('todo-details')
        const titleDiv = document.createElement('div')
        titleDiv.textContent = todo.title
        toDoDetails.appendChild(titleDiv)
        const dueDateDiv = document.createElement('div')
        dueDateDiv.textContent = todo.dueDate
        toDoDetails.appendChild(dueDateDiv)
        const priorityDiv = document.createElement('div')
        priorityDiv.textContent = todo.priority
        toDoDetails.appendChild(priorityDiv)
        const btnDiv = document.createElement('div')
        btnDiv.classList.add('todo-buttons')
        const completeBtn = document.createElement('button')
        completeBtn.classList.add('complete-button')
        completeBtn.textContent = displayComplete(todo)
        completeBtn.addEventListener(('click'), (e) => {
            changeComplete(e.target, todo)
        })
        btnDiv.appendChild(completeBtn)
        const toggleBtn = document.createElement('button')
        toggleBtn.classList.add('toggle-btn')
        toggleBtn.textContent = '↓'
        btnDiv.appendChild(toggleBtn)
        const toggleDiv = document.createElement('div')
        toggleDiv.hidden = true
        toggleDiv.classList.add('todo-toggle')
        const descriptionDiv = document.createElement('div')
        descriptionDiv.textContent = todo.description
        toggleDiv.appendChild(descriptionDiv)
        const notesInput = document.createElement('textarea')
        notesInput.textContent = 'Notes'
        toggleDiv.appendChild(notesInput)
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
}

const buildProjectList = () => {
    const projectNav = document.querySelector('.project-list')
    projects.forEach((project) => {
        const newLi = document.createElement('li')
        newLi.textContent = project
        newLi.addEventListener('click', () => {
            displayToDos(project)
        })
        projectNav.appendChild(newLi)
    })
}

