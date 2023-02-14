const code = "while i < 100 do i = i + j;";
const palavraChave = ["while", "do"];
const operador = ["<", "+", "="];
const constante = ["100"];
const tokens = [];


let currentToken = "";
let tokenType = "";
let line = 0;
let column = -1;

for (const char of code) {
  if (char === "\n") {
    line++;
    column = 0;
  } else {
    column++;
  }

  if (char === " " || char === "\n" || char === ";") {
    if (currentToken.length === 0) {
      continue;
    }


    let startColumn = column - currentToken.length; //Começa contar do inicio do idenficador e não no final

    if (palavraChave.includes(currentToken)) {
      tokenType = "PALAVRA-CHAVE";
    } else if (operador.includes(currentToken)) {
      tokenType = "OPERADOR";
    } else if (constante.includes(currentToken)) {
      tokenType = "CONSTANTE";
    } else {
      tokenType = "IDENTIFICADOR";
    }


    tokens.push({ type: tokenType, value: currentToken, line, startColumn });
    currentToken = "";
  } else {
    currentToken += char;
  }
}

console.log(tokens);
