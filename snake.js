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
		//
		mUser :null,
		
        
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
		Snake.mUser = getUser();
		document.getElementById("user").value = Snake.mUser;
        //����table  
        for(var row=0;row<Snake.rowCount;row++){  
            var tr=Snake.tbl.insertRow(-1);  
            for(var col=0;col<Snake.colCount;col++) {  
                var td=tr.insertCell(-1);  
            }  
        }  
		
		toggleScoring();
			
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
	function Scoring(name, score, playTime) {
	  this.name = name;
	  this.score = score;
	  this.playTime = playTime;
	}
	
	
	
	function JsonSort(json,key){
		//console.log(json);
		for(var j=1,jl=json.length;j < jl;j++){
			var temp = json[j],
				val  = temp[key],
				i    = j-1;
			while(i >=0 && json[i][key]<val){
				json[i+1] = json[i];
				i = i-1;    
			}
			json[i+1] = temp;
			
		}
		//console.log(json);
		return json;
	}
		
	function toggleScoring() {
		
			var table = document.getElementById("scoring_table"),
			trs = table.getElementsByTagName("tr");
			// ������˵�һ�е�������
			for (var i = trs.length - 1; i > 0; i--) {
				table.deleteRow(i);
			}
			// ��ȡ����
			var scoringStr = localStorage.getItem("scoring");
			if (scoringStr == null)
				return;
			var scoringArr = JSON.parse(scoringStr);
			var allScore = [];
			//var json = JsonSort(scoringArr,'score')
			
			for (var i = 0; i < scoringArr.length; i++) 
				allScore[i] = JSON.parse(scoringArr[i]);
				
			
			allScore = JsonSort(allScore,'score');
			var length = allScore.length;
			if(length>=20)
				length=20;
			for(var i = 0;i<allScore.length;i++){
				var scoring = allScore[i];
				var playTime = scoring.playTime;
				
				var name = scoring.name;
				var score = scoring.score;
				var newTr = table.insertRow();
					var td1 = newTr.insertCell();
					td1.innerHTML = " "+(i + 1);
					td1.align = "center";
				
					var td2 = newTr.insertCell();
					td2.innerHTML = name;
					td2.align = "center";
					var td3 = newTr.insertCell();
					td3.innerHTML = score;
					td3.align = "center";
					// ����ʱ��
					var newDate = new Date();
					newDate.setTime(playTime);
					var td4 = newTr.insertCell();
					td4.innerHTML = newDate.toLocaleString();
					td4.align = "center";
			}
	
	}
	//�ƶ�һ������  
	moveOneStep =  function(){  
		if(checkNextStep()==-1){  
			clearInterval(Snake.timer);
			alert(Snake.mUser+"\nGame over!\nYour Score is " + score);   
			var scoringStr = localStorage.getItem("scoring");
			var scoringArr  = new Array();
			var scoring = new Scoring(Snake.mUser,score, Date.parse(new Date()));
			if(scoringStr == null){
				scoringArr.push(JSON.stringify(scoring));
			}else{
				scoringArr = JSON.parse(scoringStr);
				scoringArr.push(JSON.stringify(scoring));
			}
			localStorage.setItem("scoring",JSON.stringify(scoringArr));
			toggleScoring();
			return;           
		} 
		if(checkNextStep()==1){                
			var _point = getNextPos();              
			var _x = _point.x;               
			var _y = _point.y;  			
			var _color = getColor(_x,_y);  
			Snake.body.unshift({x:_x,y:_y,color:_color});  
			//��Ϊ����һ��ʳ������ٲ���һ��ʳ��
			score = score + 100+(250-Snake.speed)/4;				
			generateDood();  
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
	
  
  
		