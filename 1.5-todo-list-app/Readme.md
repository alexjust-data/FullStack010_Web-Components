No hay que caer en el absurde de querer hacer un componente por cada HTML que veamos. Tampoco mega componetes grndes, porque cuando más grande sea o más cosas haga, menos reutilizable va a ser.

Un WC ¿qué problema queremos resolver? ¿por cuantos problemitas lo podemos resolver? Hemos de partir la pieza grande en problemitas independientes que son independientes entre ellas pero que juntas resuelven el problmea grande.



<span style="color:red">Cuando programes, tu valor será pensar, no picar codigo. Que la solución que des sea la valida para el problema a resolver. </span>

Tenemos que hacer 4 preguntas, tener claro 4 cosas
* Responsabilidad : ¿porqué quiero hacer ese WC?
Comunicación:
* Atributios: qué atributos recibe para que sea capaz de adaptarse a otros ecosistemas
* Aventos: Qué eventos, cuándo ha de emitir información hacia fuera de lo que le ocurre dentro.
* Custom Propertis: qué varibales css pondremos a disposición a los usuario para que puedan modificar.

![](img/todo.png)

Todo este proceso de responder estas preguntas se llama **DISEÑO TÉCNICO** y no sirve de nada ni tienes valor hasta que lo hagas antes de ponerte a picar codigo.

---


`TO DO LIST` Cosas a hacer para crear esto con web-componenets

![](img/pantalla.png)


* tenemos un imput de texto donde el usuario podrá escribir. (write a task)
* un button que cuando lo pulsemos se tiene que añadir un elemento nuevo.
* En nuestro listado de `to do` tendremos lo que hay en la foto, una vez el usuario a apretado el btón crear, tendremos una caja nueva con un texto que es, lo que tenemos que hacer, la task y a la derecha un botón para borrarlo
* Si le damos al boton el todo se borrará
* Como logica adicional cuando el usuario le da al botón crear task , tiene que vaciarse el imput.
* Si no rellenamos nada y le damos al botón task, no se debe crear un to do nuevo.

### Creamos primer web-component

**¿por dónde empezamos?**

Comenzaremos por que el imput y el botón vayan juntos dentro de un web-component, porque ahí hay cierta lógica que  me interesa que sea la responsabilidad de ese web-component. Es decir. voy a tener un WC que se encarga de tener el `to do` que tenemos que añadir en la parte del listado de tareas. La siguiente lógica es que si el usuario aprieta el botún crear se vacíe la caja del imput, pero si el botón se pusla sin que haya escrito nada en el imput no podemos permitir que ese `to do` vacío se añada. 

¿como se llama ese componente?

Cuando más listo es un WC más capacidad de hacer cosas concretas y menos genérico será, menos lo podré reutilizar en diferentes sitios.

Siempre tendremos 2 tipos de WC, el que podamos reutilizar mucho, el que no podamos. Cuanto más podamos reutilzar el componente más generico debe ser su nombre. El WC que queremos hacr recoje un texto y tiene cierta lógica de imput, por ejemplo lo podríamos usar en la cabecera de la app de wallapop ¿verías sentido que se llame `addTask` se podría reutilizar en wallapop o el cien apps diferentes como buscador de peliculas de netflix? Cuanto más generico más jodido ponerle el nombre. Le llamaré por ejemplo `custom-input`.



1. creo archivo `/1.5-todo-list-app/custom-imput.js`
2. Tengo otro archivo en `./feepcoding-component.js` con una etiqueta `<style>` vacía para que nosotros le metamos lo que queramos.

```js
templateElement.innerHTML = `
<style>


</style>

<div class="keepcoding-component-wrapper">
  <span>keepcoding component boilerplate</span>
</div>

`;
```

Definimos la clase `KeepcodingComponent` con su componente para ser utilizado desde su html y le añado shadow down

```js
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
```

Copio el componente entero y lo copio en mi archivo `/1.5-todo-list-app/custom-imput.js` modifcando el nombre de la clase y de la etiqueta y queda así

```js

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>


</style>

<div class="custom-imput-wrapper">
  <span>keepcoding component boilerplate</span>
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

customElements.define("custom-imput", CustomImput);

```

**DISEÑO TÉCNICO**
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


---

**Atributos:**

Si no te paras a pensar esto, ubieras acabado haciendo un super componente, y no es el caso.


1. creamos el `index.html` donde nos importamos el script del `js`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script type="modelu" src="./custom-input.js"></script>
</body>
</html>
```
* añado el texto de imput a la barra `<input type=text>`
* añado el botón `<button></button>`
  
```js
templateElement.innerHTML = `
<style></style>

<div class="custom-imput-wrapper">
  <input> 
  <button></button>
</div>

`;
```

Quiero permitir que gracias a `<custom-input>` desde fuera de este escript, es decir desde fuera del componente, desde index.html se pueda modificar estos tres elementos. 

Pintamos los atributos desde furea, en el html

```html
<body>
    <custom-input></custom-input>

    <custom-input type="number" 
                  placeholder="escribe lo que quieras hacer"
                  buttonLabel="+">
    </custom-input>


    <script type="modelu" src="./custom-input.js"></script>
