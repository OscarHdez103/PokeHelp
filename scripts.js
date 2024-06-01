document.addEventListener('DOMContentLoaded', () => {
  const typeIcons = document.querySelectorAll('.type-icon');
  const slots = document.querySelectorAll('.slot');
  const leftSlots = document.querySelectorAll('#slot1, #slot2');
  const rightSlots = document.querySelectorAll('#slot3, #slot4');
  const clearLeftButton = document.getElementById('clearLeftSlots');
  const clearRightButton = document.getElementById('clearRightSlots');
  const switchButton = document.getElementById('switchBtn');
  let selectedSlot = null;



  slots.forEach(slot => {
    slot.addEventListener('click', () => {
      if (selectedSlot) {
        selectedSlot.classList.remove('selected');
      }
      if (selectedSlot === slot) {
        selectedSlot = null;
      } else {
        slot.classList.add('selected');
        selectedSlot = slot;
      }
    });

    const removeBtn = slot.querySelector('.remove-btn');
    removeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      slot.style.backgroundImage = '';
      slot.setAttribute('data-type', '');
      updateTypes(); // Call updateTypes when a type is removed
    });
  });

  typeIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      if (selectedSlot) {
        const selectedType = icon.getAttribute('data-type');
        selectedSlot.style.backgroundImage = `url('images/${selectedType}.png')`;
        selectedSlot.setAttribute('data-type', selectedType);
        selectedSlot.classList.remove('selected');
        selectedSlot = null;
        updateTypes(); // Call updateTypes when a type is set or changed
      }
    });
  });

  clearLeftButton.addEventListener('click', () => {
    leftSlots.forEach(slot => {
      slot.style.backgroundImage = '';
      slot.setAttribute('data-type', '');
    });
    updateTypes(); // Call updateTypes when all types are cleared
  });

  clearRightButton.addEventListener('click', () => {
    rightSlots.forEach(slot => {
      slot.style.backgroundImage = '';
      slot.setAttribute('data-type', '');
    });
    updateTypes(); // Call updateTypes when all types are cleared
  });

  // Keypress event listener to select slots
  document.addEventListener('keydown', (event) => {
    const searchInput = document.getElementById('searchInput');
    if (selectedSlot) {
      selectedSlot.classList.remove('selected');
    }
    if (event.shiftKey) {
      switch (event.code) {
        case 'Digit1':
          handleSaveLeftButtonClick(event, document.getElementById('save-left-1'));
          break;
        case 'Digit2':
          handleSaveLeftButtonClick(event, document.getElementById('save-left-2'));
          break;
        case 'Digit3':
          handleSaveLeftButtonClick(event, document.getElementById('save-left-3'));
          break;
        case 'Digit4':
          handleSaveLeftButtonClick(event, document.getElementById('save-left-4'));
          break;
        case 'Digit5':
          handleSaveLeftButtonClick(event, document.getElementById('save-left-5'));
          break;
        case 'Backspace':
          deleteSave(document.getElementById('save-left-1'));
          deleteSave(document.getElementById('save-left-2'));
          deleteSave(document.getElementById('save-left-3'));
          deleteSave(document.getElementById('save-left-4'));
          deleteSave(document.getElementById('save-left-5'));
          break;
        case 'Enter':
          if (document.activeElement === searchInput) {
            // If the input is already focused, trigger the search button click
            document.querySelector('.search-button').click();
            searchInput.blur();
          } else {
            // Otherwise, focus the input field
            searchInput.focus();
            searchInput.value = '';
          }
          break;
        default:
          selectedSlot = null;
      }
    } else if (event.ctrlKey) {
      switch (event.key) {
        case '1':
          event.preventDefault()
          handleSaveRightButtonClick(event, document.getElementById('save-right-1'));
          break;
        case '2':
          event.preventDefault()
          handleSaveRightButtonClick(event, document.getElementById('save-right-2'));
          break;
        case '3':
          event.preventDefault()
          handleSaveRightButtonClick(event, document.getElementById('save-right-3'));
          break;
        case '4':
          event.preventDefault()
          handleSaveRightButtonClick(event, document.getElementById('save-right-4'));
          break;
        case '5':
          event.preventDefault()
          handleSaveRightButtonClick(event, document.getElementById('save-right-5'));
          break;
        case 'Backspace':
          deleteSave(document.getElementById('save-right-1'));
          deleteSave(document.getElementById('save-right-2'));
          deleteSave(document.getElementById('save-right-3'));
          deleteSave(document.getElementById('save-right-4'));
          deleteSave(document.getElementById('save-right-5'));
          break;
        case 'Enter':
          if (document.activeElement === searchInput) {
            // If the input is already focused, trigger the search button click
            document.querySelector('.search-button').click();
            searchInput.blur();
          } else {
            // Otherwise, focus the input field
            searchInput.focus();
            searchInput.value = '';
          }
          break;
        default:
          selectedSlot = null;
      }
    } else {
      switch (event.key) {
        case '1':
          selectedSlot = selectedSlot === document.getElementById('slot1') ? null : document.getElementById('slot1');
          break;
        case '2':
          selectedSlot = selectedSlot === document.getElementById('slot2') ? null : document.getElementById('slot2');
          break;
        case '3':
          selectedSlot = selectedSlot === document.getElementById('slot3') ? null : document.getElementById('slot3');
          break;
        case '4':
          selectedSlot = selectedSlot === document.getElementById('slot4') ? null : document.getElementById('slot4');
          break;
        case '5':
          switchSlots();
          break;
        case 'Backspace':
          if (selectedSlot !== null) {
            selectedSlot.style.backgroundImage = '';
            selectedSlot.setAttribute('data-type', '');
          }
          updateTypes(); // Call updateTypes when a type is removed
          selectedSlot = null;
          break;
        case 'Enter':
          if (document.activeElement === searchInput) {
            // If the input is already focused, trigger the search button click
            document.querySelector('.search-button').click();
            searchInput.blur();
          } else {
            // Otherwise, focus the input field
            searchInput.focus();
          }
          break;
        default:
          selectedSlot = null;
      }
    }
    if (selectedSlot) {
      selectedSlot.classList.add('selected');
    }
  });

  switchButton.addEventListener('click', () => {
    switchSlots();
  });

  const saveRightButtons = document.querySelectorAll('.save-right-button');
  const saveLeftButtons = document.querySelectorAll('.save-left-button');

  saveRightButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default form submission behavior

      // Check if the event is triggered by a keyboard (Enter key)
      if (event.pointerId === -1) {
        // Do nothing if the event is from a keyboard
        return;
      }

      handleSaveRightButtonClick(event, button.parentElement);
    });
  });
  saveLeftButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default form submission behavior

      // Check if the event is triggered by a keyboard (Enter key)
      if (event.pointerId === -1) {
        // Do nothing if the event is from a keyboard
        return;
      }

      handleSaveLeftButtonClick(event, button.parentElement);
    });
  });
});

