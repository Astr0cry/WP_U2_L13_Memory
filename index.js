if(sessionStorage.getItem("score")==null){
    sessionStorage.setItem("score","0:0");
}



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

// prevents on click events
unclickable = false;

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
            card.onclick = function(){flipCard(card)};
            images.splice(randIndex,1);
            row.appendChild(card);
        }
        main.appendChild(row);
    }
}

function setScores(){
    
}
function flipCard(card){
    if(!unclickable){
        function flipBack(){
            for(let flippedCard of flippedCards){
            flippedCard.classList.remove("flipped");

            unclickable = false;
            }
        }

        // Prevents Same Card from being selected
        if (!card.className.includes("flipped")){

            // Make Image visible and add it to flipped cards List
            flippedCards.splice(-1,0,card);
            card.classList.add("flipped");

            if(flippedCards.length == 2){
                let scored = false;
                if(flippedCards[0].children[0].src==flippedCards[1].children[0].src){
                    const scorebox = document.getElementById(`player${playerTurn+1}`);
                    const currentScore = scorebox.children[0];
                    currentScore.textContent = Number(currentScore.textContent)+1;
                    scored = true;
                    playerScores[Number(playerTurn)]++;
                }
                else{
                    unclickable = true;
                    setTimeout(flipBack,1000);
                }
                if(unclickable){
                    setTimeout(function(){
                    flippedCards = [];
                },1000);
                }
                else{
                    flippedCards=[];
                }

                if(!scored){
                    playerTurn = !playerTurn;
                    turnHeading.textContent = `Player ${playerTurn+1}'s Turn`;
                }
                
                //Checks if all pairs have been found
                if(document.getElementsByClassName("flipped").length==20){
                    let winner = null
                   
                    //Win Check
                    if(playerScores[0]>playerScores[1]){
                        winner = 0;
                    }
                    else if(playerScores[0]<playerScores[1]){
                        winner = 1;
                    }
                    else{
                        winner = "draw";
                    }

                    //Updates score and heading based on winner
                    if(winner!="draw"){
                        turnHeading.textContent=`Player ${winner+1} Wins!`
                        let newScore = sessionStorage.getItem("score");
                        newScore = newScore.split(":");
                        newScore[winner] = Number(newScore[winner])+1;
                        newScore=newScore.join(":");
                        sessionStorage.setItem("score",newScore);
                    }
                    else{
                        turnHeading.textContent="Draw!";
                    }
                    console.log(sessionStorage.getItem("score"));
                }
            }
        }
    }
}   
