//加速  
speedUp = function(time){  
	if(!Snake.paused){  
		if(Snake.speed+time<10||Snake.speed+time>2000){  
			return;  
		}  
		Snake.speed +=time;  
		pause();  
		move();  
	}  
};
