# Interfaz con reCAPTCHA v3 *invisible*.

Implementar reCAPTCHA es muy fácil, pero, de todos modos es bueno contar con una interfaz que nos evite copiar y pegar el código en cada sitio y nos simplifique las actualizaciones en el futuro.

## Modo de uso

### JS

    <form ... id="formulario">
        ...
        <button type="button" onclick="enviarFormulario()">Enviar</button>
    </form>

    <script src="recaptcha-php-js/recaptcha.min.js"></script>
    <script>
    //Esto puede estar en el HTML o en cualquier archivo JS

    //Cargar y preparar reCAPTCHA
    recaptcha.preparar("clave pública o del sitio web");

    //Antes de enviar el formulario
    function enviarFormulario() {
        //...Validaciones, etc.

        var formulario=document.querySelector("#formulario");
        //Con jQuery: $("#formulario").get(0)

        var promesa=recaptcha.enviar(formulario,function(prueba) {
            if(prueba) {
                //...Lógica del envío del formulario, animación de precarga, AJAX, etc.
                //O simplemente:
                formulario.submit();
            }
        });
    }
    </script>

En `recaptcha.preparar()` debe especificarse la clave pública o clave del sitio web.

`recaptcha.enviar()` recibe como primer argumento el selector o el elemento (`Element` o `Node`; *no* jQuery). Admite una función de retorno (*callback*) como segundo argumento, pero también devuelve una promesa (`Promise`); puede implementarse de cualquiera de las dos formas.

Se agregará al formulario un campo oculto con el resultado de la prueba de reCAPTCHA o *token*. Además, la función de retorno recibirá el mismo como argumento, o `null` en caso de error.

Para enviar el valor mediante AJAX en lugar de utilizar el campo oculto, debe enviarse en un parámetro `prueba_recaptcha`.

### PHP

    include_once(__DIR__.'/recaptcha-php-js/recaptcha.php');

    if(!\recaptcha::validarFormulario('clave privada o secreta')) {
        //...Lógica en caso de error, devolver un mensaje, redireccionamiento, etc.
        exit;
    }

En `recaptcha::validarFormulario()` debe especificarse la clave privada o secreta.

### Obtener las claves

- Ingresar en [la consola de reCAPTCHA](https://www.google.com/recaptcha/admin/site/348660263?hl=es).
- Hacer click en Crear, el símbolo de `+` arriba a la derecha.
- Completar el formulario eligiendo *reCAPTCHA v3* como *Tipo de reCAPTCHA*.

### Dar estilo u ocultar la insignia de reCAPTCHA

    .grecaptcha-badge {
        ...
    }

Es posible ocultar la insignia mediante CSS (`visibility: hidden`). Sin embargo, en este caso, se requiere agregar un texto informando el uso de reCAPTCHA y enlazando los términos y condiciones y la política de privacidad. Ver: https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed.

