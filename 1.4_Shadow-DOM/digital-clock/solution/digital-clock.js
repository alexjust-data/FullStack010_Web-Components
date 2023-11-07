/*
  1- Create a digital-clock component.
  2- Each second, we must calculate the time and update the component HTML
*/

const template = document.createElement('template');

template.innerHTML = `
  <style>
    h2 {
      color: var(--digital-clock-color, orangered);
    }
  </style>

  <h2></h2>
`;


class DigitalClock extends HTMLElement {
  
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    
    const templateClone = template.content.cloneNode(true);

    this.shadowRoot.appendChild(templateClone);

    setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      this.shadowRoot.querySelector('h2').textContent = `${hours} : ${minutes} : ${seconds}`;
    }, 1000);
    
  }
}
  
  window.customElements.define('digital-clock', DigitalClock);
  