window.onload=function(){
      var paper = new Raphael(document.getElementById('canvas_container'), 2000, 1000);  
        function terminalTest(depth,callstack){
            var a;
            if(depth==0){
                a= true;
            }else if(depth==dTop){
                a=false;

            }else{
                a=false;               
                    
            }
            return a;
            
        }

        function eval_func(){
           return 1;
        }
        function legalMoves(callstack){
            var numberMoves=Math.floor(Math.random()*2)+3,tempMoves=[];  
            for(var i=0;i<numberMoves;i++){
                tempMoves.push(i);
            }
            tempMoves=[0,0,0,0];
            return tempMoves;

        }
        
    
            
        

        
        function max_value(topPos,topPosy,typeofagent,depth,topk,alpha,beta,alphabetaactive,callstack){
            console.log("entered max"+ depth);
            console.log(callstack);
             if(alphabetaactive){
                        allcallstacks.push(callstack.slice());
            }
            var max=-10000,movesLegal=legalMoves(callstack.slice());
            for(var k=0; k< movesLegal.length; k++){
                var topx=topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,dTop-depth)));
                var topy=topPosy+70;
                
                
                var wid=(cSize/(Math.pow(4,dTop)));
                arrowList[circleListC]= paper.path("M"+(topPos+wid*0.25)+" "+ (20+(dTop-depth)*70 +30)+"L" + ((topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth))))) + wid*0.25)+  " "+ (90+(dTop-depth)*70));
                set1.push(arrowList[circleListC]);
                circleList[circleListC]=paper.path("M"+ (topx-wid*0.25) +" "+ topy+ "L" + (topx + wid*0.75)+  " "+ topy+ "L" + (topx + 0.5*wid)+  " "+ (topy+30) + "L" + (topx)+  " "+ (topy+30) + "L" + (topx-0.25*wid) +  " "+ topy).attr({fill:"white"});
                circleList[circleListC].node.id="circle"+circleListC;
                circleList[circleListC].mouseover(function () {
                    if(this.attr("fill")!="green" && this.attr("fill")!="red"){
                        this.attr({fill:"yellow"});
                    }
                    console.log(this.attr("fill"));
                  });
                circleList[circleListC].mouseout(function(){
                    if(this.attr("fill")!="green" && this.attr("fill")!="red"){
                      this.attr({fill:"white"});
                    }
                })
                 if(!alphabetaactive){
                    circleList[circleListC].click(function(){
                        this.attr({opacity:"0.1", fill:"green"});
                        
                    })

                }else{
                    circleList[circleListC].click(function(){
                        this.attr({fill:"red"});
                        
                    })
                }
                circleListC++;
                var t=minimax(topx,topy,1,depth,topk.concat(k),alpha,beta,alphabetaactive,callstack.concat(k));    
                if(t>max){
                    max=t;
                }
                
                scoreList[scoreListC]=paper.text(topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth))))+ wid*0.25,treerootposy+(dTop-depth)*70 +15, t);
                scoreListC++;
                if(alphabetaactive){
                    if(t>=beta){
                        return t;
                    }
                    alpha=Math.max(alpha,t);
                }
            }
            
            return max;
            
        }
                
        function min_value(topPos,topPosy,typeofagent,depth,topk,alpha, beta, alphabetaactive,callstack){
           
           console.log("entered min"+ depth);
                       console.log(callstack);
            if(alphabetaactive){
                allcallstacks.push(callstack.slice());
            }
            var min=10000, movesLegal=legalMoves(callstack.slice());
            for(var k=0; k< movesLegal.length; k++){
                var topx=topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,dTop-depth)));
                var topy=topPosy+70;
                
                
                var wid=(cSize/(Math.pow(4,dTop)));
                arrowList[circleListC]= paper.path("M"+(topPos+wid*0.25)+" "+ (20+(dTop-depth)*70 +30)+"L" + ((topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth))))) + wid*0.25)+  " "+ (90+(dTop-depth)*70));
                    set1.push(arrowList[circleListC]);

                circleList[circleListC]=paper.path("M"+ (topx-wid*0.25) +" "+ topy+ "L" + (topx + wid*0.75)+  " "+ topy+ "L" + (topx + 0.5*wid)+  " "+ (topy+30) + "L" + (topx)+  " "+ (topy+30) + "L" + (topx-0.25*wid) +  " "+ topy).attr({fill:"white"});
                circleList[circleListC].node.id="circle"+circleListC;
                circleList[circleListC].mouseover(function () {
                    if(this.attr("fill")!="green" && this.attr("fill")!="red"){
                        this.attr({fill:"yellow"});
                    }
                    console.log(this.attr("fill"));
                  });
                circleList[circleListC].mouseout(function(){
                    if(this.attr("fill")!="green" && this.attr("fill")!="red"){
                        this.attr({fill:"white"});
                    }
                })
                if(!alphabetaactive){
                    circleList[circleListC].click(function(){
                        this.attr({opacity:"0.1", fill:"green"});
                    
                    })


                }else{
                    circleList[circleListC].click(function(){
                        this.attr({ fill:"red"});
                    
                    })


                }
                circleListC++;
                var t=minimax(topx,topy,0,depth,topk.concat(k),alpha, beta,alphabetaactive,callstack.concat(k));
                if(t<min){
                    min=t;
                }
                
                scoreList[scoreListC]=paper.text(topPos-1.5*(cSize/(Math.pow(4,(dTop-depth)))) +k*(cSize/(Math.pow(4,(dTop-depth))))+ wid*0.25,treerootposy+(dTop-depth)*70 +15, t);
                scoreListC++;
                if(alphabetaactive){
                    if(t<=alpha){
                        return t;
                    }
                    beta=Math.min(beta,t);
                }
            }
            
            return min;
            
        }
    
        function minimax(topPos,topPosy,typeofagent,depth,topk,alpha, beta, alphabetaactive, callstack){
            console.log("entered minimax"+ depth);
                        console.log(callstack);

            if(alphabetaactive){          
                allcallstacks.push(callstack.slice());
            }
            if(terminalTest(depth,callstack.slice())){
               
                
                return eval_func();
                
            }else{
                
                if(typeofagent==0){
                    
                    return max_value(topPos, topPosy, typeofagent,depth-1,topk,alpha, beta,alphabetaactive,callstack.slice());
                    
                }else{

                    return min_value(topPos, topPosy,typeofagent,depth-1,topk,alpha, beta,alphabetaactive,callstack.slice());
                    

                }
                
            }

        }
        
        

        
        
//=======================       
        var circleList=[],circleListC=0, arrowList=[],dTop=3,cSize=1280,treerootposy=90,cCount=0,scoreList=[],scoreListC=0;
        var movesList=[],addFlag=true,counter=0;
        var allcallstacks=[];
        var set1=paper.set();
        var x=minimax(cSize/2+50, 90, 0, dTop,[],-10000,10000,false,[]);
        addFlag=false;
        counter=0;
        console.log(allcallstacks);
        x=minimax(cSize/2+50, 90, 0, dTop,[],-10000,10000,true,[]);
        console.log(x);
        circleList=[];
        circleListC=0;
        arrowList=[];
        scoreList=[];
        scoreListC=0;
        cCount=0;
        
        //x=minimax(cSize/2+700, 90, 0, dTop,[],-10000,10000,true);
        console.log(x);
}










