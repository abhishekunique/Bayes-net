window.onload=function(){
	

		var paper=new Raphael(document.getElementById('canvas_container'), 2000, 650); 
		var infinityMin=-10000,infinityMax=10000;
		var dTop=3;
		var values=[],temp=-1,flag=0,valuesToCheck=[];
		for(var i=0;i<10;i++){
			flag=0;
			while(flag==0){
				temp=-12+Math.floor(Math.random()*10)*3
				if(values.indexOf(temp)==-1){
					flag=1;
				}
				
			}
			
			values.push(temp);
		}
		values.push(21);

		values.push(Math.floor(Math.random()*4)*3-6);
		console.log(values);
		for(var i=1;i<13;i++){
			document.getElementById(i).textContent=values[i-1];
		}
		var counter=-1;	
		function terminalTest(depth){
			if(depth==0){
				return true;
			}else{
				return false;
			}
		}
		
		function utility(){
			counter++;
			return values[counter];
			
		}
		
		
		
		function legalMoves(agent){
		 	if(agent==2){
		 		return [0,1,2];
		 	}else{
		 		return [0,1];
		 	}
		}
		
	
			

		
		function max_value(agent,depth){

			var max=infinityMin,movesLegal=legalMoves(agent),moves;
			for(var k=0; k< movesLegal.length; k++){
				var t=minimax(1,depth-1);
				max=Math.max(t,max);
			}
			valuesToCheck.push(max);
			console.log("max: "+ max);
			return max;
		}
				
		function min_value(agent,depth){
			var min=infinityMax,movesLegal=legalMoves(agent),moves;
			for(var k=0; k< movesLegal.length; k++){
				var t=minimax(2,depth-1);
				min=Math.min(t,min);
			}
			valuesToCheck.push(min);
			console.log("min: "+ min);
			return min;
			
		}
	
		function exp_value(agent,depth){
			var value1=[],movesLegal=legalMoves(agent),expectation=0;
			for(var k=0; k< movesLegal.length; k++){
				var t=minimax(0,depth-1);
				value1.push(t)
			}
			for(var i=0;i<value1.length;i++){
				expectation+=(value1[i]/3);
			}
			valuesToCheck.push(expectation);
			console.log("expectation: "+ expectation);
			return expectation;
			
		}


		function minimax(agent,depth){

			if(terminalTest(depth)){

				return utility();
			}else{
				if(agent==0){
					return max_value(agent,depth);
				}else if(agent==1){
					return min_value(agent,depth);
				}else{
					return exp_value(agent,depth);
				}
			}
		}
		
		console.log(minimax(0,3));
		console.log(valuesToCheck);
		
		var flag1=0;
		$("#answer1").bind('change', function(){
			if(flag1==0){
				if($('#answer1').val() == valuesToCheck[6]){
					console.log("blabla");
					$("#path1").css("stroke","green");
					flag1=1;
					document.getElementById('answer1').disabled=true;	
				}else{
					$("#path1").css("stroke","red");
				}
			}
		});

		var flag2=0;
		$("#answer2").bind('change', function(){
			if(flag2==0){
				if($('#answer2').val() == valuesToCheck[2]){
					console.log("blabla");
					$("#path2").css("stroke","green");
					flag2=1;
					document.getElementById('answer2').disabled=true;	
				}else{
					$("#path2").css("stroke","red");
				}
			}
		});

		var flag3=0;
		$("#answer3").bind('change', function(){
			if(flag3==0){
				if($('#answer3').val() == valuesToCheck[5]){
					console.log("blabla");
					$("#path3").css("stroke","green");
					flag3=1;
					document.getElementById('answer3').disabled=true;	
				}else{
					$("#path3").css("stroke","red");
				}
			}
		});

		var flag4=0;
		$("#answer4").bind('change', function(){
			if(flag4==0){
				if($('#answer4').val() == valuesToCheck[0]){
					console.log("blabla");
					$("#path4").css("stroke","green");
					flag4=1;
					document.getElementById('answer4').disabled=true;	
				}else{
					$("#path4").css("stroke","red");
				}
			}
		});
		var flag5=0;
		$("#answer5").bind('change', function(){
			if(flag5==0){
				if($('#answer5').val() == valuesToCheck[1]){
					console.log("blabla");
					$("#path5").css("stroke","green");
					flag5=1;
					document.getElementById('answer5').disabled=true;	
				}else{
					$("#path5").css("stroke","red");
				}
			}
		});

		var flag6=0;
		$("#answer6").bind('change', function(){
			if(flag6==0){
				if($('#answer6').val() == valuesToCheck[3]){
					console.log("blabla");
					$("#path6").css("stroke","green");
					flag6=1;
					document.getElementById('answer6').disabled=true;	
				}else{
					$("#path6").css("stroke","red");
				}
			}
		});

		var flag7=0;
		$("#answer7").bind('change', function(){
			if(flag7==0){
				if($('#answer7').val() == valuesToCheck[4]){
					console.log("blabla");
					$("#path7").css("stroke","green");
					flag7=1;
					document.getElementById('answer7').disabled=true;	
				}else{
					$("#path7").css("stroke","red");
				}
			}
		});

};