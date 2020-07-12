# Brecha de género

Si jugamos un poco con [el predictor de
sueldos](https://seppo0010.github.io/sysarmy-sueldos-2020.1/) vemos que cambiar
el género de "hombre" a "mujer" suele llevar aparejada una disminución del
sueldo.

Una aclaración que cabe hacer es que cada evaluación toma en cuenta todas las
características en conjunto y no puede extraerse el valor de una
independientemente de las demás, al menos no en este modelo. Es decir, podrían existir casos puntuales en los que 
el sueldo suba al hacer ese cambio, pero no podemos afirmar, _a priori_,
cuánto es el efecto en general.

Todos los cálculos lo pueden encontrar en [este jupyter
notebook](https://github.com/seppo0010/sysarmy-sueldos-2020.1/blob/master/notebook/Brecha%20de%20g%C3%A9nero.ipynb)

## Medir la brecha

[
![Sueldo bruto y respuestas por género](overall.png)
Ver detalles
](overall.md)

Si miramos la distribución de sueldo por género (gráfico (a)) parecería mostrar un sueldo más alto para hombres. Pero es
difícil hacer una buena comparación "a ojo". Una mejor opción es comparar los valores de la mediana de cada grupo. 
En estadística, la mediana es el valor del dato que está en la posición central y deja la misma cantidad de datos a uno y otro lado. 
Por ejemplo, si tuviéramos 11 datos de sueldo y los ordenáramos de menor a mayor, la mediana correspondería al sueldo de la posición número 6 porque quedarían 5 sueldos a un lado (las posiciones 1, 2, 3, 4 y 5) y 5 sueldos al otro (las posiciones 7, 8, 9, 10 y 11).
En este caso, tenemos 820 datos de mujeres. Como es un número par, si las ordenamos por sueldo, la mediana de sueldo corresponderá al valor del promedio de los sueldos de las mujeres en las posiciones 410 y 411. Este valor es $62.050.
En el caso de los hombres, tenemos 4922 datos. Por lo tanto, la mediana de sueldo corresponderá al valor del promedio de los sueldos de los hombres en las posiciones 2461 y 2462. Este valor es $77.000.
Al compararlas, vemos que se obtiene una 
diferencia de un 20% a favor de los hombres. Es decir, que las mujeres cobran 80 centavos por cada peso que se le paga a los hombres.

### Brecha ajustada

Ahora bien, ¿podemos atribuir estas discrepancias exclusivamente a diferencias de género o hay otras factores que influyen y no somos capaces de distinguir al comparar medianas? Efectivamente, esta simplificación no considera otras características que puedan afectar el sueldo tales como la experiencia, las habilidades o las tareas desarrolladas. 

¿Cómo podríamos intentar estimar si existen diferencias exclusivamente por género? 
Una manera sería aprovechar los datos que tenemos y pedirle al modelo que haga una predicción del sueldo para todos esos datos conocidos pero invirtiendo el género. 
De esta manera, podríamos saber cuánto cree el modelo que debe pagar en cada caso manteniendo todas las variables iguales (educación, experiencia, etc.) excepto género.
El resultado de este análisis se muestra en el gráfico (b) y arroja una mediana de sueldo para mujeres de $74.243 y para hombres de $80.492.

[
![Sueldo bruto estimado por género](salary-estimate.png)
Ver detalles
](salary-estimate.md)

La diferencia entre las nuevas medianas estimadas es de un 7,71% del sueldo de
los hombres o, dicho de otra manera, el modelo aprendió que le tiene que pagar a
las mujeres 92 centavos por cada peso que le paga a un hombre que hace el
mismo trabajo. Y en este caso, sí, podemos saber que la discrepancia se debe
exclusivamente a la variable "género".

### Brecha no ajustada

#### Distribución de sueldo por género

Parte de la brecha, sin embargo, no se debe a discriminación explícita hacia dos
personas que hacen el mismo trabajo, sino a decisiones o circunstancias que
afectan el trabajo y no son iguales para hombres y mujeres.

El modelo de predicción toma como características principales para establecer
el sueldo a la experiencia, la cantidad de personas a cargo y si fue a la
universidad y la completó. Veamos cómo es la variación de cada una de estas
características según el género.

[
![Sueldo bruto y experiencia por género](salary-experience.png)
Ver detalles
](experience.md)

La experiencia, el principal predictor del sueldo, tiene una relación en general
positiva con el sueldo (es decir, a mayor experiencia, mayor remuneración) como
se ve en la figura (c) pero, a medida que aumenta la experiencia, se ve cómo la
brecha entre hombres y mujeres se incrementa.

[
![Sueldo bruto y gente a cargo](salary-inchargeof.png)
Ver detalles
](inchargeof.md)

Con pocas personas a cargo no se ve una diferencia sustancial, pero ésta
diferencia es mayor al pasar las 7 personas a cargo, según el gráfico (d). De
todas formas sólo hay 53 respuestas de mujeres que cumplan esta condición, por
lo que es difícil de concluir.

[
![Sueldo bruto y estudios alcanzado](salary-study.png)
Ver detalles
](study.md)

Para cada nivel de estudio vemos que la distribución de ingresos de los hombres
es igual o superior a la de las mujeres. Visualmente vemos en el gráfico (e)
que el área naranja está superpuesta o por encima de la azul. La única
excepción es en la categoría "Secundario en curso" donde sólo hay tres mujeres,
por lo que su influencia a la brecha total es muy baja.

#### Cantidad de respuestas por género

No alcanza sólo con ver la distribución, también tenemos que tener en cuenta
la cantidad de respuestas en cada grupo.Si hubiese una diferencia de sueldo
grande en un grupo en el que hay pocas personas, su repercusión sobre la
brecha total no sería significativa.

[
![Cantidad de respuestas por experiencia por género](reponses-experience.png)
Ver detalles
](experience.md)

En el gráfico (f) vemos que hay menos mujeres con 10 o más años de experiencia.
Hay que tener en cuenta que habíamos visto que la brecha se agranda en este
bloque, pero que ésta es la principal predictora del sueldo, por lo que la
contribución a la brecha total explicada por ésta variable es significativa.
[
![Cantidad de respuestas por gente a cargo](reponses-inchargeof.png)
Ver detalles
](inchargeof.md)

El gráfico (g) muestra cómo la gran mayoría de las respuestas no tienen a nadie
a cargo, y las diferencias en otros grupos no parecen significativas.

[
![Cantidad de respuestas por estudios alcanzado](reponses-study.png)
Ver detalles
](study.md)

En el gráfico (h) vemos que proporcionalmente son más las mujeres con estudios
universitarios completos o superior. Sin embargo habíamos notado en la
distribución de sueldos que todos los niveles favorecían a los hombres.
