//��齫Ҫ�ƶ�������һ����ʲô  
checkNextStep = function(){  
	var point = getNextPos();  
	var x = point.x;  
	var y = point.y;  
	if(x<0||x>=Snake.colCount||y<0||y>=Snake.rowCount){  
		return -1;//���߽磬��Ϸ����  
	}	  	
	for(var i=0; i<Snake.body.length; i++){  
		if(Snake.body[i].x==x&&Snake.body[i].y==y){  
			return -1;//�����Լ�������,��Ϸ����  
		}  
	}  
	if(!Snake.tbl.rows[y].cells[x].style.backgroundColor == ""){  
		return 1;//�ж���  
	}  
	return 0;//�յ�  
};  