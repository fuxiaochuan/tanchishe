pause =  function(){  
	clearInterval(Snake.timer);  
	paint();  
};

//���¿�ʼ  
restart = function(){  
	if(Snake.timer){  
		clearInterval(Snake.timer);  
	}  
	for(var i=0; i<Snake.rowCount;i++){  
		Snake.tbl.deleteRow(0);  
	}  
	Snake.body = [];  
	init();  
	Snake.speed = 250;  
};  