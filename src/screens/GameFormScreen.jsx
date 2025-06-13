import React, { useRef } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { TextInput, Button, Title, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const STORAGE_KEY = '@GameCollection:savedGames';

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  genre: yup.string().required('Gênero é obrigatório'),
  platform: yup.string().required('Plataforma é obrigatória'),
  rating: yup.number()
    .typeError('Nota deve ser um número')
    .min(0, 'A nota mínima é 0')
    .max(10, 'A nota máxima é 10')
    .required('Nota é obrigatória'),
  completion: yup.number()
    .typeError('Conclusão deve ser um número')
    .min(0, 'Mínimo 0%')
    .max(100, 'Máximo 100%')
    .required('Porcentagem de conclusão é obrigatória'),
  review: yup.string(),
});

export default function GameFormScreen({ navigation, route }) {
  const scrollViewRef = useRef(null);
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: route.params?.game || {
      name: '',
      genre: '',
      platform: '',
      rating: '',
      completion: '',
      review: ''
    }
  });

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const saveGame = async (data) => {
    const newGame = { 
      id: route.params?.game?.id || uuidv4(),
      ...data,
      completion: Number(data.completion),
      rating: Number(data.rating),
      createdAt: route.params?.game?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      
      let updated;
      if (route.params?.game) {
        updated = parsed.map(game => game.id === newGame.id ? newGame : game);
      } else {
        updated = [...parsed, newGame];
      }
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      console.log('Jogo salvo com sucesso:', newGame);
      return true;
    } catch (error) {
      console.error('Erro ao salvar jogo:', error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      await saveGame(data);
      reset();
      navigation.navigate('Meus Jogos', { refresh: true });
    } catch (error) {
      alert('Erro ao salvar jogo: ' + error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => scrollToBottom()}
      >
        <Title style={styles.title}>
          {route.params?.game ? 'Editar Jogo' : 'Adicionar Novo Jogo'}
        </Title>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Nome do Jogo"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.name}
              style={styles.input}
              returnKeyType="next"
              onSubmitEditing={() => scrollToBottom()}
            />
          )}
        />
        <HelperText type="error" visible={!!errors.name}>{errors.name?.message}</HelperText>

        <Controller
          control={control}
          name="genre"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Gênero"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.genre}
              style={styles.input}
              returnKeyType="next"
              onSubmitEditing={() => scrollToBottom()}
            />
          )}
        />
        <HelperText type="error" visible={!!errors.genre}>{errors.genre?.message}</HelperText>

        <Controller
          control={control}
          name="platform"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Plataforma (PC, PS5, Xbox, etc.)"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.platform}
              style={styles.input}
              returnKeyType="next"
              onSubmitEditing={() => scrollToBottom()}
            />
          )}
        />
        <HelperText type="error" visible={!!errors.platform}>{errors.platform?.message}</HelperText>

        <Controller
          control={control}
          name="rating"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Nota (0-10)"
              mode="outlined"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value?.toString()}
              error={!!errors.rating}
              style={styles.input}
              returnKeyType="next"
              onSubmitEditing={() => scrollToBottom()}
            />
          )}
        />
        <HelperText type="error" visible={!!errors.rating}>{errors.rating?.message}</HelperText>

        <Controller
          control={control}
          name="completion"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Conclusão (%)"
              mode="outlined"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value?.toString()}
              error={!!errors.completion}
              style={styles.input}
              returnKeyType="next"
              onSubmitEditing={() => scrollToBottom()}
            />
          )}
        />
        <HelperText type="error" visible={!!errors.completion}>{errors.completion?.message}</HelperText>

        <Controller
          control={control}
          name="review"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Avaliação Descritiva"
              mode="outlined"
              multiline
              numberOfLines={4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.review}
              style={[styles.input, { height: 100 }]}
              blurOnSubmit={true}
              onSubmitEditing={() => scrollToBottom()}
            />
          )}
        />
        <HelperText type="error" visible={!!errors.review}>{errors.review?.message}</HelperText>

        <Button 
          icon="content-save" 
          mode="contained" 
          onPress={handleSubmit(onSubmit)}
          style={styles.saveButton}
          onLayout={() => scrollToBottom()}
        >
          Salvar
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    color: '#7FDBFF',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  saveButton: {
    marginTop: 30,
    paddingVertical: 10,
    marginBottom: 50,
  },
});