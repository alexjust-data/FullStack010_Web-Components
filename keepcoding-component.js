const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>


</style>

<div class="keepcoding-component-wrapper">
  <span>keepcoding component boilerplate</span>
</div>

`;

class KeepcodingComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);
  }
}

customElements.define("keepcoding-component", KeepcodingComponent);
