
const taskList = document.querySelector('#lista-tarefas')
const addTaskBtn = document.querySelector('#criar-tarefa')

function createTask() {
  const taskInput = document.querySelector('#texto-tarefa')
  if (taskInput.value !== '') {
    const newTask = document.createElement('li')
    newTask.innerText = taskInput.value
    taskInput.value = ''
    taskList.appendChild(newTask)
  }
}

addTaskBtn.addEventListener('click', createTask)