</body>
```
Desde el exterior le doy valores a las variables, y desde dentro me permiten pintar esas varibales. Y si no hay varibales le he dicho qué quiero yo por defecto.

Leer los atributos del componente y plasmarlos en el template de nuestro componente ¿como leemos los atributos? 
Ahora le voy a permitir dibujar desde dentro leyendo los atributos

```js
class CustomInput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    // Leer los atributos del componente
    this.type = this.getAttribute('type') || 'text';              //  'text' por defecto
    this.placeholder = this.getAttribute('placeholder') || 'Write a task'; // por defecto 'Write a task'
    this.buttonLabel = this.getAttribute('buttonLabel') || 'Add'; //  'Add' por defecto

    // qué hacemos con esto ahora????
```

Ahora hemos de plasmarlo en el html

```js
// seleccionamos el input del nodo clase "custom-imput-wrapper"

//<input type=text>
const input = template.querySelector('input');  
input.setAttribute('type', this.type); // le ponemos el valor que le hemos dado
input.setAttribute('placeholder', this.placeholder); // le ponemos el valor que le hemos dado

// <button></button>
const button = template.querySelector('button') 
button.textContent = this.buttonLabel;
```

Así podemos ver como gracias a los atributos el comonenete se adapta al ecosistema que nos encontremos
Esto quedaría así

```js
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

    template.querySelector('button').textContent = this.buttonLabel;

    this.shadowRoot.appendChild(template);
  }
}

customElements.define("custom-input", CustomInput);

```

**Eventos** Que dispare la llamada


```js
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

    // ya tenemos el escuchador
    const button = template.querySelector('button')
    button.textContent = this.buttonLabel;
    button.addEventListener('click', () => {
      
        const value = input.value; // vamos a leer el valor del input
        if (value !== '') {        // comprovar si el valor es vacío o no
                                                    // si está vacío --> no hacemos nada
                                                    // si no está vacío --> emitimos evento
            const event = new CustomEvent("submit", {
                detail: inputValue
            });
            // ¿quien hace dispacht?
            this.dispatchEvent(event);
        }
    })

    this.shadowRoot.appendChild(template);
  }
}

customElements.define("custom-input", CustomInput);

```

**TRUCO** Cuando quiera trastear con un nodo del DOM; Tengo un input y quiero sacar su valor. Te vas a inspeccionar el browser, seleccionas el elemento y haces cliak encima. Luego te vas a consola del browser, haces `$0` e intro, y te parece el elemento que has hecho click. Si le das al `$0.value` te parece el valor y vemas si el imput está vacío, verás una cadena vacía.


**Custom properties**

Una vez despachado el evento, ahora toca limpiar el elemento `const input = template.querySelector('input');` . Luego manipulamos las varubales custom propertis para que estén definidas.

```html
<div class="custom-imput-wrapper">
  <input type="text"> 
  <button></button>
</div>
```

vamos a ello:

```js
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
      
        const value = input.value; 
        if (value !== '') {        
            const event = new CustomEvent("submit", {
                detail: inputValue
            });

            this.dispatchEvent(event);
            // dejamos vacío el elemento
            input.value = '';
        }
    })

    this.shadowRoot.appendChild(template);
  }
}

customElements.define("custom-input", CustomInput);

```

definimos las custom propertis para si alguien desde fuera le da un valor, yo pueda usarlo

```html
<style>
    button {
    color: var(--custom-input-button-color, lightblue);
    }

    input {
    border-color: var(--custom-input-input-border-color, lightblue);
    }
