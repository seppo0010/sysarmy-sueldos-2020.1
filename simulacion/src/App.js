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
      'Tipo de contrato': '',
      'Orientación sexual': '',
      '¿Sufriste o presenciaste situaciones de violencia laboral?': '',
      '¿Tenés algún tipo de discapacidad?': '',
      'Tengo': 18,
      'Dónde estás trabajando': 'Ciudad Autónoma de Buenos Aires',
      'Años de experiencia': 0,
      'Años en la empresa actual': 0,
      'Nivel de estudios alcanzado': '',
      'Estado': '',
      'Cantidad de empleados': '',
      'Actividad principal': '',
      '¿Tenés guardias?': '',
      '¿Gente a cargo?': 0,
      '¿Contribuís a proyectos open source?': '',
      '¿Programás como hobbie?': '',
      'Trabajo de': '',
      '¿Qué SO usás en tu laptop/PC para trabajar?': '',
      '¿Y en tu celular?': '',
      'Realizaste cursos de especialización': '',
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

  constructor() {
    super();
    this.model = new Model();
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
    const salary = await this.model.predict(Object.fromEntries(Object.entries(this.state.answers).map(([k, v]) =>
        'Dónde estás trabajando' === k ? ['provincia=' + regions_map[v], 1] :
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
    const features = await this.model.features()
    const prefixOptions = (prefix) => features.filter((f) => f.startsWith(prefix + '=')).map((f) => f.substr(prefix.length + 1))
    this.setState({options: {
      degree: prefixOptions('Carrera').sort().concat(['Otra']),
      universities: prefixOptions('Universidad').sort().concat(['Otra']),
      specialization: prefixOptions('Realizaste cursos de especialización'),
      occupation: prefixOptions('Trabajo de').sort().concat(['Otra']),
      duty: prefixOptions('¿Tenés guardias?').sort().concat(['Otra']),
      contractType: prefixOptions('Tipo de contrato').sort().concat(['Otro']),
      sexualOrientation: prefixOptions('Orientación sexual').sort().concat(['Otra']),
      os: prefixOptions('¿Qué SO usás en tu laptop/PC para trabajar?').sort().concat(['Otra']),
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

  render() {
    const {salary} = this.state;
    const {os, sexualOrientation, contractType, duty, occupation, specialization, benefits, events, tech, degree, universities} = this.state.options;

    return (
      <div className="App">
        {salary && <Box
          bgcolor="grey.700"
          color="white"
          p={2}
          position="fixed"
          top={40}
          right={40}
          zIndex="tooltip"
        >
          {this.formatter.format(salary)}
        </Box>}
        <p>Complet&aacute; el formulario siguiente y obten&eacute; una estimaci&oacute;n del sueldo bruto que podr&iacute;as estar ganando.</p>
        <p>El sueldo se estima de acuerdo a un modelo armado de datos recolectados en la encuesta an&oacute;nima.</p>
        <p>Si te interesa saber c&oacute;mo est&aacute;n armados, pod&eacute;s leer el paso a paso <a href="https://github.com/seppo0010/sysarmy-sueldos-2020.1/blob/master/text/prediccion-de-sueldo/README.md" target="_blank" rel="noopener noreferrer">aqu&iacute;</a>.</p>
        <p>Los modelos se armaron con datos recolectados en la <a href="https://sysarmy.com/blog/posts/resultados-de-la-encuesta-de-sueldos-2020-1/" target="_blank" rel="noopener noreferrer">encuesta de sysarmy</a> llevada entre diciembre de 2019 y febrero de 2020.</p>
        <p>Los resultados son a fines recreativos y no deben usarse para decisiones de contratación. El modelo discrimina por género, edad y orientación sexual, por lo que hacerlo es probablemente ilegal. La muestra usada no es representativa, por lo que los resultados no pueden generalizarse a la población en general.</p>
        <p>La información se procesa en el browser, así que ningún servidor almacena las evaluaciones que se hagan.</p>
        <hr/>
        <div>
          <FormControl component="fieldset" required className="form-element">
            <FormLabel component="legend">Me identifico</FormLabel>
            <RadioGroup
              aria-label="Me identifico"
              name="Me identifico"
              value={this.state.answers['Me identifico']}
              onChange={this.handleChange}
            >
              <FormControlLabel value="Hombre" control={<Radio />} label="Hombre" />
              <FormControlLabel value="Mujer" control={<Radio />} label="Mujer" />
              <FormControlLabel value="Otros" control={<Radio />} label="Otros" />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Tengo">Tengo</InputLabel>
            <Select
              value={this.state.answers['Tengo']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Tengo',
                id: 'Tengo',
              }}
            >
              <MenuItem value="1">1 año</MenuItem>
              {Array.from(Array(100).keys()).slice(2).map((i) => <MenuItem value={i} key={i}>{i} años</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Dónde estás trabajando">Dónde estás trabajando</InputLabel>
            <Select
              value={this.state.answers['Dónde estás trabajando']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Dónde estás trabajando',
                id: 'Dónde estás trabajando',
              }}
            >
              <MenuItem value="Catamarca">Catamarca</MenuItem>
              <MenuItem value="Chaco">Chaco</MenuItem>
              <MenuItem value="Chubut">Chubut</MenuItem>
              <MenuItem value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</MenuItem>
              <MenuItem value="Corrientes">Corrientes</MenuItem>
              <MenuItem value="Córdoba">Córdoba</MenuItem>
              <MenuItem value="Entre Ríos">Entre Ríos</MenuItem>
              <MenuItem value="Formosa">Formosa</MenuItem>
              <MenuItem value="GBA">GBA</MenuItem>
              <MenuItem value="Jujuy">Jujuy</MenuItem>
              <MenuItem value="La Pampa">La Pampa</MenuItem>
              <MenuItem value="La Rioja">La Rioja</MenuItem>
              <MenuItem value="Mendoza">Mendoza</MenuItem>
              <MenuItem value="Misiones">Misiones</MenuItem>
              <MenuItem value="Neuquén">Neuquén</MenuItem>
              <MenuItem value="Provincia de Buenos Aires">Provincia de Buenos Aires</MenuItem>
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
            <InputLabel htmlFor="Años de experiencia">Años de experiencia</InputLabel>
            <Select
              value={this.state.answers['Años de experiencia']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Años de experiencia',
                id: 'Años de experiencia',
              }}
            >
              <MenuItem value={0}>Menos de un año</MenuItem>
              {Array.from(Array(100).keys()).slice(1).map((i) => <MenuItem value={i} key={i}>{i} años</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Años en la empresa actual">Años en la empresa actual</InputLabel>
            <Select
              value={this.state.answers['Años en la empresa actual']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Años en la empresa actual',
                id: 'Años en la empresa actual',
              }}
            >
              <MenuItem value={0}>Menos de un año</MenuItem>
              {Array.from(Array(100).keys()).slice(1).map((i) => <MenuItem value={i} key={i}>{i} años</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Nivel de estudios alcanzado">Nivel de estudios alcanzado</InputLabel>
            <Select
              value={this.state.answers['Nivel de estudios alcanzado']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Nivel de estudios alcanzado',
                id: 'Nivel de estudios alcanzado',
              }}
            >
              <MenuItem value="Primario">Primario</MenuItem>
              <MenuItem value="Secundario">Secundario</MenuItem>
              <MenuItem value="Terciario">Terciario</MenuItem>
              <MenuItem value="Universitario">Universitario</MenuItem>
              <MenuItem value="Posgrado">Posgrado</MenuItem>
              <MenuItem value="Doctorado">Doctorado</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Estado">Estado</InputLabel>
            <Select
              value={this.state.answers['Estado']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Estado',
                id: 'Estado',
              }}
            >
              <MenuItem value="En curso">En curso</MenuItem>
              <MenuItem value="Incompleto">Incompleto</MenuItem>
              <MenuItem value="Completado">Completado</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Carrera">Carrera</InputLabel>
            <Select
              aria-label="Carrera"
              name="Carrera"
              value={this.state.answers['Carrera']}
              onChange={this.handleChange}
            >
              {degree.map((t) =>
              <MenuItem
                key={`degree-${t}`}
                value={t}
              >{t}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Universidad">Universidad</InputLabel>
            <Select
              aria-label="Universidad"
              name="Universidad"
              value={this.state.answers['Universidad']}
              onChange={this.handleChange}
            >
              {universities.map((t) =>
              <MenuItem
                key={`university-${t}`}
                value={t}
              >{t}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Realizaste cursos de especialización">Realizaste cursos de especialización</InputLabel>
            <Select
              aria-label="Realizaste cursos de especialización"
              name="Realizaste cursos de especialización"
              value={this.state.answers['Realizaste cursos de especialización']}
              onChange={this.handleChange}
            >
              {specialization.map((t) =>
              <MenuItem
                key={`specialization-${t}`}
                value={t}
              >{t}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Cantidad de empleados">Cantidad de empleados en tu trabajo actual</InputLabel>
            <Select
              value={this.state.answers['Cantidad de empleados']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Cantidad de empleados',
                id: 'Cantidad de empleados',
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
            <InputLabel htmlFor="Actividad principal">Actividad principal</InputLabel>
            <Select
              value={this.state.answers['Actividad principal']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Actividad principal',
                id: 'Actividad principal',
              }}
            >
              <MenuItem value="Servicios / Consultoría de Software / Digital">Servicios / Consultoría de Software / Digital</MenuItem>
              <MenuItem value="Producto basado en Software">Producto basado en Software</MenuItem>
              <MenuItem value="Otras industrias">Otras industrias</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <TextField
              id="¿Gente a cargo?"
              name="¿Gente a cargo?"
              label="¿Cuánta gente a cargo? (si no tenés, poné 0)"
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
            <InputLabel htmlFor="¿Contribuís a proyectos open source?">¿Contribuís a proyectos open source?</InputLabel>
            <Select
              aria-label="¿Contribuís a proyectos open source?"
              name="¿Contribuís a proyectos open source?"
              value={this.state.answers['¿Contribuís a proyectos open source?']}
              onChange={this.handleChange}
            >
              <MenuItem value="Sí">Sí</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="¿Programás como hobbie?">¿Programás como hobbie?</InputLabel>
            <Select
              aria-label="¿Programás como hobbie?"
              name="¿Programás como hobbie?"
              value={this.state.answers['¿Programás como hobbie?']}
              onChange={this.handleChange}
            >
              <MenuItem value="Sí">Sí</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="¿Tenés guardias?">¿Tenés guardias?</InputLabel>
            <Select
              aria-label="¿Tenés guardias?"
              name="¿Tenés guardias?"
              value={this.state.answers['¿Tenés guardias?']}
              onChange={this.handleChange}
            >
              {duty.map((t) =>
              <MenuItem
                key={`duty-${t}`}
                value={t}
              >{t}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Trabajo de">Trabajo de</InputLabel>
            <Select
              value={this.state.answers['Trabajo de']}
              onChange={this.handleChange}
              inputProps={{
                name: 'Trabajo de',
                id: 'Trabajo de',
              }}
            >
              {occupation.map((t) =>
              <MenuItem
                key={`occupation-${t}`}
                value={t}
              >{t}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="¿Qué SO usás en tu laptop/PC para trabajar?">¿Qué SO usás en tu laptop/PC para trabajar?</InputLabel>
            <Select
              aria-label="¿Qué SO usás en tu laptop/PC para trabajar?"
              name="¿Qué SO usás en tu laptop/PC para trabajar?"
              value={this.state.answers['¿Qué SO usás en tu laptop/PC para trabajar?']}
              onChange={this.handleChange}
            >
              {os.map((t) =>
              <MenuItem
                key={`os-${t}`}
                value={t}
              >{t}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="¿Y en tu celular?">¿Y en tu celular?</InputLabel>
            <Select
              aria-label="¿Y en tu celular?"
              name="¿Y en tu celular?"
              value={this.state.answers['¿Y en tu celular?']}
              onChange={this.handleChange}
            >
              <MenuItem value="Android">Android</MenuItem>
              <MenuItem value="iOS">iOS</MenuItem>
              <MenuItem value="Windows">Windows</MenuItem>
              <MenuItem value="No tengo celular / no es Smartphone">No tengo celular / no es Smartphone</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Tipo de contrato">Tipo de contrato</InputLabel>
            <Select
              aria-label="Tipo de contrato"
              name="Tipo de contrato"
              value={this.state.answers['Tipo de contrato']}
              onChange={this.handleChange}
            >
              {contractType.map((t) =>
              <MenuItem
                key={`contractType-${t}`}
                value={t}
              >{t}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <InputLabel htmlFor="Orientación sexual">Orientación sexual</InputLabel>
            <Select
              aria-label="Orientación sexual"
              name="Orientación sexual"
              value={this.state.answers['Orientación sexual']}
              onChange={this.handleChange}
            >
              {sexualOrientation.map((t) =>
              <MenuItem
                key={`sexualOrientation-${t}`}
                value={t}
              >{t}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">¿A qué eventos de tecnología asististe en el último año?</FormLabel>
            <FormGroup style={{'flexDirection': 'column'}}>
              {events.map((t) =>
              <FormControlLabel
                key={`events-${t}`}
                control={
                  <Checkbox
                    checked={this.state.answers['¿A qué eventos de tecnología asististe en el último año?'].indexOf(t) >= 0}
                    onChange={this.handleChange}
                    name="¿A qué eventos de tecnología asististe en el último año?"
                    value={t}
                  />
                }
                label={t}
              />
              )}
            </FormGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">Tecnologías que utilizás</FormLabel>
            <FormGroup style={{height: '820px', 'flexDirection': 'column'}}>
              {Object.keys(tech).map(ts => tech[ts].map((t) =>
              <FormControlLabel
                key={`technology-${ts}-${t}`}
                control={
                  <Checkbox
                    checked={this.state.answers[ts].indexOf(t) >= 0}
                    onChange={this.handleChange}
                    name={ts}
                    value={t}
                  />
                }
                label={t}
              />
              ))}
            </FormGroup>
          </FormControl>
        </div>
        <div>
          <FormControl className="form-element">
            <FormLabel component="legend">Beneficios extra</FormLabel>
            <FormGroup style={{height: '620px', 'flexDirection': 'column'}}>
              {benefits.map((t) =>
              <FormControlLabel
                key={`benefits-${t}`}
                control={
                  <Checkbox
                    checked={this.state.answers['Beneficios extra'].indexOf(t) >= 0}
                    onChange={this.handleChange}
                    name="Beneficios extra"
                    value={t}
                  />
                }
                label={t}
              />
              )}
            </FormGroup>
          </FormControl>
        </div>
      </div>
    );
  }
}

export default App;
