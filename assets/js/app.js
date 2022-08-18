/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of spade (Espadas)
 * */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let playerPoints = 0,
  computerPoints = 0;

// Referencias HTML
const btnCard = document.querySelector('#btnCard');
const btnStop = document.querySelector('#btnStop');
const btnNew = document.querySelector('#btnNew');
const cardPlayer = document.querySelector('#player-deck');
const cardComputer = document.querySelector('#computer-deck');
const pointsHTML = document.querySelectorAll('small');
console.log(pointsHTML);

console.log(btnCard);

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  // console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
};
crearDeck();

const pedirCarta = () => {
  if (deck.length === 0) {
    throw 'No hay cartas en el mazo';
  }

  let carta = deck.pop();

  // console.log(deck);
  console.log(carta);
  return carta;
};
// for(let i = 0; i < 80; i++ ){
//   pedirCarta();
// }

// pedirCarta();

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;

  // let puntos = 0;

  // if (isNaN(valor)){

  //   puntos = (valor === 'A') ? 11 : 10;

  // } else {

  //   puntos = valor * 1;

  // }
};

// const valor = valorCarta(pedirCarta());
// console.log({valor});

// turno computadora

const computerTurn = (minPoints) => {
  do {
    const card = pedirCarta();

    computerPoints = computerPoints + valorCarta(card);
    console.log(computerPoints);

    pointsHTML[1].innerText = computerPoints;

    const imgCard = document.createElement('img');
    imgCard.src = `/assets/cartas/${card}.png`;
    imgCard.classList.add('card');
    cardComputer.append(imgCard);

    if (minPoints > 21) {
      break;
    }
  } while (computerPoints < minPoints && minPoints <= 21);

  setTimeout(() => {
    if (minPoints <= 21 && minPoints > computerPoints) {
      alert('Felicidades, ganaste!');
    } else if (minPoints > 21) {
      alert('La computadora gana');
    } else if (computerPoints <= 21 && computerPoints > minPoints) {
      alert('La computadora gana');
    } else if (computerPoints > minPoints && computerPoints > 21) {
      alert('Felicidades, ganaste!');
    } else if (computerPoints > 21 && minPoints < 21) {
      alert('Felicidades, ganaste!');
    } else if (minPoints === computerPoints) {
      alert('Nadie gana');
    }
  }, 10);
};

/////////// Eventos

btnCard.addEventListener('click', () => {
  const card = pedirCarta();

  playerPoints = playerPoints + valorCarta(card);

  pointsHTML[0].innerText = playerPoints;

  //<img class="card" src="/assets/cartas/2C.png" alt="">
  const imgCard = document.createElement('img');
  imgCard.src = `/assets/cartas/${card}.png`;
  imgCard.classList.add('card');
  cardPlayer.append(imgCard);

  if (playerPoints > 21) {
    console.warn('Lo siento mucho, perdiste');
    btnCard.disabled = true;
    btnStop.disabled = true;
    computerTurn(playerPoints);
  } else if (playerPoints === 21) {
    console.warn('21, genial!');
    btnCard.disabled = true;
    btnStop.disabled = true;
    computerTurn(playerPoints);
  }
});

btnStop.addEventListener('click', () => {
  btnCard.disabled = true;
  btnStop.disabled = true;
  computerTurn(playerPoints);
});

btnNew.addEventListener('click', () => {
  deck = [];
  crearDeck();
  console.log(deck);
  playerPoints = 0;
  computerPoints = 0;
  btnCard.disabled = false;
  btnStop.disabled = false;
  pointsHTML[0].innerText = 0;
  pointsHTML[1].innerText = 0;
  cardPlayer.innerHTML = '';
  cardComputer.innerHTML = '';
});