<style>
```
Quedando así en el js

```js
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
```

Desde fuera de mi WC 
Cuando ese WC emite el evento de `submit` quiero escuchar ese evento para ver qué se ha escrito ahí dentro. Para ello simplememtne en `index.html` le añado la etiqueta `script`

```html
<script>
    const customInputDefault = document.querySelector(#default);
    customInputDefault.addEventListener("submit", (evento) => {
        console.log(event.detail);
    })
    const customInput = document.querySelector(#default);
    customInputDefault.addEventListener("submit", (evento) => {
        console.log(event.detail);
    })
</script> 
````

Quedando el index.html así

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!--añado etiqueta id-->
    <custom-input id="default"></custom-input> 
    <!--añado etiqueta id-->
    <custom-input id="custom" 
                  type="number" 
                  placeholder="escribe lo que quieras hacer" 
                  buttonLabel="+"></custom-input>


    <script type="modelu" src="./custom-input.js"></script>
    <!--escuchar ese evento con las etiquetas-->
    <script>
        const customInputDefault = document.querySelector(#default);
        customInputDefault.addEventListener("submit", (evento) => {
            console.log(event.detail);
        })
        const customInput = document.querySelector(#custom);
        customInputDefault.addEventListener("submit", (evento) => {
            console.log(event.detail);
        })
    </script> 


</body>
</html>
```

Añadimos variabels definidas desde fuera

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!--esto hará que ambos colores del buton cambien de color a rojo-->
    <style>
        :root {
            --custom-input-button-color: red;

        }
    </style>

</head>
<body>

    <custom-input id="default"></custom-input> 

    <custom-input id="custom" 
                  type="number" 
                  placeholder="escribe lo que quieras hacer" 
                  buttonLabel="+"></custom-input>


    <script type="modelu" src="./custom-input.js"></script>

    <script>
        const customInputDefault = document.querySelector(#default);
        customInputDefault.addEventListener("submit", (evento) => {
            console.log(event.detail);
        })
        const customInput = document.querySelector(#custom);
        customInputDefault.addEventListener("submit", (evento) => {
            console.log(event.detail);
        })
    </script> 


</body>
</html>
```

Vamos a refactorizar

```js
comentame las lineas más importante de este codigo con //


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
```


----


### Creamos otro web-component


Creamos el `1.5-todo-list/list-item.js` y comìamos el esqueleto del WC y le cambiamos el nombre del la clase. 


```js
const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>
</style>

<div class="list-item-wrapper">
  <span>keepcoding component boilerplate</span>
</div>

`;

class ListItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);
  }
}

customElements.define("list-item", KeepcodingComponent);

```

**DISEÑO TÉCNICO**
1. Responsabilidad: 
   - Mostrará un texto que hace referencia a la tarea que hemos de hacer
   - Eliminarse cuando se pulsa el boton de borrado
2. Atributos: 
   - Recibirá texto a mostrar --> content
   - texto que se pinta en el boton --> buttonLabel
3. Eventos: 
   ¿tiene que enviar algún evento? Vamos a ir añadiendo el evento dinamicamente, es decir, tenemos este componente `ListItem` y el anterior, cuando se pulsa el botón si hay algo escrit... alguien escucha el evento y alguien va a ñadir un `ListItem` nuevo. Por lo tanto no hay eventos
   - Hemos meditado incluir un evento de borrado pero no lo vmeos anecesario ahora.
4. Custom properties: Qué atributos tiene si tiene atributos (custom properties)
   - ` `


**Leemos atributos**


```js
class ListItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    // leemos atributos
    this.content = this.getAttribute('content') || 'Estudiar programación';
    this.buttonLabel = this.getAttribute('buttonLabel') || '❌';
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);
  }
}

customElements.define("list-item", ListItem);
```

Añadimos las etiquetas que vamos a escuchar   `<span></span>`, `<button></button>`

```js

templateElement.innerHTML = `
<style>


</style>

<div class="list-item-wrapper">
  <span></span>
  <button></button>
</div>

`;
```

```js
class ListItem extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.content = this.getAttribute('content') || 'Estudiar programación';
    this.buttonLabel = this.getAttribute('buttonLabel') || '❌';
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    // pillamos el span
    template.querySelector('span').textContent = this.content;
    // pillamos el button
    template.querySelector('button').textContent = this.buttonLabel;

    this.shadowRoot.appendChild(template);
}

customElements.define("list-item", ListItem);
```

Vamos a por a lógic adel componente

```js
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
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    template.querySelector('span').textContent = this.content;
    template.querySelector('button').textContent = this.buttonLabel;

    this.shadowRoot.appendChild(template);

    const button = this.shadowRoot.querySelector('button');
    // gestionar el borrad a traés de un click del buton de borrado
    button.addEventListener('click', () => {
      this.remove(); // ¿como borramos el elemento nodo? metodo para elimnar nodo
    })
  }
}

customElements.define("list-item", ListItem);
```


Ahora importamoel script en el `ìndex.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        :root {
            --custom-input-button-color: red;

        }
    </style>

</head>
<body>

    <custom-input id="default"></custom-input> 
    <custom-input id="custom" 
                  type="number" 
                  placeholder="escribe lo que quieras hacer" 
                  buttonLabel="+"></custom-input>
    <!--pinto las listas-->
    <list-item></list-item>
    <list-item content="hacer compa"></list-item>
    <list-item content="hacer cena" buttLabel="Borrar"></list-item>



    <script type="modelu" src="./custom-input.js"></script>
    <!--me traigo el script-->
    <script type="modelu" src="./list-item.js"></script>

    <script>
        const customInputDefault = document.querySelector('#default');
        customInputDefault.addEventListener("submit", (evento) => {
            console.log(event.detail);
        })
        const customInput = document.querySelector('#custom');
        customInputDefault.addEventListener("submit", (evento) => {
            console.log(event.detail);
        })
    </script> 
