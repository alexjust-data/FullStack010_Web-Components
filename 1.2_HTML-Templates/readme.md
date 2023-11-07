
Esto nunca se verá en el borwser porque simplemente es una etiqueta interte.

```html
    <template>
      <h1>Hola keepcoding!</h1>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/739px-Firefox_logo%2C_2019.svg.png"
        alt="example-alt"
      />
    </template>
```

Si le sacamos fuera de, `template` si que se pintaría.

### 2- Define the LazyImage class.

```html
<script>
    // 2- Define the LazyImage class.

    class LazyImage extends HTMLElement {
        
        constructor() {
            super();
        }
    }

    window.customElements.define('lazy-image', LazyImage);
</script>   
```

### 3- Using a document selector method, target the template DOM node.

¿porqué utilizaré el connectedCallback()? si quiero acceder a un nodo del dom tengo que asegurarme que tengo acceso y este es un entorno seguro para acceder al `DOM`.

```html
    <script>
        // 2- Define the LazyImage class.

        class LazyImage extends HTMLElement {
            
            constructor() {
                super();
            }
        }

        connectedCallback() {
            const template = document.querySelector('template');
        }

        window.customElements.define('lazy-image', LazyImage);
    </script>   
```

Con esto estoy yendo al DOM a treaerme toda esta etiqueta del `template`


```html
    <template>
      <h1>Hola keepcoding!</h1>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/739px-Firefox_logo%2C_2019.svg.png"
        alt="example-alt"
      />
    </template>
```


### 4- Create a clone of that DOM node, and set the properties that you need. Try to draw this image --> https://pbs.twimg.com/profile_images/1360169463455379459/v7xAQtTB.jpg

Para ver que es una plantilla vamos a sustituir la `src` por esta `ìmage`

O hemos de duplicar el template, hemos de hacer una copia de lo que hay en su interior. Si escribimos la etiqueta template no vale para nada porque todo lo que esté dentro del `template` no se va a ver. Tenemos que pillar el ****contenido**** de dentro.

```js
// esta es clave para tener el clone
const clone = template.content.cloneNode(true);
```
`cloneNode(true);` Es un metodo que recibe booleano que nosotros vamos a porner tru porque se utiliza para permitir hacer un clon anidado.

```js
// seleccionamos el img del template clonado
const image = clone.querySelector('img');
// sobreescribo por una imagen que me interese
image.src = 'https://pbs.twimg.com/profile_images/1360169463455379459/v7xAQtTB.jpg';
```
esto queda así

```html
    <script>
        class LazyImage extends HTMLElement {
            
            constructor() {
                super();
            }
        }

      connectedCallback() {
        const template = document.querySelector('template');

        // esta es clave para tener el clone
        const clone = template.content.cloneNode(true);

        // seleccionamos el img del template clonado
        const image = clone.querySelector('img');

        // sobreescribo por una imagen que me interese
        image.src = 'https://pbs.twimg.com/profile_images/1360169463455379459/v7xAQtTB.jpg';
      }

        window.customElements.define('lazy-image', LazyImage);
    </script>   
```

### 5- Append the clone to LazyImage component.

`this` hace referencia a la clase en si.

```html
    <script>
        class LazyImage extends HTMLElement {
            
            constructor() {
                super();
            }
        }

      connectedCallback() {
        const template = document.querySelector('template');

        const clone = template.content.cloneNode(true);

        const image = clone.querySelector('img');

        image.src = 'https://pbs.twimg.com/profile_images/1360169463455379459/v7xAQtTB.jpg';

        // añadimos justo lo que pide la descripcion
        this.appendChild(clone);
      }

        window.customElements.define('lazy-image', LazyImage);
    </script>   
```

### 6- Use the lazy-image component!!

Hemos creado el componente `LazyImage` esta clase hay que utilizarla en la cuerpo del html

```html

<body>
    <template>
        <h1>Hola keepcoding!</h1>
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/739px-Firefox_logo%2C_2019.svg.png"
        alt="example-alt"
        />
    </template>

    <lazy-image src="https://pbs.twimg.com/profile_images/1360169463455379459/v7xAQtTB.jpg"></lazy-image>
    <lazy-image src="ojnfonf.jpg"></lazy-image>
    <lazy-image></lazy-image>
</body>

```


