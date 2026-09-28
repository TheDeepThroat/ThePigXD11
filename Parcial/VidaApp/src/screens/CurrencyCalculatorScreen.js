import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';

const EXCHANGE_RATES = {
  USD: { rate: 1, symbol: '$' },
  MXN: { rate: 17.05, symbol: '$' },
  EUR: { rate: 0.92, symbol: '€' },
  GBP: { rate: 0.79, symbol: '£' },
};

export default function CurrencyCalculatorScreen() {
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('MXN');
  const [results, setResults] = useState(null);

  const calculateConversion = () => {
    Keyboard.dismiss();
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
      setResults(null);
      return;
    }

    // Convert to USD first as base
    const amountInUSD = numAmount / EXCHANGE_RATES[baseCurrency].rate;

    const conversions = {};
    Object.keys(EXCHANGE_RATES).forEach(currency => {
      if (currency !== baseCurrency) {
        conversions[currency] = (amountInUSD * EXCHANGE_RATES[currency].rate).toFixed(2);
      }
    });

    setResults(conversions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Cantidad a convertir ({baseCurrency})</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Ej: 1000"
        />

        <View style={styles.currencySelector}>
          {Object.keys(EXCHANGE_RATES).map((currency) => (
            <TouchableOpacity
              key={currency}
              style={[styles.currencyBtn, baseCurrency === currency && styles.currencyBtnActive]}
              onPress={() => setBaseCurrency(currency)}
            >
              <Text style={[styles.currencyBtnText, baseCurrency === currency && styles.currencyBtnTextActive]}>
                {currency}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={calculateConversion}>
          <Text style={styles.buttonText}>Convertir</Text>
        </TouchableOpacity>
      </View>

      {results && (
        <View style={styles.resultsCard}>
          <Text style={styles.resultsTitle}>Resultados</Text>
          {Object.entries(results).map(([currency, value]) => (
            <View key={currency} style={styles.resultRow}>
              <Text style={styles.resultCurrency}>{currency}</Text>
              <Text style={styles.resultValue}>{EXCHANGE_RATES[currency].symbol} {value}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  currencySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  currencyBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  currencyBtnActive: {
    backgroundColor: '#6200EE',
  },
  currencyBtnText: {
    color: '#666',
    fontWeight: 'bold',
  },
  currencyBtnTextActive: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultCurrency: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
