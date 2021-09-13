import React from 'react';
import { useState, useEffect } from 'react';
import {FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Button } from '../Components/Button';

import { 
  Container, 
  Title, 
  InputContainer, 
  Input,
  SubTitle,
  ContainerList,
  ButtonList,
  TextList,
  Icon,
  Header
} from './styles';


interface registerProps {
  id: string;
  name: string;
  mail: string;
  phone: string;
}


export function Home() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [register, setRegister] = useState<registerProps[]>([]);

  function handleAddregister() {
    const data = {
      id: String(new Date().getTime()),
      name: name,
      mail: mail,
      phone: phone
    }
    if(name != "" && mail != "" && phone != ""){
      setRegister([...register, data])
      setName('')
      setMail('')
      setPhone('')
    }else{
      alert("Por favor, preencha todos os campos")
    }

  }

  function handleRemoveregister(id: string) {
    setRegister(register => register.filter( c => c.id !== id))
  }

  useEffect(() => {
    async function loadData() {
      const getData = await AsyncStorage.getItem('@listregister');
      return getData !== null ? setRegister(JSON.parse(getData)) : null;
    }

    loadData()
  }, [])

  useEffect(() => {
    async function saveData() {
      await AsyncStorage.setItem('@listregister', JSON.stringify(register));
    }

    saveData();
  }, [register])

  return (
    <Container>
      <Header>
        <Icon name="app-registration"/>
        <Title>User Register</Title>
      </Header>

      <InputContainer>
        <Input 
          placeholder="Digite seu nome"
          placeholderTextColor= '#555'
          value={name}
          onChangeText={setName}
        />
        <Input 
          placeholder="Digite seu E-mail"
          placeholderTextColor= '#555'
          value={mail}
          onChangeText={setMail}
        />
        <Input 
          placeholder="Digite seu telefone"
          placeholderTextColor= '#555'
          value={phone}
          onChangeText={setPhone}
          onSubmitEditing={handleAddregister}
        />

        <Button title= "Cadastrar Usuário" onPress={handleAddregister} />
      </InputContainer>

      <SubTitle>Lista de Cadastrados</SubTitle>

      <FlatList 
        showsVerticalScrollIndicator={false}
        data={register}
        keyExtractor={ item => item.id}
        renderItem={({ item }) => (
          <ContainerList>
            <ButtonList
              onPress={() => handleRemoveregister(item.id)}
            >
              <TextList style={{fontSize: 26}}>{item.name}</TextList>
              <TextList style={{fontSize: 18}}>{item.mail}</TextList>
              <TextList>{item.phone}</TextList>
            </ButtonList>
          </ContainerList>
        )}
      />
    </Container>
  )
}