document.addEventListener('DOMContentLoaded', function() {
    // TODO LIST CODE
    // (Todo List code aqui)

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

    // POMODORO TIMER CODE
    // Seleciona os elementos do Pomodoro
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startButton = document.getElementById('start-timer');
    const pauseButton = document.getElementById('pause-timer');
    const resetButton = document.getElementById('reset-timer');
    const pomodoroState = document.getElementById('pomodoro-state');

    let pomodoroInterval;
    let isPaused = true;
    let focusTime = 25 * 60; // 25 minutos em segundos
    let breakTime = 5 * 60;  // 5 minutos em segundos
    let currentTime = focusTime;
    let isFocusMode = true;  // Modo de foco inicialmente ativo

    // Função para atualizar o display do timer
    function updateTimerDisplay(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
    }

    // Função que controla o cronômetro
    function startPomodoro() {
        if (isPaused) {
            isPaused = false;
            pomodoroInterval = setInterval(() => {
                if (currentTime > 0) {
                    currentTime--;
                    updateTimerDisplay(currentTime);
                } else {
                    switchPomodoroMode();
                }
            }, 1000);
        }
    }

    // Função para pausar o Pomodoro
    function pausePomodoro() {
        isPaused = true;
        clearInterval(pomodoroInterval);
    }

    // Função para reiniciar o Pomodoro
    function resetPomodoro() {
        clearInterval(pomodoroInterval);
        isPaused = true;
        currentTime = isFocusMode ? focusTime : breakTime;
        updateTimerDisplay(currentTime);
    }

   // Função para alternar entre foco e descanso
    function switchPomodoroMode() {
        isFocusMode = !isFocusMode;
        currentTime = isFocusMode ? focusTime : breakTime;
    
    // Mostra o alerta ao final do ciclo
        if (isFocusMode) {
            alert('Time for a break! You completed a Pomodoro cycle.');
        } else {
            alert('Back to focus! Time to start working again.');
        }
    
    pomodoroState.textContent = isFocusMode ? 'Focus Mode' : 'Break Mode';
    updateTimerDisplay(currentTime);
}

    // Eventos para controlar o Pomodoro
    startButton.addEventListener('click', startPomodoro);
    pauseButton.addEventListener('click', pausePomodoro);
    resetButton.addEventListener('click', resetPomodoro);

    // Inicia o display com o tempo de foco
    updateTimerDisplay(focusTime);
});
