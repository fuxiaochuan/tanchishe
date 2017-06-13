    function $(id){return document.getElementById(id);} 
	var score = 0;
    //̰������  
    var Snake = {  
        tbl: null,  
        body: [],  
        //��ǰ�ƶ��ķ���,ȡֵ0,1,2,3, �ֱ��ʾ����,��,��,��, �����̷�������Ըı���  
        direction: 0,  
        //��ʱ��  
        timer: null,  
        //�ٶ�  
        speed: 250,  
        //�Ƿ��Ѿ���ͣ  
        paused: true,  
        //����  
        rowCount: 30,  
        //����  
        colCount: 30,  
        
    }; 
	
	//��ʼ��  
	init = function(){  
  
        Snake.tbl = $("main");  
        var x = 0;  
        var y = 0;  
        var colorIndex = 0; 
		score = 0;
        //������ʼ�ƶ�����  
        Snake.direction = Math.floor(Math.random()*4);  
        //����table  
        for(var row=0;row<Snake.rowCount;row++){  
            var tr=Snake.tbl.insertRow(-1);  
            for(var col=0;col<Snake.colCount;col++) {  
                var td=tr.insertCell(-1);  
            }  
        }  
        //�����ڵ�  
         x = Math.floor(Math.random()*Snake.colCount);  
         y = Math.floor(Math.random()*Snake.rowCount);   
         if(!isCellFilled(x,y)){  
            Snake.tbl.rows[y].cells[x].style.backgroundColor = 'red';  
         }  
              
        //������ͷ  
        while(true){  
            x = Math.floor(Math.random()*Snake.colCount);  
            y = Math.floor(Math.random()*Snake.rowCount);  
            if(!isCellFilled(x,y)){  
                Snake.tbl.rows[y].cells[x].style.backgroundColor = "black";  
                Snake.body.push({x:x,y:y,color:'black'});  
                break;  
            }  
        }  
        Snake.paused = true;  
        //��Ӽ����¼�  
		document.onkeydown= function(e){  
			if (!e)e=window.event;             
			switch(e.keyCode | e.which | e.charCode){  
                        case 13: {  
                                if(paused){  
                                        move();  
                                        paused = false;  
                                }  
                                else{  
                                      //���û����ͣ����ֹͣ�ƶ�  
                                        pause();  
                                        paused = true;  
                                }  
                                break;  
                        }  
                    case 37:{//left  
                        //��ֹ�ߵ�����  
                        if(Snake.direction==1){  
                            break;  
                        }  
                        Snake.direction = 3;  
                        break;  
	
                    }  
                    case 38:{//up  
                          //��ݼ�������������  
                            if(event.ctrlKey){  
                                  speedUp(-20);  
                                    break;  
                            }  
                        if(Snake.direction==2){//��ֹ�ߵ�����  
                            break;  
                        }  
                        Snake.direction = 0;  
                        break;  
                    }  
                    case 39:{//right  
                        if(Snake.direction==3){//��ֹ�ߵ�����  
                            break;  
                        }  
                        Snake.direction = 1;  
                        break;  
                    }  
                    case 40:{//down  
                            if(event.ctrlKey){  
                                  speedUp(20);  
                                    break;  
                            }  
                        if(Snake.direction==0){//��ֹ�ߵ�����  
                            break;  
                        }  
                        Snake.direction = 2;  
                        break;  
                    }  
                }  
            }  
   };  
	
	//�ƶ�  
	move = function(){  
		Snake.timer = setInterval(function(){        
			erase();  
            moveOneStep();              
			paint();  
			}, Snake.speed);  
    };  
	
	//�ƶ�һ������  
	moveOneStep =  function(){  
		if(checkNextStep()==-1){  
			clearInterval(Snake.timer);              
			alert("Game over!\nScore��" + score);         
			return;           
		} 
		if(checkNextStep()==1){                
			var _point = getNextPos();              
			var _x = _point.x;               
			var _y = _point.y;  			
			var _color = getColor(_x,_y);  
			Snake.body.unshift({x:_x,y:_y,color:_color});  
			//��Ϊ����һ��ʳ������ٲ���һ��ʳ��
			score = score + ((Snake.speed/10)*4);				
			generateFood();  
			return;  
        }  
           
            var point = getNextPos();  
            //������һ�ڵ���ɫ  
            var color = Snake.body[0].color;  
            //��ɫ��ǰ�ƶ�  
            for(var i=0; i<Snake.body.length-1; i++){  
                    Snake.body[i].color = Snake.body[i+1].color;  
            }  
            //��β��һ�ڣ� ��β��һ�ڣ�������ǰ����Ч��  
            Snake.body.pop();  
            Snake.body.unshift({x:point.x,y:point.y,color:color}); 
			Snake.body[0].color = "black";
			if(Snake.body.length>1)
				Snake.body[Snake.body.length-1].color = "black";
            //window.status = toString();  
        };  
		
		
    //̽Ѱ��һ�����ߵ�ʲô�ط�         
	getNextPos =  function(){  
		var x = Snake.body[0].x;  
		var y = Snake.body[0].y;  	
		var color = Snake.body[0].color;  
		//����  
		if(Snake.direction==0){  
			y--;  
		}  
		//����  
		else if(Snake.direction==1){  
			x++;  
		}  
		//����  
		else if(Snake.direction==2){  
			y++;  
		}  
		//����  
		else{  
			x--;  
		}  
		//����һ������  
		return {x:x,y:y};  
	};  
        
           
		
  //��������  
	erase = function(){  
		for(var i=0; i<Snake.body.length; i++){  
			eraseDot(Snake.body[i].x, Snake.body[i].y);  
        }  
    }; 
    
    //��������  
	paint = function(){  
		for(var i=0; i<Snake.body.length; i++){     
			paintDot(Snake.body[i].x, Snake.body[i].y,Snake.body[i].color);  
        }      
	}; 
       
   //����һ��  
   eraseDot = function(x,y){  
		Snake.tbl.rows[y].cells[x].style.backgroundColor = "";  
	};  
    paintDot = function(x,y,color){  
		Snake.tbl.rows[y].cells[x].style.backgroundColor = color;      
	};  
	
	//�õ�һ�������ϵ���ɫ  
	getColor = function(x,y){  
		return Snake.tbl.rows[y].cells[x].style.backgroundColor;  
	};  
  
		