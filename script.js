// Seleciona os elementos da página
const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const tasksList = document.getElementById('tasks');

// Função para adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value;

    // Verifica se o campo de input está vazio
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Cria um novo elemento <li> para a tarefa
    const newTask = document.createElement('li');
    newTask.textContent = taskText;

    // Adiciona botões de ação (concluir e remover)
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.classList.add('complete');
    completeButton.onclick = () => {
        newTask.classList.toggle('completed');
    };

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove');
    removeButton.onclick = () => {
        tasksList.removeChild(newTask);
    };

    // Anexa os botões à tarefa
    newTask.appendChild(completeButton);
    newTask.appendChild(removeButton);

    // Adiciona a nova tarefa na lista
    tasksList.appendChild(newTask);

    // Limpa o campo de input
    taskInput.value = '';
}

// Adiciona um evento de clique ao botão "Add Task"
addTaskButton.addEventListener('click', addTask);

// Permite adicionar tarefas pressionando a tecla Enter
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
