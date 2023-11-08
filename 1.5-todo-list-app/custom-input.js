/**
1. Responsabilidad: 
   - Informar de lo que se ha descrito cuando se pulsa el botón
   - limpiar el input cuando se pulsa el botón
   - Opcional: validar contenido con regex : ¿cómo se hace para que se pueda validar lo que teclea el usuario pero que se pueda reutilizar el WC en otros ecosistemas? Nuestras armas para que venga información de fuera hacia dentro son Los atributos. Si quiero que este componente sea muy reutilizable y quiero permitir que quien usa este componente pueda validar el texto que se está escribiendo; lo ideal sería pasar una `expresión regular como atributo`.
2. Atributos: 
   - type: machacar el tipo del imput
   - placeholder (por si está vacío) busca lo que quiera
   - buttonLabel : Para añadir buscar o lo que sea. Ahora en la foto aparece un `+` en el botón, pero si queremos reutilizarlo en wallapop vamos a querer allí una `lupa`.
3. Eventos: 
   son la forma en como los WC van a comunicarse hacia el exterior. Cuando se emite? Qué envía ese evento? 
   - Cuando se pulsa el botón, debemos disparar un evento llamado x (submit) donde  es lo que vaya a pensar con el texto introducido.
4. Custom properties: Qué atributos tiene si tiene atributos (custom properties)
   - `--custom-input-buton-color`
*/


const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>


</style>

<div class="custom-imput-wrapper">
  <input type=text>
  <button></button>
</div>

`;

class CustomImput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);
  }
}

customElements.define("custom-imput", KeepcodingComponent);