
var canvas = document.querySelector('#gameball');
var context = canvas.getContext('2d');

var ball = {
    x : 150,
    y : 150,
    radius : 10
}
var ballSpeed ={
    x : 2,
    y : 1    
}
var bars = {
    x : 0,
    y : canvas.height - 10,
    width: 80,
     height: 10,
     speed: 5,
     moveRight: false,
     moveLeft: false,
}
var brick = {
    x: 25,
    y: 25,
    margin: 25,
    height: 15,
    width : 70,
    row  : 3 ,
    column   : 5
}
var sumBrick = [];
for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++){
        var brickArr = {
        x: brick.x + c * (brick.width + brick.margin),
        y: brick.y + r * (brick.height + brick.margin),
        isbroken : false
         }
         sumBrick.push(brickArr);
        }
    }


    var sumBrickBroken = 0;
    var gameOver = false
    var win = false
    var scoreWin = brick.row * brick.column
    var isPause = false
    

    
function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}

function drawBars() {
    context.beginPath();
    context.fillRect(bars.x, bars.y, bars.width, bars.height);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}

function drawBrick() {
    sumBrick.forEach((b) => {
       if(!b.isbroken){
            context.beginPath();
            context.rect(
                b.x,
                b.y,
                brick.width,
                brick.height
            );
            context.fillStyle = 'blue';
            context.fill();
            context.closePath()
       }
    })
    }


function moveBars() {

    var touchstartX = 0
    var touchendX = 0
    canvas.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].pageX;
        if (touchstartX <
            canvas.width * 80 / 200 - 20) {
            bars.moveLeft = true
        } 
        else if(touchstartX >
            canvas.width * 80 / 200 + 20)
        {
            bars.moveRight = true
        }
    })

    canvas.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].pageX;
if (touchendX <
    canvas.width * 80 / 200 - 20) {
    bars.moveLeft = false
    
} 
else if(touchendX >
    canvas.width * 80 / 200 + 20)
{
    bars.moveRight = false
}

if(bars.moveLeft && bars.x >= 0){
    bars.x -= bars.speed
}
else if(bars.moveRight && bars.x <= canvas.width - bars.width){
    bars.x += bars.speed
}
}
)


    document.addEventListener('keydown', function(e){
        switch(e.which){
           
            case 37 :
                bars.moveLeft = true
                break;
            case 39 :
                bars.moveRight = true
                break;
        }
        })
    document.addEventListener('keyup', function(e){
            switch(e.which){
                case 37 :
                    bars.moveLeft = false
                    break;
                case 39 :
                    bars.moveRight = false 
                break;
            }
            })
            if(bars.moveLeft && bars.x >= 0){
                bars.x -= bars.speed
            }
            else if(bars.moveRight && bars.x <= canvas.width - bars.width){
                bars.x += bars.speed
            }
   
} 



function collide() {
    if(ball.x < ball.radius 
        || ball.x > canvas.width - ball.radius) {
        ballSpeed.x = -ballSpeed.x
    }
    if(ball.y < ball.radius 
        // || ball.y > canvas.height - ball.radius
        ) {
        ballSpeed.y = -ballSpeed.y
    }
        ball.x += ballSpeed.x;
        ball.y += ballSpeed.y;
}

function barsAndBall() {
    if(ball.x + ball.radius >= bars.x && ball.x + ball.radius <= bars.x + bars.width && ball.y + ball.radius > canvas.height - bars.height  ){
        ballSpeed.y = -ballSpeed.y
    }
}


const scoreUserss = []
function ballAndBrick() {
    sumBrick.forEach((g) => {
        if(!g.isbroken && isPause == false){
            if(ball.x >= g.x && ball.x <= g.x + brick.width && ball.y + ball.radius >= g.y && ball.y - ball.radius <= g.y + brick.height){
                ballSpeed.y = -ballSpeed.y
            g.isbroken = true
            sumBrickBroken += 1;
            userScore = 
            Math.round(sumBrickBroken * 100 / Math.ceil(t))
            scoreUserss.push(userScore)
            var score = document.querySelector('.score')
            score.textContent = `Score: ${userScore}`
            
            if(sumBrickBroken==scoreWin){
                win = true
                gameOver = true
            }
            
        }
    }
})
}

function checkgame() {
    if( ball.y > canvas.height - bars.height ){
        gameOver = true
    }
}

