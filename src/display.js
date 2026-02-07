import { projects } from "./projects.js"
import { toDos } from "./todos.js"

export const renderDisplay = () => {
    buildProjectList()
}

const changeBackground = (element) => {
    const parentElement = element.parentNode
    parentElement.style.background = 'red'

}

const displayComplete = (todo) => {
    let complete = todo.complete === true ? '✔' : '✘';
    return complete
}

const changeComplete = (button, todo) => {
    todo.updateComplete()
    button.textContent = displayComplete(todo)
    changeBackground(button)
}

const displayToDos = (project) => {
    const toDosList = document.querySelector('.todos')
    toDosList.textContent = ''
    const filteredToDos = toDos.filter((todo) => todo.project === project)
    filteredToDos.forEach((todo) => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('todo')
        const titleDiv = document.createElement('div')
        titleDiv.textContent = todo.title
        newDiv.appendChild(titleDiv)
        const dueDateDiv = document.createElement('div')
        dueDateDiv.textContent = todo.dueDate
        newDiv.appendChild(dueDateDiv)
        const priorityDiv = document.createElement('div')
        priorityDiv.textContent = todo.priority
        newDiv.appendChild(priorityDiv)
        const completeBtn = document.createElement('button')
        completeBtn.classList.add('complete-button')
        completeBtn.textContent = displayComplete(todo)
        completeBtn.addEventListener(('click'), (e) => {
            changeComplete(e.target, todo)
        })
        newDiv.appendChild(completeBtn)
        toDosList.appendChild(newDiv)
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

