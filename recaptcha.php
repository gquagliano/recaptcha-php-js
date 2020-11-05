<?php
/**
 * Copyright, 2020, Gabriel Quagliano. Bajo licencia Apache 2.0.
 * 
 * @author Gabriel Quagliano - https://github.com/gquagliano/
 * @version 1.0
 */

/**
 * Interfaz de implementación de reCAPTCHA v3.
 */
class recaptcha {
    const nombreCampo='prueba_recaptcha';

    public static function validarFormulario($clave) {
        $resultado=self::solicitud('https://www.google.com/recaptcha/api/siteverify','post',[
            'secret'=>$clave,
            'response'=>filter_var($_REQUEST[self::nombreCampo],FILTER_UNSAFE_RAW)
        ]);

        $obj=json_decode($resultado);
		if(!$obj||!$obj->success) return false;
		return true;
    }

    protected static function solicitud($url,$tipo='post',$datos=null) {
        $cuerpo='';
        if($datos) $cuerpo=http_build_query($datos);

		$c=curl_init();
		curl_setopt_array($c,[
			CURLOPT_URL=>$url,
			CURLOPT_POST=>$tipo=='post',
			CURLOPT_POSTFIELDS=>$cuerpo,
			CURLOPT_SSL_VERIFYPEER=>false,
			CURLOPT_RETURNTRANSFER=>true
		]);
		return curl_exec($c);
	}
}