import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function TicTacToeScreen() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handlePress = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setTimeout(() => Alert.alert('¡Juego Terminado!', `El ganador es: ${winner}`, [{ text: 'Jugar de nuevo', onPress: resetGame }]), 100);
    } else if (!newBoard.includes(null)) {
      setTimeout(() => Alert.alert('¡Empate!', 'No hay más movimientos', [{ text: 'Jugar de nuevo', onPress: resetGame }]), 100);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index) => (
    <TouchableOpacity style={styles.square} onPress={() => handlePress(index)} activeOpacity={0.7}>
      <Text style={[styles.squareText, board[index] === 'X' ? styles.xText : styles.oText]}>
        {board[index]}
      </Text>
    </TouchableOpacity>
  );

  const winner = calculateWinner(board);
  const status = winner ? `Ganador: ${winner}` : `Turno de: ${isXNext ? 'X' : 'O'}`;

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
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
    justifyContent: 'center',
  },
  status: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  board: {
    backgroundColor: '#333',
    padding: 5,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  xText: {
    color: '#f44336',
  },
  oText: {
    color: '#2196f3',
  },
  resetButton: {
    marginTop: 40,
    backgroundColor: '#6200EE',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
