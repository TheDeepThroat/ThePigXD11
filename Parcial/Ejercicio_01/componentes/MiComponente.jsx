import { View, Text, StyleSheet } from "react-native";

const MiComponente = () =>{
    return(
        <View>
            <Text style={styles.color_texto}>
                Mi componente
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    color_texto:{
        color: '#000',
        fontSize: 15,
    },
});

export default MiComponente;