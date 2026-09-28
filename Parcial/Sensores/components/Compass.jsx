import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";

import { Magnetometer } from "expo-sensors";

export default function MagnetometerSensor() {
  const [datos, setDatos] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [direccion, setDireccion] = useState(0);

  useEffect(() => {
    const suscripcion = Magnetometer.addListener((mediciones) => {
      setDatos(mediciones);

      // Calcular el ángulo de orientación
      let angulo = Math.atan2(
        mediciones.y,
        mediciones.x
      );

      // Convertir de radianes a grados
      angulo = (angulo * 180) / Math.PI;

      // Convertir a un rango de 0 - 360
      if (angulo < 0) {
        angulo += 360;
      }

      setDireccion(angulo);
    });

    // Intervalo de actualización
    Magnetometer.setUpdateInterval(100);

    return () => {
      suscripcion.remove();
    };
  }, []);

  // Determinar el punto cardinal
  const obtenerDireccion = () => {
    if (direccion >= 337.5 || direccion < 22.5) {
      return "N";
    } else if (direccion >= 22.5 && direccion < 67.5) {
      return "NE";
    } else if (direccion >= 67.5 && direccion < 112.5) {
      return "E";
    } else if (direccion >= 112.5 && direccion < 157.5) {
      return "SE";
    } else if (direccion >= 157.5 && direccion < 202.5) {
      return "S";
    } else if (direccion >= 202.5 && direccion < 247.5) {
      return "SO";
    } else if (direccion >= 247.5 && direccion < 292.5) {
      return "O";
    } else {
      return "NO";
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        🧭 Brújula Digital
      </Text>

      <Text style={styles.subtitle}>
        Gira tu teléfono para encontrar el Norte
      </Text>

      {/* Brújula */}
      <View style={styles.compassContainer}>

        <View
          style={[
            styles.compass,
            {
              transform: [
                {
                  rotate: `${-direccion}deg`,
                },
              ],
            },
          ]}
        >

          <Text style={[styles.norte, styles.letra]}>
            N
          </Text>

          <Text style={[styles.este, styles.letra]}>
            E
          </Text>

          <Text style={[styles.sur, styles.letra]}>
            S
          </Text>

          <Text style={[styles.oeste, styles.letra]}>
            O
          </Text>

          <Text style={styles.ne}>
            NE
          </Text>

          <Text style={styles.se}>
            SE
          </Text>

          <Text style={styles.so}>
            SO
          </Text>

          <Text style={styles.no}>
            NO
          </Text>

          <View style={styles.centro} />

        </View>

        {/* Indicador fijo */}
        <View style={styles.indicador} />

      </View>

      {/* Dirección actual */}
      <View style={styles.direccionCard}>

        <Text style={styles.direccionTexto}>
          {obtenerDireccion()}
        </Text>

        <Text style={styles.grados}>
          {direccion.toFixed(0)}°
        </Text>

        <Text style={styles.descripcion}>
          Dirección actual
        </Text>

      </View>

      {/* Datos del magnetómetro */}
      <View style={styles.datosCard}>

        <Text style={styles.datosTitulo}>
          Datos magnéticos
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
    backgroundColor: "#0f172a",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },

  subtitle: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: 8,
    marginBottom: 25,
  },

  compassContainer: {
    width: 280,
    height: 280,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  compass: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#ffffff",
    borderWidth: 8,
    borderColor: "#334155",
    position: "relative",
  },

  letra: {
    position: "absolute",
    fontSize: 25,
    fontWeight: "bold",
  },

  norte: {
    top: 10,
    left: 105,
    color: "#dc2626",
  },

  este: {
    right: 15,
    top: 105,
    color: "#1e293b",
  },

  sur: {
    bottom: 10,
    left: 108,
    color: "#1e293b",
  },

  oeste: {
    left: 15,
    top: 105,
    color: "#1e293b",
  },

  ne: {
    position: "absolute",
    top: 45,
    right: 45,
    fontWeight: "bold",
    color: "#64748b",
  },

  se: {
    position: "absolute",
    bottom: 45,
    right: 45,
    fontWeight: "bold",
    color: "#64748b",
  },

  so: {
    position: "absolute",
    bottom: 45,
    left: 45,
    fontWeight: "bold",
    color: "#64748b",
  },

  no: {
    position: "absolute",
    top: 45,
    left: 45,
    fontWeight: "bold",
    color: "#64748b",
  },

  centro: {
    position: "absolute",
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: "#dc2626",
    top: 105,
    left: 105,
  },

  indicador: {
    position: "absolute",
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 25,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#dc2626",
  },

  direccionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    marginTop: 15,
    alignItems: "center",
  },

  direccionTexto: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#dc2626",
  },

  grados: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
  },

  descripcion: {
    color: "#64748b",
    marginTop: 3,
  },

  datosCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    marginTop: 12,
  },

  datosTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#1e293b",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },

  axis: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2563eb",
  },

  value: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#334155",
  },
});