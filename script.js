// Seleciona os elementos da página
const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const tasksList = document.getElementById('tasks');
const taskCount = document.getElementById('task-count');
const filterButtons = document.querySelectorAll('.filter-btn');

// Carrega tarefas do LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para salvar as tarefas no LocalStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para atualizar a interface da lista
function renderTasks(filter = 'all') {
    tasksList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
    });

    filteredTasks.forEach((task, index) => {
        const newTask = document.createElement('li');
        newTask.textContent = task.text;
        if (task.completed) {
            newTask.classList.add('completed');
        }

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete');
        completeButton.onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks(filter);
        };

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove');
        removeButton.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks(filter);
        };

        newTask.appendChild(completeButton);
        newTask.appendChild(removeButton);
        tasksList.appendChild(newTask);
    });

    updateTaskCount();
}

// Função para adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value;
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

// Função para atualizar o contador de tarefas
function updateTaskCount() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${activeTasks} tasks remaining`;
}

// Adiciona um evento de clique ao botão "Add Task"
addTaskButton.addEventListener('click', addTask);

// Permite adicionar tarefas pressionando a tecla Enter
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Função para filtrar tarefas
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderTasks(button.id.replace('show-', ''));
    });
});

// Renderiza as tarefas salvas ao carregar a página
renderTasks();
