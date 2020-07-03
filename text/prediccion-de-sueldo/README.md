# Predicción de sueldo

Vamos a ver cómo crear un modelo de Machine Learning que pueda determinar el
sueldo de una persona según información personal y laboral. El código está
disponible en
[github](https://github.com/seppo0010/sysarmy-sueldos-2020.1/blob/master/notebook/Predicci%C3%B3n%20de%20sueldo.ipynb),
en este texto vamos a exponer el razonamiento y explicar las técnicas
utilizadas.

## Origen de datos

La información que vamos a usar como base es la [encuesta de sueldos de sysarmy
2020.1](https://sysarmy.com/blog/posts/resultados-de-la-encuesta-de-sueldos-2020-1/).
Esta encuesta se realiza cada seis meses anónimamente y luego los microdatos
(cada respuesta recibida) son publicados.

Para obtener información sysarmy crea un formulario y publica el link en
redes sociales y grupos de usuarios de tecnologías relacionadas. Por ello hay
que considerar que las respuestas son de una población _autoseleccionada_, y
por lo tanto no representan a toda la población de IT de Argentina. Cada vez
que intentemos concluir algo tenemos que considerar que no se puede generalizar
sino que como mucho se puede apreciar una tendencia.

También tenemos que tener cuidado con la calidad de la información. Como el
formulario es abierto para que cualquier persona ingrese los datos que quiera,
no se puede estar seguro de la calidad de los mismos. Por ejemplo en esta
edición alguien respondió que tiene 1.555.555.555.555.555.555.555.555 empleados
a cargo, un número claramente exagerado. Sin embargo pueden haber otros casos
donde no se detecten tan fácilmente los problemas, o incluso que la información
sea verosímil y no sea posible de diferenciar.
