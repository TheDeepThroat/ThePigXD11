import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

export default function App() {
  const [pantalla, setPantalla] = useState('bienvenido');

  // ==========================================
  // PROMEDIO
  // ==========================================
  const [materia, setMateria] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [materias, setMaterias] = useState([]);

  const agregarMateria = () => {
    if (materia.trim() === '' || calificacion.trim() === '') {
      Alert.alert(
        'Faltan datos',
        'Escribe la materia y su calificación.'
      );
      return;
    }

    const nota = parseFloat(calificacion);

    if (isNaN(nota) || nota < 0 || nota > 10) {
      Alert.alert(
        'Calificación inválida',
        'La calificación debe estar entre 0 y 10.'
      );
      return;
    }

    setMaterias([
      ...materias,
      {
        id: Date.now().toString(),
        nombre: materia,
        calificacion: nota,
      },
    ]);

    setMateria('');
    setCalificacion('');
  };

  const eliminarMateria = (id) => {
    setMaterias(
      materias.filter((item) => item.id !== id)
    );
  };

  const calcularPromedio = () => {
    if (materias.length === 0) {
      return '0.00';
    }

    const suma = materias.reduce(
      (total, item) => total + item.calificacion,
      0
    );

    return (suma / materias.length).toFixed(2);
  };

  // ==========================================
  // ¿CUÁNTO NECESITO?
  // ==========================================
  const [notaActual, setNotaActual] = useState('');
  const [porcentajeCursado, setPorcentajeCursado] = useState('');
  const [notaDeseada, setNotaDeseada] = useState('');
  const [notaNecesaria, setNotaNecesaria] = useState(null);

  const calcularNecesaria = () => {
    const actual = parseFloat(notaActual);
    const porcentaje = parseFloat(porcentajeCursado);
    const deseada = parseFloat(notaDeseada);

    if (
      isNaN(actual) ||
      isNaN(porcentaje) ||
      isNaN(deseada)
    ) {
      Alert.alert(
        'Faltan datos',
        'Completa todos los campos.'
      );
      return;
    }

    if (
      actual < 0 ||
      actual > 10 ||
      deseada < 0 ||
      deseada > 10
    ) {
      Alert.alert(
        'Datos inválidos',
        'Las calificaciones deben estar entre 0 y 10.'
      );
      return;
    }

    if (porcentaje < 0 || porcentaje >= 100) {
      Alert.alert(
        'Porcentaje inválido',
        'El porcentaje cursado debe ser menor a 100.'
      );
      return;
    }

    const cursado = porcentaje / 100;
    const restante = 1 - cursado;

    const necesaria =
      (deseada - actual * cursado) / restante;

    setNotaNecesaria(necesaria);
  };

  // ==========================================
  // NOTA FINAL
  // ==========================================
  const [nombreActividad, setNombreActividad] = useState('');
  const [notaActividad, setNotaActividad] = useState('');
  const [porcentajeActividad, setPorcentajeActividad] =
    useState('');
  const [actividades, setActividades] = useState([]);

  const agregarActividad = () => {
    if (
      nombreActividad.trim() === '' ||
      notaActividad.trim() === '' ||
      porcentajeActividad.trim() === ''
    ) {
      Alert.alert(
        'Faltan datos',
        'Completa todos los campos.'
      );
      return;
    }

    const nota = parseFloat(notaActividad);
    const porcentaje = parseFloat(porcentajeActividad);

    if (isNaN(nota) || nota < 0 || nota > 10) {
      Alert.alert(
        'Calificación inválida',
        'La calificación debe estar entre 0 y 10.'
      );
      return;
    }

    if (
      isNaN(porcentaje) ||
      porcentaje <= 0 ||
      porcentaje > 100
    ) {
      Alert.alert(
        'Porcentaje inválido',
        'El porcentaje debe estar entre 1 y 100.'
      );
      return;
    }

    const totalActual = actividades.reduce(
      (total, item) => total + item.porcentaje,
      0
    );

    if (totalActual + porcentaje > 100) {
      Alert.alert(
        'Porcentaje excedido',
        'La suma de los porcentajes no puede superar el 100%.'
      );
      return;
    }

    setActividades([
      ...actividades,
      {
        id: Date.now().toString(),
        nombre: nombreActividad,
        nota: nota,
        porcentaje: porcentaje,
      },
    ]);

    setNombreActividad('');
    setNotaActividad('');
    setPorcentajeActividad('');
  };

  const eliminarActividad = (id) => {
    setActividades(
      actividades.filter((item) => item.id !== id)
    );
  };

  const porcentajeTotal = actividades.reduce(
    (total, item) => total + item.porcentaje,
    0
  );

  const calcularNotaFinal = () => {
    const total = actividades.reduce(
      (suma, item) =>
        suma + item.nota * (item.porcentaje / 100),
      0
    );

    return total.toFixed(2);
  };

  // ==========================================
  // TIEMPO DE ESTUDIO
  // ==========================================
  const [materiaEstudio, setMateriaEstudio] = useState('');
  const [prioridad, setPrioridad] = useState('Media');
  const [materiasEstudio, setMateriasEstudio] = useState([]);
  const [horasDisponibles, setHorasDisponibles] = useState('');
  const [planEstudio, setPlanEstudio] = useState([]);

  const agregarMateriaEstudio = () => {
    if (materiaEstudio.trim() === '') {
      Alert.alert(
        'Falta la materia',
        'Escribe el nombre de la materia.'
      );
      return;
    }

    setMateriasEstudio([
      ...materiasEstudio,
      {
        id: Date.now().toString(),
        nombre: materiaEstudio,
        prioridad: prioridad,
      },
    ]);

    setMateriaEstudio('');
    setPrioridad('Media');
    setPlanEstudio([]);
  };

  const eliminarMateriaEstudio = (id) => {
    setMateriasEstudio(
      materiasEstudio.filter((item) => item.id !== id)
    );

    setPlanEstudio([]);
  };

  const calcularPlanEstudio = () => {
    const horas = parseFloat(horasDisponibles);

    if (isNaN(horas) || horas <= 0) {
      Alert.alert(
        'Horas inválidas',
        'Escribe una cantidad válida de horas disponibles.'
      );
      return;
    }

    if (materiasEstudio.length === 0) {
      Alert.alert(
        'Sin materias',
        'Agrega al menos una materia.'
      );
      return;
    }

    const pesos = {
      Alta: 3,
      Media: 2,
      Baja: 1,
    };

    const pesoTotal = materiasEstudio.reduce(
      (total, item) => total + pesos[item.prioridad],
      0
    );

    const nuevoPlan = materiasEstudio.map((item) => {
      const tiempo =
        (horas * pesos[item.prioridad]) / pesoTotal;

      return {
        ...item,
        horas: tiempo,
      };
    });

    setPlanEstudio(nuevoPlan);
  };

  // ==========================================
  // PANTALLA BIENVENIDO
  // ==========================================
  if (pantalla === 'bienvenido') {
    return (
      <SafeAreaView style={styles.bienvenidoContainer}>
        <StatusBar barStyle="light-content" />

        <View style={styles.bienvenidoContenido}>

          <View style={styles.logoBienvenido}>
            <Text style={styles.emojiBienvenido}>
              🎓
            </Text>
          </View>

          <Text style={styles.bienvenidoTexto}>
            Bienvenido
          </Text>

          <Text style={styles.tituloBienvenido}>
            StudentCalc
          </Text>

          <Text style={styles.subtituloBienvenido}>
            Tu asistente académico
          </Text>

          <Text style={styles.descripcionBienvenido}>
            Calcula tus calificaciones, organiza tu tiempo
            de estudio y alcanza tus metas académicas.
          </Text>

          <TouchableOpacity
            style={styles.botonComenzar}
            onPress={() => setPantalla('inicio')}
          >
            <Text style={styles.textoBotonComenzar}>
              Comenzar →
            </Text>
          </TouchableOpacity>

          <Text style={styles.version}>
            StudentCalc • 2026
          </Text>

        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // PANTALLA PROMEDIO
  // ==========================================
  if (pantalla === 'promedio') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <ScrollView>
          <View style={styles.headerCalculadora}>

            <TouchableOpacity
              style={styles.botonVolver}
              onPress={() => setPantalla('inicio')}
            >
              <Text style={styles.textoVolver}>
                ← Volver
              </Text>
            </TouchableOpacity>

            <Text style={styles.iconoCalculadora}>
              📊
            </Text>

            <Text style={styles.tituloCalculadora}>
              Promedio
            </Text>

            <Text style={styles.subtituloCalculadora}>
              Calcula tu promedio general
            </Text>

          </View>

          <View style={styles.formulario}>

            <Text style={styles.label}>
              Nombre de la materia
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej. Programación"
              value={materia}
              onChangeText={setMateria}
            />

            <Text style={styles.label}>
              Calificación
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej. 9.5"
              keyboardType="decimal-pad"
              value={calificacion}
              onChangeText={setCalificacion}
            />

            <TouchableOpacity
              style={styles.botonAgregar}
              onPress={agregarMateria}
            >
              <Text style={styles.textoBotonAgregar}>
                + Agregar materia
              </Text>
            </TouchableOpacity>

            {materias.map((item) => (
              <View
                key={item.id}
                style={styles.materia}
              >
                <View style={styles.infoMateria}>
                  <Text style={styles.nombreMateria}>
                    {item.nombre}
                  </Text>

                  <Text style={styles.notaMateria}>
                    Calificación: {item.calificacion}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    eliminarMateria(item.id)
                  }
                >
                  <Text style={styles.eliminar}>
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.resultado}>
              <Text style={styles.textoResultado}>
                Tu promedio
              </Text>

              <Text style={styles.numeroResultado}>
                {calcularPromedio()}
              </Text>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // PANTALLA ¿CUÁNTO NECESITO?
  // ==========================================
  if (pantalla === 'necesito') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <ScrollView>
          <View style={styles.headerCalculadora}>

            <TouchableOpacity
              style={styles.botonVolver}
              onPress={() => setPantalla('inicio')}
            >
              <Text style={styles.textoVolver}>
                ← Volver
              </Text>
            </TouchableOpacity>

            <Text style={styles.iconoCalculadora}>
              🎯
            </Text>

            <Text style={styles.tituloCalculadora}>
              ¿Cuánto necesito?
            </Text>

            <Text style={styles.subtituloCalculadora}>
              Descubre cuánto necesitas para alcanzar tu meta
            </Text>
          </View>

          <View style={styles.formulario}>

            <Text style={styles.label}>
              Calificación actual
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej. 7.5"
              keyboardType="decimal-pad"
              value={notaActual}
              onChangeText={setNotaActual}
            />

            <Text style={styles.ayuda}>
              Escribe el promedio que tienes actualmente.
            </Text>

            <Text style={styles.label}>
              Porcentaje cursado
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej. 60"
              keyboardType="decimal-pad"
              value={porcentajeCursado}
              onChangeText={setPorcentajeCursado}
            />

            <Text style={styles.ayuda}>
              Por ejemplo, escribe 60 si has completado el 60%.
            </Text>

            <Text style={styles.label}>
              Calificación final deseada
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej. 8"
              keyboardType="decimal-pad"
              value={notaDeseada}
              onChangeText={setNotaDeseada}
            />

            <TouchableOpacity
              style={styles.botonAgregar}
              onPress={calcularNecesaria}
            >
              <Text style={styles.textoBotonAgregar}>
                🎯 Calcular
              </Text>
            </TouchableOpacity>

            {notaNecesaria !== null && (
              <View style={styles.resultado}>

                <Text style={styles.textoResultado}>
                  Necesitas obtener
                </Text>

                <Text style={styles.numeroResultado}>
                  {notaNecesaria.toFixed(2)}
                </Text>

                {notaNecesaria <= 10 &&
                notaNecesaria >= 0 ? (
                  <Text style={styles.textoResultado}>
                    🎯 en el porcentaje restante
                  </Text>
                ) : notaNecesaria > 10 ? (
                  <Text style={styles.textoAdvertencia}>
                    Esa meta ya no es posible con una escala de 0 a 10.
                  </Text>
                ) : (
                  <Text style={styles.textoExito}>
                    ✓ Ya alcanzaste esa meta.
                  </Text>
                )}

              </View>
            )}

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // PANTALLA NOTA FINAL
  // ==========================================
  if (pantalla === 'final') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <ScrollView>
          <View style={styles.headerCalculadora}>

            <TouchableOpacity
              style={styles.botonVolver}
              onPress={() => setPantalla('inicio')}
            >
              <Text style={styles.textoVolver}>
                ← Volver
              </Text>
            </TouchableOpacity>

            <Text style={styles.iconoCalculadora}>
              📝
            </Text>

            <Text style={styles.tituloCalculadora}>
              Nota final
            </Text>

            <Text style={styles.subtituloCalculadora}>
              Calcula tu calificación final ponderada
            </Text>

          </View>

          <View style={styles.formulario}>

            <Text style={styles.label}>
              Nombre de la actividad
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej. Examen Final"
              value={nombreActividad}
              onChangeText={setNombreActividad}
            />

            <Text style={styles.label}>
              Calificación
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej. 9"
              keyboardType="decimal-pad"
              value={notaActividad}
              onChangeText={setNotaActividad}
            />

            <Text style={styles.label}>
              Porcentaje de la actividad
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej. 30"
              keyboardType="decimal-pad"
              value={porcentajeActividad}
              onChangeText={setPorcentajeActividad}
            />

            <Text style={styles.ayuda}>
              Escribe 30 si la actividad vale el 30% de la materia.
            </Text>

            <TouchableOpacity
              style={styles.botonAgregar}
              onPress={agregarActividad}
            >
              <Text style={styles.textoBotonAgregar}>
                + Agregar actividad
              </Text>
            </TouchableOpacity>

            {actividades.map((item) => (
              <View
                key={item.id}
                style={styles.materia}
              >
                <View style={styles.infoMateria}>

                  <Text style={styles.nombreMateria}>
                    {item.nombre}
                  </Text>

                  <Text style={styles.notaMateria}>
                    Calificación: {item.nota} • Valor: {item.porcentaje}%
                  </Text>

                </View>

                <TouchableOpacity
                  onPress={() =>
                    eliminarActividad(item.id)
                  }
                >
                  <Text style={styles.eliminar}>
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.porcentajeBox}>

              <Text style={styles.porcentajeTexto}>
                Porcentaje agregado
              </Text>

              <Text
                style={[
                  styles.porcentajeNumero,
                  porcentajeTotal === 100 &&
                    styles.porcentajeCompleto,
                ]}
              >
                {porcentajeTotal}%
              </Text>

            </View>

            <View style={styles.resultado}>

              <Text style={styles.textoResultado}>
                Tu nota final
              </Text>

              <Text style={styles.numeroResultado}>
                {calcularNotaFinal()}
              </Text>

              {porcentajeTotal === 100 ? (
                <Text style={styles.textoExito}>
                  ✓ Cálculo completo
                </Text>
              ) : (
                <Text style={styles.textoAdvertencia}>
                  Falta agregar {100 - porcentajeTotal}%.
                </Text>
              )}

            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // PANTALLA TIEMPO DE ESTUDIO
  // ==========================================
  if (pantalla === 'estudio') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <ScrollView>
          <View style={styles.headerCalculadora}>

            <TouchableOpacity
              style={styles.botonVolver}
              onPress={() => setPantalla('inicio')}
            >
              <Text style={styles.textoVolver}>
                ← Volver
              </Text>
            </TouchableOpacity>

            <Text style={styles.iconoCalculadora}>
              ⏱️
            </Text>

            <Text style={styles.tituloCalculadora}>
              Tiempo de estudio
            </Text>

            <Text style={styles.subtituloCalculadora}>
              Organiza tus horas según tus prioridades
            </Text>

          </View>

          <View style={styles.formulario}>

            <Text style={styles.label}>
              Nombre de la materia
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej. Programación"
              value={materiaEstudio}
              onChangeText={setMateriaEstudio}
            />

            <Text style={styles.label}>
              Prioridad de estudio
            </Text>

            <View style={styles.prioridades}>

              {['Alta', 'Media', 'Baja'].map(
                (nivel) => (
                  <TouchableOpacity
                    key={nivel}
                    style={[
                      styles.botonPrioridad,
                      prioridad === nivel &&
                        styles.botonPrioridadActivo,
                    ]}
                    onPress={() =>
                      setPrioridad(nivel)
                    }
                  >
                    <Text
                      style={[
                        styles.textoPrioridad,
                        prioridad === nivel &&
                          styles.textoPrioridadActivo,
                      ]}
                    >
                      {nivel}
                    </Text>
                  </TouchableOpacity>
                )
              )}

            </View>

            <TouchableOpacity
              style={styles.botonAgregar}
              onPress={agregarMateriaEstudio}
            >
              <Text style={styles.textoBotonAgregar}>
                + Agregar materia
              </Text>
            </TouchableOpacity>

            {materiasEstudio.map((item) => (
              <View
                key={item.id}
                style={styles.materia}
              >

                <View style={styles.infoMateria}>
                  <Text style={styles.nombreMateria}>
                    {item.nombre}
                  </Text>

                  <Text style={styles.notaMateria}>
                    Prioridad: {item.prioridad}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    eliminarMateriaEstudio(item.id)
                  }
                >
                  <Text style={styles.eliminar}>
                    ✕
                  </Text>
                </TouchableOpacity>

              </View>
            ))}

            <Text style={styles.label}>
              Horas disponibles para estudiar
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej. 6"
              keyboardType="decimal-pad"
              value={horasDisponibles}
              onChangeText={setHorasDisponibles}
            />

            <Text style={styles.ayuda}>
              StudentCalc repartirá estas horas entre tus materias.
            </Text>

            <TouchableOpacity
              style={styles.botonAgregar}
              onPress={calcularPlanEstudio}
            >
              <Text style={styles.textoBotonAgregar}>
                ⏱️ Crear plan de estudio
              </Text>
            </TouchableOpacity>

            {planEstudio.length > 0 && (
              <View style={styles.planContainer}>

                <Text style={styles.tituloPlan}>
                  📚 Tu plan de estudio
                </Text>

                <Text style={styles.subtituloPlan}>
                  Distribución recomendada
                </Text>

                {planEstudio.map((item) => (
                  <View
                    key={item.id}
                    style={styles.planMateria}
                  >

                    <View style={styles.infoMateria}>
                      <Text style={styles.nombreMateria}>
                        {item.nombre}
                      </Text>

                      <Text style={styles.notaMateria}>
                        Prioridad {item.prioridad}
                      </Text>
                    </View>

                    <View style={styles.horasBox}>
                      <Text style={styles.horasNumero}>
                        {item.horas.toFixed(1)}
                      </Text>

                      <Text style={styles.horasTexto}>
                        horas
                      </Text>
                    </View>

                  </View>
                ))}

                <Text style={styles.totalHoras}>
                  ⏱️ Total:{' '}
                  {parseFloat(horasDisponibles).toFixed(1)} horas
                </Text>

              </View>
            )}

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // MENÚ PRINCIPAL
  // ==========================================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>

        <Text style={styles.logo}>
          🎓
        </Text>

        <Text style={styles.titulo}>
          StudentCalc
        </Text>

        <Text style={styles.subtitulo}>
          Tu asistente académico
        </Text>

      </View>

      <View style={styles.contenido}>

        <Text style={styles.saludo}>
          Hola 👋
        </Text>

        <Text style={styles.pregunta}>
          ¿Qué necesitas calcular?
        </Text>

        <View style={styles.grid}>

          <TouchableOpacity
            style={styles.tarjeta}
            onPress={() =>
              setPantalla('promedio')
            }
          >
            <Text style={styles.icono}>
              📊
            </Text>

            <Text style={styles.nombreTarjeta}>
              Promedio
            </Text>

            <Text style={styles.descripcion}>
              Calcula tu promedio general
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tarjeta}
            onPress={() =>
              setPantalla('necesito')
            }
          >
            <Text style={styles.icono}>
              🎯
            </Text>

            <Text style={styles.nombreTarjeta}>
              ¿Cuánto necesito?
            </Text>

            <Text style={styles.descripcion}>
              Descubre cuánto necesitas para aprobar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tarjeta}
            onPress={() =>
              setPantalla('final')
            }
          >
            <Text style={styles.icono}>
              📝
            </Text>

            <Text style={styles.nombreTarjeta}>
              Nota final
            </Text>

            <Text style={styles.descripcion}>
              Calcula tu calificación final
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tarjeta}
            onPress={() =>
              setPantalla('estudio')
            }
          >
            <Text style={styles.icono}>
              ⏱️
            </Text>

            <Text style={styles.nombreTarjeta}>
              Tiempo de estudio
            </Text>

            <Text style={styles.descripcion}>
              Organiza tus horas de estudio
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTexto}>
          StudentCalc • Herramientas para estudiantes
        </Text>
      </View>

    </SafeAreaView>
  );
}

