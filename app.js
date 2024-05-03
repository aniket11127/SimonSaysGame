let gameSeq = [];         // to store the sequence of buttons that are flashed
let userSeq = [];         // to store the sequence of buttons that user clicks

let btns = ["red","teal","orange","violet"];      // all btns array

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

let highScore = 0;

document.addEventListener("keypress",function(){   // to start the game by pressing any key
    if(started == false){                          // taaki ek hi baar game start ho
        console.log("Game Started");            
        started = true;
    }

    levelUp();            // jese hi game start ho levelUp ho jaye (calling levelUp function)
});


function levelUp(){        // levelUp function
    userSeq=[];          // userSeq zero ho jaye taaki woh starting se select kre btns ko

    level++;             // levelUp the game
    h2.innerText=`Level ${level}`;      // showing the level to h2 heading

    let randIdx = Math.floor(Math.random()*3);   // select random button to flash in randIdx variable
    let randColor = btns[randIdx];               // uske liye random color select krna
    let randBtn = document.querySelector(`.${randColor}`);  // uske liye random button select krna
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);    // jo btn select hua use gameSeq me push krna
    console.log(gameSeq);        // console me use (gameSeq dekhna)

    gameFlash(randBtn);          // gameFlash function call krna jisme btn flash hoga

}

function gameFlash(btn){      // gameFlash function

    btn.classList.add('flash');    // btn ko flash krne ke liye flash class add krna
 
    setTimeout(function(){       // 250ms ke baad flash class remove krna
        btn.classList.remove('flash');
    },250);
}

function userFlash(btn){      // userFlash function

    btn.classList.add('userflash');   // user ko btn flash krne ke liye userflash class add krna

    setTimeout(function(){      // 250ms ke baad userflash class remove krna
        btn.classList.remove('userflash');
    },250);
}

function checkAns(idx){        // checkAns function - to check dono sequence match kr rhi hai ya nhi
    // console.log(level);

    // let idx = level-1;

    if(userSeq[idx] == gameSeq[idx]){      // agar dono sequence match kr rhi hai toh 
        if(userSeq.length == gameSeq.length){      // agar dono sequence ki length bhi match kr rhi hai toh
            setTimeout(levelUp,1000);         // toh levelUp the game
        }
    }else{
        if(level>highScore){      // highSCore ke liye condition
            highScore=level;
        }                          // agar dono sequence match nhi kr rhi hai toh game over
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>.<br>Press any key to restart <br> High Score: ${highScore}`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        },150);
        reset();              // gameOver ke baad reset game krna
    }
}

function btnPress(){        // btnPress function - to get the button that user clicks
    // console.log("button was clicked");
    // console.log(this);
    let btn = this;
    userFlash(btn);       // user ko btn flash krne ke liye userFlash function call krna

    userColor = btn.getAttribute('id');     // userColor me btn ka id store krna
    // console.log(userColor);
    userSeq.push(userColor);          // userSeq me userColor push krna

    checkAns(userSeq.length-1);       // checkAns function call krna jisme userSeq ki length pass krna hai
}

let allBtns = document.querySelectorAll('.btn');     // allBtns me saare buttons select krna
for(btn of allBtns){
    btn.addEventListener('click',btnPress);       // saare buttons pe click event listener add krna
}


function reset(){             // reset function - when game is over
    started=false;
    level=0;
    userSeq=[];
    gameSeq=[];
}



