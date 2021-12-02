const cards = document.querySelectorAll('.memory-card');

score = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//To flip the card when clicked, a class flip is added to the element. 
//To do that, select all memory card elements with document.querySelectorAll,
// Each time a card is clicked,the flipCard function is activated. The variable this represents the card that was clicked. 
//The function opens the element's classList and toggles the flip class.
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}
//Function that activates the score//
function go(x) {
  $({ score: 0 }).animate({ score: x }, {
    duration: 1000,
    easing: "linear",
    step: function (now, fx) {
      $("#score").html(score + Math.floor(now));
    
    },
    queue: false,
    complete: function (now, fx) {
      score += x;
    }
    
  });
  $("#tag").fadeIn({
    duration: 700,
    easing: "linear",
    step: function (now, fx) {
      $(this).css("top", -55 * now + "px");
    }
  }).fadeOut({
    duration: 300,
    step: function (now, fx) {
      $(this).css("top", -55 * (2 - now) + "px");
    }
  });
};
$("#tag1").fadeIn({
  duration: 700,
  easing: "linear",
  step: function (now, fx) {
    $(this).css("top", -55 * now + "px");
  }
}).fadeOut({
  duration: 300,
  step: function (now, fx) {
    $(this).css("top", -55 * (2 - now) + "px");
  }
    
})

//function that checks if a card matched//
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
  isMatch ? disableCards(go(10)) : unflipCards(); go(-1)

}
//function that disables the cards//
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}
//function that unflips the cards//
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}
//The firstCard and secondCard variables need to be reset after each round so this function comes in handy//
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
//Function that shuffles the cards
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


  //do {
    //go()
  //}
  //while (checkForMatch = true);