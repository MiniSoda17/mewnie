import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Mewnie Pet Container */}
      <View style={styles.petContainer}>
        <View style={styles.petPlaceholder}>
          <Text style={styles.petEmoji}>🐱</Text>
          <Text style={styles.placeholderText}>Mewnie</Text>
        </View>
      </View>

      {/* Status indicators placeholder */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Health Status</Text>
        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <Text style={styles.statusIcon}>😴</Text>
            <Text style={styles.statusText}>Sleep</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusIcon}>🏃</Text>
            <Text style={styles.statusText}>Steps</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusIcon}>💪</Text>
            <Text style={styles.statusText}>Fitness</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  petContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  petPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  petEmoji: {
    fontSize: 64,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    color: '#888',
  },
  statusContainer: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#666',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statusItem: {
    alignItems: 'center',
    padding: 10,
  },
  statusIcon: {
    fontSize: 28,
  },
  statusText: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
});
