// Stores Currently Flipped Cards
flippedCards = [];

// Player turn variable. 0 = Player 1, 1 = Player 2
playerTurn = Math.round(Math.random());

function genCards(){
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
    flippedCards.splice(-1,0,card);
    card.classList.add("flipped");
    if(flippedCards.length == 2){
        flippedCards.splice(0,flippedCards.length);
    }
}