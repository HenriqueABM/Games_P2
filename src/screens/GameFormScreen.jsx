import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function GameFormScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    console.log('Jogo adicionado:', { title, review });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título do Jogo</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text style={styles.label}>Avaliação</Text>
      <TextInput
        value={review}
        onChangeText={setReview}
        style={styles.input}
      />

      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
  },
});
