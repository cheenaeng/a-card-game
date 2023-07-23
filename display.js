const displaySetup = () => {
  const createButton = ({ classAtt, btnId, buttonName }) => {
    const btn = document.createElement('button')
    btn.innerText = buttonName

    if (classAtt) {
      btn.classList.add(...classAtt)
    }

    if (btnId) {
      btn.id = btnId
    }
    return btn
  }

  const createInput = ({ type, classAtt, inputId, ...inputprops }) => {
    const input = document.createElement('input')
    input.type = type

    if (type === 'text') {
      input.placeholder = inputprops?.placeholder
    }

    if (type === 'number') {
      input.min = inputprops?.min
      input.max = inputprops?.max
    }

    if (classAtt) {
      input.classList.add(classAtt)
    }

    if (inputId) {
      input.id = inputId
    }

    input.onchange = inputprops?.onchange

    return input
  }

  return {
    createButton,
    createInput,
  }
}
