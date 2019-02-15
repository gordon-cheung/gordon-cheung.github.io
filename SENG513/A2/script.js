var previousExpression = ""
var currentExpression = "0"

$(".btn").click(function(e) {
  val = $(this).val()
  update(val)
})

function update(val) {
  handleInputLogic(val)
  $("#input-form").val(currentExpression)
}

function handleInputLogic(val) {
  if (currentExpression === "ERROR" || currentExpression === "NaN") {
    currentExpression = "0"
  }
  lastChar = currentExpression.slice(-1)
  if (isNumber(val)) {
    if  (currentExpression === "0") {
      replace(val)
    }
    else if ($("#clear-btn").val() === "AC") {
      removeAll()
      replace(val)
    }
    else if (isRightBracket(lastChar)) {
      append("*")
      append(val)
    }
    else {
      append(val)
    }
  }
  else if (isOperator(val)) {
    if (val === "+") {
      if (isOperator(lastChar)) {
        if (!isNegativeOperator()) {
          replace(val)
        }
      }
      else {
        if (!isLeftBracket(lastChar)) {
          append(val)
        }
      }
    }
    else if (val === "-") {
      if (currentExpression === "0") {
        replace(val)
      }
      else if (lastChar === "+") {
        replace(val)
      }
      else if (lastChar !== "-") {
        append(val)
        if (!isLeftBracket(lastChar) && !isNegativeOperator()) {
        }
      }
    }
    else {
      if (isOperator(lastChar)) {
        if (!isNegativeOperator()) {
          replace(val)
        }
      }
      else {
        if (!isLeftBracket(lastChar)) {
          append(val)
        }
      }
    }
  }
  else if (isDecimal(val)) {
    if (currentExpression === "0") {
      replace(val)
    }
    else if ($("#clear-btn").val() === "AC") {
      removeAll()
      replace(val)
    }
    else if (isDecimal(lastChar)) {
      // Do nothing
    }
    else if (isRightBracket(lastChar)) {
      append("*")
      append(val)
    }
    else {
      append(val)
    }
  }
  else if (isClear(val)) {
    remove()
  }
  else if (isAllClear(val)) {
    removeAll()
  }
  else if (isLeftBracket(val)) {
    if (currentExpression === "0") {
      replace(val)
    }
    else {
      append(val)
    }
  }
  else if (isRightBracket(val)) {
    if (numLeftBracket() > numRightBracket() && !isLeftBracket(lastChar)) {
      append(val)
    }
  }
  else if (isEqual(val)) {
    solve()
  }

  if (!isAllClear(val) && !isEqual(val)) {
    if ($("#clear-btn").val() ==="AC") {
      $("#clear-btn").val("CE")
      $("#clear-btn").html("CE")
    }
  }
}

function solve() {
  try
  {
      previousExpression = currentExpression + "= "
      $("#input-expression").html(previousExpression)
      currentExpression = String(eval(currentExpression))
      $("#clear-btn").html("AC")
      $("#clear-btn").val("AC")
  }
  catch (err)
  {
    currentExpression = "ERROR"
  }
}

function append(val) {
  currentExpression = currentExpression.concat(val)
}

function replace(val) {
  currentExpression = currentExpression.slice(0,-1) + val
}

function remove() {
  if (currentExpression.length == 1) {
    currentExpression = "0"
  }
  else if (currentExpression.length > 1) {
    currentExpression = currentExpression.slice(0,-1)
  }
}

function removeAll() {
  previousExpression = currentExpression
  $("#input-expression").html(previousExpression)
  currentExpression = "0"
  $("#clear-btn").html("CE")
  $("#clear-btn").val("CE")
}

function numLeftBracket(val) {
  var count = (currentExpression.match(/\(/g)||[]).length
  return count
}

function numRightBracket(val) {
  var count = (currentExpression.match(/\)/g)||[]).length
  return count
}

function isNegativeOperator() {
  var minusCharacter = currentExpression.slice(-1)
  if (minusCharacter === "-") {
    if (currentExpression.length > 1) {
      var lastChar = currentExpression.slice(-2, -1)
      if (isOperator(lastChar) || isLeftBracket(lastChar)) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return true;
    }
  }
  return false;
}

function isNumber(val) {
  var isnum = /^\d+$/.test(val)
  return isnum;
}

function isDecimal(val) {
  return val === "."
}

function isLeftBracket(val) {
  return val === "("
}

function isRightBracket(val) {
  return val === ")"
}

function isOperator(val) {
  if (val === "/" || val === "*" || val === "+" || val === "-") {
    return true
  }
  else {
    return false;
  }
}

function isClear(val) {
  return val === "CE"
}

function isAllClear(val) {
  return val === "AC"
}

function isEqual(val) {
  return val === "="
}
