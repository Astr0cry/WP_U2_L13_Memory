
function genCards(){
    const body = document.getElementsByTagName("body")[0];
    let images =[];
    //Get Images
    for(let p =0;p<2;p++){
        for(let i=0; i<10;i++){
        images.splice(0,0,`url(resources/common/food${i+1}.png)`);
        }
    }
    
    console.log(images);
    // Adding Rows
    for(let r=0; r<4; r++){
        const row = document.createElement("div");
        row.className = "row";

        // Adding Cards
        for(let c=0;c<5;c++){
            const card = document.createElement("div");
            card.className = "card";
            let randIndex = Math.floor(Math.random() * images.length);
            card.style.backgroundImage = images[randIndex];
            images.splice(randIndex,1);
            console.log(images);
            row.appendChild(card);
        }
        body.appendChild(row);
    }
}