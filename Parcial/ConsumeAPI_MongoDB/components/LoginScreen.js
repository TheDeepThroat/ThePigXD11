import React, { useState } from 'react';

import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const AUTH_API_URL = 'AUTH_API_URL';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email.trim() || !password) {
      setError('Ingresa tu correo y contraseña.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const endpoint = isRegistering ? '/register' : '/login';

      const response = await fetch(`${AUTH_API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          'El servicio no devolvió JSON. Verifica que ngrok y el servidor estén activos.'
        );
      }

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo iniciar sesión.');
      }

      if (isRegistering) {
        setIsRegistering(false);
        setPassword('');
        setError('Usuario creado. Ahora puedes iniciar sesión.');
      } else {
        onLogin(data.user);
      }
    } catch (requestError) {
      setError(
        requestError.message ||
        'No se pudo conectar con el servicio de login.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>🎬</Text>
      </View>

      <View style={styles.loginCard}>

        <Text style={styles.brand}>
          SAMPLE MFLIX
        </Text>

        <Text style={styles.title}>
          {isRegistering ? 'Crear cuenta' : 'Bienvenido'}
        </Text>

        <Text style={styles.subtitle}>
          {isRegistering
            ? 'Crea tu cuenta para comenzar a explorar películas.'
            : 'Inicia sesión para acceder a la cartelera.'}
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            CORREO
          </Text>

          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="ejemplo@correo.com"
            placeholderTextColor="#777777"
            style={styles.input}
            value={email}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            CONTRASEÑA
          </Text>

          <TextInput
            autoCapitalize="none"
            onChangeText={setPassword}
            placeholder="Escribe tu contraseña"
            placeholderTextColor="#777777"
            secureTextEntry
            style={styles.input}
            value={password}
          />
        </View>

        {error ? (
          <View style={styles.messageBox}>
            <Text style={styles.error}>
              {error}
            </Text>
          </View>
        ) : null}

        <Pressable
          disabled={loading}
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            loading && styles.buttonDisabled,
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#151515" />
          ) : (
            <Text style={styles.buttonText}>
              {isRegistering ? 'REGISTRARME' : 'INICIAR SESIÓN'}
            </Text>
          )}
        </Pressable>

        <Pressable
          disabled={loading}
          onPress={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}
          style={({ pressed }) => [
            styles.switchButton,
            pressed && styles.switchPressed,
          ]}
        >
          <Text style={styles.switchText}>
            {isRegistering
              ? '← Ya tengo una cuenta'
              : 'Crear una cuenta nueva →'}
          </Text>
        </Pressable>

      </View>

      <Text style={styles.footer}>
        © 2026 Sample Mflix
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
    backgroundColor: '#151515',
  },

  logoContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -18,
    zIndex: 2,
    backgroundColor: '#FFCC00',

    borderWidth: 4,
    borderColor: '#151515',
  },

  logoIcon: {
    fontSize: 30,
  },

  loginCard: {
    width: '100%',
    maxWidth: 430,
    paddingHorizontal: 25,
    paddingTop: 42,
    paddingBottom: 25,

    borderRadius: 20,
    backgroundColor: '#242424',

    borderWidth: 1,
    borderColor: '#3A3A3A',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },

  brand: {
    textAlign: 'center',
    color: '#FFCC00',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },

  title: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 25,
    color: '#AAAAAA',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  inputGroup: {
    marginBottom: 15,
  },

  inputLabel: {
    marginBottom: 7,
    color: '#CCCCCC',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },

  input: {
    height: 52,
    paddingHorizontal: 15,

    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#454545',

    backgroundColor: '#181818',
    color: '#FFFFFF',

    fontSize: 15,
  },

  messageBox: {
    padding: 10,
    marginBottom: 14,
    borderRadius: 8,
    backgroundColor: '#35201E',
    borderLeftWidth: 3,
    borderLeftColor: '#FF5A4F',
  },

  error: {
    color: '#FF8178',
    fontSize: 13,
    lineHeight: 18,
  },

  button: {
    height: 52,
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 5,
    backgroundColor: '#FFCC00',
  },

  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#151515',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  switchButton: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 5,
  },

  switchPressed: {
    opacity: 0.6,
  },

  switchText: {
    color: '#FFCC00',
    fontSize: 14,
    fontWeight: '700',
  },

  footer: {
    marginTop: 18,
    color: '#666666',
    fontSize: 11,
  },
});