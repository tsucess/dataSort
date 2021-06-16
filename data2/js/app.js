// VARIALBLES SECTION 
let seedsArray =[];
let seedResArray = [];
let clickedSeed = "";
let attr = "";
let secAttr;
let seedStr;
let seedRes;
let cellStr;
let cellRes;
let cellRow;
let rowRes;
let seedRowRes;
let styleVal;
let str;
let res;

let seeds = document.querySelectorAll('.seeds');
let bCell = document.querySelectorAll('.board-cell')
let row = document.querySelectorAll('.row');
let startSec = document.getElementById("start");
let startBtn = document.getElementById("start-btn");
let newGameBtn = document.getElementById("btn-new-game");
let restartBtn = document.getElementById("btn-restart");
let btnReplay = document.getElementById("btn-replay");
let btnNextLevel = document.getElementById("btn-next-level");

// Level Section 
let levelSec = document.getElementById("levelSec");
let btnLevel = document.getElementById("btn-Level");
let level1 = document.getElementById("level-1");
let level3 = document.getElementById("level-3");


let btnReplay2 = document.getElementById("btn-replay2");
let helpBtn = document.getElementById("help");
let pauseBtn = document.getElementById("pause");
let btnContinue = document.getElementById("btn-continue");
let doneButton = document.getElementById("done");
let inactiveShade = document.getElementById("inactive-shade");
let pauseSection = document.getElementById("pause2");
let won = document.getElementById("won");
// let lost = document.getElementById("lost");
let timeOut = document.getElementById("timeout");
let myMusic = document.getElementById("audio");
let soundBtn = document.getElementById("sound");
let countdownEl = document.getElementById('count-down');
let currentTime = document.querySelectorAll('.current-time');

let setCountdown = -1;
let count = 0;






// Help Button
let helpSec = document.getElementById("helpSec");
let close3 = document.getElementById("close3");
let close4 = document.getElementById("close4");




help.addEventListener('click', function(){
    inactiveShade.style.visibility = "visible";
    helpSec.style.display = "block";
});

close3.addEventListener('click', function(){
 helpSec.style.display = "none";
//  inactiveShade.style.visibility = "hidden";
});

btnLevel.addEventListener('click', function(){
    inactiveShade.style.visibility = "visible";
    levelSec.style.display = "block";
});
close4.addEventListener('click', function(){
 levelSec.style.display = "none";
});


//******  VIEW SECTION */
    //    randomNumFunc();
    //    displaySeed();

     
// Buttons Section 
// startBtn.addEventListener("click", start);
newGameBtn.addEventListener("click", start);
// btnReplay.addEventListener("click", start);
btnReplay2.addEventListener("click", start);
restartBtn.addEventListener("click", start);

helpBtn.addEventListener('click', pauseTime);
soundBtn.addEventListener("click", playPause);
btnNextLevel.addEventListener("click", data3);


btnLevel.addEventListener('click', pauseTime);
level1.addEventListener("click", data1);
level3.addEventListener("click", data3);



timer();
randomNumFunc();
displaySeed();

function start (){
    playPause();
    // startSec.style.display = "none";
    inactiveShade.style.display = "none";
    won.style.display = "none";
    // lost.style.display = "none";
    timeOut.style.display = "none";
    window.location.assign("index.html");
}

function data1 (){
    window.location.assign("../data/index.html");
}

function data3 (){
    window.location.assign("../data3/index.html");
}



// Audio Media Section 
function playPause() {
    if (count == 0) {
        count = 1;
        myMusic.play(); 
        soundBtn.style.backgroundImage = "url(../data/images/logo/"+1+".png)";
        // alert("music played");
    }else{
        myMusic.pause();
        count = 0;
        soundBtn.style.backgroundImage = "url(../data/images/logo/"+2+".png)";
        // alert("music paused");
    }
}




// ACTIVE FUNCTION 
function active (){
    inactiveShade.style.display = "none";
    pauseSection.style.display = "none";
}
function inActive (){
    inactiveShade.style.display = "block";
    pauseSection.style.display = "block";
}

// TIMER SECTION 

function pauseTime (){
    clearInterval(setCountdown);
    setCountdown = -1;
    
}

function timer(){
    let startingMinutes = 3;
    function startTime(){
        active();

        setCountdown = setInterval(updateCountdown, 1000);
        }
        btnContinue.addEventListener('click', startTime);
        pauseBtn.addEventListener('click', function() {
            pauseTime();
            inActive();
            // if(setCountdown === -1){
            //     startTime();
            //     pauseBtn.textContent = "Pause";
            // } else {
            //     pauseTime();
            //     pauseBtn.textContent = "Resume";
            // }
        });

    let time = startingMinutes * 60;
        function updateCountdown (){
            if (time <= 0) {
                clearInterval(setCountdown);
                inactiveShade.style.display = "block";
                timeOut.style.visibility = "visible";

            }
                let minutes = Math.floor(time / 60);
                let seconds = time % 60;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;
                countdownEl.innerHTML = `${minutes} : ${seconds}`;
                        time--
                let ctime = `${minutes} : ${seconds}`;
                for (let i = 0; i < currentTime.length; i++) {
                    currentTime[i].innerHTML = ctime;   
                }
        }
        setCountdown = setInterval(updateCountdown, 1000);   
}


