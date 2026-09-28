import { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, Dimensions, ScrollView } from 'react-native';
export default function App() {
    const [texto, setTexto] = useState()
    const [enviar, setEnviar] = useState()
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Image
          source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhddvzkL8QugCtRugGj6Gs3tETMcxuHqN15q0QL3KvuckNILeDCBBxDtA&s=10' }}
          style={styles.networkImage} 
        />
      </View>
      <View style={styles.view2}>
        <ScrollView style={styles.input}>
           <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
                <Text>{enviar}</Text>
        </ScrollView>
      </View>
      <View style={styles.view3}>
        <TextInput
          placeholder="Escribe aqui"
          onChangeText={t=>setTexto(t)}
        />
        <Button 
          title="enviar"
          onPress={()=>setEnviar(texto)}
        />
      </View>
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#4529c0',
  },
  view1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#612217',
  },
  view2: {
    flex: 1,
    backgroundColor: '#e500bb',
  },
  view3: {
    flex: 1,
    backgroundColor: '#6c582e',
  },
  input: {
    width: Dimensions.get("window").width,
  },
  networkImage: { 
    width: 250, 
    height: 180,
  },
});
