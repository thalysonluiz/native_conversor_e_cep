
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from 'react-native';
//import { Picker } from './src/components/Picker';
import { StatusBar, Text, Input, Box, Button, NativeBaseProvider, Center } from "native-base";
import { SelectMoedas } from "./src/components/SelectMoedas";

import { api } from "./src/services/api";


export default function App() {
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaBValor, setMoedaBValor] = useState(0);

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get('all');

      let arrayMoedas = [];
      Object.keys(response.data).map(key => arrayMoedas.push({
        key: key,
        label: key,
        value: key
      }));

      setMoedas(arrayMoedas);
      setLoading(false);

    }

    loadMoedas();
  }, [])

  if (loading) {
    return (
      <NativeBaseProvider>

        <Center>
          <ActivityIndicator />
        </Center>
      </NativeBaseProvider>
    )
  }
  else {
    return (
      <NativeBaseProvider>
        <Box style={styles.container}>
          <Box style={styles.areaMoeda}>

            <Text style={styles.titulo}>Selecione sua moeda</Text>
            <SelectMoedas moedas={moedas} onChange={moeda => setMoedaSelecionada(moeda)} />
          </Box>
          <Box style={styles.areaValor}>

            <Text style={styles.titulo} >Digite o valor em R$</Text>
            <Input style={styles.input} placeholder="Valor" keyboardType="numeric"
              onChangeText={(valor) => setMoedaBValor(valor)}
            />
          </Box>
          <Button
            onPress={() => console.log("hello world")}
            style={styles.botaoArea}
          >
            Converter
          </Button>
          <Box style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>
              3 USD
            </Text>
            <Text style={[styles.valorConvertido, { fontSize: 18, margin: 10 }]}>
              Corresponde a
            </Text>
            <Text style={styles.valorConvertido}>
              19,90
            </Text>
          </Box>
        </Box>
        <StatusBar
          barStyle='light-content'
          backgroundColor="transparent"
          translucent
        />
      </NativeBaseProvider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  },
  areaMoeda: {
    width: '90%',
    backgroundColor: '#F9F9F9',
    paddingTop: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 1
  },
  titulo: {
    fontSize: 15,
    color: '#000',
    paddingTop: 5,
    paddingLeft: 5
  },
  areaValor: {
    width: '90%',
    backgroundColor: '#F9F9F9',
    paddingTop: 9,
    paddingBottom: 9,
  },
  input: {
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 20,
    marginTop: 8,
    color: '#000'
  },
  botaoArea: {
    width: '90%',
    backgroundColor: '#FB4B57',
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  areaResultado: {
    width: '90%',
    backgroundColor: '#F9F9F9',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    borderRadius: 8
  },
  valorConvertido: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000'
  }
});
