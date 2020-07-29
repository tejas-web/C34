var ball,database,position;

function setup(){
    database = firebase.database()
    console.log(database)
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballposition = database.ref('ball/position');
    ballposition.on("value",readPosition,showError)
}

function draw(){
    background("white");
    if(position !== undefined) {
    if(keyDown(LEFT_ARROW)){
        WritePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        WritePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        WritePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        WritePosition(0,+1);
    }
    drawSprites();
}
}

function WritePosition(x,y){
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    })

}
function readPosition(data){
    position = data.val()
    console.log(position.x)
    ball.x = position.x;
    ball.y = position.y;
}
function showError() {
    console.log("Error Fetching Data")
}