// Comparing the sorted row with the result
function compareArrays(arr1, arr2) {
    // check the length
    if(arr1.length !== arr2.length) {
        return false;
    } else { 
        let result = false;
        // comparing each element of array 
        for(let i = 0; i < arr1.length; i++) {

            if(arr1[i] !== arr2[i]) {
                return false;
            }else {
                return true;
            }
        }
        return result;    
  }

}


// CONTROL SECTION
for (let i = 9; i >= 0 ; i--) {
row[i].lastChild.addEventListener("click", function(){
            doneButton.style.display = "block";
        });
row[i].firstChild.addEventListener("click", function(){
            doneButton.style.display = "none";
        });
doneButton.addEventListener("click", check);
function check(){ 
    for (let j = 0; j < row[i].childNodes.length; j++) {
        const array1 = [1,2,3,4,5,6,7,8,9,0];
        styleVal = row[i].childNodes[j].getAttributeNode("style");
       try {
                str = styleVal.value;
                res = Number(str.slice(38, 39));
                //  check for current row 
                let seedArrayLength = seedResArray.length;
                    if (seedArrayLength < 10){
                        // allow push
                        seedResArray.push(res);
                            // Win OR Loose Determinant 
                            if (seedArrayLength === 9) {
                                console.log(seedResArray);
                                let result =  compareArrays(array1, seedResArray);
                                if(result) {
                                    inactiveShade.style.display = "block";
                                    won.style.visibility = "visible"; 
                                    pauseTime();
                                }
                    }
            } else {
                // empty seedResArray 
                seedResArray = [];
                //  allow push 
                seedResArray.push(res);
                if (seedArrayLength === 9) {
                    console.log(seedResArray);
                    let result = compareArrays(array1, seedResArray);
                                    if(result) {
                                        inactiveShade.style.display = "block";
                                            won.style.visibility = "visible";
                                            pauseTime();
                                        } else{
                                            // if (i === 0) {
                                            // lost.style.visibility = "visible"; 
                                            pauseTime();
                                            // }
                                }
                }
                
            }
    
       } catch (error) {
           
                }       
            }
        }
}





