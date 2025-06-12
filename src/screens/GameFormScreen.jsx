import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const schema = yup.object({
  title: yup.string().required('Título é obrigatório'),
  genre: yup.string().required('Gênero é obrigatório'),
  platform: yup.string().required('Plataforma é obrigatória'),
  rating: yup.number().min(0).max(10).required('Nota entre 0 e 10'),
  release: yup.string().required('Data de lançamento é obrigatória'),
});

export default function GameFormScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const stored = await AsyncStorage.getItem('games');
    const games = stored ? JSON.parse(stored) : [];
    games.push(data);
    await AsyncStorage.setItem('games', JSON.stringify(games));
    navigation.navigate('Meus Jogos');
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Adicionar Jogo</Text>
      {['title', 'genre', 'platform', 'rating', 'release'].map((field, idx) => (
        <View key={idx}>
          <Controller
            control={control}
            name={field}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={field}
                mode="outlined"
                value={value}
                onChangeText={onChange}
                keyboardType={field === 'rating' ? 'numeric' : 'default'}
                style={styles.input}
              />
            )}
          />
          {errors[field] && <HelperText type="error">{errors[field]?.message}</HelperText>}
        </View>
      ))}
      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        Salvar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { marginBottom: 10 },
  button: { marginTop: 20 }
});
