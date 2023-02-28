const input = 'whil i < 100 do i = i + j;';

const keywords = ['while', 'do'];
const operators = ['<', '=', '+'];
const terminator = ';';
const identifiers = ['i', 'j'];

let line = 0;
let col = 0;

const tokenize = (input) => {
  const tokens = [];

  let cursor = 0;

  while (cursor < input.length) {
    let currentChar = input[cursor];

    if (currentChar === ' ') {
      cursor++;
      col++;
      continue;
    }

    if (currentChar === terminator) {
      tokens.push({ token: terminator, identification: 'terminador', size: 1, position: `(${line},${col})` });
      cursor++;
      col++;
      continue;
    }

    if (operators.includes(currentChar)) {
      tokens.push({ token: currentChar, identification: 'operador', size: 1, position: `(${line},${col})` });
      cursor++;
      col++;
      continue;
    }

    if (currentChar.match(/[0-9]/)) {
      let sequence = currentChar;

      while (cursor + 1 < input.length && input[cursor + 1].match(/[0-9]/)) {
        sequence += input[cursor + 1];
        cursor++;
        col++;
      }

      if (sequence.length > 1) {
        tokens.push({ token: sequence, identification: 'constante', size: sequence.length, position: `(${line},${col - sequence.length + 1})` });
      } else {
        tokens.push({ token: sequence, identification: 'number', size: sequence.length, position: `(${line},${col - sequence.length + 1})` });
      }

      cursor++;
      col++;
      continue;
    }

    if (currentChar.match(/[a-zA-Z]/)) {
      let identifier = '';

      while (input[cursor] && input[cursor].match(/[a-zA-Z]/)) {
        identifier += input[cursor];
        cursor++;
        col++;
      }

      if (keywords.includes(identifier)) {
        tokens.push({ token: identifier, identification: 'palavra reservada', size: identifier.length, position: `(${line},${col - identifier.length})` });
      } else if (identifiers.includes(identifier)) {
        tokens.push({ token: identifier, identification: 'identificador', size: identifier.length, position: `(${line},${col - identifier.length})` });
      } else {
        throw new Error(`Erro léxico: identificador '${identifier}' inválido em (${line},${col - identifier.length})`);
      }

      continue;
    }

    throw new Error(`Erro léxico: caractere '${currentChar}' inválido em (${line},${col})`);
  }

  return tokens;
};

const tokens = tokenize(input);

// Imprime a tabela
console.table(tokens);