function gameover() {
    if(gameOver){
        a = 'thắng'
        gameResult()
    }
    else if (gameOver == true && win != true)
    {
        a = 'thua'
        gameResult()
    }
}


function draw () {
 if(!gameOver && isPause == false ){
    context.clearRect(0, 0,canvas.width, canvas.height);
    drawBall();
    drawBars();
    drawBrick()

    moveBars();
    collide();
    barsAndBall();
    ballAndBrick();

    checkgame()
    gameover()
    
    requestAnimationFrame(draw);   
 }   
}
var time = 4
function hour() {
    if(!isPause){
        time--;
        if(time != 0 && time > 0){
    var timeStart = document.querySelector('.container .hour')
    timeStart.innerHTML = time
    timeStart.style.display = 'block'
    setTimeout('hour()',1000)
        }
        else{
            var timeStart = document.querySelector('.container .hour')
            timeStart.style.display = 'none'
            draw()
            dongho()
        }
    }
}

var t = 0
function dongho() {
    if(isPause == false){
        t++;
        var timeUser = document.querySelector('.time')
        if(gameOver == false){
            timeUser.innerHTML = `Time: ${t}s`
            setTimeout('dongho()',1000)
        }
        else{
            time.innerHTML = t
        }
    }
}

var pauseAndContinue = document.querySelector('.btn_pause')
pauseAndContinue.onclick = function() {
    if(!isPause){
        pauseAndContinue.innerHTML = 'Continue'
        isPause = true
    }
    else{
        pauseAndContinue.innerHTML = 'Pause'
        isPause = false
        var time = time 
        hour()
    }
}



    var startGame = document.querySelector('.menu #start')
    var normal = document.querySelector('#normal')
    var difficult = document.querySelector('#difficult')
    var veryDifficult = document.querySelector('#very_difficult')
    var titleGame = document.querySelector('.container_title')
    var menuStart = document.querySelector('.container .menu')
    var inforUser = document.querySelector('.container .information')
    var levelGame = 'normal'
    var closeCanvas = document.querySelector('#canvas_level_close')

    var isPause = false
    closeCanvas.onclick = function() {
   var quesetionOut = confirm('bạn có chắc chắn muốn thoát không?')
   if(quesetionOut == true){
    sumBrickBroken = 0
    gameOver = false
     win = false
     time = 4
     t = 0
 
    ball = {
        x : 150,
        y : 150,
        radius : 10}
    brick = {
        x: 25,  
        y: 25,
        margin: 25,
        height: 15,
        width : 70,
        row  : 3 ,
        column   : 5
    }
        sumBrick = [];
for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++){
        var brickArr = {
        x: brick.x + c * (brick.width + brick.margin),
        y: brick.y + r * (brick.height + brick.margin),
        isbroken : false
         }
        sumBrick.push(brickArr);}}



    var canvas = document.querySelector('#gameball');
    var titleGame = document.querySelector('.container_title')
    var inforUser = document.querySelector('.container .information')
    var result = document.querySelector('.result')
    var menuLevel = document.querySelector('.menu_level')
    var timeStart = document.querySelector('.container .hour')
    timeStart.style.display = 'none'
    
    titleGame.style.display = 'flex'
    inforUser.style.display = 'none'
    result.style.display = 'none'
    canvas.style.display = 'none'
    Object.assign(menuLevel.style,{
        display: 'flex',  
    })
  
    isPause = true
    let pauseAndContinue = document.querySelector('.btn_pause')
    pauseAndContinue.innerHTML = 'Start'
    let score = document.querySelector('.score')
    score.textContent = `Score: 0`
    let timeUser = document.querySelector('.time')
    timeUser.innerHTML = `Time: 0s`
   }



else{
        isPause = false
    }
    
    }



    normal.onclick = function() { 
   ballSpeed ={
       x : 2,
       y : 1   
    }
   bars = {
        x : 0,
        y : canvas.height - 10,
        width: 80,
        height: 10,
        speed: 5,
        moveRight: false,
        moveLeft: false,
    }

    menuStart.style.display = 'none'
    titleGame.style.display = 'none'
    inforUser.style.display = 'flex'
    canvas.style.display = 'block'

    var menuLevel = document.querySelector('.menu_level')
    Object.assign(menuLevel.style,{
        display: 'none',  
    })
            hour()
    levelGame = 'Normal' 
}