///******* MODAL SECTION*/ 
    // Generate Random Number to Shuffle the Array Seed
    function randomNumFunc(){
        for (let j = 0; j <= 10; j++) {
            for (let i = 0; seedsArray.length <= 9; i++) {
                randomNum =  Math.round(Math.random() * 9);
                if(seedsArray.includes(randomNum)){
                    randomNum =  Math.round(Math.random() * 9);
                } else {
                    seedsArray.push(randomNum);
                }
            }  
        }
            return seedsArray;
    }

    // Display Random Seeds
    function displaySeed(){
    for (let i = 0; i < seeds.length; i++) {
    // seeds[i].style.backgroundImage = 'url(../images/seeds/'+seedsArray[i]+'.png)'; 
    seeds[i].style.backgroundImage = "url(./images/seeds/"+seedsArray[i]+".png)"; 
    }
}
    
    //show and hide seed function
    function toggleSeed (seedObj){
        let seedBgImage = seedObj.style.backgroundImage;
            if (seedBgImage) {
                // seedObj.style.opacity = 0.2;
                seedObj.style.backgroundImage = "";
                clickedSeed = seedBgImage;
            } else {
                seedObj.style.backgroundImage = clickedSeed; 
                clickedSeed = seedBgImage;
            }
        }
    
    
    for (let i = 0; i < seeds.length; i++) {
        seeds[i].addEventListener('click', function(e){
            e.preventDefault();
            seed = e.target;
            if (clickedSeed === "") {
                    toggleSeed(seed);
                seedStr = seed.getAttributeNode("id").value;
                seedRes = Number(seedStr.slice(8));
            }

        seedRow = seed.getAttributeNode("id").value;
        seedRowRes = Number(seedRow.slice(5, 7));
            
            });
        }
    



           //ALL CELLS SELECTION 
    for (let i = 0; i < bCell.length; i++) {
       
        bCell[i].addEventListener('click', function(e){
          let  initial;
        
            e.preventDefault();
            cell = e.target;
            // attr = cell.parentNode.getAttributeNode("id").value;
        let    cellStyle = cell.getAttributeNode("style");            
        cellStr = cell.getAttributeNode("id").value;
        cellRes = Number(cellStr.slice(7));
          if (!cellStyle) {
            initial = rowRes;
          }

        // getting the row number 
        cellRow = cell.getAttributeNode("id").value;
        rowRes = Number(cellRow.slice(5, 6));

        // restriction of ROWS 
        let check1 =  initial - rowRes;
        let check2 = rowRes - initial;
        if (initial === undefined || rowRes === 9  || check1 === 1 || check2 === 1){
                // Restriction of moves
    if ( cellStyle === null || clickedSeed === ""){
        // condition for rows
        if (rowRes % 2 === 1 || rowRes === 1) {

            if (seedRowRes === 11 && cellStyle === null) {
                    if (seedRes === 0 || seedRes % 2 === 0) {
                        if (cellRes === seedRes + 1 || cellRes === seedRes) {
                            toggleSeed(cell);
                        }
                } else if (seedRes === 1 || seedRes % 2 === 1) {

                    if ((cellRes === seedRes - 1 || cellRes === seedRes) && cellStyle === null) {
                            toggleSeed(cell);
                            }   
                    } 

                } else{
                    seedRes = cellRes;
                    if (seedRes === 0 || seedRes % 2 === 0) {
                        if (cellRes === seedRes + 1 || cellRes === seedRes) {
                            toggleSeed(cell);
                        }

                    } else if (seedRes === 1 || seedRes % 2 === 1) {
                            if (cellRes === seedRes - 1 || cellRes === seedRes) {
                            toggleSeed(cell);
                            }
                    } else {
                        toggleSeed(cell);
                    }
                }

        } else{
                        if (cellStyle === null) {
                            if (seedRes === 0 || seedRes % 2 === 0) {
                                if (cellRes === seedRes - 1 || cellRes === seedRes) {
                                        toggleSeed(cell);
                            }
                        } else if (seedRes === 1 || seedRes % 2 === 1) {
                            if (cellRes === seedRes + 1 || cellRes === seedRes) {
                                        toggleSeed(cell);
                                        }
                        }
                    } else {
                        seedRes = cellRes;
                        if (seedRes === 0 || seedRes % 2 === 0) {
                            if (cellRes === seedRes - 1 || cellRes === seedRes) {
                                    toggleSeed(cell);
                        } 
                    } else if (seedRes === 1 || seedRes % 2 === 1) {
                        if (cellRes === seedRes + 1 || cellRes === seedRes) {
                                    toggleSeed(cell);
                                    }
                            }
                        }
                    }
             }
        }
    
            });
        }

    //     //ALL CELLS SELECTION 
    // for (let i = 0; i < bCell.length; i++) {
    //         bCell[i].addEventListener('click', function(e){
    //             e.preventDefault();
    //             cell = e.target;
    //             // attr = cell.parentNode.getAttributeNode("id").value;
    //         let    cellStyle = cell.getAttributeNode("style");            
    //         cellStr = cell.getAttributeNode("id").value;
    //         cellRes = Number(cellStr.slice(7));
       
    //         // getting the row number 
    //         cellRow = cell.getAttributeNode("id").value;
    //         rowRes = Number(cellRow.slice(5, 6));
            
    //     // Restriction of moves
    //     if ( cellStyle === null || clickedSeed === ""){

    //         // condition for rows
    //         if (rowRes % 2 === 1 || rowRes === 1) {

    //             if (seedRowRes === 11 && cellStyle === null) {
    //                     if (seedRes === 0 || seedRes % 2 === 0) {
    //                         if (cellRes === seedRes + 1 || cellRes === seedRes) {
    //                             toggleSeed(cell);
    //                         }
    //                 } else if (seedRes === 1 || seedRes % 2 === 1) {

    //                     if ((cellRes === seedRes - 1 || cellRes === seedRes) && cellStyle === null) {
    //                             toggleSeed(cell);
    //                             }   
    //                     } 

    //                 } else{
    //                     seedRes = cellRes;
    //                     if (seedRes === 0 || seedRes % 2 === 0) {
    //                         if (cellRes === seedRes + 1 || cellRes === seedRes) {
    //                             toggleSeed(cell);
    //                         }

    //                     } else if (seedRes === 1 || seedRes % 2 === 1) {
    //                             if (cellRes === seedRes - 1 || cellRes === seedRes) {
    //                             toggleSeed(cell);
    //                             }
    //                     } else {
    //                         toggleSeed(cell);
    //                     }
    //                 }
            
    //         } else{

    //             // for (let j = 9; j >= 0; j--) {
    //                     // styleVal = row[j].lastChild.getAttributeNode("style");
    //                     // if (styleVal) {
    //                         if (cellStyle === null) {
    //                             if (seedRes === 0 || seedRes % 2 === 0) {
    //                                 if (cellRes === seedRes - 1 || cellRes === seedRes) {
    //                                         toggleSeed(cell);
    //                             }
    //                         } else if (seedRes === 1 || seedRes % 2 === 1) {
    //                             if (cellRes === seedRes + 1 || cellRes === seedRes) {
    //                                         toggleSeed(cell);
    //                                         }
    //                         }
    //                     } else {
    //                         seedRes = cellRes;
    //                         if (seedRes === 0 || seedRes % 2 === 0) {
    //                             if (cellRes === seedRes - 1 || cellRes === seedRes) {
    //                                     toggleSeed(cell);
    //                         } 
    //                     } else if (seedRes === 1 || seedRes % 2 === 1) {
    //                         if (cellRes === seedRes + 1 || cellRes === seedRes) {
    //                                     toggleSeed(cell);
    //                                     }
    //                              }

    //                         }
                            
    //                     // }
    //                     // console.log(row[j]);
                        
    //             // }
           
    //         }        
    //     }
        
    //             });
    //         }