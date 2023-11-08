/*

Responsabilidad
  - Cada vez que se cree un elemento nuevo, mostrarlo en la lista
  - Persistir los todos una vez creados
  - Contador de todos pendientes
Opcional -> lista de todos completados.

Atributos
- 0

Eventos
- 0

Custom properties
- 0

*/

import './custom-input.js';
import './list-item.js';

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>


</style>

<div class="todo-app-wrapper">
  <span class="counter">0</span>
  <custom-input></custom-input>
  <div class="todo-list"></div>
</div>

`;

class TodoApp extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.counter = 0;
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const customInput = this.shadowRoot.querySelector('custom-input');
    customInput.addEventListener('submit', (event) => {
      this.addTodo(event.detail);
    })
  }

  addTodo(todo) {
    const counter = this.shadowRoot.querySelector('.counter');
    counter.textContent = ++this.counter;

    const todoList = this.shadowRoot.querySelector('.todo-list');
    const newDiv = document.createElement('div');

    // cada vez que creamos esta linea ...
    newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;

    // ... vamos a por el list-item ...
    const listItem = newDiv.querySelector('list-item');

    // ... y añado un addEventList, uno cada vez que se cree un nuevo escuchador
    listItem.addEventListener('onItemRemoved', () => {
        // cada vez ques e elimine 1 lo restamos 
        counter.textContent = --this.counter;
    })
  
    todoList.appendChild(newDiv);
  }

}

customElements.define("todo-app", TodoApp);