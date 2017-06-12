    function $(id){return document.getElementById(id);} 
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
      
         Snake.tbl.rows[y].cells[x].style.backgroundColor = 'red';  
              
        //产生蛇头  
        while(true){  
            x = Math.floor(Math.random()*Snake.colCount);  
            y = Math.floor(Math.random()*Snake.rowCount);  
            Snake.tbl.rows[y].cells[x].style.backgroundColor = "black";  
            Snake.body.push({x:x,y:y,color:'black'});  
            break;  
          
        }  
        //添加键盘事件  
		document.onkeydown= function(e){  
			if (!e)e=window.event;             
			switch(e.keyCode | e.which | e.charCode){  
                    case 37:{//left  
                        //阻止蛇倒退走  
                        if(Snake.direction==1){  
                            break;  
                        }  
                        Snake.direction = 3;  
                        break;  
	
                    }  
                    case 38:{
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
                        if(Snake.direction==0){//阻止蛇倒退走  
                            break;  
                        }  
                        Snake.direction = 2;  
                        break;  
                    }  
                }  
            }  
   };  
   
   //move function  
	move = function(){  
		Snake.timer = setInterval(function(){        
			erase();  
            moveOneStep();              
			paint();  
			}, Snake.speed);  
    };  
	
	//move body one step 
	moveOneStep =  function(){  
		if(checkNextStep()==-1){  
			clearInterval(Snake.timer);              
			alert("Game over!\n");
			window.location.reload(); 
			return;           
		} 
		if(checkNextStep()==1){                
			var _point = getNextPos();              
			var _x = _point.x;               
			var _y = _point.y;  			
			var _color = getColor(_x,_y);    
			Snake.body.unshift({x:_x,y:_y,color:_color});  
			//eat food , create food 
			var foodx = Math.floor(Math.random()*Snake.colCount);  
			var foody = Math.floor(Math.random()*Snake.rowCount);  			
			Snake.tbl.rows[foody].cells[foodx].style.backgroundColor = "red"; 
			return;  
        }  
           
            var point = getNextPos();  
             var color = Snake.body[0].color;   
            for(var i=0; i<Snake.body.length-1; i++){  
                    Snake.body[i].color = Snake.body[i+1].color;  
            }  
            //add snake end one dot  
            Snake.body.pop();  
            Snake.body.unshift({x:point.x,y:point.y,color:color}); 
			Snake.body[0].color = "black";
			if(Snake.body.length>1)
				Snake.body[Snake.body.length-1].color = "black";
            //window.status = toString();  
        };  
		
		
    //Next position function         
	getNextPos =  function(){  
		var x = Snake.body[0].x;  
		var y = Snake.body[0].y;  	
		var color = Snake.body[0].color;  
		//to up  
		if(Snake.direction==0){  
			y--;  
		}  
		//to right  
		else if(Snake.direction==1){  
			x++;  
		}  
		//to down  
		else if(Snake.direction==2){  
			y++;  
		}  
		//to left  
		else{  
			x--;  
		}  
		//return a location  
		return {x:x,y:y};  
	};  
        
           
		
  //erase snake body
	erase = function(){  
		for(var i=0; i<Snake.body.length; i++){  
			eraseDot(Snake.body[i].x, Snake.body[i].y);  
        }  
    }; 
    
    //paint snake body
	paint = function(){  
		for(var i=0; i<Snake.body.length; i++){     
			paintDot(Snake.body[i].x, Snake.body[i].y,Snake.body[i].color);  
        }      
	}; 
       
   //erase one dot
   eraseDot = function(x,y){  
		Snake.tbl.rows[y].cells[x].style.backgroundColor = "";  
	}; 
	//paint one dot
    paintDot = function(x,y,color){  
		Snake.tbl.rows[y].cells[x].style.backgroundColor = color;      
	};  
	//get location color
	getColor = function(x,y){  
		return Snake.tbl.rows[y].cells[x].style.backgroundColor;  
	};  
  
		
	
	