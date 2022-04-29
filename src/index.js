import './style.css';
import { display, doItem, tasks } from './addRemove.js';


window.onload = () => {
  doItem.addToDo();
  display(tasks);
};