</body>
</html>
```

### tercer web-componente PADRE QUE COMUNICA AMBAS

**Necesitamos comunicar los dos componentes que hemos creado** Dinámicamente cada vez que el botún `custom-input` de señales de vida que tega un evento, se cree de forma dinámica un nuevo elemento `lista-item`. Y estolo hareos a través de un componente nuevo más inteligente.

`lista-item` se puede reutilizar facil y este `custom-input` también, vamos a por el `PADRE` de estos dos para que se comuniquen. Le llamaremos `toApp`

1. creo archivo `todo-app.js`
2. copio el esqueleto WC
3. cambiamos los nombres
  

```js
const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>
</style>

<div class="todo-app-wrapper">
  <span class="counter">0</span>
</div>

`;

class TodoApp extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    }
  }

}

customElements.define("todo-app", TodoApp);
```

**DISEÑO TÉCNICO**
1. Responsabilidad: 
   - Cada vez que se cree un elemento nuevo mostrarlo en la lista
   - persistir los todos una vez mas (guardar en bbdd, se llama `persistencia`)
   - contador ede `todos` pendientes
   - opcional --> lista de todos completados 
2. Atributos: 
   - 0
3. Evento: 
   - 0
4. Custom properties: Qué atributos tiene si tiene atributos (custom properties)
   - 0

---

Qué es lo primero, ca´l es la repsonsabilidad principal. Orquestar los dos componentes.
- Cada vez que se cree un elemento nuevomostrarlo en la lista

1. que el WC renderice el componente `custom-inputs`.  Así pinta el componente `custom-input`

```js
templateElement.innerHTML = `
  <style>
  </style>

  <div class="todo-app-wrapper">
    <custom-input></custom-input>
  </div>

`;
```

de qué se tiene que encargar nuetro `index.html` en el punto donde estamos?
1. importar el componente `todo-app`
2. pintar ese componente en html
3. fin


venáimos de un html así :

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        :root {
            --custom-input-button-color: red;

        }
    </style>

</head>
<body>
    <custom-input id="default"></custom-input> 

    <custom-input id="custom" 
                  type="number" 
                  placeholder="escribe lo que quieras hacer" 
                  buttonLabel="+"></custom-input>

    <list-item></list-item>
    <list-item content="hacer compa"></list-item>
    <list-item content="hacer cena" buttLabel="Borrar"></list-item>

    <script type="modelu" src="./custom-input.js"></script>
    <!--me traigo el script-->
    <script type="modelu" src="./list-item.js"></script>

    <script>
        const customInputDefault = document.querySelector('#default');
        customInputDefault.addEventListener("submit", (evento) => {
            console.log(event.detail);
        })
        const customInput = document.querySelector('#custom');
        customInputDefault.addEventListener("submit", (evento) => {
            console.log(event.detail);
        })
    </script> 
</body>
</html>
```

ahora lo vamos a limpiar todo y comenzar. Le añado el script `todo-app`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

</head>
<body>
    <todo-app></todo-app>

    <script type="module" src="./todo-app.js"></script>
</body>
</html>

```

Hemos vaciado en index.html y lo unico que está haciendo es importar el componente todo-app. Nuestro componente `todo-app`está definiendo nuestro WC `todo-app` y en su template está pintando el componente `custom-input`. ¿el navegador sabe quien es `custom-input`? Hay que importar el fichero donde se importa.

```js
// importamos
import './custom-input.js';
import './list-item.js';
```

además como elemento padre me interesa saber cuando sucede un evento de mi hijo

```js
const templateElement = document.createElement("template");

templateElement.innerHTML = `
  <style>
  </style>

  <div class="todo-app-wrapper">
    <custom-input></custom-input>
  </div>

`;

class TodoApp extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    // pintamos el componente; ya no esteramos cuando alguien la da al boton
    const customInput = this.shadowRoot.querySelector('custom-input');
    customInput.addEventListener('submit', (event) => {
      // event.detail
    })

    }
  }

}

customElements.define("todo-app", TodoApp);
```
 Cada vez que el evento `submit sucede tenemos que añadirmo a una lista

 ```js
templateElement.innerHTML = `
<style>
</style>

<div class="todo-app-wrapper">
  <custom-input></custom-input>
  <div class="todo-list"></div>
</div>`;
 ```

 me creo una funcion para escuchar `addTodo()`que dinamicamente vamos a crear un list event cada vez que recibamos el evento `submit`.

 Vemos a por nuesto `<div class="todo-list"></div>`

```js
class TodoApp extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const customInput = this.shadowRoot.querySelector('custom-input');
    customInput.addEventListener('submit', (event) => {
      // event
      this.addTodo(event.detail); // aplico funcion
    })

  }

  addTodo(todo) {
    const counter = this.shadowRoot.querySelector('.counter'); // Obtener elemento cantidad de tareas (counter)
    counter.textContent = ++this.counter; // Incrementar contador, actualiza contenido del elemento counter

    // Obtener elemento que contiene lista de tareas (todo-list)
    const todoList = this.shadowRoot.querySelector('.todo-list');

    // Crear un nuevo div para contener el nuevo elemento de lista de tareas
    const newDiv = document.createElement('div');

    // Establecer el HTML interno del nuevo div con el elemento list-item personalizado
    newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;

    // Obtener el elemento list-item del nuevo div
    const listItem = newDiv.querySelector('list-item');

    // Agregar un listener para el evento 'onItemRemoved' que disminuirá el contador
    listItem.addEventListener('onItemRemoved', () => {
      counter.textContent = --this.counter;
    })
  
    // Añadir el nuevo div al elemento todoList
    todoList.appendChild(newDiv);
  }


}

