const toDoItems = document.querySelector('.toDoItems');
const toDoInput = document.querySelector('#toDoInput');

export class ToDoList {
  constructor() {
    this.dotasks = JSON.parse(localStorage.getItem('doList')) || [];
    this.description = '';
    this.completed = false;
    this.index = 0;
  }

 addToDo = () => {
   toDoInput.addEventListener('keyup', (e) => {
     if (e.keyCode === 13) {
       if (toDoInput.value) {
         const newTask = {
           description: toDoInput.value,
           completed: false,
           index: this.dotasks.length + 1,
         };
         this.dotasks.push(newTask);
         this.setlocalStorage(this.dotasks);
         toDoInput.value = '';
       }
     }
   });
 };

 editToDo = (input) => {
   const firstchild = input.firstElementChild;
   const editInput = firstchild.children[1];
   editInput.readOnly = false;
   editInput.addEventListener('keyup', (e) => {
     if (e.keyCode === 13) {
       const newUpdate = this.dotasks.map((update) => ({
         description: update.description,
         completed: update.completed,
         index: update.index,
       }));
       newUpdate[input.id - 1].description = editInput.value;
       this.setlocalStorage(newUpdate);
     }
   });
 };

 updateState = (item) => {
   item.forEach((check, index) => {
     check.addEventListener('change', () => {
       if (check.checked) {
         check.parentNode.children[1].style.textDecoration = 'line-through';
         this.dotasks[index].completed = true;
         this.setlocalStorage(this.dotasks);
       } else {
         check.parentNode.children[1].style.textDecoration = 'none';
         this.dotasks[index].completed = false;
         this.setlocalStorage(this.dotasks);
       }
     });
   });
 };

  clearCompleted = () => {
    const submitBtn = document.querySelector('#submitBtn');
    const data = this.dotasks.filter((item) => item.completed !== true);
    submitBtn.addEventListener('click', () => {
      this.setlocalStorage(data);
    });
  };

 removeDo = (index) => {
   const beforeItem = this.dotasks.slice(0, index - 1);
   const afterItem = this.dotasks.slice(index, this.dotasks.length + 1);
   const data = beforeItem.concat(afterItem);
   data.forEach((item, index) => {
     item.index = index + 1;
   });
   this.setlocalStorage(data);
 };

 setlocalStorage = (todos) => {
   localStorage.setItem('doList', JSON.stringify(todos));
   window.location.reload();
 };

 getData = () => this.dotasks;
}

export const doItem = new ToDoList();

export const display = (todo) => {
  todo.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'toDoitem';
    li.id = task.index;
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
    inputDo.readOnly = true;
    div.appendChild(inputDo);
    li.appendChild(div);
    const icon = document.createElement('i');
    icon.classList.add('fa', 'fa-ellipsis-v', 'dots');
    li.appendChild(icon);
    toDoItems.appendChild(li);
    const dotsBtn = document.querySelectorAll('.dots');

    dotsBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const parent = e.target.parentNode;
        dotsBtn.forEach((dots) => {
          if (dots.parentNode.classList.contains('selected')) {
            dots.parentNode.classList.remove('selected');
            dots.parentNode.children[0].children[1].removeAttribute('style');
            dots.parentNode.children[1].classList.remove('fa-trash');
          }
        });
        parent.classList.add('selected');
        const selectedelment = document.querySelector('.selected');
        selectedelment.children[1].classList.add('fa-trash');
        selectedelment.children[0].children[1].style.backgroundColor = '#f1855d';
        doItem.editToDo(selectedelment);

        selectedelment.children[1].addEventListener('click', () => {
          doItem.removeDo(selectedelment.id);
        });
      });
    });

    const checkBtn = document.querySelectorAll('.box');
    doItem.updateState(checkBtn);
  });
};

doItem.clearCompleted();
export const tasks = doItem.getData();
