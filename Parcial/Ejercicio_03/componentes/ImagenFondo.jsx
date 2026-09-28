import React from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Dimensions,
    Image,
    Text,
} from 'react-native';

export default function ImagenFondo() {
    return (
        <ImageBackground
            style={styles.fondo}
            source={require('../assets/fondo.jpg')}
            resizeMode="cover"
        >
            <View style={styles.container}>

                <View style={styles.tituloContainer}>
                    <Text style={styles.titulo}>AVENTURA</Text>
                    <Text style={styles.subtitulo}>Explora el mundo</Text>
                </View>

                <Image
                    source={require('../assets/personaje.png')}
                    style={styles.foto}
                    resizeMode="contain"
                />

                <View style={styles.info}>
                    <Text style={styles.texto}>
                        Bienvenido a la aplicación
                    </Text>
                </View>

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    fondo: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    tituloContainer: {
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        borderRadius: 20,
    },

    titulo: {
        fontSize: Dimensions.get('window').width * 0.12,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },

    subtitulo: {
        fontSize: 18,
        color: '#dddddd',
        marginTop: 5,
        textAlign: 'center',
    },

    foto: {
        width: Dimensions.get('window').width * 0.75,
        height: 260,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: '#ffffff',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },

    info: {
        marginTop: 30,
        paddingHorizontal: 25,
        paddingVertical: 15,
        backgroundColor: 'rgba(20, 20, 20, 0.75)',
        borderRadius: 15,
    },

    texto: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
    },
});
