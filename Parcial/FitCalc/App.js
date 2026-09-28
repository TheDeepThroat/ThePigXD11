import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native';
import CustomModal from './components/CustomModal';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState('0.00');
  const [nivel, setNivel] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const calcularIMC = () => {
    const pesoNumero = parseFloat(peso);
    const alturaNumero = parseFloat(altura);

    if (
      isNaN(pesoNumero) ||
      isNaN(alturaNumero) ||
      pesoNumero <= 0 ||
      alturaNumero <= 0
    ) {
      return;
    }

    const resultado = pesoNumero / (alturaNumero * alturaNumero);
    const resultadoRedondeado = resultado.toFixed(2);

    setImc(resultadoRedondeado);
    setNivel(asignaNivel(resultado));
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.card}>
        <Text style={styles.title}>FitCalc</Text>
        <Text style={styles.subtitle}>Calculadora de IMC</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Peso</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. 70"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={peso}
            onChangeText={setPeso}
          />

          <Text style={styles.unit}>kg</Text>

          <Text style={styles.label}>Altura</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. 1.75"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={altura}
            onChangeText={setAltura}
          />

          <Text style={styles.unit}>metros</Text>

          <Pressable
            style={styles.button}
            onPress={calcularIMC}
          >
            <Text style={styles.buttonText}>Calcular IMC</Text>
          </Pressable>
        </View>

        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          contenido={imc}
          contenido2={nivel}
        />
      </View>
    </SafeAreaView>
  );
}

function asignaNivel(imc) {
  if (imc < 18.5) {
    return 'Bajo peso';
  }

  if (imc < 25) {
    return 'Peso normal';
  }

  if (imc < 30) {
    return 'Sobrepeso';
  }

  if (imc < 35) {
    return 'Obesidad leve';
  }

  if (imc < 40) {
    return 'Obesidad media';
  }

  return 'Obesidad mórbida';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f5',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginTop: 5,
    marginBottom: 30,
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 7,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },

  unit: {
    color: '#888',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 18,
  },

  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
