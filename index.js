// Stores Currently Flipped Cards
flippedCards = [];

// Player turn variable. 0 = Player 1, 1 = Player 2
playerTurn = Math.round(Math.random());

playerScores = {
    0:0,
    1:0
}
// Heading that displays current player turn
const turnHeading = document.getElementById("turn");

function genCards(){
    turnHeading.textContent = `Player ${playerTurn+1}'s Turn`;
    const main = document.getElementsByTagName("main")[0];
    let images =[];
    //Get Images
    for(let p =0;p<2;p++){
        for(let i=0; i<10;i++){
        images.splice(0,0,`resources/common/food${i+1}.png`);
        }
    }
    
    
    // Adding Rows
    for(let r=0; r<4; r++){
        const row = document.createElement("div");
        row.className = "row";

        // Adding Cards
        for(let c=0;c<5;c++){
            const card = document.createElement("div");
            card.className = "card";
            let randIndex = Math.floor(Math.random() * images.length);
            const cardImage = document.createElement("img");
            cardImage.src=images[randIndex];
            card.appendChild(cardImage);
            card.onclick = function(){flipCard(card,cardImage)};
            images.splice(randIndex,1);
            row.appendChild(card);
        }
        main.appendChild(row);
    }
}

function flipCard(card,cardImage){
    
    if (!card.className.includes("flipped")){

        flippedCards.splice(-1,0,card);
        card.classList.add("flipped");

        if(flippedCards.length == 2){
            if(flippedCards[0].children[0].src==flippedCards[1].children[0].src){
                playerScores[Number(playerTurn)]++;
            }
            else{
                for(flippedCard of flippedCards){
                    flippedCard.classList.remove("flipped");
                }
            }
            playerTurn = !playerTurn;
            turnHeading.textContent = `Player ${playerTurn+1}'s Turn`;
            flippedCards.splice(0,flippedCards.length);
        }
    }
}
