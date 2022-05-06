/** * @jest-environment jsdom */
import LocalStorageMock from '../__mocks__/fakelocalStorage.js';

describe('Test update, edit, clearCompleted tasks', () => {
  const tasks = new LocalStorageMock();
  document.body.innerHTML = `
 <input type="text" id="toDoInput" class="toDo" placeholder="Add to your list..." >
 <ul class="toDoItems"></ul>`;
  const toDoItems = document.querySelector('.toDoItems');
  const toDoInput = document.querySelector('#toDoInput');
  toDoInput.value = 'item1';
  const arr = tasks.getItem('Tasks') || [];
    const newTask = {
      description: 'Task1',
      completed: false,
      index: arr.length + 1,
    };
    arr.push(newTask);
    const tasky = {
      description: 'Task2',
      completed: false,
      index: arr.length + 1,
    };

    arr.push(tasky);
    tasks.setItem('Tasks', arr);

    test('Edit a Task', () => {
      const editTask = (task, textUpdate) => {
        task.description = textUpdate;
        tasks.setItem('Tasks', arr);
      };
      const textUpdate = 'This is the updates';
      expect(newTask.description).not.toEqual('This is the updates');
      editTask(newTask, textUpdate);
      expect(newTask.description).toEqual('This is the updates');
    });


   test('Updated completed task status', () => {
     const updateState = (index) => {
       if(arr[index].completed === false){
        arr[index].completed = true;
       } else {
         arr[index].completed = false;
       }
      tasks.setItem('Tasks', arr);
    }

    let store = tasks.getItem('Tasks');
    updateState(1)
    expect(arr[1].completed).toEqual(true);
   })

    test('clear completed tasks', () => {
      const clearCompleted = () => {
        const todoosArr = tasks.getItem('Tasks');
        const data = todoosArr.filter((item) => item.completed !== true);
        tasks.setItem('Tasks', data);
      };

      clearCompleted();
      expect(tasks.getItem('Tasks')).toEqual([ { description: 'This is the updates', completed: false, index: 1 } ]);
    });

});