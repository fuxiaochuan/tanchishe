//���һ���������û�б����  
isCellFilled = function(x,y){  
	if(Snake.tbl.rows[y].cells[x].style.backgroundColor == ""){  
		return false;  
	}  
	return true;  
};  
	