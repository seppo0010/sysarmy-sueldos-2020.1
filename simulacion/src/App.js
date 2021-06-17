import React, { Component } from 'react';
import './App.css';

import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import Model from './model';
import './translations';
import { withNamespaces } from 'react-i18next';

const regions_map = {
    'Ciudad Autónoma de Buenos Aires': 'AMBA',
    'GBA': 'AMBA',
    'Catamarca': 'NOA',
    'Chaco': 'NEA',
    'Chubut': 'Patagonia',
    'Corrientes': 'NEA',
    'Entre Ríos': 'NEA',
    'Formosa': 'NEA',
    'Jujuy': 'NOA',
    'La Pampa': 'Pampa',
    'La Rioja': 'NOA',
    'Mendoza': 'Cuyo',
    'Misiones': 'NEA',
    'Neuquén': 'Patagonia',
    'Río Negro': 'Patagonia',
    'Salta': 'NOA',
    'San Juan': 'Cuyo',
    'San Luis': 'Cuyo',
    'Santa Cruz': 'Patagonia',
    'Santa Fe': 'Pampa',
    'Santiago del Estero': 'NOA',
    'Tucumán': 'NOA',
    'Córdoba': 'Pampa',
    'Provincia de Buenos Aires': 'Pampa',
    'Tierra del Fuego': 'Patagonia',
};

class App extends Component {
  state = {
    changedSinceSubmitted: true,
    salary: null,
    answers: {
      'Me identifico': '',
      'Carrera': '',
      'Universidad': '',
      'contract-type': '',
      'sexualOrientation': '',
      '¿Sufriste o presenciaste situaciones de violencia laboral?': '',
      '¿Tenés algún tipo de discapacidad?': '',
      'Tengo': 18,
      ubicacion: 'Ciudad Autónoma de Buenos Aires',
      exp: 0,
      study: '',
      'Estado': '',
      employees: '',
      activity: '',
      duty: [],
      '¿Gente a cargo?': 0,
      'opensource-contributor': '',
      'code-as-hobbie': '',
      occupation: '',
      os: '',
      'os-mobile': '',
      'Realizaste cursos de especialización': [],
      'Plataformas': [],
      'Lenguajes de programación': [],
      'Frameworks, herramientas y librerías': [],
      'Bases de datos': [],
      'IDEs': [],
      'Beneficios extra': [],
      '¿A qué eventos de tecnología asististe en el último año?': [],
    },
    options: {
        degree: [],
        specialization: [],
        occupation: [],
        duty: [],
        contractType: [],
        sexualOrientation: [],
        os: [],
        events: [],
        benefits: [],
        universities: [],
        tech: {
          'Plataformas': [],
          'Lenguajes de programación': [],
          'Bases de datos': [],
          'IDEs': [],
        },
    },
    'results': []
  };