---

Ahora vamos a seguir trabajando sobre nuestro web-component para que permita pintar una imagen que nosotros pasemos como atributo. Es decir nuestro web-component será sensible a un atributo.

Si nuestro componente se llama `lazy-image` un `src` sería un buen atributo. Creamos tres

```html
    <lazy-image src="https://pbs.twimg.com/profile_images/1360169463455379459/v7xAQtTB.jpg"></lazy-image>
    <lazy-image src="ojnfonf.jpg"></lazy-image>
    <lazy-image></lazy-image>
```

```html
  <body>
    <template>
      <h1>Hola keepcoding!</h1>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/739px-Firefox_logo%2C_2019.svg.png"
        alt="example-alt"
      />
    </template>

    <lazy-image src="https://pbs.twimg.com/profile_images/1360169463455379459/v7xAQtTB.jpg"></lazy-image>
    <lazy-image src="ojnfonf.jpg"></lazy-image>
    <lazy-image></lazy-image>
  </body>
```

El construcctor inicializa las propiedades de la clase, lo normal es que cuando inicializamos las propiedades es que te lleguen por el constructor como `argumento`. Por ejemplo

```js
      constructor(name, age) {

        this.name = name;
        this.age= age;
      }
```

Esto sería POO la clase persona inicializando. Como nuestro constructor nunca va a recibir los atributos de entrada, nosotros hemos de ir a donde deberían estar esos atributos. ¿donde están? en `this` que somos nosotros.

```js
      constructor() {
        super();
        // vamos a inicializar la variable src con lo que se ha escrito en el componente src
        this.src = this.getAttribute('src');
      }
```

Con los ejemplos que hemos puesto, `src` tomaría el valor en el primer caso : `"https://pbs.twimg.com/profile_images/1360169463455379459/v7xAQtTB.jpg"` y en el segundo caso `"ojnfonf.jpg"`, el tercer caso es un valor nulo.

```html
    <lazy-image src="https://pbs.twimg.com/profile_images/1360169463455379459/v7xAQtTB.jpg"></lazy-image>
    <lazy-image src="ojnfonf.jpg"></lazy-image>
    <lazy-image></lazy-image>
```

Entonces vamos a rellenar el `template` con lo que me han pasado como atributo que en nuestro caso es lo que acabamos de apuntar.


```js
      connectedCallback() {
        const template = document.querySelector('template');

        const clone = template.content.cloneNode(true);

        const image = clone.querySelector('img');

        image.src = this.src; // con lo que me han pasado como atributo this.src

        this.appendChild(clone);
      }
```

Como estás devolviendo una imagen web que puede que a lo mejor no se cargue o tarde, puedes pillarte una `placeholder` https://developers.elementor.com/docs/hooks/placeholder-image/  que cuando alguien no lo cargue el `src`, su pueda carga esta otra

```js
      constructor() {
        super();
        // tomará un valor u otro
        this.src = this.getAttribute('src') || 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg';
      }

```


**IMPORTANT** Has de entender esto muy bien porque trabajarás así, con `componentes`. Tu picarás el componente `1` vez pero lo reutilizarás `n` veces. Todos son independientes pero es el mismo, intanciados o ejecutados tres veces. Una app es un amalgama de componentes.


Como tenemos que reaccionar a un combio de atributo a nuestro componente tenemos que utilizar tenemos que utilizar el `attributeChangedCallback()`. Si este atributo cambia, queremos cojer el DOM de nuestro componente, y modificarle el atributo de `src` en la imagen `this.querySelector('img')` esto nos devuelve la etiqueta de la imagen que tenemos pintada; entonces accedermos al valor de su atributo `this.querySelector('img').src` y se lo cambiamos

```js
      // cuando la función se ejecuta cambiamos el valor 
      attributeChangedCallback(attributeName, oldValue, newValue) {
        if (attributeName === 'src') {
          this.querySelector('img').src = newValue;
        }
      }
```


