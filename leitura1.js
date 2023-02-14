const fs = require('fs');

// Tabela de palavras reservadas
const reservedWords = {
  while: 'Palavra reservada',
  do: 'Palavra reservada',
};

// Tabela de símbolos
const symbolTable = {};

let line = 0;
let column = 0;

// Função para verificar se um caracter é um dígito
function isDigit(char) {
  return /\d/.test(char);
}

// Função para verificar se um caracter é um identificador
function isIdentifier(char) {
  return /[a-zA-Z]/.test(char);
}

// Função para verificar se um caracter é um operador
function isOperator(char) {
  return /[<+=]/.test(char);
}

// Função para verificar se um caracter é um terminador
function isTerminator(char) {
  return char === ';';
}

// Função para adicionar um símbolo na tabela de símbolos, caso ele não exista
function addSymbol(symbol) {
  if (!symbolTable[symbol]) {
    const index = Object.keys(symbolTable).length + 1;
    symbolTable[symbol] = index;
  }
}

// Função para analisar o arquivo e gerar as tabelas
function analyzeFile(fileName) {
  const data = fs.readFileSync(fileName, 'utf8');
  let lexeme = '';

  for (let i = 0; i < data.length; i++) {
    const char = data[i];

    if (char === '\n') {
      line++;
      column = 0;
      continue;
    }

    if (char === ' ') {
      column++;
      continue;
    }

    // Identificação de palavras reservadas
    if (char === 'w') {
      lexeme += char;
      i++;
      column++;

      if (data[i] === 'h' && data[i + 1] === 'i' && data[i + 2] === 'l' && data[i + 3] === 'e' && !isIdentifier(data[i + 4])) {
        console.log(`${lexeme} ${reservedWords.while} ${lexeme.length} (${line}, ${column - lexeme.length})`);
        lexeme = '';
        continue;
      } else {
        i -= 3;
        column -= 3;
        lexeme = lexeme.slice(0, -1);
      }
    }

    if (char === 'd') {
      lexeme += char;
      i++;
      column++;

      if (data[i] === 'o' && !isIdentifier(data[i + 1])) {
        console.log(`${lexeme} ${reservedWords.do} ${lexeme.length} (${line}, ${column - lexeme.length})`);
        lexeme = '';
        continue;
      } else {
        i--;
        column--;
        lexeme = lexeme.slice(0, -1);
      }
    }

    // Identificação de constantes e identificadores
    if (isDigit(char) || isIdentifier(char)) {
      lexeme += char;
      column++;

      while (isDigit(data[i + 1]) || isIdentifier(data[i + 1])) {
        lexeme += data[i + 1];
        i++;
        column++;
      }

      if (isIdentifier(lexeme[0])) {
        addSymbol(lexeme);
        console.log(`${lexeme} [Identificador (${symbolTable[lexeme]})] ${lexeme.length} (${line}, ${column - lex}`)
      }

      if (isDigit(lexeme[0])) {
        console.log(`${lexeme} [Constante] ${lexeme.length} (${line}, ${column - lexeme.length})`);
      }
    
      lexeme = '';
      continue;
    }
    
    // Identificação de operadores
    if (isOperator(char)) {
      console.log(`${char} [Operador] 1 (${line}, ${column})`);
      column++;
      continue;
    }
    
    // Identificação de terminadores
    if (isTerminator(char)) {
      console.log(`${char} [Terminador] 1 (${line}, ${column})`);
      column++;
      continue;
    }
    
    // Caracter inválido
    console.log(`${char} [Erro] 1 (${line}, ${column})`);
    column++;}

    console.log('\nTabela de símbolos');
    console.log('Índice\tSímbolo');
    for (const symbol in symbolTable) {
    console.log(${symbolTable[symbol]}\t${symbol});
    }
    }

    // Chamada da função para análise do arquivo
    analyzeFile('entrada.txt');
    
    