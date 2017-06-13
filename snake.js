    function $(id){return document.getElementById(id);} 
    //Snake Class  
    var Snake = {  
        tbl: null,  
        body: [],  
        //nowDirection,value 0,1,2,3, up,right,down,left,change it by keyboard
        direction: 0,  
        //snake timer  
        timer: null,  
        //snake speed  
        speed: 250,  
		//snake paused
		paused: true, 
        //map row  
        rowCount: 30,  
        //map colum  
        colCount: 30,  
        
    }; 
	
	//snake init  
	init = function(){  
  
        Snake.tbl = $("main");  
        var x = 0;  
        var y = 0;  
        var colorIndex = 0; 
        //new direction  
        Snake.direction = Math.floor(Math.random()*4);  
        //create table  map 
        for(var row=0;row<Snake.rowCount;row++){  
            var tr=Snake.tbl.insertRow(-1);  
            for(var col=0;col<Snake.colCount;col++) {  
                var td=tr.insertCell(-1);  
            }  
        }  
        //create dor  
         x = Math.floor(Math.random()*Snake.colCount);  
         y = Math.floor(Math.random()*Snake.rowCount);   
      
         if(!isCellFilled(x,y)){  
            Snake.tbl.rows[y].cells[x].style.backgroundColor = 'red';  
         }  
              
        //create snake top  
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
        //keyboard event  
		document.onkeydown= function(e){  
			if (!e)e=window.event;             
			switch(e.keyCode | e.which | e.charCode){  
                    case 37:{//left  
                        //not back  
						
                        if(Snake.direction==1){  
                            break;  
                        }  
                        Snake.direction = 3;  
                        break;  
	
                    }  
                    case 38:{//up
						if(event.ctrlKey){  
                                  speedUp(-20);  
                                    break;  
                            } 
                        if(Snake.direction==2){//not back  
                            break;  
                        }  
                        Snake.direction = 0;  
                        break;  
                    }  
                    case 39:{//right  
                        if(Snake.direction==3){//not back  
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
                        if(Snake.direction==0){//not back  
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
			generateFood();
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
  
		
	
	