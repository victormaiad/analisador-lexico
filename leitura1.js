function scanner(programa) {
  // separa o programa em tokens (unidades léxicas)
  var tokens = programa.match(/while|do|[ij]|[0-9]+|[<+=;]/g);

  // itera sobre cada token e classifica seu tipo
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    // verifica se é uma palavra reservada
    if (token === "while" || token === "do") {
      console.log("Palavra reservada: " + token);
    }
    // verifica se é um operador
    else if (token === "<" || token === "=" || token === "+") {
      console.log("Operador: " + token);
    }
    // verifica se é um terminador
    else if (token === ";") {
      console.log("Terminador: " + token);
    }
    // verifica se é um identificador
    else if (token === "i" || token === "j") {
      console.log("Identificador: " + token);
    }
    // verifica se é uma constante
    else if (/^[0-9]+$/.test(token)) {
      console.log("Constante: " + token);
    }
    // se não for nenhum dos tipos acima, é um token inválido
    else {
      console.log("Token inválido: " + token);
    }
  }
}

scanner("while i < 100 do i = i + j;");