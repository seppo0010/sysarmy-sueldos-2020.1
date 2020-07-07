# Brecha de género

Jugando un poco con [el predictor de
sueldos](https://seppo0010.github.io/sysarmy-sueldos-2020.1/) vemos que cambiar
el género de "hombre" a "mujer" suele llevar aparejada una disminución del
sueldo.

Una aclaración que cabe hacer es que cada evaluación toma en cuenta todas las
características en conjunto y no puede extraerse el valor de una
independientemente de las demás, al menos no este modelo. Es decir que pueden
haber casos donde el sueldo suba al hacer ese cambio, y que no podemos afirmar
cuánto es el efecto en general.

## Medir la brecha

[
![Sueldo bruto y respuestas por género](overall.png)
Ver detalles
](overall.md)

La mediana es el valor que deja la misma cantidad de gente de los dos lados.
Por ejemplo, habiendo 820 respuestas de mujeres, sería el sueldo de la mujer
número 410 al ordenarlas por sueldo.

La distribución, a ojo, parece mostrar un sueldo más alto para hombres. Es
difícil compararla bien, pero tomemos la mediana de cada grupo. Ahí la
diferencia es de un 20% en favor a los hombres.

Esta simplificación no considera otras características que puedan afectar el
sueldo, como la experiencia o las habilidades.

Otra forma de medir la brecha puede ser ver la diferencia de sueldos que ofrece
el modelo de predicción entre hombres y mujeres. Podemos pedirle que estime
el sueldo para todos los datos conocidos, pero invirtiendo el género, y así
medir cuánto cree que debe cambiar.

De esta forma mediremos el sesgo que aprendió el modelo, considerando cómo es
la gente que respondió la encuesta. Supongamos que la brecha se divide en alta
para gente con más de tres años de experiencia y baja para gente con menos.
Mientras menor sea la proporción en el primer grupo, menor va a ser la brecha,
sólo por estar menos representado. De la misma forma al usar a la población
de la encuesta estamos _ponderando_ el error según estas respuestas.

[
![Sueldo bruto estimado por género](salary-estimate.png)
Ver detalles
](salary-estimate.md)

La diferencia entre las medianas estimadas es de un 7,71% del sueldo de los
hombres.
