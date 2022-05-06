/** * @jest-environment jsdom */
import LocalStorageMock from '../__mocks__/fakelocalStorage.js';

describe('addToDo input to localstarge/ delete', () => {
  const tasks = new LocalStorageMock();
  document.body.innerHTML = `
 <input type="text" id="toDoInput" class="toDo" placeholder="Add to your list..." >
 <ul class="toDoItems"></ul>`;
  const toDoItems = document.querySelector('.toDoItems');
  const toDoInput = document.querySelector('#toDoInput');
  toDoInput.value = 'item1';
  const arr = [];
  const addToDo = () => {
    // document.body.innerHTML = `<ul class="toDoItems"></ul>`;
    const newTask = {
      description: toDoInput.value,
      completed: false,
      index: arr.length + 1,
    };
    arr.push(newTask);
    tasks.setItem('Tasks', arr);
  };

  test('add item to localStorage', () => {
    addToDo();
    expect(tasks.getItem('Tasks')).toEqual(arr);
    // expect(item).toHaveLength(1);
  });

  test('add item 2 to localStorage', () => {
    toDoInput.value = 'item2';
    addToDo();
    // const item = document.querySelector('.toDoItems');
    expect(tasks.getItem('Tasks')).toEqual(arr); // expect(item).toHaveLength(1);
  });

  test('add item 3 to localStorage', () => {
    toDoInput.value = 'item3';
    addToDo();
    expect(tasks.getItem('Tasks')).toEqual(arr); // expect(item).toHaveLength(1);
  });

  test('Remove Item 1 from localStorage', () => {
    const newArr = tasks.getItem('Tasks');
    const removeDo = (index) => {
      const beforeItem = newArr.slice(0, index - 1);
      const afterItem = newArr.slice(index, newArr.length + 1);
      const data = beforeItem.concat(afterItem);
      data.forEach((item, index) => {
        item.index = index + 1;
      });

      tasks.setItem('Tasks', data);
    };

    removeDo(1);
    expect(tasks.getItem('Tasks')).toEqual([{ completed: false, description: 'item2', index: 1 }, { completed: false, description: 'item3', index: 2 }]);
  });

  test('Remove Item 3 from localStorage', () => {
    const newArr = tasks.getItem('Tasks');
    const removeDo = (index) => {
      const beforeItem = newArr.slice(0, index - 1);
      const afterItem = newArr.slice(index, newArr.length + 1);
      const data = beforeItem.concat(afterItem);
      data.forEach((item, index) => {
        item.index = index + 1;
      });
      tasks.setItem('Tasks', data);
    };

    removeDo(2);
    expect(tasks.getItem('Tasks')).toEqual([{ completed: false, description: 'item2', index: 1 }]);
  });

  test('insert <li> tag into dom using display()', () => {
    const todoos = tasks.getItem('Tasks');
    const display = (items) => {
      items.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'toDoitem';
        li.id = item.index;
        if (item.completed === true) {
          li.style.textDecoration = 'line-through';
        }
        const div = document.createElement('div');
        div.className = 'item';
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('box');
        checkbox.checked = item.completed ? 'checked' : '';
        div.appendChild(checkbox);
        const inputDo = document.createElement('input');
        inputDo.setAttribute('type', 'text');
        inputDo.classList.add('toDo', 'doItem');
        inputDo.setAttribute('value', `${item.description}`);
        inputDo.readOnly = true;
        div.appendChild(inputDo);
        li.appendChild(div);
        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-ellipsis-v', 'dots');
        li.appendChild(icon);
        toDoItems.appendChild(li);
      });
    };

    display(todoos);
    expect(toDoItems.hasChildNodes).toBeTruthy();
    expect(toDoItems.childNodes).toHaveLength(1);
  });
});
