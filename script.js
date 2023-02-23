// 5 -, ao clicar nesse botão, um novo item deverá ser criado ao final da lista e o texto do input deve ser limpo
const taskList = document.querySelector('#lista-tarefas');
const taskInput = document.querySelector('#texto-tarefa');
const addTaskBtn = document.querySelector('#criar-tarefa');

// 7 - Clicar em um item da lista deve alterar a cor de fundo do item para cinza
// 8 - Não deve ser possível selecionar mais de um elemento da lista ao mesmo tempo
function completeTask(event) {
  const taskItem = document.querySelectorAll('li');
  taskItem.forEach((task) => {
    const taskBG = task.style;
    const taskEvent = event.target.style;
    taskBG.backgroundColor = '';
    taskEvent.backgroundColor = 'gray';
  });
}

function createTask() {
  if (taskInput.value !== '') {
    const newTask = document.createElement('li');
    newTask.innerText = taskInput.value.trim();
    taskInput.value = '';

    // 7
    newTask.addEventListener('click', completeTask);

    // 6 - Adicione três novas tarefas e ordene todas as tarefas da lista por ordem de criação
    taskList.appendChild(newTask);
  }
}

addTaskBtn.addEventListener('click', createTask);
