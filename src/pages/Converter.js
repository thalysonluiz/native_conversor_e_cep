
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Keyboard } from 'react-native';
//import { Picker } from './src/components/Picker';
import { StatusBar, Text, Input, Box, Button, NativeBaseProvider, Center } from "native-base";
import { SelectMoedas } from "../components/SelectMoedas";

import { api } from "../services/api";


export function Converter() {
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moedaSelecionada, setMoedaSelecionada] = useState(null);
  const [moedaBValor, setMoedaBValor] = useState(0);

  const [valorConvertido, setValorConvertido] = useState(0);
  const [valorRecebido, setValorRecebido] = useState(0);

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
  }, []);

  async function converter() {
    if (moedaSelecionada === null || moedaBValor === 0) {
      alert("Please select a moeda");
      return;
    }

    const response = await api.get(`all/${moedaSelecionada}-BRL`);
    //console.log(response.data);
    let valor = response.data[moedaSelecionada].ask;

    valor *= parseFloat(moedaBValor);

    setValorConvertido(valor);
    setValorRecebido(moedaBValor);

    Keyboard.dismiss();

  }

  if (loading) {
    return (

      <Center>
        <ActivityIndicator />
      </Center>
    )
  }
  else {
    return (
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
          onPress={converter}
          style={styles.botaoArea}
        >
          Converter
        </Button>
        {valorConvertido !== 0 && (

          <Box style={styles.areaResultado}>
            <Text style={styles.valorConvertido}>
              {`${valorRecebido} ${moedaSelecionada}`}
            </Text>
            <Text style={[styles.valorConvertido, { fontSize: 18, margin: 10 }]}>
              Corresponde a
            </Text>
            <Text style={styles.valorConvertido}>
              R$ {valorConvertido.toFixed(2)}
            </Text>
          </Box>
        )}
      </Box>

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
