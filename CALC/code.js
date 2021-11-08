
const a = document.querySelector("button");

a.addEventListener("click", () => {
  document.querySelector("#container").className = "open"
  a.className = "close"
})



const firstScreen = document.querySelectorAll(".output")[0];

const secondScreen = document.querySelectorAll(".output")[1];

let buttons = document.querySelectorAll(".item");

let memory = null;
let operation = null;

secondScreen.value="";

buttons.forEach((item) => {
  item.addEventListener("click", (e) => {
    action(e.target.innerText);

  })
})

function action(data) {

  switch (data) {

    case "C":
      clear()

    case "🠐":
      del();
      break;

    case "+":
      writeMemory(data);
      break;

    case "-":
      writeMemory(data);
      break;

    case "/":
      writeMemory(data)
      break;

    case "X":
      writeMemory(data)
      break;

    case "=":
      equal();
      break;

    case "±":
      plusMinus()
      break;

    case "%":
      writeMemory(data)
      break;

    case ".":
      point()
      break;

    default:
      writeNuber(data)
      break;
  }

}


function writeNuber(data) {
    if (secondScreen.value.toString().length < 8 && (!(data == "0" && secondScreen.value == "0"))) {
      secondScreen.value += data;
    }
}


function del() {

  if (secondScreen.value.length === 1 || (secondScreen.value.length === 2 && secondScreen.value[0] === "-")) {
    secondScreen.value = "";
  } else {
    secondScreen.value = secondScreen.value.slice(0, -1);
  }



}

function calculate(x, y, op) {

  switch (op) {
      case "+":
        return (x*10000000 + y*10000000)/10000000;
    case "-":
        return (x*10000000 - y*10000000)/10000000;
    case "X":
        return ((x*10000000) * (y*10000000))/(10000000*10000000);
    case "/":
        return (x*10000000 / (y*10000000));
    case "%":
        return (x*10000000/100 * (y*10000000))/(10000000*10000000);
    default:
        break;

  }
}

function writeMemory(data) {

  if (operation) {
    memory = calculate(+memory, +secondScreen.value, operation);
    if (memory.toString().length > 14) {
      memory=memory.toExponential(8);
    }
    operation = data;
    firstScreen.value = memory + data;
    secondScreen.value = "";




  } else {
    memory = secondScreen.value;
    secondScreen.value = "";
    firstScreen.value = memory + data;
    operation = data;
  }

}


function clear() {
  secondScreen.value = "";
  memory = null;
  operation = null;
  firstScreen.value = "";
}

function equal() {
  if (operation) {
    let localMemory = calculate(+memory, +secondScreen.value, operation);
    if (localMemory.toString().length > 14) {
      localMemory=localMemory.toExponential(8);
    }
    clear();
    secondScreen.value = localMemory;
  }

}

function plusMinus() {

  if (secondScreen.value.indexOf("-") !== -1) {
    secondScreen.value = secondScreen.value.substr(1);
  } else {
    secondScreen.value = "-" + secondScreen.value;
  }

}


function point() {
  if (secondScreen.value == "") {
    secondScreen.value = "0."
  } else {
      if (secondScreen.value.indexOf(".") === -1) {
    secondScreen.value += ".";
  }
  }

}