function deleteSave(saveContainer) {
  saveContainer.querySelector('.fake-slot-primary').style.backgroundImage = '';
  saveContainer.querySelector('.fake-slot-primary').setAttribute('data-type', '');
  saveContainer.querySelector('.fake-slot-secondary').style.backgroundImage = '';
  saveContainer.querySelector('.fake-slot-secondary').setAttribute('data-type', '');
}

/**
 * Adjusts the sizes of the icons inside the containers based on the number of types.
 */
function adjustIconSizes(container) {
  const imageContainer = container.querySelector('.image-container');
  const icons = imageContainer.querySelectorAll('img');
  const containerWidth = 700 - 10;
  const containerHeight = 100;
  const iconCount = icons.length;
  const maxWidthPerIcon = Math.min(containerWidth / iconCount, containerHeight) - 5;
  // console.log(maxWidthPerIcon);
  // console.log(containerWidth);
  // console.log(iconCount);
  icons.forEach(icon => {
    icon.style.width = `${maxWidthPerIcon}px`;
    icon.style.height = `${maxWidthPerIcon}px`;
  });
}

function switchSlots() {
  let leftPrimary = document.getElementById('slot1').getAttribute('data-type');
  let leftSecondary = document.getElementById('slot2').getAttribute('data-type');
  let rightPrimary = document.getElementById('slot3').getAttribute('data-type');
  let rightSecondary = document.getElementById('slot4').getAttribute('data-type');

  document.getElementById('slot1').style.backgroundImage = `url('images/${rightPrimary}.png')`;
  document.getElementById('slot1').setAttribute('data-type', rightPrimary);
  document.getElementById('slot2').style.backgroundImage = `url('images/${rightSecondary}.png')`;
  document.getElementById('slot2').setAttribute('data-type', rightSecondary);
  document.getElementById('slot3').style.backgroundImage = `url('images/${leftPrimary}.png')`;
  document.getElementById('slot3').setAttribute('data-type', leftPrimary);
  document.getElementById('slot4').style.backgroundImage = `url('images/${leftSecondary}.png')`;
  document.getElementById('slot4').setAttribute('data-type', leftSecondary);

  updateTypes();
}