difficult.onclick = function() {
   ballSpeed ={
       x : 3,
       y : 2    
   }
   bars = {
        x : 0,
        y : canvas.height - 10,
        width: 80,
        height: 10,
        speed: 5,
        moveRight: false,
        moveLeft: false,
    }

    menuStart.style.display = 'none'
    titleGame.style.display = 'none'
    inforUser.style.display = 'flex'
    canvas.style.display = 'block'

    var menuLevel = document.querySelector('.menu_level')
    Object.assign(menuLevel.style,{
        display: 'none',  
    })
    hour()
    levelGame = 'Difficult' 
}

veryDifficult.onclick = function() {
   ballSpeed ={
       x : 5,
       y : 4    
   }
   bars = {
        x : 0,
        y : canvas.height - 10,
        width: 50,
        height: 10,
        speed: 5,
        moveRight: false,
        moveLeft: false,
}
    menuStart.style.display = 'none'
    titleGame.style.display = 'none'
    inforUser.style.display = 'flex'
    canvas.style.display = 'block'

    var menuLevel = document.querySelector('.menu_level')
    Object.assign(menuLevel.style,{
        display: 'none',  
    })
    hour()
    levelGame = 'Very Difficult' 
}


startGame.onclick = function(){
    var menuLevel = document.querySelector('.menu_level')
    menuStart.style.display = 'none'
    Object.assign(menuLevel.style,{
        display: 'flex',
    })

    var closeMenuLevel =document.querySelector('#menu_level_close')
    closeMenuLevel.onclick = function() {
        Object.assign(menuLevel.style,{
            display: 'none',
        })
    menuStart.style.display = 'flex'
    }
} 

var guideGame = document.querySelector('#guide')
    guideGame.onclick = function() {
    var guide = document.querySelector('.guide')
    menuStart.style.display = 'none'
    titleGame.style.display = 'none'
    guide.style.display = 'flex'
}
var closeGuide = document.querySelector('#close_guide')
    closeGuide.onclick = function() {
var guide = document.querySelector('.guide')
    guide.style.display = 'none'
    menuStart.style.display = 'flex'
    titleGame.style.display = 'flex'
    }

function gameResult() {
    var result = document.querySelector('.result')
   Object.assign(result.style,{
    display : 'flex',
    justifyContent: 'center',
    textAlign: 'center', 
    flexDirection: 'column'     
   })

   if(win == true)
        {a = 'WIN'}

   else if (gameOver == true && win != true)
         {a = 'LOSE' }

    var reulutUser = `
    <div class = "result_option">
    <p class="resultgame">${a}</p>
    <button class="replay result_op" >Chơi lại</button>
    <button id="savebtn" class="result_op">Lưu kết quả</button>
    </div>
    `
if(a == 'WIN'){
    result.innerHTML  = reulutUser
}
else{
    result.innerHTML =  `<div class = "result_option">
    <p class="resultgame">${a}</p>
    <button class="replay result_op">Chơi lại</button>
    <button class="result_op" id="savebtn">Lưu kết quả</button>
    <button class="guide_btn result_op">Hướng dẫn</button>
    </div>
    `

    var openGuide = document.querySelector('.guide_btn')
    openGuide.onclick = function() {
    var guide = document.querySelector('.guide')
    guide.style.display = 'flex'
    }
    var closeGuide = document.querySelector('#close_guide')
    closeGuide.onclick = function() {
    var guide = document.querySelector('.guide')
    guide.style.display = 'none'
    }

}


var save = document.querySelector('button#savebtn')
    save.onclick = function() {
    var result = document.querySelector('.result')
    result.innerHTML = `<div>
    <input type="text" id ="result_name" placeholder="Nhập tên của bạn">
    <button id="result_save">Save</button>
    </div>`
    var saveUserBtn = document.querySelector('#result_save')
    saveUserBtn.onclick = function() {
        var nameUser = document.querySelector('#result_name').value

    var users = []
    var score = document.querySelector('.user_infor .score')
    var timeUser = document.querySelector('.time')
    var menuLevel = document.querySelector('.menu_level')
    var resultGame = document.querySelector('.result')
    var infor = document.querySelector('.information')
   
    infor.style.display = 'none'
    menuLevel.style.display = 'flex'
    canvas.style.display = 'none'
    resultGame.style.display = 'none'
    titleGame.style.display = 'flex'
    var user = {
        Name:nameUser,
        Score:scoreUserss[scoreUserss.length - 1],
        Time:`${t}`,
        Result:`${a}`,
        Level: `${levelGame}`
    }
    
    
    if(typeof user.Score == 'undefined'){
        user.Score = 0
    }

    if(nameUser == ''){
        user.Name = 'No Name'
       }

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }
    users.push(user)
    users.sort(function(a, b){return b.Score - a.Score});
    localStorage.setItem("users", JSON.stringify(users));
    
    var result = document.querySelector('.result')
        Object.assign(result.style,{
            display: 'none'
        })
        gameOver = false
        win = false
        time = 4
        t = 0
        userScore = 0;
        sumBrickBroken = 0
        if(ballSpeed == {
            x : 2,
            y : 1
        }){
    ballSpeed = {
        x : 2,
        y : 1  
    }
}
    else if(ballSpeed == {
                x : 3,
                y : 2 
}){
            ballSpeed = {
                x : 3,
                y : 2
    }
}
    else if(ballSpeed == {
                x : 5,
                y :  4 
}){
    ballSpeed = {
        x : 5,
        y : 4 
    }
}

var menuLevel = document.querySelector('.menu_level')
Object.assign(menuLevel.style,{
    display: 'flex',  
})
inforUser.style.display = 'none'
ball = {
    x : 150,
    y : 150,
    radius : 10}

brick = {
    x: 25,
    y: 25,
    margin: 25,
    height: 15,
    width : 70,
    row  : 3 ,
    column   : 5}
  sumBrick = [];
for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++){
        var brickArr = {
        x: brick.x + c * (brick.width + brick.margin),
        y: brick.y + r * (brick.height + brick.margin),
        isbroken : false
         }
        sumBrick.push(brickArr);}}

        
        var score = document.querySelector('.score')
            score.textContent = `Score: 0`
