import React from 'react';
import { CheckIcon, Select, Box } from 'native-base';

export function SelectMoedas({ moedas, onChange }) {

  return (
    <Box>
      <Select
        accessibilityLabel="Selecione a moeda"
        placeholder="Selecione a moeda"
        mt={1}
        mx={2}
        fontSize={20}
        color="#000"
        onValueChange={(valor) => onChange(valor)}
      >
        {moedas.map(item =>
          <Select.Item
            key={item.key}
            label={item.label}
            value={item.value}
            padding={3}
          />
        )}
      </Select>

    </Box>
  );
}