/**
 * Adds a specific type into one of the colored containers.
 * @param {string} type - The type to add (e.g., 'fire', 'water').
 * @param {string} side - The side to add the type ('left' or 'right').
 * @param {number} position - The position in the container (0: dark gray, 0.5: red, 1: light gray, 2: green).
 */
function addTypeToContainer(type, side, position) {
  if (position !== 0) {
    removeTypeFromContainer(type, side, 0);
  }
  if (position !== 0.5) {
    removeTypeFromContainer(type, side, 0.5);
  }
  if (position !== 1) {
    removeTypeFromContainer(type, side, 1);
  }
  if (position !== 2) {
    removeTypeFromContainer(type, side, 2);
  }

  const className = getPositionIndex(position);
  if (!className) {
    console.error('Invalid position value.');
    return;
  }
  const container = document.querySelector(`.center-container .rect-container.${side} .rect.${className}`);
  if (!container) {
    console.error('Container not found for the given side and position.');
    return;
  }
  const imageContainer = container.querySelector('.image-container');
  const currentTypes = container.getAttribute('data-types') ? container.getAttribute('data-types').split(',') : [];
  if (undefined === type) {
    return;
  }
  if (!currentTypes.includes(type)) {
    currentTypes.push(type);
    container.setAttribute('data-types', currentTypes.join(','));

    // Create a new img element for the type
    const img = document.createElement('img');
    img.src = `images/${type}.png`;
    img.alt = type;

    // Append the img element to the image container
    imageContainer.appendChild(img);

    // Adjust the sizes of the icons
    adjustIconSizes(container);

  } else {
    // console.log(`Type ${type} already exists in ${side} side at position ${position}`);
  }
}

/**
 * Removes a specific type from a specified container.
 * @param {string} type - The type to remove (e.g., 'fire', 'water').
 * @param {string} side - The side to remove the type ('left' or 'right').
 * @param {number} position - The position in the container (0: dark gray, 0.5: red, 1: light gray, 2: green).
 * @returns {boolean} - Returns true if the type was found and removed, false otherwise.
 */
function removeTypeFromContainer(type, side, position) {
  const className = getPositionIndex(position);
  if (!className) {
    console.error('Invalid position value.');
    return false;
  }
  const container = document.querySelector(`.center-container .rect-container.${side} .rect.${className}`);
  if (!container) {
    console.error('Container not found for the given side and position.');
    return false;
  }
  const imageContainer = container.querySelector('.image-container');
  let currentTypes = container.getAttribute('data-types') ? container.getAttribute('data-types').split(',') : [];

  if (currentTypes.includes(type)) {
    currentTypes = currentTypes.filter(t => t !== type);
    container.setAttribute('data-types', currentTypes.join(','));

    // Remove the corresponding img element from the image container
    const img = imageContainer.querySelector(`img[alt="${type}"]`);
    if (img) {
      imageContainer.removeChild(img);
    }

    // Adjust the sizes of the icons
    adjustIconSizes(container);

    return true;
  } else {
    // console.log(`Type ${type} not found in ${side} side at position ${position}`);
    return false;
  }
}

/**
 * Updates the types for a specified side.
 */
