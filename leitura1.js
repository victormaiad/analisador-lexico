const PALAVRA_CHAVE = ['while', 'do'];
const OPERADOR = ['<', '=', '+'];
const TERMINADOR = ';';
const IDENTIFICADOR = ['i', 'j'];

function lex(code) {
  const tokens = [];
  let pos = 0;
  let line = 0;
  let col = 0;
  
  while (pos < code.length) {
    let char = code[pos];
    
    if (/\s/.test(char)) {
      pos++;
      col++;
    }
    else if (char === TERMINADOR) {
      tokens.push({ token: char, id: 'Terminador', tamanho: 1, line, col });
      pos++;
      col++;
    }
    else if (/\d/.test(char)) {
      let tamanho = 1;
      let value = '';
      while (/\d/.test(code[pos + tamanho])) {
        value += code[pos + tamanho];
        tamanho++;
      }
      tokens.push({ token: char + value, id: 'Constante', tamanho, line, col });
      pos += tamanho;
      col += tamanho;
    }
    else if (/[a-zA-Z]/.test(char)) {
      let tamanho = 1;
      let value = '';
      while (/[a-zA-Z]/.test(code[pos + tamanho])) {
        value += code[pos + tamanho];
        tamanho++;
      }
      if (PALAVRA_CHAVE.includes(char + value)) {
        tokens.push({ token: char + value, id: 'Palavra-Chave', tamanho, line, col });
      }
      else if (IDENTIFICADOR.includes(char)) {
        tokens.push({ token: char, id: 'Identificador', tamanho: 1, line, col });
      }
      else {
        throw new Error(`Invalid identifier '${char + value}' at line ${line}, column ${col}`);
      }
      pos += tamanho;
      col += tamanho;
    }
    else if (OPERADOR.includes(char)) {
      tokens.push({ token: char, id: 'Operador', tamanho: 1, line, col });
      pos++;
      col++;
    }
    else {
      throw new Error(`Invalid character '${char}' at line ${line}, column ${col}`);
    }
    
    if (char === '\n') {
      line++;
      col = 1;
    }
  }
  
  return tokens;
}


const code  = 'while i < 100 do i = i + j;';

const tokens = lex(code);

console.table(tokens);

