/**
 * Copyright, 2020, Gabriel Quagliano. Bajo licencia Apache 2.0.
 * 
 * @author Gabriel Quagliano - https://github.com/gquagliano/
 * @version 1.0
 */

/**
 * @class Interfaz de implementación de reCAPTCHA v3.
 */
var recaptcha=new function() {
    "use strict";

    var t=this;

    /** @var {string} lenguaje - Código de lenguaje. */
    this.lenguaje="es-419";

    var claveRecaptcha=null;
    var promesaCarga=null;
    var resolverPromesaCarga;

    /**
     * Recibe el evento `onload` de reCAPTCHA.
     * @memberof external:window
     */
    window.recaptcha_onload=function() {
        resolverPromesaCarga();
    };

    /**
     * Prepara la integración con reCAPTCHA.
     * @param {string} clave - Clave pública.
     * @returns {recaptcha}
     */
    this.preparar=function(clave) {
        claveRecaptcha=clave;
        promesaCarga=new Promise(function(resolver) {
            resolverPromesaCarga=resolver;
            
            var script=document.createElement("script");
            script.src="https://www.google.com/recaptcha/api.js?onload=recaptcha_onload&render="+clave+"&hl="+t.lenguaje;
            document.head.appendChild(script);
        });
        return this;
    };

    /**
     * Prepara el envío del formulario.
     * @param {(string|Node|Element)} formulario - Elemento o selector del formulario.
     * @param {function} [retorno] - Función de retorno (el formulario está listo para enviar).
     * @returns {Promise}
     */
    this.enviar=function(formulario,retorno) {
        if(!promesaCarga) {
            console.error("reCAPTCHA no está listo.");
            return;
        }

        if(typeof formulario==="string") formulario=document.querySelector(formulario);
        if(typeof retorno!=="function") retorno=null;

        var campo=formulario.querySelector("input[name='prueba_recaptcha']");
        if(!campo) {
            campo=document.createElement("input");
            campo.type="hidden";
            campo.name="prueba_recaptcha";
            formulario.appendChild(campo);
        }

        return new Promise(function(resolver) {
            promesaCarga.then(function() {                
                grecaptcha.ready(function() {
                    grecaptcha.execute(claveRecaptcha,{ action:"submit" }).then(function(resultado) {
                        campo.value=resultado;
                        resolver(resultado);
                        if(retorno) retorno(resultado);
                    });
                });
            });
        });
    };
};