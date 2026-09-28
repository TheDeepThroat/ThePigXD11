import { View, Text, StyleSheet } from "react-native";

export default function Mensaje ( props ){
    return(
        <View>
            <Text style={styles.color_texto}>
                { props.titulo}
            </Text>
            <Text style={styles.color_texto}>
                {props.numero}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    color_texto:{
        color: 'black',
        fontSize: 21,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});