function updateTypes() {
  // Implement your logic here

  let leftTypes = getTypesFromSlots('left');
  let rightTypes = getTypesFromSlots('right');

  allTypes.forEach(type => {
    let eff = 1;
    leftTypes.forEach(t => {
      let temp = getEffectiveness(t, type);
      // console.log(`Effectiveness of ${t} against ${type}: ${temp}`);
      if (temp >= 2 || eff >= 2) eff = 2;
      else if (temp === 0 || eff === 0) eff = 0;
      else if (((temp <= 0.5) && (temp > 0)) || ((eff <= 0.5) && (eff > 0))) eff = 0.5;
      else eff = 1;
    });

    if (eff >= 2) {
      addTypeToContainer(type, 'left', 2);
    } else if (eff === 1) {
      addTypeToContainer(type, 'left', 1);
    } else if (eff <= 0.5 && eff > 0) {
      addTypeToContainer(type, 'left', 0.5);
    } else if (eff === 0) {
      addTypeToContainer(type, 'left', 0);
    }
  });

  allTypes.forEach(type => {
    let eff = 1;
    rightTypes.forEach(t => {
      eff *= getEffectiveness(type, t);
    });

    if (eff >= 2) {
      addTypeToContainer(type, 'right', 2);
    } else if (eff === 1) {
      addTypeToContainer(type, 'right', 1);
    } else if (eff <= 0.5 && eff > 0) {
      addTypeToContainer(type, 'right', 0.5);
    } else if (eff === 0) {
      addTypeToContainer(type, 'right', 0);
    }
  });

  let leftPrimaryTypes = getTypeFromSlot('left', 'primary');
  let leftSecondaryTypes = getTypeFromSlot('left', 'secondary');
  let rightPrimaryTypes = getTypeFromSlot('right', 'primary');
  let rightSecondaryTypes = getTypeFromSlot('right', 'secondary');

  if (leftPrimaryTypes !== null) {
    let eff = 1;
    rightTypes.forEach(t => {
      eff *= getEffectiveness(leftPrimaryTypes, t);
    });
    updateCenterLabel('1', 'x'+eff);
  } else {
    updateCenterLabel('1', 'x?');
  }
  if (leftSecondaryTypes !== null) {
    let eff = 1;
    rightTypes.forEach(t => {
      eff *= getEffectiveness(leftSecondaryTypes, t);
    });
    updateCenterLabel('3', 'x'+eff);
  } else {
    updateCenterLabel('3', 'x?');
  }
  if (rightPrimaryTypes !== null) {
    let eff = 1;
    leftTypes.forEach(t => {
      eff *= getEffectiveness(rightPrimaryTypes, t);
    });
    updateCenterLabel('2', 'x'+eff);
  } else {
    updateCenterLabel('2', 'x?');
  }
  if (rightSecondaryTypes !== null) {
    let eff = 1;
    leftTypes.forEach(t => {
      eff *= getEffectiveness(rightSecondaryTypes, t);
    });
    updateCenterLabel('4', 'x'+eff);
  } else {
    updateCenterLabel('4', 'x?');
  }



}

/**
 * Gets all the types from the slots on a specified side.
 * @param {string} side - The side to get the types from ('left' or 'right').
 * @returns {string[]} - An array of types.
 */
function getTypesFromSlots(side) {
  const slots = side === 'left' ? document.querySelectorAll('#slot1, #slot2') : document.querySelectorAll('#slot3, #slot4');
  const types = [];
  slots.forEach(slot => {
    const type = slot.getAttribute('data-type');
    if (type) {
      types.push(type);
    }
  });
  return types;
}

/**
 * Maps the position value to the corresponding class name.
 * @param {number} position - The position value (0, 0.5, 1, 2).
 * @returns {string|null} - The class name corresponding to the position value.
 */
function getPositionIndex(position) {
  const positionMap = {
    0: 'dark-gray',
    0.5: 'red',
    1: 'light-gray',
    2: 'green'
  };
  return positionMap[position] || null;
}

const allTypes = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
  'dragon', 'dark', 'steel', 'fairy'
];

const typeEffectivenessChart = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
};


/**
 * Returns the effectiveness of an attack type against a defense type.
 * @param {string} attackType - The attacking Pokémon's type.
 * @param {string} defenseType - The defending Pokémon's type.
 * @returns {number} - The effectiveness value (0, 0.5, 1, or 2).
 */
