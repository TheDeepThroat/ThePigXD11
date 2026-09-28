import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

export default function MemoryGameScreen() {
  const [cards, setCards] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji) => ({ emoji, isFlipped: false }));
    setCards(shuffledCards);
    setSelectedIndices([]);
    setMatchedIndices([]);
    setMoves(0);
  };

  const handleCardPress = (index) => {
    if (selectedIndices.length === 2 || matchedIndices.includes(index) || selectedIndices.includes(index)) {
      return;
    }

    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    if (newSelected.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newSelected;
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        setMatchedIndices([...matchedIndices, firstIndex, secondIndex]);
        setSelectedIndices([]);
        if (matchedIndices.length + 2 === cards.length) {
          setTimeout(() => Alert.alert('¡Felicidades!', `Ganaste en ${moves + 1} movimientos`, [{ text: 'Jugar de nuevo', onPress: startNewGame }]), 300);
        }
      } else {
        setTimeout(() => setSelectedIndices([]), 1000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimientos: {moves}</Text>
      <View style={styles.grid}>
        {cards.map((card, index) => {
          const isFlipped = selectedIndices.includes(index) || matchedIndices.includes(index);
          return (
            <TouchableOpacity
              key={index}
              style={[styles.card, isFlipped && styles.cardFlipped]}
              onPress={() => handleCardPress(index)}
              activeOpacity={0.8}
            >
              <Text style={styles.cardText}>{isFlipped ? card.emoji : '❓'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={startNewGame}>
        <Text style={styles.resetButtonText}>Reiniciar Juego</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  card: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#6200EE',
    margin: '1.5%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  cardFlipped: {
    backgroundColor: '#ffffff',
  },
  cardText: {
    fontSize: 32,
  },
  resetButton: {
    marginTop: 30,
    backgroundColor: '#03DAC6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  resetButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
