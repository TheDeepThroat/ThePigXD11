import { useEffect, useRef } from "react";
import { Animated, View } from 'react-native';


export default function App() {
  const opacity = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(0)).current;

useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity,{
      toValue: 1,
      duration: 7500,
      useNativeDriver: true
    }),

    Animated.timing(position,{
      toValue: -300,
      duration: 8000,
      useNativeDriver: true
    }),

    Animated.timing(escala,{
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }),
    ]).start();
  }, []);

  return(
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    }}>
      
      <Animated.Text
        style={{
          fontSize:60,
          opacity: opacity,
          transform: [{translateX:position}, {scaleX:escala}, {scaleY:escala}],
          
        }}>
          😎
      </Animated.Text>
    </View>
  );
}