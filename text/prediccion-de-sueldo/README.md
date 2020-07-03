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
(cada respuesta recibida) son publicados. Las respuestas corresponden al
período 9/12/2019 - 3/2/2020.

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

Los datos corresponden a los meses de diciembre de 2019 y de enero de 2020
en Argentina, meses en los cuales la inflación fue de
[3,7% y 2,3%](https://www.indec.gob.ar/uploads/informesdeprensa/ipc_06_201F5D8F36A1.pdf)
respectivamente. Esto puede traer variabilidad en los números porque no tenemos
la fecha de cada registro para quitarle esta variación si hubieron ajustes de
sueldo.

## Detección de anomalías

El primer paso, considerando el origen de los datos, va a ser "limpiar" la
información. Acá sólo vamos a ver valores extremos que nunca serían posibles,
números que un humano encuestando no hubiese aceptado. Para eso podemos
graficar cada columna y buscar números que no tengan sentido.

Un par de ejemplos:

![anomalies-salary.png]("Gráficos de salario; (A) sin excluir anomalías todos
los valores se concentran en torno a 0, y la escala llega hasta 7.000.000.000
(B) hasta $1.000.000 la mayoría está entre $0 y $200.000, achicandose
rápidamente hasta casi no haber datos cerca de $1.000.000 (C) hasta $10.000
tiene la gran mayoría en torno a 0 (D) entre $10.000 y $1.000.000 la mayoría
está entre $0 y $200.000, achicandose rápidamente hasta casi no haber datos
cerca de $1.000.000 ")

Alguien respondió que ganaba alrededor de $7.000.000.000.000 de pesos por mes.

Otras muchas personas pusieron que ganaban $1, quizás personas desempleadas que
igual querían participar de la encuesta.

![anomalies-years-in-co.png]("Gráfico de años en la empresa actual (A) sin
excluir anomalías todos los resultados están en torno a 0 y la escala sobrepasa
los 2.000 (B) hasta 40 concentra los valores en menos de 4 y baja rápidamente,
hasta 40")

Una persona puso que tenía alrededor de 2000 años en la misma empresa,
probablemente alguien que malinterpretó la pregunta como desde qué año estaba
en la empresa actual.

## Evaluación de modelo

El modelo va a recibir información de una persona y con eso va a determinar un
sueldo. Lo primero que debemos determinar es cómo vamos a evaluar cuán bueno
un modelo es. Lo que vamos a usar para esto es el [coeficiente de determinación
(o r2)](https://es.wikipedia.org/wiki/Coeficiente_de_determinaci%C3%B3n). Esto
nos va a dar un número no mayor a 1 que nos dice, básicamente, qué proporción
del sueldo se puede explicar con el modelo. Un modelo que siempre devuelva el
mismo valor va a tener un r2 de 0 porque no explica nada, uno que sea muy malo
(aumente su predicción cuando debería disminuir) va a dar negativo, y mientras
más cercano a 1 estemos mejor.

Hay que recordar que la inflación total del tiempo en el que se realizó la
encuesta fue del 6,1%, lo cual aumenta la dificultad del problema.

Para evaluar los resultados vamos a usar
[validación cruzada](https://es.wikipedia.org/wiki/Validaci%C3%B3n_cruzada).
Esto consiste en dividir los datos en cinco (podría ser otro número) grupos, e
ir tomando de a cuatro para entrenar y el restante para evaluar. De esta
forma vamos a poder medir la calidad del modelo con información no vista. Por
supuesto que esto nos va a dar cinco r2, podemos promediarlos para tener una
noción de la calidad. También como cada registro va a ser evaluado sólo una vez
(en los otros cuatro casos se usa para entrenar) podemos guardar el resultado
y calcular el r2 total.

Cuando vayamos a usar el modelo para información nueva, no disponible en la
planilla, vamos a poder entrenar con todo el dataset.

### Modelo base

Sabemos que si el modelo siempre estima un valor constante (por ejemplo el
promedio de los sueldos) el r2 va a ser 0.

Para tener una base un poco más elaborada, [y basado en trabajo
previo](https://github.com/seppo0010/sysarmy-sueldos-2019.1/blob/master/notebook/Sysarmy%20-%20Predicci%C3%B3n%20de%20sueldos.ipynb),
sabemos que tres características que son buenas predictoras del sueldo son el
género, la ubicación y cuántos años de experiencia tiene. Un modelo sencillo que
podemos hacer es tomando en cuenta sólo estas características, y tratar de
ubicar la línea recta que más cerca pase de los puntos, o sea, un modelo de
regresión lineal.

Para eso tenemos que llevar cada características a un espacio lineal. Que el
espacio sea lineal significa que se puede medir la distancia entre dos puntos
y que la misma tiene el mismo valor en otro lugar de la escala. Es decir, que
podría decir que la Provincia de Buenos Aires menos la provincia de Mendoza más
Misiones me puede dar Jujuy. Esto a priori no tiene sentido, pero lo que podemos
hacer es reemplazar cada provincia por el promedio de sueldo de esa provincia.
De esa forma la unidad de la escala es promedio de pesos recibido por mes y se
puede operar algebráicamente. Lo mismo se puede aplicar para género.

En cuánto a la experiencia, si bien ya tenemos números con los que podemos hacer
cuentas, podríamos pensar que no es lo mismo para el sueldo pasar de no tener
experiencia a tener 1 año, que de tener 10 a 11. La diferencia parece ser
decreciente, es decir que mientras más años de experiencia tenga, menos le va
a significar, en el sueldo, la adición de uno nuevo.

![log10.png]("Gráfico de logáritmo de x más uno; se destacan los puntos (0, 0);
(1, 0.3); (6, 0.85); (7, 0.9)").

En una función logarítmica transformamos un número en otro manteniendo el orden
pero achicando la distancia mientras mayor es el número. Acá vemos como el
valor correspondiente a 1 está más lejos del de 0 que el de 7 al de 6.

También podemos aplicar logaritmo al salario. No es lo mismo ganar $1.000
más para alguien que gana $10.000 que una persona que cobra $200.000.

Con estas transformaciones podemos aplicar validación cruzada para entrenar
cinco modelos de regresión lineal y calcular el r2 promedio resultante.
Obtenemos 0.2398. Es decir que este modelo sencillo ya puede explicar casi el
24% del sueldo de las personas.
