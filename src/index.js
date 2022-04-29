import './style.css';
import { display } from './addRemove';
import { doItem } from './addRemove';
import { tasks } from './addRemove';

window.onload = () => {
  doItem.addToDo();
  display(tasks);
};