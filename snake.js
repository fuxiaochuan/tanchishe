    function $(id){return document.getElementById(id);} 
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
      
         Snake.tbl.rows[y].cells[x].style.backgroundColor = 'red';  
              
        //������ͷ  
        while(true){  
            x = Math.floor(Math.random()*Snake.colCount);  
            y = Math.floor(Math.random()*Snake.rowCount);  
            Snake.tbl.rows[y].cells[x].style.backgroundColor = "black";  
            Snake.body.push({x:x,y:y,color:'black'});  
            break;  
          
        }  
        //��Ӽ����¼�  
		document.onkeydown= function(e){  
			if (!e)e=window.event;             
			switch(e.keyCode | e.which | e.charCode){  
                    case 37:{//left  
                        //��ֹ�ߵ�����  
                        if(Snake.direction==1){  
                            break;  
                        }  
                        Snake.direction = 3;  
                        break;  
	
                    }  
                    case 38:{
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
                        if(Snake.direction==0){//��ֹ�ߵ�����  
                            break;  
                        }  
                        Snake.direction = 2;  
                        break;  
                    }  
                }  
            }  
   };  
	
	