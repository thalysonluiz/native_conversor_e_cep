import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Center, Input, Text } from "native-base";
import { ActivityIndicator, StyleSheet, Keyboard } from 'react-native';

import { apicep } from "../services/apicep";


export function Cep() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({});
  const inputRef = useRef(null)

  function limpar() {
    setCep('');
    inputRef.current.focus();
    setEndereco({});
  }

  async function buscar() {
    if (cep == '') {
      alert("Digite um cep válido");
      setCep('');
      return;
    }

    try {
      const response = await apicep.get(`${cep}/json`);
      setEndereco(response.data);
      Keyboard.dismiss();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Center>
      <Text style={styles.text}>Digite o CEP desejado</Text>
      <Input
        style={styles.input}
        placeholder="Ex: 45678-220"
        value={cep}
        onChangeText={(texto) => setCep(texto)}
        keyboardType="numeric"
        ref={inputRef}
      />

      <Box style={styles.botaoArea}>
        <Button
          style={styles.botao1}
          onPress={buscar}
        >
          Buscar
        </Button>

        <Button
          style={styles.botao2}
          onPress={limpar}
        >
          Limpar
        </Button>

      </Box>
      <Center marginTop={10}>
        <Text style={styles.item}>CEP: {endereco.cep}</Text>
        <Text style={styles.item}>Logradouro: {endereco.logradouro}</Text>
        <Text style={styles.item}>Bairro: {endereco.bairro}</Text>
        <Text style={styles.item}>Cidade: {endereco.localidade}</Text>
        <Text style={styles.item}>Estado: {endereco.uf}</Text>
      </Center>
    </Center>
  );
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  botaoArea: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  botao1: {
    height: 50,
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'tomato',
    marginHorizontal: 10
  },
  botao2: {
    height: 50,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 10
  },
  item: {
    fontSize: 16
  }
})