customElements.define("todo-app", TodoApp);
```

---


Siguiente:

- contador ede `todos` pendientes

¿que vamos a tener en cuenta para que el contador funcine bien? no solo nos hemos de enterar cuando se añade un elemento; también cuando se borra ese elemento.

Como no tenemos la `persistencia` hecha lo que haremos es sumr 1 cuando 1 se crea y restar cuando se elimina. Cuanod tengamos ersistencia esta logica ya no hace falta.

¿nos estamos enterando cuando un tod se cre? Si

¿cuadno se borra? NO

en `list-item.js` la logica de borrado se queda dentro del componente, tenemos que dispara un evento para que desde fuera nos enteremos cada vez que se borra un evento

```js
  button.addEventListener('click', () => {
    const event = new CustomEvent("onItemRemoved");
    this.dispatchEvent(event);
    this.remove();
  })
```

siguente paso, vaos a `todo-app.js` añadir un escuchadro al evento "onItemRemoved" de cada `list-item` que nosotros pintemos.

El escuchador tiene que ir sobre la etieuta ``<list-item content="${todo}"></list-item>`;` se alguna forma hemos de hacer selector y lisent

aquí se están pintando todos nuestros list-items ` <div class="todo-list"></div>`

```js
templateElement.innerHTML = `
<style>
</style>

<div class="todo-app-wrapper">
  <custom-input></custom-input>
  <div class="todo-list"></div>
</div>
`;
```

podríamos añadirle el escuchador del aevento a ese `div` puesto que es el punto de convergencia de todos los `list-items`. es decir, si el componente emite un evento y los eventos hacen bubling hacia arriba , todos los eventos de `"onItemRemoved"` deverían apasar por ahí.




```js
templateElement.innerHTML = `
<style>
</style>

<div class="todo-app-wrapper">
  <span class="counter">0</span>
  <custom-input></custom-input>
  <div class="todo-list"></div>
</div>
`;
```

cada vez que hagamos un `todo` vamos a ir a por ese `<span class="counter">0</span>`

añadimos UNA PROPIEDAD EN EL CONSTRUCTOR `this.counter = 0;`

```js
const counter = this.shadowRoot.querySelector('.counter');
// sumamos 1 cada vez que cuente
counter.textContent = ++this.counter;
```

y cada vez que se elimine uno l restamos 

```js
    listItem.addEventListener('onItemRemoved', () => {
        // cada vez ques e elimine 1 lo restamos 
        counter.textContent = --this.counter;
    })
```

quedando la función así

```js
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
```

y el file así


```js
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
```

----


**Persistencia**

"persistencia" se refiere a la capacidad de almacenar datos que deben mantenerse más allá de una única sesión o interacción. En otras palabras, es la técnica que permite que los datos creados o modificados durante una sesión de usuario se guarden de tal manera que puedan ser recuperados y utilizados en sesiones futuras. 

Ahora mismo vamos a trabajar la persistencia, 

`npx live-server` y vas al navegador y te metes enla carpeta 1.5 podrás crear taresas con el contador, todos esos valores los tienes guardados en memoria, no los tienes persistidos en ningún sitio. Pues ahora cada vez que creemos un `todo` los vamos a guardar.

Puedes guardar un array de objetos en `localStorage` o `sessionStorage`, pero dado que ambos almacenan la información en formato de texto (string), tendrás que convertir tu array de objetos a una cadena de texto antes de almacenarla y luego convertirla de nuevo a objetos cuando la recuperes. ¿En qué punto y para qué tendremos que interactuar o consultar con `localStorage`?

- Cuando se crea un `todo`
- cuando borramos un  `todo`
- Cuando cargamos la aplicación.


¿de los 3 componentes qu etenemos cuál va a ser el responsable de interactuar con `localStorage` y porqué? Si hacemos q el componenete `custon-input`guarde en localstorega , estamos obligando que la capa de persistencia sea locastorage ¿y si yo quiero guardarlo en una base de datos a través de una api? Siemp`re que puedas delegar a un componente de un ambito superior hazlo, ese es el cometido de los eventos.

El event `custom-input` justo está disparando un evento cuanod se le da al boton porque está diciendo, mi responsabilidad es que cuando el usuario le de al botón l mande para arriba. Si tu quieres ese texto mostrarlo, guardarlo, etc eso es problema tuyo. 

Con el borrado lo mismo, desde Listen-item se le da al botón de broorar tenemos que emitir el evento pero es el padre el que decide qué hacer. 

