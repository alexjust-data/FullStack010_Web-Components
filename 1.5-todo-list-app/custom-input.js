/*
Responsabilidad
    - Informar de lo que se ha escrito cuando se pulsa el botón.
    - Limpiar el input cuando se pulsa el botón.

Opcional - informar que el valor no es correcto
Opcional - Validar contenido con RegExp

Atributos
    - type
    - placeholder
    - buttonLabel

Eventos
    - Cuando se pulse el botón debemos disparar un evento, llamado submit, con el texto introducido.

Custom properties
    - --custom-input-button-color
    - --custom-input-input-border-color

*/

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>

button {
  color: var(--custom-input-button-color, lightblue);
}

input {
  border-color: var(--custom-input-input-border-color, lightblue);
}

</style>

<div class="custom-input-wrapper">
  <input type="text">
  <button></button>
</div>

`;

class CustomInput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.type = this.getAttribute('type') || 'text';
    this.placeholder = this.getAttribute('placeholder') || 'Write a task';
    this.buttonLabel = this.getAttribute('buttonLabel') || 'Add';
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);

    const input = template.querySelector('input');
    input.setAttribute('type', this.type);
    input.setAttribute('placeholder', this.placeholder);

    const button = template.querySelector('button')
    button.textContent = this.buttonLabel;
    button.addEventListener('click', () => {
      this.onButtonClicked();
    })

    this.shadowRoot.appendChild(template);
  }

  onButtonClicked() {
    const input = this.shadowRoot.querySelector('input');
    const inputValue = input.value;

    if (inputValue !== '') {
      const event = new CustomEvent("submit", {
        detail: inputValue
      });

      this.dispatchEvent(event);
      input.value = '';
    }
  }
}

customElements.define("custom-input", CustomInput);