  constructor({t}) {
    super();
    this.model = new Model();
    this.t = t
    this.formatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    });
  }

  handleChange = async (event) => {
    this.setState({changedSinceSubmitted: true})
    const key = event.target.name
    const val = event.target.value
    if (Array.isArray(this.state.answers[key])) {
      const index = this.state.answers[key].indexOf(val)
      if (index >= 0) {
        const arr = this.state.answers[key].concat([])
        arr.splice(index, 1)
        this.setState({ answers: Object.assign({}, this.state.answers, { [key]: arr }) });
      } else {
        this.setState({ answers: Object.assign({}, this.state.answers, { [key]: this.state.answers[key].concat([val]).sort() }) });
      }
    } else {
      this.setState({ answers: Object.assign({}, this.state.answers, { [key]: val }) });
    }
    await this.updateSalary();
  };

  updateSalary = async () => {
    await this.setState({salary: null})
    const answers = Object.assign({}, this.state.answers)
    answers['Dónde estás trabajando'] = answers.ubicacion;
    answers['Años de experiencia'] = answers.exp;
    answers['Nivel de estudios alcanzado'] = answers.study;
    answers['Cantidad de empleados'] = answers.employees;
    answers['Actividad principal'] = answers.activity
    answers['¿Contribuís a proyectos open source?'] = answers['opensource-contributor']
    answers['¿Programás como hobbie?'] = answers['code-as-hobbie']
    answers['¿Tenés guardias?'] = answers.duty
    answers['Trabajo de'] = answers.occupation
    answers['¿Qué SO usás en tu laptop/PC para trabajar?'] = answers.os
    answers['¿Y en tu celular?'] = answers['os-mobile']
    answers['Tipo de contrato'] = answers['contract-type']
    answers['Orientación sexual'] = answers.sexualOrientation

    const salary = await this.model.predict(Object.fromEntries(Object.entries(answers).map(([k, v]) =>
        'Dónde estás trabajando' === k ? ['region=' + regions_map[v], 1] :
        (['¿Gente a cargo?', 'Años de experiencia', 'Tengo'].indexOf(k) === -1 ? [k + '=' + v, 1.0] : [k, v])
    )));
    await this.setState({salary})
  }

  enc = val => {
    if (Array.isArray(val)) {
      val = val.join(', ')
    }
    return encodeURIComponent(val)
  };

  async componentDidMount() {
    const t = this.t
    const features = await this.model.features()
    const prefixOptions = (prefix) => features.filter((f) => f.startsWith(prefix + '=')).map((f) => f.substr(prefix.length + 1))
    this.setState({options: {
      degree: prefixOptions('Carrera').sort().concat([t('Otra')]),
      universities: prefixOptions('Universidad').sort().concat([t('Otra')]),
      specialization: prefixOptions('Realizaste cursos de especialización'),
      occupation: prefixOptions('Trabajo de').sort().concat([t('Otra')]),
      duty: prefixOptions('¿Tenés guardias?').sort(),
      contractType: prefixOptions('Tipo de contrato').sort().concat([t('Otro')]),
      sexualOrientation: prefixOptions('Orientación sexual').sort().concat([t('Otra')]),
      os: prefixOptions('¿Qué SO usás en tu laptop/PC para trabajar?').sort().concat([t('Otro')]),
      events: prefixOptions('¿A qué eventos de tecnología asististe en el último año?').sort(),
      benefits: prefixOptions('Beneficios extra').sort(),
      tech: {
        'Plataformas': prefixOptions('Plataformas').sort(),
        'Lenguajes de programación': prefixOptions('Lenguajes de programación').sort(),
        'Bases de datos': prefixOptions('Bases de datos').sort(),
        'IDEs': prefixOptions('IDEs').sort(),
      },
    }});
    this.updateSalary();
  }

  render(params) {
    const t = this.t
    const {salary} = this.state;
    const {os, sexualOrientation, contractType, duty, occupation, specialization, benefits, events, tech, degree, universities} = this.state.options;

    return (
      <div className="App">
        <header>
        <h1>{t('Predicción de sueldos')}</h1>
        </header>
        <h2>{t('Explicación')}</h2>
        <p>{t('Completá el formulario siguiente y obtené una estimación del sueldo bruto que podrías estar ganando.')}</p>
        <p>{t('El sueldo se estima de acuerdo a un modelo armado de datos recolectados en la encuesta anónima.')}</p>
        <p>{t('Si te interesa saber cómo están armados, podés leer el paso a paso')} <a href="text/prediccion-de-sueldo/index.html">{t('aquí')}</a>.</p>
        <p>{t('Los modelos se armaron con datos recolectados en la')} <a href="https://sysarmy.com/blog/posts/resultados-de-la-encuesta-de-sueldos-2020-1/" target="_blank" rel="noopener noreferrer">{t('encuesta de sysarmy')}</a> {t('llevada entre diciembre de 2019 y febrero de 2020')}.</p>
        <p>{t('Los resultados son a fines recreativos y no deben usarse para decisiones de contratación. El modelo discrimina por género, edad y orientación sexual, por lo que hacerlo es probablemente ilegal. La muestra usada no es representativa, por lo que los resultados no pueden generalizarse a la población en general.')}</p>
        <p>{t('La información se procesa en el browser, así que ningún servidor almacena las evaluaciones que se hagan.')}</p>
        <hr/>
        <h2>{t('Formulario interactivo')}</h2>
        <div>
          <FormControl component="fieldset" required className="form-element">
            <FormLabel component="legend">{t('Me identifico')}</FormLabel>
            <RadioGroup
              aria-label="Me identifico"
              name="Me identifico"
              value={this.state.answers['Me identifico']}
              onChange={this.handleChange}
            >
              <FormControlLabel value="Hombre" control={<Radio />} label={t('Hombre')} />
              <FormControlLabel value="Mujer" control={<Radio />} label={t('Mujer')} />
              <FormControlLabel value="Otros" control={<Radio />} label={t('Otros')} />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Tengo">{t('Edad')}</InputLabel>
            <Select
              value={this.state.answers['Tengo']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Tengo',
                id: 'Tengo',
              }}
            >
              <MenuItem value="1">1 {t('año')}</MenuItem>
              {Array.from(Array(100).keys()).slice(2).map((i) => <MenuItem value={i} key={i}>{i} {t('años')}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="ubicacion">{t('Dónde estás trabajando')}</InputLabel>
            <Select
              value={this.state.answers['ubicacion']}
              onChange={this.handleChange}
              inputProps={{
                name: 'ubicacion',
                id: 'ubicacion',
              }}
            >
              <MenuItem value="Catamarca">Catamarca</MenuItem>
              <MenuItem value="Chaco">Chaco</MenuItem>
              <MenuItem value="Chubut">Chubut</MenuItem>
              <MenuItem value="Ciudad Autónoma de Buenos Aires">{t('Ciudad Autónoma de Buenos Aires')}</MenuItem>
              <MenuItem value="Corrientes">Corrientes</MenuItem>
              <MenuItem value="Córdoba">Córdoba</MenuItem>
              <MenuItem value="Entre Ríos">Entre Ríos</MenuItem>
              <MenuItem value="Formosa">Formosa</MenuItem>
              <MenuItem value="GBA">{t('GBA')}</MenuItem>
              <MenuItem value="Jujuy">Jujuy</MenuItem>
              <MenuItem value="La Pampa">La Pampa</MenuItem>
              <MenuItem value="La Rioja">La Rioja</MenuItem>
              <MenuItem value="Mendoza">Mendoza</MenuItem>
              <MenuItem value="Misiones">Misiones</MenuItem>
              <MenuItem value="Neuquén">Neuquén</MenuItem>
              <MenuItem value="Provincia de Buenos Aires">{t('Provincia de Buenos Aires')}</MenuItem>
              <MenuItem value="Río Negro">Río Negro</MenuItem>
              <MenuItem value="Salta">Salta</MenuItem>
              <MenuItem value="San Juan">San Juan</MenuItem>
              <MenuItem value="San Luis">San Luis</MenuItem>
              <MenuItem value="Santa Cruz">Santa Cruz</MenuItem>
              <MenuItem value="Santa Fe">Santa Fe</MenuItem>
              <MenuItem value="Santiago del Estero">Santiago del Estero</MenuItem>
              <MenuItem value="Tierra del Fuego">Tierra del Fuego</MenuItem>
              <MenuItem value="Tucumán">Tucumán</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="exp">{t('Años de experiencia')}</InputLabel>
            <Select
              value={this.state.answers['exp']}
              onChange={this.handleChange}
              inputProps={{
                name: 'exp',
                id: 'exp',
              }}
            >
              <MenuItem value={0}>{t('Menos de un año')}</MenuItem>
              {Array.from(Array(100).keys()).slice(1).map((i) => <MenuItem value={i} key={i}>{i} {t('años')}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="study">{t('Nivel de estudios alcanzado')}</InputLabel>
            <Select
              value={this.state.answers['study']}
              onChange={this.handleChange}
              inputProps={{
                name: 'study',
                id: 'study',
              }}
            >
              <MenuItem value="Primario">{t('Primario')}</MenuItem>
              <MenuItem value="Secundario">{t('Secundario')}</MenuItem>
              <MenuItem value="Terciario">{t('Terciario')}</MenuItem>
              <MenuItem value="Universitario">{t('Universitario')}</MenuItem>
              <MenuItem value="Posgrado">{t('Posgrado')}</MenuItem>
              <MenuItem value="Doctorado">{t('Doctorado')}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Estado">{t('Estado')}</InputLabel>
            <Select
              value={this.state.answers['Estado']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Estado',
                id: 'Estado',
              }}
            >
              <MenuItem value="En curso">{t('En curso')}</MenuItem>
              <MenuItem value="Incompleto">{t('Incompleto')}</MenuItem>
              <MenuItem value="Completado">{t('Completado')}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Carrera">{t('Carrera')}</InputLabel>
            <Select
              aria-label="Carrera"
              name="Carrera"
              inputProps={{
                  id: "Carrera"
              }}
              value={this.state.answers['Carrera']}
              onChange={this.handleChange}
            >
              {degree.map((x) =>
              <MenuItem
                key={`degree-${x}`}
                value={x}
              >{t(x)}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Universidad">{t('Universidad')}</InputLabel>
            <Select
              aria-label="Universidad"
              name="Universidad"
              inputProps={{
                  id: "Universidad"
              }}
              value={this.state.answers['Universidad']}
              onChange={this.handleChange}
            >
              {universities.map((x) =>
              <MenuItem
                key={`university-${x}`}
                value={x}
              >{t(x)}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element" component="fieldset">
            <FormLabel component="legend">{t('Realizaste cursos de especialización')}</FormLabel>
            <FormGroup style={{'flexDirection': 'column'}}>
              {specialization.map((x) =>
              <FormControlLabel
                key={`specialization-${x}`}
                control={
                  <Checkbox
                    checked={this.state.answers['Realizaste cursos de especialización'].indexOf(x) >= 0}
                    onChange={this.handleChange}
                    name="Realizaste cursos de especialización"
                    value={x}
                  />
                }
                label={t(x)}
              />
              )}
            </FormGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="employees">{t('Cantidad de empleados en tu trabajo actual')}</InputLabel>
            <Select
              value={this.state.answers['employees']}
              onChange={this.handleChange}
              inputProps={{
                name: 'employees',
                id: 'employees',
              }}
            >
              <MenuItem value="1-10">1-10</MenuItem>
              <MenuItem value="11-50">11-50</MenuItem>
              <MenuItem value="51-100">51-100</MenuItem>
              <MenuItem value="101-200">101-200</MenuItem>
              <MenuItem value="201-500">201-500</MenuItem>
              <MenuItem value="501-1000">501-1000</MenuItem>
              <MenuItem value="1001-2000">1001-2000</MenuItem>
              <MenuItem value="2001-5000">2001-5000</MenuItem>
              <MenuItem value="5001-10000">5001-10000</MenuItem>
              <MenuItem value="10001+">10001+</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="activity">{t('Actividad principal')}</InputLabel>
            <Select
              value={this.state.answers['activity']}
              onChange={this.handleChange}
              inputProps={{
                name: 'activity',
                id: 'activity',
              }}
            >
              <MenuItem value="Servicios / Consultoría de Software / Digital">{t('Servicios / Consultoría de Software / Digital')}</MenuItem>
              <MenuItem value="Producto basado en Software">{t('Producto basado en Software')}</MenuItem>
              <MenuItem value="Otras industrias">{t('Otras industrias')}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <TextField
              id="¿Gente a cargo?"
              name="¿Gente a cargo?"
              label={t("¿Cuánta gente a cargo? (si no tenés, poné 0)")}
              value={this.state.answers['¿Gente a cargo?']}
              onChange={this.handleChange}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: 0,
              }}
              margin="normal"
            />
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="opensource-contributor">{t('¿Contribuís a proyectos open source?')}</InputLabel>
            <Select
              aria-label="opensource-contributor"
              name="opensource-contributor"
              inputProps={{
                  id: "opensource-contributor"
              }}
              value={this.state.answers['opensource-contributor']}
              onChange={this.handleChange}
            >
              <MenuItem value="Sí">{t('Sí')}</MenuItem>
              <MenuItem value="No">{t('No')}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="code-as-hobbie">{t('¿Programás como hobbie?')}</InputLabel>
            <Select
              aria-label="code-as-hobbie"
              name="code-as-hobbie"
              inputProps={{
                  id: "code-as-hobbie"
              }}
              value={this.state.answers['code-as-hobbie']}
              onChange={this.handleChange}
            >
              <MenuItem value="Sí">{t('Sí')}</MenuItem>
              <MenuItem value="No">{t('No')}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element" component="fieldset">
            <FormLabel component="legend">{t('¿Tenés guardias?')}</FormLabel>
            <FormGroup style={{'flexDirection': 'column'}}>
              {duty.map((x) =>
              <FormControlLabel
                key={`duty-${x}`}
                control={
                  <Checkbox
                    checked={this.state.answers['duty'].indexOf(x) >= 0}
                    onChange={this.handleChange}
                    name="duty"
                    value={x}
                  />
                }
                label={t(x)}
              />
              )}
            </FormGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="occupation">{t('Trabajo de')}</InputLabel>
            <Select
              value={this.state.answers['occupation']}
              onChange={this.handleChange}
              inputProps={{
                name: 'occupation',
                id: 'occupation',
              }}
            >
              {occupation.map((x) =>
              <MenuItem
                key={`occupation-${x}`}
                value={x}
              >{t(x)}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="os">{t('¿Qué SO usás en tu laptop/PC para trabajar?')}</InputLabel>
            <Select
              aria-label="os"
              name="os"
              inputProps={{
                  id: "os"
              }}
              value={this.state.answers['os']}
              onChange={this.handleChange}
            >
              {os.map((x) =>
              <MenuItem
                key={`os-${x}`}
                value={x}
              >{t(x)}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="os-mobile">{t('¿Y en tu celular?')}</InputLabel>
            <Select
              aria-label="os-mobile"
              name="os-mobile"
              inputProps={{
                  id: "os-mobile"
              }}
              value={this.state.answers['os-mobile']}
              onChange={this.handleChange}
            >
              <MenuItem value="Android">Android</MenuItem>
              <MenuItem value="iOS">iOS</MenuItem>
              <MenuItem value="Windows">Windows</MenuItem>
              <MenuItem value="No tengo celular / no es Smartphone">{t('No tengo celular / no es Smartphone')}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="contract-type">{t('Tipo de Contrato')}</InputLabel>
            <Select
              aria-label="contract-type"
              name="contract-type"
              inputProps={{
                  id: "contract-type"
              }}
              value={this.state.answers['contract-type']}
              onChange={this.handleChange}
            >
              {contractType.map((x) =>
              <MenuItem
                key={`contractType-${x}`}
                value={x}
              >{t(x)}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="sexualOrientation">{t('Orientación sexual')}</InputLabel>
            <Select
              aria-label="sexualOrientation"
              name="sexualOrientation"
              inputProps={{
                  id: "sexualOrientation"
              }}
              value={this.state.answers['sexualOrientation']}
              onChange={this.handleChange}
            >
              {sexualOrientation.map((x) =>
              <MenuItem
                key={`sexualOrientation-${x}`}
                value={x}
              >{t(x)}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element" component="fieldset">
            <FormLabel component="legend">{t('¿A qué eventos de tecnología asististe en el último año?')}</FormLabel>
            <FormGroup style={{'flexDirection': 'column'}}>
              {events.map((x) =>
              <FormControlLabel
                key={`events-${x}`}
                control={
                  <Checkbox
                    checked={this.state.answers['¿A qué eventos de tecnología asististe en el último año?'].indexOf(x) >= 0}
                    onChange={this.handleChange}
                    name="¿A qué eventos de tecnología asististe en el último año?"
                    value={x}
                  />
                }
                label={t(x)}
              />
              )}
            </FormGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element" component="fieldset">
            <FormLabel component="legend">{t('Tecnologías que utilizás')}</FormLabel>
            <FormGroup style={{height: '1900px', 'flexDirection': 'column'}}>
              {Object.keys(tech).map(ts => tech[ts].map((x) =>
              <FormControlLabel
                key={`technology-${ts}-${x}`}
                control={
                  <Checkbox
                    checked={this.state.answers[ts].indexOf(x) >= 0}
                    onChange={this.handleChange}
                    name={ts}
                    value={x}
                  />
                }
                label={t(x)}
              />
              ))}
            </FormGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element" component="fieldset">
            <FormLabel component="legend">{t('Beneficios extra')}</FormLabel>
            <FormGroup style={{height: '620px', 'flexDirection': 'column'}}>
              {benefits.map((x) =>
              <FormControlLabel
                key={`benefits-${x}`}
                control={
                  <Checkbox
                    checked={this.state.answers['Beneficios extra'].indexOf(x) >= 0}
                    onChange={this.handleChange}
                    name="Beneficios extra"
                    value={x}
                  />
                }
                label={t(x)}
              />
              )}
            </FormGroup>
          </FormControl>
        </div>
        <Box
          bgcolor="grey.700"
          color="white"
          p={2}
          position="fixed"
          top={40}
          right={40}
          zIndex="tooltip"
        >
          {salary ? this.formatter.format(salary) : t('Calculando...')}
        </Box>
      </div>
    );
  }
}

export default withNamespaces()(App);