Siempre escribimos dos clases de componentes, el tonto que se puede reutilizar y el listo que no se puede reutilizar porque hace demasiadas cosas. El `todo` hace demasiadas cosa, instancia a otros, define escuchadores, crea elementos en funcino que llegue un elemento, se encarga de contantac con `localstorage`. Lo componenetes menos reutilizables van a aestar arriba.

Comenzamos por guardar el `localStorage` cuando recibamos un nuevo `todo` para crear lo vamos a añadir a `localStorage`. ¿tenemos algún sitio donde estamos gestionanado cuando se crea un nuevo `todo`? **addTodo()**

Cada vez que recibamos un todo haremos locastoagreSetItem y ¿quémetemos? Imagina la app en blanco, le doy al boton:
1. tarea 1 se guarda en el locastoge
2. escribo tarea2 le doy al boton y se pinta el segundo item. Se tiene que guarda en locastorage.

¿la primera vez que hamos un setItem qué escribiremos? Recuerda que cada vez que hacemos un setItem estamos machacando el valor que existe por un valor nuevo. Entonces si llega la tarea 1 lo escribo, pero la segunda debería escribir el locaStorage el todo que ya tengo más el todo nuevo que acabo de crear. De alguna forma cada vez que cree un todo hemos de escribir todo lo que había antes si no la liamos. Entonces ¿c´mo lo hacemos?

Lo guaradmos en una propiedad de la clase, allí siempre está vivo, lo guardo en la instancia de la clase, creamos una propiedad y cada vez que llega un todo lo borramos pero lo guaradamos en una array pero persistimos el array entero en localStorage.

1. le damos nombre a la propiedad `this.todos = []`

```js
class TodoApp extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.counter = 0;
    this.todos = []; // inicializamos array vacío
  }
```
Ahora cada vez que recibamos un todo con `addTodo()` lo añadimos al array

```js
addTodo(todo) {
  this.todos.push(todo); // incrementamos la persistencia 

  // const counter = this.shadowRoot.querySelector('.counter');
  // counter.textContent = ++this.counter;

  // const todoList = this.shadowRoot.querySelector('.todo-list');
  // const newDiv = document.createElement('div');

  // // cada vez que creamos esta linea ...
  // newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;

  // // ... vamos a por el list-item ...
  // const listItem = newDiv.querySelector('list-item');

  // // ... y añado un addEventList, uno cada vez que se cree un nuevo escuchador
  // listItem.addEventListener('onItemRemoved', () => {
  //     // cada vez ques e elimine 1 lo restamos 
  //     counter.textContent = --this.counter;
  // })

  // todoList.appendChild(newDiv);

  //guardar directamente el array this.todos en localStorage del navegador.  
  localStorage.setItem('todos', this.todos) 
}
```


Yo quiero ahora que cuando se carga mi `todo`de `list-app` si tenía todos guardamos previamente quiero verlos, que se muestren. ¿Qué hacemos y en qué punto?

Veta al navegador, crea listas de tareas. Veta al *local storage* del *inspect +browser/ +Application* Verás el array guadado en el locastoarage. Si vas a la consola y picas `localStorage.getItem("todos")` se te imprime el mismo array.

Ahora refresaca. Cuando refresque ahora mi navegador, tendré los todos guadamos pero no los veré en el browser pintados.

¿en qué consiste le hecho de mostrar los todos que tenemos guardados? leer los todos y segundo pintarlos en pantalla.

Dónde haces la 1º parte: lee los todos de local storage: si en el constructor tenemos un this.todos = [] allí tendremos que hacer, "oye si tengo algo en el localstogare no va a ser un array vacío, será un array con ese contenido". 
Entonces vamos a inicializar el array de la clase que se llama todos con el contenido del localstorage si lo tuviera. Entonces:

```js
class TodoApp extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.counter = 0;
    this.todos = this.getTodos(); // funcion nueva
  }
```
esta funcion devuelve:
1. un array relleno de todos
2. o un array vacío

```js
  getTodos() {
    // recuperar lista tareas como una cadena de texto del localStorage
    const todosAsString = localStorage.getItem("todos");
    let todos = [];

    // Si se encontró una cadena ('todosAsString'), la convertimos de nuevo a un array
    if (todosAsString) {
      // Aquí se asume que cada tarea está separada por comas en la cadena almacenada,
      // por lo que se utiliza 'split()' para dividir la cadena en un array de tareas
      todos = todosAsString.split(',');
    }

    // Devuelve el array de tareas. Será un array vacío si 'todosAsString' es null
    // o no está definido, o será un array de cadenas si 'todosAsString' tiene contenido
    return todos;
  }
```

Ahora en `connectCallback()` es el método del ciclo de vida que se ejecuta cuando el componete ya está en el don por tanto es como una zona segura para empezar a interactuar con el dom