// ==========================================
// ESTILOS
// ==========================================

const styles = StyleSheet.create({

  // PANTALLA BIENVENIDO

  bienvenidoContainer: {
    flex: 1,
    backgroundColor: '#3157D5',
  },

  bienvenidoContenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },

  logoBienvenido: {
    width: 115,
    height: 115,
    backgroundColor: 'white',
    borderRadius: 58,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  emojiBienvenido: {
    fontSize: 60,
  },

  bienvenidoTexto: {
    fontSize: 22,
    color: '#DDE5FF',
    fontWeight: '600',
    marginBottom: 4,
  },

  tituloBienvenido: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  subtituloBienvenido: {
    fontSize: 19,
    color: '#DDE5FF',
    marginTop: 7,
    textAlign: 'center',
  },

  descripcionBienvenido: {
    fontSize: 15,
    color: '#E8ECFF',
    textAlign: 'center',
    lineHeight: 23,
    marginTop: 25,
    marginBottom: 35,
  },

  botonComenzar: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 17,
    borderRadius: 15,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },

  textoBotonComenzar: {
    color: '#3157D5',
    fontSize: 18,
    fontWeight: 'bold',
  },

  version: {
    color: '#BFCBFF',
    fontSize: 12,
    marginTop: 25,
  },

  // GENERAL

  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },

  header: {
    backgroundColor: '#3157D5',
    paddingTop: 35,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  logo: {
    fontSize: 45,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },

  subtitulo: {
    fontSize: 15,
    color: '#DDE5FF',
    marginTop: 4,
  },

  contenido: {
    flex: 1,
    padding: 22,
  },

  saludo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#202A44',
    marginTop: 10,
  },

  pregunta: {
    fontSize: 16,
    color: '#6D7588',
    marginTop: 5,
    marginBottom: 22,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  tarjeta: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 17,
    marginBottom: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },

  icono: {
    fontSize: 32,
    marginBottom: 10,
  },

  nombreTarjeta: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202A44',
  },

  descripcion: {
    fontSize: 12,
    color: '#7B8190',
    marginTop: 6,
    lineHeight: 17,
  },

  footer: {
    alignItems: 'center',
    paddingBottom: 18,
  },

  footerTexto: {
    fontSize: 11,
    color: '#969DAD',
  },

  // ENCABEZADOS

  headerCalculadora: {
    backgroundColor: '#3157D5',
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  botonVolver: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  textoVolver: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  iconoCalculadora: {
    fontSize: 38,
    textAlign: 'center',
  },

  tituloCalculadora: {
    color: 'white',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },

  subtituloCalculadora: {
    color: '#DDE5FF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },

  // FORMULARIOS

  formulario: {
    padding: 22,
    paddingBottom: 50,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#202A44',
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E4EC',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },

  ayuda: {
    color: '#969FB2',
    fontSize: 12,
    marginTop: 6,
    marginBottom: 5,
  },

  botonAgregar: {
    backgroundColor: '#3157D5',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 15,
  },

  textoBotonAgregar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // MATERIAS / ACTIVIDADES

  materia: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoMateria: {
    flex: 1,
    paddingRight: 10,
  },

  nombreMateria: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202A44',
  },

  notaMateria: {
    fontSize: 13,
    color: '#7B8190',
    marginTop: 3,
  },

  eliminar: {
    color: '#E74C3C',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },

  // RESULTADOS

  resultado: {
    backgroundColor: '#E7ECFF',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },

  textoResultado: {
    color: '#59647B',
    fontSize: 14,
    textAlign: 'center',
  },

  numeroResultado: {
    color: '#3157D5',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 3,
  },

  textoExito: {
    color: '#249653',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 7,
    textAlign: 'center',
  },

  textoAdvertencia: {
    color: '#E67E22',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 7,
    textAlign: 'center',
  },

  porcentajeBox: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  porcentajeTexto: {
    color: '#59647B',
    fontSize: 14,
    fontWeight: '600',
  },

  porcentajeNumero: {
    color: '#3157D5',
    fontSize: 20,
    fontWeight: 'bold',
  },

  porcentajeCompleto: {
    color: '#249653',
  },

  // PRIORIDADES

  prioridades: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
    marginBottom: 5,
  },

  botonPrioridad: {
    width: '31%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDE2EC',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },

  botonPrioridadActivo: {
    backgroundColor: '#3157D5',
    borderColor: '#3157D5',
  },

  textoPrioridad: {
    color: '#59647B',
    fontWeight: '600',
  },

  textoPrioridadActivo: {
    color: 'white',
    fontWeight: 'bold',
  },

  // PLAN DE ESTUDIO

  planContainer: {
    backgroundColor: '#E7ECFF',
    borderRadius: 18,
    padding: 18,
    marginTop: 8,
  },

  tituloPlan: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#202A44',
    textAlign: 'center',
  },

  subtituloPlan: {
    color: '#7B8190',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 15,
  },

  planMateria: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  horasBox: {
    alignItems: 'center',
    minWidth: 60,
  },

  horasNumero: {
    color: '#3157D5',
    fontSize: 22,
    fontWeight: 'bold',
  },

  horasTexto: {
    color: '#7B8190',
    fontSize: 11,
  },

  totalHoras: {
    textAlign: 'center',
    color: '#3157D5',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
  },
});