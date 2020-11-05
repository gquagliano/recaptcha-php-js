<?php
include(__DIR__.'/../recaptcha.php');

//Esta clave está habilitada solo para localhost y no garantizo su disponibilidad
if(!\recaptcha::validarFormulario('6LesKt8ZAAAAAOl2-2pwbBKYxwXU7T40YXS4vwUV')) {
    echo 'Error de validación de identidad.';
    exit;
}

$nombre=filter_var($_POST['nombre'],FILTER_UNSAFE_RAW);

if(!$nombre) {
    echo 'Ingresá tu nombre.';
    exit;
}

echo '¡Hola '.$nombre.'!';