```js
// class TodoApp extends HTMLElement {
//   constructor() {
//     super();

//     this.attachShadow({ mode: "open" });
//     this.counter = 0;
//     this.todos = [];
//   }

  connectedCallback() {
    // const template = templateElement.content.cloneNode(true);
    // this.shadowRoot.appendChild(template);

    this.drawPendingTodos();  // creamos una funcion nueva

    // const customInput = this.shadowRoot.querySelector('custom-input');
    // customInput.addEventListener('submit', (event) => {
    //   this.addTodo(event.detail);
    // })
  }

  // addTodo(todo) {
  //  this.todos.push(todo);
  //   const counter = this.shadowRoot.querySelector('.counter');
  //   counter.textContent = ++this.counter;

  //   const todoList = this.shadowRoot.querySelector('.todo-list');
  //   const newDiv = document.createElement('div');

  //   // cada vez que creamos esta linea ...
  //   newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;

  //   // ... vamos a por el list-item ...
  //   const listItem = newDiv.querySelector('list-item');

  //   // ... y añado un addEventList, uno cada vez que se cree un nuevo escuchador
  //   listItem.addEventListener('onItemRemoved', () => {
  //       // cada vez ques e elimine 1 lo restamos 
  //       counter.textContent = --this.counter;
  //   })
  
  //   todoList.appendChild(newDiv);
  //   localStorage.setItem("todos", this.todos);
  // }

  // getTodos() {
  //  // recuperar lista tareas como una cadena de texto del localStorage
  //  const todosAsString = localStorage.getItem("todos");
  //  let todos = [];

  //  // Si se encontró una cadena ('todosAsString'), la convertimos de nuevo a un array
  //  if (todosAsString) {
  //    todos = todosAsString.split(',');
  //  }
  //  return todos;
  // }


  drawPendingTodos() {
    
    }

//}

// customElements.define("todo-app", TodoApp);
```

Pero fíjate que esto ya lo hace el `addTodo()`aquí

```js
    const todoList = this.shadowRoot.querySelector('.todo-list');
    const newDiv = document.createElement('div');

    newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;

    const listItem = newDiv.querySelector('list-item');
    listItem.addEventListener('onItemRemoved', () => {
        counter.textContent = --this.counter;
    })
```

Como el constructor se ejecuta antes que el connectedCallback() aquí tendré la 
prooiiedad de la clase "this.todos" lista para iterar. Por lo tanto por cada todo que
tenga ahora tendré que pintar cada componente. PERO FIJATE QUE ESTO YA LO ESTAS HACIENDO EN 
addTodo(todo) POR LO TANTO CRÉATE UNA FUNCIÓN Y SÁCALO.

creo función, lo duplico y si funciona lo refactorizo. Recibiendo un texto de todo es capaz de crear el elemento, añadirle el evento y pincharlo en el dom.

```js
addListItem(todo) {
    const todoList = this.shadowRoot.querySelector('.todo-list');
    const newDiv = document.createElement('div');

    newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;

    const listItem = newDiv.querySelector('list-item');
    listItem.addEventListener('onItemRemoved', () => {
        counter.textContent = --this.counter;
    })
}
```
y ahora termino la funcion

```js
drawPendingTodos() {
  this.todos.forEach(todo => {this.addListItem(todo)});
}
```

Quedando así

```js
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
    this.todos = this.getTodos(); // funcion nueva
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    this.drawPendingTodos();  // creamos una funcion nueva

    const customInput = this.shadowRoot.querySelector('custom-input');
    customInput.addEventListener('submit', (event) => {
      this.addTodo(event.detail);
    })
  }

  addTodo(todo) {
    this.todos.push(todo);
    const counter = this.shadowRoot.querySelector('.counter');
    counter.textContent = ++this.counter;

    const todoList = this.shadowRoot.querySelector('.todo-list');
    const newDiv = document.createElement('div');

    newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;
    const listItem = newDiv.querySelector('list-item');
    listItem.addEventListener('onItemRemoved', () => {
        counter.textContent = --this.counter;
    })

    todoList.appendChild(newDiv);
    localStorage.setItem("todos", this.todos);
  }


  getTodos() {
    const todosAsString = localStorage.getItem("todos");
    let todos = [];

    if (todosAsString) {
      todos = todosAsString.split(',');
    }

    return todos;
  }

  drawPendingTodos(todo) {
    // por cada todo ejecutamos el metodo addListItem
    this.todos.forEach(todo => {this.addListItem(todo)});
  }

  addListItem(todo) {
    const todoList = this.shadowRoot.querySelector('.todo-list');
    const newDiv = document.createElement('div');

    newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;

    const listItem = newDiv.querySelector('list-item');
    listItem.addEventListener('onItemRemoved', () => {
        counter.textContent = --this.counter;
    })

    return  listItem;
  }
}

customElements.define("todo-app", TodoApp);
```

Si te vas al inspeccionar verás que el contado no cuenta. Fíjate y cambia esto:

```js
class TodoApp extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.todos = this.getTodos();
    this.counter = this.todos.length;
  }
```
igualamente no te funcionará porque estamos pintando todo el `template` de nuevo aquí:

