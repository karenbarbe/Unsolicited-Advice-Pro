'use strict';

/*
function shufflePro() {

  let shuffled = deck
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  console.log(shuffled);

  let index = 0;
  let majorCount = 0;

  const major1 = [], major2 = [], major3 = [];
  const minor1 = [], minor2 = [], minor3 = [];

  while (index < shuffled.length && majorCount < 3) {
    const card = shuffled[index];
    
    if (majorArcana.includes(card)) {
      if (majorCount === 0) major1.push(card);
      else if (majorCount === 1) major2.push(card);
      else if (majorCount === 2) major3.push(card);
      majorCount++;
    } else {
      if (majorCount === 0) minor1.push(card);
      else if (majorCount === 1) minor2.push(card);
      else if (majorCount === 2) minor3.push(card);
    }
    
    index++;
  }
  return { major1, minor1, major2, minor2, major3, minor3 };

}
const reading = shufflePro();
const { major1, minor1, major2, minor2, major3, minor3 } = reading;






function displayCards() {
  const major1H = document.getElementById('major1');
  major1H.textContent = major1;

  const major2H = document.getElementById('major2');
  major2H.textContent = major2;

  const major3H = document.getElementById('major3');
  major3H.textContent = major3;

  const minor1Ul = document.getElementById('minor1');
  createListItems(minor1, minor1Ul);

  const minor2Ul = document.getElementById('minor2');
  createListItems(minor2, minor2Ul);

  const minor3Ul = document.getElementById('minor3');
  createListItems(minor3, minor3Ul);
}

displayCards();

*/

/*
function createListItems(array, parentElement) {
  const fragment = document.createDocumentFragment();

  array.forEach(arrayItem => {
    const listItem = document.createElement("li");
    listItem.textContent = arrayItem;
    fragment.appendChild(listItem);
  });
parentElement.appendChild(fragment)
}*/



function createMinorName(i) {
  const cardNumber = document.getElementById(`number${i}`).value;
  const cardSuit = document.getElementById(`suit${i}`).value;
  let cardName = `${cardNumber} of ${cardSuit}`;
  console.log(cardName);
  return cardName;
}


function createMinorLi(i) {
  const minorList = document.getElementById(`minor-list${i}`);
  const cardItem = document.createElement('li');
  cardItem.textContent = createMinorName(i);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Remove card';
  minorList.append(cardItem, deleteButton);
}


function addMinorCard(i) {
  const minorButton = document.getElementById(`add-minor${i}`);
  minorButton.addEventListener('click', () => createMinorLi(i));
}





function getMajorName(i) {
  const majorCard = document.getElementById(`add-major${i}`).value;
  return majorCard;
}

function getMajorImage(i) {
  const cardName = getMajorName(i);

  let imageName = '';
  majorArcanaData.forEach(card => {
    const { name, number } = card;

    if (name === cardName) {
      if (number >= 1 && number < 10 ) {
        imageName = `a0${number}.jpg`;
      } else {
        imageName = `a${number}.jpg`;
      }
    }
  })
  return imageName;
}


function addMajorCard(i) {
  const majorSelect = document.getElementById(`add-major${i}`);
  const img = document.querySelector(`#card${i} img`);
  majorSelect.addEventListener('change', function() {
    const imageName = getMajorImage(i);
    img.alt = getMajorName(i);
    img.src = `./assets/images/${imageName}`;
    getMajorInfo(i, majorArcanaData);
    getAspects();
  })
}

addMajorCard(1);
addMajorCard(2);
addMajorCard(3);


function getMajorNumber(i) {
  const cardName = getMajorName(i);
  let imageNumber = 0;
  majorArcanaData.forEach(major => {
    const { name, number } = major;
    if (name === cardName) {
      imageNumber = number;
    }
  })
  return imageNumber;
}


function sumCards(...cardNumbers) {
  let sum = 0;
  for (let i = 0; i < cardNumbers.length; i++) {
    sum += getMajorNumber(cardNumbers[i]);
  }
  
  if (sum > 22) {
    sum = Math.floor(sum / 10) + (sum % 10);
  } 
  return sum;
}


function getMajorInfo(i) {
  const dilemmaElmt = document.getElementById(`dilemma-${i}`);
  const questionsElmt = document.getElementById(`questions-${i}`);
  const perspectivesPElmt = document.getElementById(`perspectives-p-${i}`);
  const perspectivesElmt = document.getElementById(`perspectives-${i}`);
  const keywordsElmt = document.getElementById(`keywords-${i}`);
  const messageElmt = document.getElementById(`message-${i}`);
  const cardName = getMajorName(i);

  majorArcanaData.forEach(card => {
    const { name, dilemma, questions, perspectives, keywords, message } = card;
    if (name === cardName) {
      dilemmaElmt.textContent = dilemma;
      questionsElmt.innerHTML = '';
      questionsElmt.appendChild(createListItems(questions));
      perspectivesPElmt.textContent = `${name}:`;
      perspectivesElmt.innerHTML = '';
      perspectivesElmt.appendChild(createListItems(perspectives));
      keywordsElmt.innerHTML = '';
      keywordsElmt.appendChild(createListItems(keywords));
      messageElmt.textContent = message;
    }
  })
}

