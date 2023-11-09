/*

Responsabilidad
    - Mostrar un texto que hace referencia a la tarea que tenemos que hacer
    - Eliminarse cuando se pulsa el botón de borrado

Atributos
    - texto a mostrar -> content
    - texto de botón de borrado -> buttonLabel

Eventos
    - Hemos meditado la opción de incluir un evento de borrado pero no lo vemos necesario aún.

Custom properties
    - SKIP

*/

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>


</style>

<div class="list-item-wrapper">
  <span></span>
  <button></button>
</div>

`;

class ListItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.content = this.getAttribute('content') || 'Estudiar programación';
    this.buttonLabel = this.getAttribute('buttonLabel') || '❌';
    //this.is = Date.now();
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    template.querySelector('span').textContent = this.content;
    template.querySelector('button').textContent = this.buttonLabel;

    this.shadowRoot.appendChild(template);

    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', () => {
      const event = new CustomEvent("onItemRemoved", {
        /// fíjate que lo tienes this.content; lineas arriba de la funcion,
        detail: this.id
      });
      this.dispatchEvent(event);
      this.remove();
    })
  }
}

customElements.define("list-item", ListItem);