var timeUser = document.querySelector('.time')
            timeUser.innerHTML = `Time: 0s`
      
    }
}

var replay = document.querySelector('.replay')
    replay.onclick = function (){
    result.style.display = 'none'
    isPause = false
    sumBrickBroken = 0
    gameOver = false
    win = false
    time = 4
    t = 0
    userScore = 0;
  ball = {
    x : 150,
    y : 150,
    radius : 10}
if(ballSpeed == {
    x : 2,
    y : 1  
}){
    ballSpeed = {
        x : 2,
        y : 1  
    }
}
else if(ballSpeed == {
    x : 3,
    y : 2  
}){
    ballSpeed = {
        x : 3,
        y : 2  
    }
}
else
if(ballSpeed == {
    x : 5,
    y :  4 
}){
    ballSpeed = {
        x : 5,
        y : 4  
    }
}
brick = {
    x: 25,
    y: 25,
    margin: 25,
    height: 15,
    width : 70,
    row  : 3 ,
    column   : 5}
  sumBrick = [];
for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++){
        var brickArr = {
        x: brick.x + c * (brick.width + brick.margin),
        y: brick.y + r * (brick.height + brick.margin),
        isbroken : false
         }
        sumBrick.push(brickArr);}}

        
        var score = document.querySelector('.score')
            score.innerText = `Score: 0`

       

  hour()
}
}

var addUser = document.querySelector('#result_save')
var historyUser = document.querySelector('.menu #history_sum')
var listHistory = document.querySelector('#historyTable')
var historyTable = document.querySelector('#historyTable_user')
historyUser.onclick = function() {
    var closeHistory = document.querySelector('i#close_history')
closeHistory.onclick = function() {
var listHistory = document.querySelector('#historyTable')

    menuStart.style.display = 'flex'
    Object.assign(listHistory.style,{
        display: 'none',
    })
}
    menuStart.style.display = 'none'
    Object.assign(listHistory.style,{
        display: 'flex',
    })
var listUser = JSON.parse(localStorage.getItem('users'))
var tabel = ` 

<tr id="historyTable_head"> 
<th>Rank</th>
<th>Name</th>
<th>Result</th>
<th>Score</th>
<th>Time</th>
<th>level</th>
</tr>`
for (let i = 0; i < listUser.length; i++) {

tabel += `<tr>
<td id="rankUser">${i}</td>
<td>${listUser[i].Name}</td>
<td>${listUser[i].Result}</td>
<td>${listUser[i].Score}</td>
<td>${listUser[i].Time}</td>
<td>${listUser[i].Level}</td>
</tr>`

}
historyTable.innerHTML = tabel
}