function getEffectiveness(attackType, defenseType) {
  if (typeEffectivenessChart[attackType] && typeEffectivenessChart[attackType][defenseType] !== undefined) {
    return typeEffectivenessChart[attackType][defenseType];
  }
  return 1; // Default to normal effectiveness
}

/**
 * Updates the text content of a specified center label.
 * @param {string} labelId - The ID of the label to update.
 * @param {string} newText - The new text to set for the center label.
 */
function updateCenterLabel(labelId, newText) {
  const labelName = 'label'+labelId;
  const label = document.getElementById(labelName);
  if (label) {
    label.textContent = newText;
    if (newText === 'x2') {
      label.style.backgroundColor = 'green';
    } else if (newText === 'x4') {
      label.style.backgroundColor = 'darkgreen';
    } else if (newText === 'x0') {
      label.style.backgroundColor = 'black';
    } else if (newText === 'x0.5') {
      label.style.backgroundColor = 'red';
    } else if (newText === 'x0.25') {
      label.style.backgroundColor = 'darkred';
    } else {
      label.style.backgroundColor = 'gray';
    }
    // console.log(`Updated ${labelName} to: ${newText}`);
  } else {
    console.error(`Label with ID ${labelId} not found.`);
  }
}

/**
 * Gets the type from a specific slot on a specified side.
 * @param {string} side - The side to get the type from ('left' or 'right').
 * @param {string} slot - The slot to get the type from ('primary' or 'secondary').
 * @returns {string|null} - The type in the specified slot, or null if no type is set.
 */
function getTypeFromSlot(side, slot) {
  let slotElement;
  if (side === 'left') {
    slotElement = slot === 'primary' ? document.getElementById('slot1') : document.getElementById('slot2');
  } else {
    slotElement = slot === 'primary' ? document.getElementById('slot3') : document.getElementById('slot4');
  }
  const type = slotElement ? slotElement.getAttribute('data-type') : null;
  return type || null;
}

/**
 * Handle the click event for save buttons.
 * @param {Event} event - The click event object.
 * @param {HTMLElement} saveContainer - The save container element.
 */
function handleSaveLeftButtonClick(event, saveContainer) {
  let leftPrimary = document.getElementById('slot1').getAttribute('data-type');
  let leftSecondary = document.getElementById('slot2').getAttribute('data-type');
  let primaryFakeSlot = saveContainer.querySelector('.fake-slot-primary').getAttribute('data-type');
  let secondaryFakeSlot = saveContainer.querySelector('.fake-slot-secondary').getAttribute('data-type');

  // Update normal slots with types from fake slots
  document.getElementById('slot1').style.backgroundImage = `url('images/${primaryFakeSlot}.png')`;
  document.getElementById('slot1').setAttribute('data-type', primaryFakeSlot);
  document.getElementById('slot1').style.backgroundSize = 'cover'; // Revert size to normal

  document.getElementById('slot2').style.backgroundImage = `url('images/${secondaryFakeSlot}.png')`;
  document.getElementById('slot2').setAttribute('data-type', secondaryFakeSlot);
  document.getElementById('slot2').style.backgroundSize = 'cover'; // Revert size to normal

  // Update fake slots with types from normal slots
  saveContainer.querySelector('.fake-slot-primary').style.backgroundImage = `url('images/${leftPrimary}.png')`;
  saveContainer.querySelector('.fake-slot-primary').setAttribute('data-type', leftPrimary);
  saveContainer.querySelector('.fake-slot-primary').style.backgroundSize = 'contain'; // Reduce size for fake slot

  saveContainer.querySelector('.fake-slot-secondary').style.backgroundImage = `url('images/${leftSecondary}.png')`;
  saveContainer.querySelector('.fake-slot-secondary').setAttribute('data-type', leftSecondary);
  saveContainer.querySelector('.fake-slot-secondary').style.backgroundSize = 'contain'; // Reduce size for fake slot

  updateTypes();
}

