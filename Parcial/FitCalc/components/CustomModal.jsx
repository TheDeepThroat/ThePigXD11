import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

const CustomModal = ({ visible, onClose, contenido, contenido2 }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>

          <Text style={styles.title}>
            Resultado
          </Text>

          <Text style={styles.imc}>
            {contenido}
          </Text>

          <Text style={styles.description}>
            Tu índice de masa corporal es
          </Text>

          <View style={styles.resultBox}>
            <Text style={styles.resultText}>
              {contenido2}
            </Text>
          </View>

          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>
              Cerrar
            </Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modal: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 15,
  },

  imc: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 5,
  },

  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },

  resultBox: {
    width: '100%',
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 25,
  },

  resultText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  closeButton: {
    width: '100%',
    backgroundColor: '#2563eb',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomModal;