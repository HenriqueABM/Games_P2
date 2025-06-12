import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  genre: yup.string().required('Gênero é obrigatório'),
  platform: yup.string().required('Plataforma é obrigatória'),
  release: yup.string().required('Lançamento é obrigatório'),
  rating: yup.number().required('Nota é obrigatória').min(0).max(10),
});

export default function GameFormScreen({ navigation }) {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const stored = await AsyncStorage.getItem('@games');
      const games = stored ? JSON.parse(stored) : [];
      games.push(data);
      await AsyncStorage.setItem('@games', JSON.stringify(games));
      reset();
      navigation.navigate('Meus Jogos');
    } catch (error) {
      console.error('Erro ao salvar o jogo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextInput label="Nome" value={value} onChangeText={onChange} error={!!error} style={styles.input} />
        )}
      />
      <Controller
        control={control}
        name="genre"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextInput label="Gênero" value={value} onChangeText={onChange} error={!!error} style={styles.input} />
        )}
      />
      <Controller
        control={control}
        name="platform"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextInput label="Plataforma" value={value} onChangeText={onChange} error={!!error} style={styles.input} />
        )}
      />
      <Controller
        control={control}
        name="release"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextInput label="Lançamento" value={value} onChangeText={onChange} error={!!error} style={styles.input} />
        )}
      />
      <Controller
        control={control}
        name="rating"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextInput label="Nota (0-10)" value={value} onChangeText={onChange} error={!!error} style={styles.input} keyboardType="numeric" />
        )}
      />
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>Salvar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
});