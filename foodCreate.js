//产生食物。  
generateFood = function(){  
	var x = Math.floor(Math.random()*Snake.colCount);  
	var y = Math.floor(Math.random()*Snake.rowCount);  
	if(!isCellFilled(x,y)){  
		Snake.tbl.rows[y].cells[x].style.backgroundColor = "red";  
	}  
};