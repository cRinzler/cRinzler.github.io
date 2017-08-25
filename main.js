
var  board =new Array() ;
var  score =0;

$(document).ready(function(){

	newgame();

});

function newgame(){

	//初始化
	init();
	//生成两个数字
	createOneNum();
          createOneNum();
}

function init(){

	for(var i=0;i<4;i++)
	    for(var j=0;j<4;j++)
		{
		 var gridcell=$('#cell-'+i+"-"+j);
		 gridcell.css('top',getPosTop(i,j));
		 gridcell.css('left',getPosLeft(i,j));
		}

		for( var i = 0 ; i < 4; i++){
			board[i]=new Array();
			for(var j = 0 ; j < 4; j++)
				board[i][j] = 0;
		}
		updateBoardView();
}


function updateBoardView(){
	$('.number-cell').remove();
	for(var i=0;i<4;i++)
	for(var j=0;j<4;j++)
	{
		$('#container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
		var theNumberCell=$('#number-cell-'+i+'-'+j);

		if(board[i][j]===0){
			theNumberCell.css('width','0px');
			theNumberCell.css('height','0px');
			theNumberCell.css('top',getPosTop(i,j)+50);
			theNumberCell.css('left',getPosLeft(i,j)+50);
		}
		else{
			theNumberCell.css('width','100px');
			theNumberCell.css('height','100px');
			theNumberCell.css('top',getPosTop(i,j));
			theNumberCell.css('left',getPosLeft(i,j));
			theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
			theNumberCell.css('color',getNumberColor(board[i][j]));
			theNumberCell.text(board[i][j]);
		}
	}



}
function createOneNum(){
	if(nospace(board))
		return false;

	var i=parseInt(Math.floor(Math.random()*4));
	var j=parseInt(Math.floor(Math.random()*4));
	while( true ){
		if(board[i][j]==0)
			break;

		i=parseInt(Math.floor(Math.random()*4));
		j=parseInt(Math.floor(Math.random()*4));

	}
	var numberCell=$('#number-cell-'+i+'-'+j);
	var randNum=Math.random()<0.5?2:4;

	board[i][j]=randNum;
	showNumWithAnimation(i,j,randNum);

          return true;
}


$(document).keydown(function(event){
	switch(event.keyCode){
		case 37: //left
			if(moveLeft()){
				createOneNum();
				isGameOver();
			}
			break;
		case 38://up
			if(moveUp()){
				createOneNum();
				isGameOver();
			}
			break;
		case 39: //right
		if(moveRight()){
				createOneNum();
				isGameOver();
			}
			break;
		case 40://down
		if(moveDown()){
				createOneNum();
				isGameOver();
			}
			break;
		default:  //default
			break;

	}
})

function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}
	for(var i=0;i<4;i++)
	for(var j=1;j<4;j++)
		if(board[i][j]!=0){
			for(var k=0;k<j;k++){
				if(board[i][k]==0&&noBlockInX(i,k,j,board)){
				//move
				showMoveAnimation(i,j,i,k);

				board[i][k]=board[i][j];
				board[i][j]=0;
				continue;
				}
				else if(board[i][k]==board[i][j]&&noBlockInX(i,k,j,board)){
				//move
				showMoveAnimation(i,j,i,k);
			  	//add
			  	board[i][k]+=board[i][j];
				board[i][j]=0;
				continue;
			}
		}
		}
	setTimeout("updateBoardView()",200);
	return true;
}



//right
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	for(var i=0;i<4;i++)
	for(var j=2;j>=0;j--)
		if(board[i][j]!=0){
			for(var k=3;k>j;k--){
				if(board[i][k]==0&&noBlockInX(i,j,k,board)){
				//move
				showMoveAnimation(i,j,i,k);

				board[i][k]=board[i][j];
				board[i][j]=0;
				continue;
				}
				else if(board[i][k]==board[i][j]&&noBlockInX(i,j,k,board)){
				//move
				showMoveAnimation(i,j,i,k);
			  	//add
			  	board[i][k]+=board[i][j];
				board[i][j]=0;
				continue;
			}
		}
		}
	setTimeout("updateBoardView()",200);
	return true;
}


//up
function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
	for(var i=1;i<4;i++)
	for(var j=0;j<4;j++)
		if(board[i][j]!=0){
			for(var k=0;k<i;k++){
				if(board[k][j]==0&&noBlockInY(j,k,i,board)){
				//move
				showMoveAnimation(i,j,k,j);

				board[k][j]=board[i][j];
				board[i][j]=0;
				continue;
				}
				else if(board[k][j]==board[i][j]&&noBlockInY(j,k,i,board)){
				//move
				showMoveAnimation(i,j,k,j);
			  	//add
			  	board[k][j]+=board[i][j];
				board[i][j]=0;
				continue;
			}
		}
		}
	setTimeout("updateBoardView()",200);
	return true;
}

//down
function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	for(var i=2;i>=0;i--)
	for(var j=0;j<4;j++)
		if(board[i][j]!=0){
			for(var k=3;k>i;k--){
				if(board[k][j]==0&&noBlockInY(j,i,k,board)){
				//move
				showMoveAnimation(i,j,k,j);

				board[k][j]=board[i][j];
				board[i][j]=0;
				continue;
				}
				else if(board[k][j]==board[i][j]&&noBlockInY(j,i,k,board)){
				//move
				showMoveAnimation(i,j,k,j);
			  	//add
			  	board[k][j]+=board[i][j];
				board[i][j]=0;
				continue;
			}
		}
		}
	setTimeout("updateBoardView()",200);
	return true;
}

function isGameOver(){
	for(var i=0;i<4;i++)
	for(var j=0;j<4;j++)
		if(board[i][j]==0)
			return false;


}