```js
  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template); // <---- aquí lo metes directamente de nuevo
```
si aquí hay un 0 `<span class="counter">0</span>` se pintará un 0 siempre que cargues un todo

```html
<div class="todo-app-wrapper">
  <span class="counter">0</span>
  <custom-input></custom-input>
  <div class="todo-list"></div>
</div>
```
Cambia esto:

```js
  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    // pintamos primero el valor que tiene la clase counter en el template
    template.querySelector('.counter').textContent = this.counter; 
    this.shadowRoot.appendChild(template); 
```

Ahora fíjate en el browser que el contador va pero no los estamos elimnando del localStorage.
Entonces la lógica es que cuando se borra el nodo el todo tengo que ir al localstorage a eliminar el todo para mantener mi vista alineada con mi lógica.

¿como borramos? Alguien a borrado un evento 

el **evento** `onItemRemoved` lo está emitiendo el **componente** `listItem` 

```js
    const listItem = newDiv.querySelector('list-item');
    listItem.addEventListener('onItemRemoved', () => {
        counter.textContent = --this.counter;
    })
```

visitamos el componente a `list-tiem.js`

```js
    button.addEventListener('click', () => {
      const event = new CustomEvent("onItemRemoved");
      this.dispatchEvent(event);
      this.remove();
    })
```

cuando se pulsa el boton de borrado crea un aevento con el nombre no pasa datos adicionales, entonces si el coponente dice se ha borrado pero no dice quien, como le dicimos "se ha borrado este, voy a elinar este de mi array"? le añadimos un objeto al evento para identificar el elemento que se ha borrado.

```js
connectedCallback() {
    .
    .
    button.addEventListener('click', () => {
      const event = new CustomEvent("onItemRemoved", {
        /// fíjate que lo tienes this.content; lineas arriba de la funcion, es lo que está escrito en el todo
        detail: this.content 
      });
      this.dispatchEvent(event);
      this.remove();
    })
```

Ahora vamos a nuestro arrays de todo y ese todo que se está borrando lo vamos a eliminar.

```js
  addTodo(todo) {
    // this.todos.push(todo);
    // const counter = this.shadowRoot.querySelector('.counter');
    // counter.textContent = ++this.counter;

    // const todoList = this.shadowRoot.querySelector('.todo-list');
    // const newDiv = document.createElement('div');

    // // cada vez que creamos esta linea ...
    // newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;

    // // ... vamos a por el list-item ...
    // const listItem = newDiv.querySelector('list-item');
    listItem.addEventListener('onItemRemoved', ( event ) => {
        // counter.textContent = --this.counter;
        this.todos = this.todos.filter(todo !=== event.detail);
    })
  
    // todoList.appendChild(newDiv);
    // localStorage.setItem("todos", this.todos);
  }
```

Actualizar el localstorage, cuando refrescamos se vacían los datos , hemos de volver a gurdar losd atos 

```js
  addTodo(todo) {
    // this.todos.push(todo);
    // const counter = this.shadowRoot.querySelector('.counter');
    // counter.textContent = ++this.counter;

    // const todoList = this.shadowRoot.querySelector('.todo-list');
    // const newDiv = document.createElement('div');

    // // cada vez que creamos esta linea ...
    // newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;

    // // ... vamos a por el list-item ...
    // const listItem = newDiv.querySelector('list-item');
    // listItem.addEventListener('onItemRemoved', ( event ) => {
        // counter.textContent = --this.counter;
        // this.todos = this.todos.filter(todo => todo !== event.detail);
        localStorage.setItem("todos", this.todos);
    })
  
    // todoList.appendChild(newDiv);
    localStorage.setItem("todos", this.todos);
  }
```

refactorizamos

```js
  addTodo(todo) {
    this.todos.push(todo);
    const counter = this.shadowRoot.querySelector('.counter');
    counter.textContent = ++this.counter;

    this.addListItem(todo);

    localStorage.setItem("todos", this.todos);
  }
```

```js

  // addListItem(todo) {
  //   const todoList = this.shadowRoot.querySelector('.todo-list');
  //   const newDiv = document.createElement('div');

  //   newDiv.innerHTML = `<list-item content="${todo}"></list-item>`;

  //   const listItem = newDiv.querySelector('list-item');
   listItem.addEventListener('onItemRemoved', (event) => {
       const counter = this.shadowRoot.querySelector('.counter');
        counter.textContent = --this.counter;
        this.todos = this.todos.filter(todo => todo !== event.detail);
        localStorage.setItem("todos", this.todos);
  //   })

  //   return  listItem;
  // }
```


**problema** : si un usuario mete varias tareas de input con comas, la hemos liado porque hacemos split con las comas. Idea:

en vez de array de string pelaus lo idones sería tener un array de objetos y cada opbjeto sea la representacion de un `todo`. Tampoc me gusta que la identificacion del todo lo hacemos por ese texto.
