const taskList = document.querySelector('#lista-tarefas');
const taskInput = document.querySelector('#texto-tarefa');
const addTaskBtn = document.querySelector('#criar-tarefa');
const removeListBtn = document.querySelector('#apaga-tudo');
const removeCompletedBtn = document.querySelector('#remover-finalizados');
const saveTasksBtn = document.querySelector('#salvar-tarefas');

function factorySelector() {
  const taskItem = document.querySelectorAll('li');
  return {
    taskItem,
  };
}

// 9 - Clicar duas vezes em um item, faz com que ele seja riscado, indicando que foi completado. Deve ser possível desfazer essa ação clicando novamente duas vezes no item
function completeTask(event) {
  event.target.classList.toggle('completed');
}
// 7 - Clicar em um item da lista deve alterar a cor de fundo do item para cinza
// 8 - Não deve ser possível selecionar mais de um elemento da lista ao mesmo tempo
function markTask(event) {
  const { taskItem } = factorySelector();
  taskItem.forEach((task) => {
    const taskBG = task.style;
    const taskEvent = event.target.style;
    taskBG.backgroundColor = '';
    taskEvent.backgroundColor = 'gray';
  });
}

// Função auxiliar
function createNewTask(text, completed) {
  const newTask = document.createElement('li');
  newTask.textContent = text.trim();
  if (completed) {
    newTask.classList.add('completed');
  }
  // 7 - aqui os escutadores estão sendo populados diretamente nos elementos.
  newTask.addEventListener('click', markTask);
  // 9
  newTask.addEventListener('dblclick', completeTask);
  return newTask;
}

// 5 -, ao clicar nesse botão, um novo item deverá ser criado ao final da lista e o texto do input deve ser limpo
function createTask() {
  if (taskInput.value !== '') {
    const newTask = createNewTask(taskInput.value, false);
    taskInput.value = '';
    // 6 - Adicione três novas tarefas e ordene todas as tarefas da lista por ordem de criação
    taskList.appendChild(newTask);
  }
}
addTaskBtn.addEventListener('click', createTask);

// 10 - Adicione um botão que quando clicado deve apagar todos os itens da lista
function removeTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}
removeListBtn.addEventListener('click', removeTasks);

// 11 - Adicione um botão que quando clicado remove somente os elementos finalizados da sua lista
function removeCompleted() {
  const { taskItem } = factorySelector();
  taskItem.forEach((task) => {
    const isCompleted = task.classList.contains('completed');
    if (isCompleted) {
      taskList.removeChild(task);
    }
  });
}
removeCompletedBtn.addEventListener('click', removeCompleted);

// 12 - Adicione um botão que salva o conteúdo da lista. Se você fechar e reabrir a página, a lista deve continuar no estado em que estava
function saveList() {
  const { taskItem } = factorySelector();
  const savedTaskList = [];
  taskItem.forEach((task) => {
    const taskObj = {
      text: task.textContent,
      completed: task.classList.contains('completed'),
      backgroundColor: task.style.backgroundColor,
    };
    savedTaskList.push(taskObj);
  });

  const stg = localStorage;
  stg.setItem('todoList', JSON.stringify(savedTaskList));
}

function loadList() {
  const restoreList = JSON.parse(localStorage.getItem('todoList')) || [];

  restoreList.forEach((task) => {
    const newTask = document.createElement('li');
    newTask.textContent = task.text;
    newTask.style.backgroundColor = task.backgroundColor;
    if (task.completed) {
      newTask.classList.add('completed');
    }

    newTask.addEventListener('click', markTask);
    newTask.addEventListener('dblclick', completeTask);

    taskList.appendChild(newTask);
  });
}

saveTasksBtn.addEventListener('click', saveList);

window.onload = () => {
  loadList();
};
