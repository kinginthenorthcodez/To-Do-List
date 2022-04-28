import './style.css';

const toDoItems = document.querySelector('.toDoItems');

const tasks = [
  {
    description: 'Go swimming',
    completed: false,
    index: 0,
  },
  {
    description: 'Movie with Nanish',
    completed: true,
    index: 1,
  },
  {
    description: 'complete to-do project',
    completed: false,
    index: 2,
  },
];

const display = (todo) => {
  todo.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'toDoitem';
    li.id = index;
    if (task.completed === true) {
      li.style.textDecoration = 'line-through';
    }
    const div = document.createElement('div');
    div.className = 'item';
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('box');
    checkbox.checked = task.completed ? 'checked' : '';
    div.appendChild(checkbox);
    const inputDo = document.createElement('input');
    inputDo.setAttribute('type', 'text');
    inputDo.classList.add('toDo', 'doItem');
    inputDo.setAttribute('value', `${task.description}`);
    div.appendChild(inputDo);
    li.appendChild(div);
    const icon = document.createElement('i');
    icon.classList.add('fa', 'fa-ellipsis-v');
    li.appendChild(icon);
    toDoItems.appendChild(li);
  });
};

window.onload = () => {
  display(tasks);
};