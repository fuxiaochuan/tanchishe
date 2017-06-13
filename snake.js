    function $(id){return document.getElementById(id);} 
	var score = 0;
    //贪吃蛇类  
    var Snake = {  
        tbl: null,  
        body: [],  
        //当前移动的方向,取值0,1,2,3, 分别表示向上,右,下,左, 按键盘方向键可以改变它  
        direction: 0,  
        //定时器  
        timer: null,  
        //速度  
        speed: 250,  
        //是否已经暂停  
        paused: true,  
        //行数  
        rowCount: 30,  
        //列数  
        colCount: 30,  
        
    }; 
	
	//初始化  
	init = function(){  
  
        Snake.tbl = $("main");  
        var x = 0;  
        var y = 0;  
        var colorIndex = 0; 
		score = 0;
        //产生初始移动方向  
        Snake.direction = Math.floor(Math.random()*4);  
        //构造table  
        for(var row=0;row<Snake.rowCount;row++){  
            var tr=Snake.tbl.insertRow(-1);  
            for(var col=0;col<Snake.colCount;col++) {  
                var td=tr.insertCell(-1);  
            }  
        }  
        //产生节点  
         x = Math.floor(Math.random()*Snake.colCount);  
         y = Math.floor(Math.random()*Snake.rowCount);   
         if(!isCellFilled(x,y)){  
            Snake.tbl.rows[y].cells[x].style.backgroundColor = 'red';  
         }  
              
        //产生蛇头  
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
        //添加键盘事件  
		document.onkeydown= function(e){  
			if (!e)e=window.event;             
			switch(e.keyCode | e.which | e.charCode){  
                        case 13: {  
                                if(paused){  
                                        move();  
                                        paused = false;  
                                }  
                                else{  
                                      //如果没有暂停，则停止移动  
                                        pause();  
                                        paused = true;  
                                }  
                                break;  
                        }  
                    case 37:{//left  
                        //阻止蛇倒退走  
                        if(Snake.direction==1){  
                            break;  
                        }  
                        Snake.direction = 3;  
                        break;  
	
                    }  
                    case 38:{//up  
                          //快捷键在这里起作用  
                            if(event.ctrlKey){  
                                  speedUp(-20);  
                                    break;  
                            }  
                        if(Snake.direction==2){//阻止蛇倒退走  
                            break;  
                        }  
                        Snake.direction = 0;  
                        break;  
                    }  
                    case 39:{//right  
                        if(Snake.direction==3){//阻止蛇倒退走  
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
                        if(Snake.direction==0){//阻止蛇倒退走  
                            break;  
                        }  
                        Snake.direction = 2;  
                        break;  
                    }  
                }  
            }  
   };  
	
	//移动  
	move = function(){  
		Snake.timer = setInterval(function(){        
			erase();  
            moveOneStep();              
			paint();  
			}, Snake.speed);  
    };  
	
	//移动一节身体  
	moveOneStep =  function(){  
		if(checkNextStep()==-1){  
			clearInterval(Snake.timer);              
			alert("Game over!\nScore：" + score);         
			return;           
		} 
		if(checkNextStep()==1){                
			var _point = getNextPos();              
			var _x = _point.x;               
			var _y = _point.y;  			
			var _color = getColor(_x,_y);  
			Snake.body.unshift({x:_x,y:_y,color:_color});  
			//因为吃了一个食物，所以再产生一个食物
			score = score + ((Snake.speed/10)*4);				
			generateFood();  
			return;  
        }  
           
            var point = getNextPos();  
            //保留第一节的颜色  
            var color = Snake.body[0].color;  
            //颜色向前移动  
            for(var i=0; i<Snake.body.length-1; i++){  
                    Snake.body[i].color = Snake.body[i+1].color;  
            }  
            //蛇尾减一节， 蛇尾加一节，呈现蛇前进的效果  
            Snake.body.pop();  
            Snake.body.unshift({x:point.x,y:point.y,color:color}); 
			Snake.body[0].color = "black";
			if(Snake.body.length>1)
				Snake.body[Snake.body.length-1].color = "black";
            //window.status = toString();  
        };  
		
		
    //探寻下一步将走到什么地方         
	getNextPos =  function(){  
		var x = Snake.body[0].x;  
		var y = Snake.body[0].y;  	
		var color = Snake.body[0].color;  
		//向上  
		if(Snake.direction==0){  
			y--;  
		}  
		//向右  
		else if(Snake.direction==1){  
			x++;  
		}  
		//向下  
		else if(Snake.direction==2){  
			y++;  
		}  
		//向左  
		else{  
			x--;  
		}  
		//返回一个坐标  
		return {x:x,y:y};  
	};  
        
           
		
  //擦除蛇身  
	erase = function(){  
		for(var i=0; i<Snake.body.length; i++){  
			eraseDot(Snake.body[i].x, Snake.body[i].y);  
        }  
    }; 
    
    //绘制蛇身  
	paint = function(){  
		for(var i=0; i<Snake.body.length; i++){     
			paintDot(Snake.body[i].x, Snake.body[i].y,Snake.body[i].color);  
        }      
	}; 
       
   //擦除一节  
   eraseDot = function(x,y){  
		Snake.tbl.rows[y].cells[x].style.backgroundColor = "";  
	};  
    paintDot = function(x,y,color){  
		Snake.tbl.rows[y].cells[x].style.backgroundColor = color;      
	};  
	
	//得到一个坐标上的颜色  
	getColor = function(x,y){  
		return Snake.tbl.rows[y].cells[x].style.backgroundColor;  
	};  
  
		