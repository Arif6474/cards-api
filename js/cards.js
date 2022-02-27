
const allCards = document.getElementById('all-cards')
const searchButton = () => {
    const input = document.getElementById('input-value');
    const inputValue = parseInt(input.value);
    const error = document.getElementById('error');
    if(isNaN(inputValue) || inputValue == ''){
        error.innerText = 'please enter a number';
        input.value = '';
        allCards.innerHTML = '';

    } else if(inputValue <= 0){
        error.innerText = 'please enter a positive number';
        input.value = '';
        allCards.innerHTML = '';
    } else{
        allCards.innerHTML = '';
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
        .then(res => res.json())
        .then(data => displayCards(data.cards))
        input.value = '';
        error.innerText = '';
    } 
}
const displayCards = cards => {
    // console.log(cards);
    const allCards = document.getElementById('all-cards')
    for (const card of cards) {
        console.log(card);
     const div = document.createElement('div');
     div.classList.add('col-lg-4');
     div.classList.add('mb-5');
     div.innerHTML = `
     <div class="card" style="width: 18rem;">
           <img src="${card.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${card.code}</h5>
               <p class="card-text">${card.suit}</p>
               <button onclick="cardDetails('${card.code}')" href="#" class="btn btn-primary">Card Details</button>
            </div>
     </div>
     
     `
     allCards.appendChild(div);
    }  
}
const cardDetails = (code) => {
    allCards.innerHTML = '';

    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
        .then(res => res.json())
    .then(data => {
        const cardsAll= data.cards;
        const singleCard = cardsAll.find(card => card.code === code)
        const div = document.createElement('div')
        div.classList.add('d-flex')
        div.classList.add('justify-content-center')
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
           <img src="${singleCard.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${singleCard.code}</h5>
               <p class="card-text">${singleCard.suit}</p>
               <p class="card-text">${singleCard.value}</p>
               
               
               
            </div>
        </div>
        `
        allCards.appendChild(div);
    })

}