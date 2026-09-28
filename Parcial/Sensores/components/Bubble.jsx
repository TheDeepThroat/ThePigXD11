import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Accelerometer } from "expo-sensors";

const { width, height } = Dimensions.get("window");

export default function Bubble() {
  const [datos, setDatos] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [posicion, setPosicion] = useState({
    x: width / 2 - 25,
    y: height / 2 - 25,
  });

  useEffect(() => {
    // Suscribirse al acelerómetro
    const suscripcion = Accelerometer.addListener((mediciones) => {
      setDatos(mediciones);

      // Intensidad del movimiento
      const intensidad = Math.sqrt(
        mediciones.x ** 2 +
        mediciones.y ** 2 +
        mediciones.z ** 2
      );

      // Movimiento horizontal y vertical
      let nuevaX = posicion.x + mediciones.x * 15;
      let nuevaY = posicion.y - mediciones.y * 15;

      // Evitar que la esfera salga de la pantalla
      nuevaX = Math.max(0, Math.min(width - 50, nuevaX));
      nuevaY = Math.max(0, Math.min(height - 180, nuevaY));

      setPosicion({
        x: nuevaX,
        y: nuevaY,
      });
    });

    // Actualizar cada 100 ms
    Accelerometer.setUpdateInterval(100);

    // Desuscribirse
    return () => {
      suscripcion.remove();
    };
  }, [posicion]);

  // Determinar el estado del movimiento
  const movimiento =
    Math.abs(datos.x) > 1 ||
    Math.abs(datos.y) > 1 ||
    Math.abs(datos.z) > 1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Control por movimiento</Text>

      <Text style={styles.subtitle}>
        Inclina tu teléfono para mover la esfera
      </Text>

      {/* Área de juego */}
      <View style={styles.gameArea}>
        <View
          style={[
            styles.bola,
            {
              left: posicion.x,
              top: posicion.y,
            },
          ]}
        />

        <Text style={styles.instruction}>
          {movimiento ? "🚀 ¡Moviéndote!" : "🟢 Quieto"}
        </Text>
      </View>

      {/* Datos del acelerómetro */}
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>
          Datos del acelerómetro
        </Text>

        <View style={styles.row}>
          <Text style={styles.axis}>X</Text>
          <Text style={styles.value}>
            {datos.x.toFixed(2)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.axis}>Y</Text>
          <Text style={styles.value}>
            {datos.y.toFixed(2)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.axis}>Z</Text>
          <Text style={styles.value}>
            {datos.z.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101827",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
    marginTop: 30,
  },

  subtitle: {
    textAlign: "center",
    color: "#9ca3af",
    marginTop: 8,
    marginBottom: 20,
  },

  gameArea: {
    flex: 1,
    backgroundColor: "#1e293b",
    borderRadius: 25,
    overflow: "hidden",
    position: "relative",
    borderWidth: 2,
    borderColor: "#334155",
  },

  bola: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#38bdf8",
    borderWidth: 4,
    borderColor: "#bae6fd",

    shadowColor: "#38bdf8",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },

  instruction: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    textAlign: "center",
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  panel: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    marginTop: 15,
    marginBottom: 10,
  },

  panelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 10,
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },

  axis: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
  },

  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#334155",
  },
});