function getAspects() {
  const card1 = document.getElementById('add-major1');
  const card2 = document.getElementById('add-major2');
  const card3 = document.getElementById('add-major3');
  
  const aspectsABC = document.getElementById('aspects-abc');
  const aspectsAC = document.getElementById('aspects-ac');
  const aspectsAB = document.getElementById('aspects-ab');
  const aspectsBC = document.getElementById('aspects-bc');

  const keywordsABC = document.getElementById('keywords-abc');
  const keywordsAC = document.getElementById('keywords-ac');
  const keywordsAB = document.getElementById('keywords-ab');
  const keywordsBC = document.getElementById('keywords-bc');

  let numberABC = sumCards(1,2,3);
  let numberAC = sumCards(1,3);
  let numberAB = sumCards(1,2);
  let numberBC = sumCards(2,3);

  let nameABC = '';
  let nameAC = '';
  let nameAB = '';
  let nameBC = '';

  //const keys = ['ABC', 'AC', 'AB', 'BC'];



  if (card1.value !== '' && card2.value !== '' && card3.value !== '') {
    majorArcanaData.forEach(major => {
      const { name, number, keywords } = major;


      if (number === numberABC) {
        nameABC = name;
        if (numberABC === 22) numberABC = 0;
        aspectsABC.textContent = `${numberABC} - ${nameABC}`;
        keywordsABC.innerHTML = '';
        keywordsABC.appendChild(createListItems(keywords));
      }
      if (number === numberAC) {
        nameAC = name;
        if (numberAC === 22) numberAC = 0;
        aspectsAC.textContent = `${numberAC} - ${nameAC}`;
        keywordsAC.innerHTML = '';
        keywordsAC.appendChild(createListItems(keywords));
      }
      if (number === numberAB) {
        nameAB = name;
        if (numberAB === 22) numberAB = 0;
        aspectsAB.textContent = `${numberAB} - ${nameAB}`;
        keywordsAB.innerHTML = '';
        keywordsAB.appendChild(createListItems(keywords));
      };
      if (number === numberBC) {
        nameBC = name;
        if (numberBC === 22) numberBC = 0;
        keywordsBC.innerHTML = '';
        aspectsBC.textContent = `${numberBC} - ${nameBC}`;
        keywordsBC.appendChild(createListItems(keywords));
      };

    })   
    
  }
}

function displayMainContent() {
  const mainContent = document.getElementById('main-content');

  if (card1.value !== '' && card2.value !== '' && card3.value !== '') {
    mainContent.style.display = 'block';
  }
};



function createListItems(ulArray) {
  const fragment = document.createDocumentFragment();

  ulArray.forEach(arrayItem => {
    const listItem = document.createElement("li");
    listItem.textContent = arrayItem;

    fragment.appendChild(listItem);
  });
return fragment;
}




// Accordions

const accordionHeaders = document.querySelectorAll('.article__header');
const accordionItems = document.querySelectorAll('.accordion__content');

accordionHeaders.forEach(header => {
  const chevron = header.querySelector('i');
  
  header.addEventListener('click', function() {
    const content = this.nextElementSibling;
    const isExpanded = this.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      content.style.display = 'none';
      content.setAttribute('aria-hidden', 'true');
      this.setAttribute('aria-expanded', 'false');
      chevron.classList.remove('fa-chevron-up');
      chevron.classList.add('fa-chevron-down');
    }

    if (!isExpanded) {
      content.style.display = 'block';
      content.setAttribute('aria-hidden', 'false');
      this.setAttribute('aria-expanded', 'true');
      chevron.classList.remove('fa-chevron-down');
      chevron.classList.add('fa-chevron-up');
    }
  });
});





// Reset cards when loading

window.addEventListener('load', function() {
  
  const card1 = document.getElementById('add-major1');
  const card2 = document.getElementById('add-major2');
  const card3 = document.getElementById('add-major3');

  card1.selectedIndex = 0;
  card2.selectedIndex = 0;
  card3.selectedIndex = 0;
});



const card1 = document.getElementById('add-major1');
const card2 = document.getElementById('add-major2');
const card3 = document.getElementById('add-major3');

card1.addEventListener('change', displayMainContent);
card2.addEventListener('change', displayMainContent);
card3.addEventListener('change', displayMainContent);

