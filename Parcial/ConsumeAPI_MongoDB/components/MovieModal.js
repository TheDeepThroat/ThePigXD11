import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function MovieModal({ movie, visible, onClose }) {
  if (!movie) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>

          <Pressable
            accessibilityLabel="Cerrar detalles de la película"
            accessibilityRole="button"
            onPress={onClose}
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.closePressed,
            ]}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </Pressable>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >

            {movie.poster ? (
              <Image
                source={{ uri: movie.poster }}
                style={styles.poster}
              />
            ) : (
              <View style={[styles.poster, styles.noImageContainer]}>
                <Text style={styles.noImageText}>
                  Imagen no disponible
                </Text>
              </View>
            )}

            <Text style={styles.title}>
              {movie.title}
            </Text>

            <View style={styles.divider} />

            <View style={styles.sectionHeader}>
              <View style={styles.sectionLine} />
              <Text style={styles.sectionLabel}>
                SINOPSIS
              </Text>
              <View style={styles.sectionLine} />
            </View>

            <Text style={styles.plot}>
              {movie.fullplot || 'Sin descripción disponible.'}
            </Text>

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
    padding: 18,
  },

  modalCard: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: '#1E1E1E',
    borderRadius: 22,
    overflow: 'hidden',

    borderWidth: 1,
    borderColor: '#3A3A3A',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 10,
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 30,
  },

  closeButton: {
    position: 'absolute',
    right: 14,
    top: 14,
    zIndex: 5,

    width: 40,
    height: 40,

    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#FFCC00',
  },

  closePressed: {
    opacity: 0.65,
    transform: [{ scale: 0.9 }],
  },

  closeButtonText: {
    color: '#151515',
    fontSize: 19,
    fontWeight: '900',
  },

  poster: {
    width: 200,
    height: 285,
    borderRadius: 14,
    backgroundColor: '#303030',

    borderWidth: 1,
    borderColor: '#444444',
  },

  noImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  noImageText: {
    color: '#999999',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  title: {
    marginTop: 20,
    paddingHorizontal: 10,

    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
    textAlign: 'center',
  },

  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#3B3B3B',
    marginTop: 20,
  },

  sectionHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 8,
  },

  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#555555',
  },

  sectionLabel: {
    marginHorizontal: 10,

    color: '#FFCC00',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  plot: {
    width: '100%',
    marginTop: 8,

    color: '#C7C7C7',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'left',
  },
});