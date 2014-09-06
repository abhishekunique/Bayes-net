window.onload=function(){
	

		var paper=new Raphael(document.getElementById('canvas_container'), 2000, 650); 
		var infinityMin=-10000,infinityMax=10000;
		var dTop=2;
		var values=[],temp=-1,flag=0,valuesToCheck=[];
		for(var i=0;i<9;i++){
			flag=0;
			while(flag==0){
				temp=Math.floor(-5+Math.random()*10);
				if(values.indexOf(temp)==-1){
					flag=1;
				}
			}
			
			values.push(temp);
		}
		console.log(values);
		for(var i=1;i<10;i++){
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
		
		
		
		function legalMoves(){
		 	return [1,2,3];
		}
		
	
			

		
		function max_value(agent,depth){

			var max=infinityMin,movesLegal=legalMoves(),moves;
			for(var k=0; k< movesLegal.length; k++){
				var t=minimax(1,depth-1);
				max=Math.max(t,max);
			}
			valuesToCheck.push(max);
			return max;
		}
				
		function min_value(agent,depth){
			var min=infinityMax,movesLegal=legalMoves(),moves;
			for(var k=0; k< movesLegal.length; k++){
				var t=minimax(0,depth-1);
				min=Math.min(t,min);
			}
			valuesToCheck.push(min);
			return min;
			
		}
	
		function minimax(agent,depth){

			if(terminalTest(depth)){

				return utility();
			}else{
				if(agent==0){
					return max_value(agent,depth);
				}else{
					return min_value(agent,depth);
				}
			}
		}
		$()
		console.log(minimax(0,2));
		console.log(valuesToCheck);

		var flag1=0;
		$("#answer1").bind('change', function(){
			if(flag1==0){
				if($('#answer1').val() == valuesToCheck[3]){
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
				if($('#answer2').val() == valuesToCheck[0]){
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
				if($('#answer3').val() == valuesToCheck[1]){
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
				if($('#answer4').val() == valuesToCheck[2]){
					console.log("blabla");
					$("#path4").css("stroke","green");
					flag4=1;
					document.getElementById('answer4').disabled=true;	
				}else{
					$("#path4").css("stroke","red");
				}
			}
		});

};