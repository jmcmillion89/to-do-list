import { getProjects, updateLocalStorage } from './projects.js';
const projects = getProjects();

class toDo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
    this.id = crypto.randomUUID();
  }
}

const getProjectIndex = (id) => {
  return projects
    .map((project) => {
      return project.id;
    })
    .indexOf(id);
};

const getToDoIndex = (index, id) => {
  return projects[index].todos
    .map((todo) => {
      return todo.id;
    })
    .indexOf(id);
};

export const addNewToDo = (id, title, description, dueDate, priority) => {
  const index = getProjectIndex(id);
  projects[index].todos.push(new toDo(title, description, dueDate, priority));
  updateLocalStorage();
};

export const removeThisToDo = (projectID, toDoID) => {
  const projectIndex = getProjectIndex(projectID);
  const toDoIndex = getToDoIndex(projectIndex, toDoID);
  projects[projectIndex].todos.splice(toDoIndex, 1);
  updateLocalStorage();
};