function handleSaveRightButtonClick(event, saveContainer) {
  let rightPrimary = document.getElementById('slot3').getAttribute('data-type');
  let rightSecondary = document.getElementById('slot4').getAttribute('data-type');
  let primaryFakeSlot = saveContainer.querySelector('.fake-slot-primary').getAttribute('data-type');
  let secondaryFakeSlot = saveContainer.querySelector('.fake-slot-secondary').getAttribute('data-type');

  // Update normal slots with types from fake slots
  document.getElementById('slot3').style.backgroundImage = `url('images/${primaryFakeSlot}.png')`;
  document.getElementById('slot3').setAttribute('data-type', primaryFakeSlot);
  document.getElementById('slot3').style.backgroundSize = 'cover'; // Revert size to normal

  document.getElementById('slot4').style.backgroundImage = `url('images/${secondaryFakeSlot}.png')`;
  document.getElementById('slot4').setAttribute('data-type', secondaryFakeSlot);
  document.getElementById('slot4').style.backgroundSize = 'cover'; // Revert size to normal

  // Update fake slots with types from normal slots
  saveContainer.querySelector('.fake-slot-primary').style.backgroundImage = `url('images/${rightPrimary}.png')`;
  saveContainer.querySelector('.fake-slot-primary').setAttribute('data-type', rightPrimary);
  saveContainer.querySelector('.fake-slot-primary').style.backgroundSize = 'contain'; // Reduce size for fake slot

  saveContainer.querySelector('.fake-slot-secondary').style.backgroundImage = `url('images/${rightSecondary}.png')`;
  saveContainer.querySelector('.fake-slot-secondary').setAttribute('data-type', rightSecondary);
  saveContainer.querySelector('.fake-slot-secondary').style.backgroundSize = 'contain'; // Reduce size for fake slot

  updateTypes();
}

// Search function
async function searchAttack(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const input = document.getElementById('searchInput').value.toLowerCase().replace(/\s+/g, '-');
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';

  if (input) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/move/${input}`);
      if (!response.ok) {
        throw new Error('Move not found');
      }
      const move = await response.json();

      const resultItem = document.createElement('div');
      resultItem.classList.add('result-item');
      resultItem.innerHTML = `
        <table>
          <tr>
            <th colspan="2">${move.name}</th>
          </tr>
          <tr>
            <td>Type:</td>
            <td>${move.type.name}</td>
          </tr>
          <tr>
            <td>Power:</td>
            <td>${move.power !== null ? move.power : 'N/A'}</td>
          </tr>
          <tr>
            <td>Accuracy:</td>
            <td>${move.accuracy !== null ? move.accuracy : 'N/A'}</td>
          </tr>
          <tr>
            <td>PP:</td>
            <td>${move.pp}</td>
          </tr>
          <tr>
            <td>Damage Class:</td>
            <td>${move.damage_class.name}</td>
          </tr>
          <tr>
            <td>Effect:</td>
            <td>${move.effect_entries.length ? move.effect_entries[0].effect : 'N/A'}</td>
          </tr>
        </table>
      `;
      resultsContainer.appendChild(resultItem);

    } catch (error) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/ability/${input}?language=en`);
        if (!response.ok) {
          throw new Error('Ability not found');
        }
        const ability = await response.json();

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
    <table>
      <tr>
        <th colspan="2">${ability.name}</th>
      </tr>
      <tr>
        <td>Generation:</td>
        <td>${ability.generation.name}</td>
      </tr>
      <tr>
        <td>Short Effect:</td>
        <td>${ability.effect_entries.length ? ability.effect_entries.find(entry => entry.language.name === 'en').short_effect : 'N/A'}</td>
      </tr>
      <tr>
        <td>Pokemon:</td>
        <td>${ability.pokemon.length ? ability.pokemon.map(p => p.pokemon.name).join(', ') : 'N/A'}</td>
      </tr>
      <tr>
        <td>Effect:</td>
        <td>${ability.effect_entries.length ? ability.effect_entries.find(entry => entry.language.name === 'en').effect : 'N/A'}</td>
      </tr>
    </table>
  `;
        resultsContainer.appendChild(resultItem);

      } catch (ability_error) {
        console.error('Error fetching Pokémon ability:', error);
        const errorItem = document.createElement('div');
        errorItem.classList.add('result-item');
        errorItem.textContent = `Error: ${error.message}`;
        resultsContainer.appendChild(errorItem);
      }

    }
  }
}
updateTypes();



