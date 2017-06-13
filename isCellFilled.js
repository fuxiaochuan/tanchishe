//检查一个坐标点有没有被填充  
isCellFilled = function(x,y){  
	if(Snake.tbl.rows[y].cells[x].style.backgroundColor == ""){  
		return false;  
	}  
	return true;  
};  
	