//检查将要移动到的下一步是什么  
checkNextStep = function(){  
	var point = getNextPos();  
	var x = point.x;  
	var y = point.y;  
	if(x<0||x>=Snake.colCount||y<0||y>=Snake.rowCount){  
		return -1;//触边界，游戏结束  
	}	  	
	for(var i=0; i<Snake.body.length; i++){  
		if(Snake.body[i].x==x&&Snake.body[i].y==y){  
			return -1;//碰到自己的身体,游戏结束  
		}  
	}  
	if(!Snake.tbl.rows[y].cells[x].style.backgroundColor == ""){  
		return 1;//有东西  
	}  
	return 0;//空地  
};  