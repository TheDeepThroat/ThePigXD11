import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MiComponente  from './componentes/MiComponente';
import Mensaje from './componentes/Mensaje';

export default function App() {

  return (
    <View style={styles.container}>
      <Text style={styles.texto}> Hola a todos </Text>
      <MiComponente/>
      <Mensaje titulo="Aplicaciones móviles" numero="2"/>
      <StatusBar style="auto" />
    </View>
  );
}

//Aquí siempre serán los estilos, que es una instancia de la clase StyleSheet.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: '#000000',
    fontSize: 15,
  },
});
