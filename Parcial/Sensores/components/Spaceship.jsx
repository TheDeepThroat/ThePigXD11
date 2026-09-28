import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
} from "react-native";
import { Gyroscope } from "expo-sensors";

export default function GyroscopeSensor() {
  const [datos, setDatos] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [rotacion, setRotacion] = useState(0);

  useEffect(() => {
    // Suscribirse al giroscopio
    const suscripcion = Gyroscope.addListener((mediciones) => {
      setDatos(mediciones);

      // Utilizamos el eje Z para girar la nave
      setRotacion((rotacionAnterior) => {
        let nuevaRotacion =
          rotacionAnterior + mediciones.z * 10;

        // Mantener el valor entre 0 y 360
        nuevaRotacion = nuevaRotacion % 360;

        return nuevaRotacion;
      });
    });

    // Intervalo de medición
    Gyroscope.setUpdateInterval(100);

    // Desuscripción
    return () => {
      suscripcion.remove();
    };
  }, []);

  const velocidad =
    Math.sqrt(
      datos.x ** 2 +
      datos.y ** 2 +
      datos.z ** 2
    );

  let estado = "🟢 Estable";

  if (velocidad > 2) {
    estado = "🚀 ¡Giro rápido!";
  } else if (velocidad > 0.5) {
    estado = "🔄 Girando";
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        🚀 Control Giroscópico
      </Text>

      <Text style={styles.subtitulo}>
        Gira tu teléfono para controlar la nave
      </Text>

      {/* Área de juego */}
      <View style={styles.gameArea}>

        <View
          style={[
            styles.nave,
            {
              transform: [
                {
                  rotate: `${rotacion}deg`,
                },
              ],
            },
          ]}
        >
          🚀
        </View>

        <Text style={styles.estado}>
          {estado}
        </Text>

      </View>

      {/* Datos */}
      <View style={styles.panel}>

        <Text style={styles.panelTitle}>
          Velocidad de rotación
        </Text>

        <View style={styles.row}>
          <Text style={styles.axis}>X</Text>
          <Text style={styles.value}>
            {datos.x.toFixed(2)} rad/s
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.axis}>Y</Text>
          <Text style={styles.value}>
            {datos.y.toFixed(2)} rad/s
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.axis}>Z</Text>
          <Text style={styles.value}>
            {datos.z.toFixed(2)} rad/s
          </Text>
        </View>

        <View style={styles.separador} />

        <Text style={styles.intensidad}>
          Intensidad: {velocidad.toFixed(2)}
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
    marginTop: 30,
  },

  subtitulo: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: 8,
    marginBottom: 20,
  },

  gameArea: {
    flex: 1,
    backgroundColor: "#020617",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  nave: {
    fontSize: 70,
    textAlign: "center",
  },

  estado: {
    position: "absolute",
    bottom: 20,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  panel: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginTop: 15,
    marginBottom: 10,
  },

  panelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },

  axis: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7c3aed",
  },

  value: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#334155",
  },

  separador: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 10,
  },

  intensidad: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#7c3aed",
  },
});