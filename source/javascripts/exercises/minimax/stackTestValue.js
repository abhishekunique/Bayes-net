window.onload=function(){

var paper = new Raphael(document.getElementById('canvas_container'), 2000, 2000);  
var rows=parseInt($("#rows").val());
var columns=parseInt($("#columns").val());
var grid=new Array(rows);
var gridNode=new Array(rows);
var clickToggle=new Array(rows);
var pacmanToggle=new Array(rows);
var ghostToggle=new Array(rows);
var foodToggle=new Array(rows);
var wallsToggle=new Array(rows);

for(var i=0;i<rows;i++){
	grid[i]=new Array(columns);
	gridNode[i]=new Array(columns);
	clickToggle[i]=new Array(columns);
	pacmanToggle[i]=new Array(columns);
	ghostToggle[i]=new Array(columns);
	foodToggle[i]=new Array(columns);
	wallsToggle[i]=new Array(columns);

	for(var j=0;j<columns;j++){
		grid[i][j]=paper.rect(100+j*40,100+i*40,40,40).attr({fill:"black", stroke:"white"});
		pacmanToggle[i][j]=paper.image("/images/exercises/minimax/pacman.png", 100+j*40,100+i*40,40,40).attr({stroke:"white"}).toFront();
		ghostToggle[i][j]=paper.image("/images/exercises/minimax/ghost.png", 100+j*40,100+i*40,40,40).attr({stroke:"white"}).toFront();
		foodToggle[i][j]=paper.image("/images/exercises/minimax/food.png", 100+j*40,100+i*40,40,40).attr({stroke:"white"}).toFront();
		wallsToggle[i][j]=paper.rect(100+j*40,100+i*40,40,40).attr({fill:"white",stroke:"black"}).toFront();
		wallsToggle[i][j].hide();
		foodToggle[i][j].hide();
		ghostToggle[i][j].hide();
		pacmanToggle[i][j].hide();
		gridNode[i][j]=grid[i][j].node;
		gridNode[i][j].id=("grid"+ i+" "+j);
		clickToggle[i][j]=0;
		//pacmanToggle[i][j]=paper.image("/Users/abhishek/Desktop/pacman.png", 100+j*40 , 100+ i*40, 40,40).toFront();
		console.log(gridNode[i][j].id);
	}
}

for(var h=0;h<rows;h++){
	
	for(var k=0;k<columns;k++){
		var a=grid[h][k],b=pacmanToggle[h][k],c=ghostToggle[h][k],d=foodToggle[h][k],e=wallsToggle[h][k];
		a.click(function(){
			console.log("bla");
			var xc=((this.attr("y")-100.5)/40), yc=((this.attr("x")-100.5)/40);
			clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
			pacmanToggle[xc][yc].show().toFront();
				
			
		});
		b.click(function(){
			var xc=((this.attr("y")-100)/40), yc=((this.attr("x")-100)/40);
			clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
			
			pacmanToggle[xc][yc].hide();
			ghostToggle[xc][yc].show();
			ghostToggle[xc][yc].toFront();
			
		});
		c.click(function(){
			var xc=((this.attr("y")-100)/40), yc=((this.attr("x")-100)/40);
			clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
			
			ghostToggle[xc][yc].hide();
			foodToggle[xc][yc].show();
			foodToggle[xc][yc].toFront();
			
			
		});
		d.click(function(){
			var xc=((this.attr("y")-100)/40), yc=((this.attr("x")-100)/40);
			clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
			
			foodToggle[xc][yc].hide();
			wallsToggle[xc][yc].show();
			wallsToggle[xc][yc].toFront();
			
		});
	
		e.click(function(){
			var xc=((this.attr("y")-100.5)/40), yc=((this.attr("x")-100.5)/40);
			clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
			
			wallsToggle[xc][yc].hide();
			grid[xc][yc].toFront();
			
		});
	
	}
}
$('input').bind('change', function() {
 
/*reset all the pacmans and stuff*/
 	for(var i=0;i<rows;i++){
	
		for(var j=0;j<columns;j++){
			grid[i][j].hide();
			wallsToggle[i][j].hide();

			foodToggle[i][j].hide();
			ghostToggle[i][j].hide();
			pacmanToggle[i][j].hide();
			clickToggle[i][j]=0;
		}
	}
	rows=parseInt($("#rows").val());
	columns=parseInt($("#columns").val());
	for(var i=0;i<rows;i++){
		grid[i]=new Array(columns);
		clickToggle[i]=new Array(columns);
		pacmanToggle[i]=new Array(columns);
		ghostToggle[i]=new Array(columns);
		foodToggle[i]=new Array(columns);
		wallsToggle[i]=new Array(columns);
		for(var j=0;j<columns;j++){
			grid[i][j]=paper.rect(100+j*40,100+i*40,40,40).attr({fill:"black", stroke:"white"});
			wallsToggle[i][j]=paper.rect(100+j*40,100+i*40,40,40).attr({fill:"white", stroke:"white"});
			pacmanToggle[i][j]=paper.image("/images/exercises/minimax/pacman.png", 100+j*40,100+i*40,40,40).attr({stroke:"white"}).toFront();
			ghostToggle[i][j]=paper.image("/images/exercises/minimax/ghost.png", 100+j*40,100+i*40,40,40).attr({stroke:"white"}).toFront();
			foodToggle[i][j]=paper.image("/images/exercises/minimax/food.png", 100+j*40,100+i*40,40,40).attr({stroke:"white"}).toFront();
			foodToggle[i][j].hide();
			ghostToggle[i][j].hide();
			pacmanToggle[i][j].hide();
			wallsToggle[i][j].hide();
			clickToggle[i][j]=0;
			
		}
	}
	for(var h=0;h<rows;h++){
	
	for(var k=0;k<columns;k++){
		var a=grid[h][k],b=pacmanToggle[h][k],c=ghostToggle[h][k],d=foodToggle[h][k],e=wallsToggle[h][k];
		a.click(function(){
			console.log("bla");
			var xc=((this.attr("y")-100.5)/40), yc=((this.attr("x")-100.5)/40);
			clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
			pacmanToggle[xc][yc].show().toFront();
				
			
		});
		b.click(function(){
			var xc=((this.attr("y")-100)/40), yc=((this.attr("x")-100)/40);
			clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
			
			pacmanToggle[xc][yc].hide();
			ghostToggle[xc][yc].show();
			ghostToggle[xc][yc].toFront();
			
		});
		c.click(function(){
			var xc=((this.attr("y")-100)/40), yc=((this.attr("x")-100)/40);
			clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
			
			ghostToggle[xc][yc].hide();
			foodToggle[xc][yc].show();
			foodToggle[xc][yc].toFront();
			
			
		});
		d.click(function(){
			var xc=((this.attr("y")-100)/40), yc=((this.attr("x")-100)/40);
			clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
			
			foodToggle[xc][yc].hide();
			wallsToggle[xc][yc].show();
			wallsToggle[xc][yc].toFront();
			
		});
	
		e.click(function(){
			var xc=((this.attr("y")-100.5)/40), yc=((this.attr("x")-100.5)/40);
			clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
			
			wallsToggle[xc][yc].hide();
			grid[xc][yc].toFront();
			
		});
	
	
	}
}
});


		var boards=[],boardsIndex=0, pacmans=[],ghosts=[],foods=[], walls=[], ids=[];
		var toggleShow=true;
		var Contacts = {
			index: window.localStorage.getItem("Contacts:index"),
			$table: document.getElementById("contacts-table"),
			$button_save: document.getElementById("contacts-op-save"),
			$button_show:document.getElementById("show-load-table"),
			init: function() {
				
				// initialize storage index
				if (!Contacts.index) {
					window.localStorage.setItem("Contacts:index", Contacts.index = 1);
				}

				// initialize form
				
				Contacts.$button_show.addEventListener("click", function(event) {
					$("#contacts-table").toggle(toggleShow);
					$("#contacts-op-save").toggle(toggleShow);
					if(toggleShow){
						$("#show-load-table").text('Hide Load Table');
					}else{
						$("#show-load-table").text('Show Load Table');

					}
					toggleShow=!toggleShow;
					event.preventDefault();
				}, true);
				
				Contacts.$button_save.addEventListener("click", function(event) {
					
					var px=[],py=[],gx=[],gy=[], fx=[],fy=[],wx=[],wy=[];
					for(var i=0;i<rows;i++){
						for(var j=0;j<columns;j++){
							console.log(clickToggle[i][j]);
							if(clickToggle[i][j]==1){
								
								px.push(j);
								py.push(i);
							}
							if(clickToggle[i][j]==2){
								gx.push(j);
								gy.push(i);
							}
							if(clickToggle[i][j]==3){
								fx.push(j);
								fy.push(i);
							}
							if(clickToggle[i][j]==4){
								wx.push(j);
								wy.push(i);
							}
						}
					}
					
					console.log(px + "final");
					var entry = {
						id: 0,
						pacmanx: px,
						pacmany: py,
						ghostx: gx,
						ghosty: gy,
						numFood: fx.length,
						rows: rows,
						columns: columns, 
						foodx: fx,
						foody: fy,
						wallsx: wx,
						wallsy: wy
						
					};
					if (entry.id == 0) { // add
						Contacts.storeAdd(entry);
						Contacts.tableAdd(entry);
						Contacts.boardsAdd(entry);
					}
					console.log(boards);
					event.preventDefault();
				}, true);
				
				// initialize table
				
				if (window.localStorage.length - 1) {
					var contacts_list = [], i, key;
					for (i = 0; i < window.localStorage.length; i++) {
						key = window.localStorage.key(i);
						if (/Contacts:\d+/.test(key)) {
							contacts_list.push(JSON.parse(window.localStorage.getItem(key)));
						}
					}

					if (contacts_list.length) {
						contacts_list
							.sort(function(a, b) {
								return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
							})
							.forEach(Contacts.tableAdd);
					}
							
					if (contacts_list.length) {
						contacts_list
							.sort(function(a, b) {
								return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
							})
							.forEach(Contacts.boardsAdd);
					}
				}
				Contacts.$table.addEventListener("click", function(event) {
					var op = event.target.getAttribute("data-op");
					 if (/edit|remove/.test(op)) {
						var entry = JSON.parse(window.localStorage.getItem("Contacts:"+ event.target.getAttribute("data-id")));
						if (op == "edit") {
							Contacts.storeEdit(entry);
						}else if (op == "remove") {
							if (confirm('Are you sure you want to remove this entry from your contacts?')) {
								Contacts.storeRemove(entry);
								Contacts.tableRemove(entry);
							}
						}
						event.preventDefault();
					}
				}, true);
			},

			storeAdd: function(entry) {
				entry.id = Contacts.index;
				window.localStorage.setItem("Contacts:index", ++Contacts.index);
				window.localStorage.setItem("Contacts:"+ entry.id, JSON.stringify(entry));
			},
			storeEdit: function(entry) {
				for(var i=0;i<rows;i++){
				
					for(var j=0;j<columns;j++){
						grid[i][j].hide();
						foodToggle[i][j].hide();
						ghostToggle[i][j].hide();
						pacmanToggle[i][j].hide();
						wallsToggle[i][j].hide();
						clickToggle[i][j]=0;
					}
				}
				rows=entry.rows;
				columns=entry.columns;
				$('#rows').val(rows);
				$('#columns').val(columns);
				for(var i=0;i<rows;i++){
					grid[i]=new Array(columns);
					clickToggle[i]=new Array(columns);
					pacmanToggle[i]=new Array(columns);
					ghostToggle[i]=new Array(columns);
					foodToggle[i]=new Array(columns);
					wallsToggle[i]=new Array(columns);
					for(var j=0;j<columns;j++){
						grid[i][j]=paper.rect(100+j*40,100+i*40,40,40).attr({fill:"black", stroke:"white"});
						wallsToggle[i][j]=paper.rect(100+j*40,100+i*40,40,40).attr({fill:"white", stroke:"black"});
						pacmanToggle[i][j]=paper.image("/images/exercises/minimax/pacman.png", 100+j*40,100+i*40,40,40).attr({stroke:"white"}).toFront();
						ghostToggle[i][j]=paper.image("/images/exercises/minimax/ghost.png", 100+j*40,100+i*40,40,40).attr({stroke:"white"}).toFront();
						foodToggle[i][j]=paper.image("/images/exercises/minimax/food.png", 100+j*40,100+i*40,40,40).attr({stroke:"white"}).toFront();
						wallsToggle[i][j].hide();
						foodToggle[i][j].hide();
						ghostToggle[i][j].hide();
						pacmanToggle[i][j].hide();
					
						clickToggle[i][j]=0;
						
					}
				}
				console.log("rows"+ rows +"columns"+ columns);
				var px=entry.pacmanx, py=entry.pacmany, gx=entry.ghostx, gy=entry.ghosty, fx=entry.foodx, fy=entry.foody,wx=entry.wallsx, wy=entry.wallsy;
				for(var k=0;k<px.length;k++){
					pacmanToggle[py[k]][px[k]].show().toFront();
					clickToggle[py[k]][px[k]]=1;	
				}								///fix for multiple ghosts
				for(var k=0;k<gx.length;k++){
					ghostToggle[gy[k]][gx[k]].show().toFront();
					clickToggle[gy[k]][gx[k]]=2;	
				}
				for(var k=0;k<fx.length;k++){
					foodToggle[fy[k]][fx[k]].show().toFront();
					clickToggle[fy[k]][fx[k]]=3;	
				}
				for(var k=0;k<wx.length;k++){
					wallsToggle[wy[k]][wx[k]].show().toFront();
					clickToggle[wy[k]][wx[k]]=4;	
				}
				for(var h=0;h<rows;h++){
				
					for(var k=0;k<columns;k++){
						var a=grid[h][k],b=pacmanToggle[h][k],c=ghostToggle[h][k],d=foodToggle[h][k],e=wallsToggle[h][k];
						a.click(function(){
							console.log("bla");
							var xc=((this.attr("y")-100.5)/40), yc=((this.attr("x")-100.5)/40);
							clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
							pacmanToggle[xc][yc].show().toFront();
								
							
						});
						b.click(function(){
							var xc=((this.attr("y")-100)/40), yc=((this.attr("x")-100)/40);
							clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
							
							pacmanToggle[xc][yc].hide();
							ghostToggle[xc][yc].show();
							ghostToggle[xc][yc].toFront();
							
						});
						c.click(function(){
							var xc=((this.attr("y")-100)/40), yc=((this.attr("x")-100)/40);
							clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
							
							ghostToggle[xc][yc].hide();
							foodToggle[xc][yc].show();
							foodToggle[xc][yc].toFront();
							
							
						});
						d.click(function(){
							var xc=((this.attr("y")-100)/40), yc=((this.attr("x")-100)/40);
							clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
							
							foodToggle[xc][yc].hide();
							wallsToggle[xc][yc].show();
							wallsToggle[xc][yc].toFront();
							
						});
					
						e.click(function(){
							var xc=((this.attr("y")-100.5)/40), yc=((this.attr("x")-100.5)/40);
							clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
							
							wallsToggle[xc][yc].hide();
							grid[xc][yc].toFront();
							
						});
					
					
					
					}
				}
			},
			storeRemove: function(entry) {
				window.localStorage.removeItem("Contacts:"+ entry.id);
			},

			tableAdd: function(entry) {
				var $tr = document.createElement("tr"), $td, key;
				for (key in entry) {
					if (entry.hasOwnProperty(key)) {
						$td = document.createElement("td");
						$td.appendChild(document.createTextNode(entry[key]));
						$tr.appendChild($td);
					}  
				}
				$td = document.createElement("td");
				$td.innerHTML = '<a data-op="edit" data-id="'+ entry.id +'">Load</a> | <a data-op="remove" data-id="'+ entry.id +'">Remove</a>';
				$tr.appendChild($td);
				$tr.setAttribute("id", "entry-"+ entry.id);
				Contacts.$table.appendChild($tr);
			},
			tableRemove: function(entry) {
				Contacts.$table.removeChild(document.getElementById("entry-"+ entry.id));
			},
			boardsAdd: function(entry) {
				boards[boardsIndex]=paper.rect(900,200,entry.columns*40,entry.rows*40).attr({fill:"black"});
				pacmans[boardsIndex]=new Array(entry.pacmanx.length);
				ghosts[boardsIndex]=new Array(entry.ghostx.length);
				foods[boardsIndex]=new Array(entry.foodx.length);
				walls[boardsIndex]=new Array(entry.wallsx.length);
				console.log(entry.id);
				ids[boardsIndex]= entry.id;
				for(var i=0;i<entry.pacmanx.length;i++){
					pacmans[boardsIndex][i]=paper.image("/images/exercises/minimax/pacman.png", 900+entry.pacmanx[i]*40,200+entry.pacmany[i]*40,40,40).attr({stroke:"white"}).toFront();
					pacmans[boardsIndex][i].hide();
				}
				for(var i=0;i<entry.ghostx.length;i++){
					ghosts[boardsIndex][i]=paper.image("/images/exercises/minimax/ghost.png", 900+entry.ghostx[i]*40,200+entry.ghosty[i]*40,40,40).attr({stroke:"white"}).toFront();
					ghosts[boardsIndex][i].hide();
				}
				for(var i=0;i<entry.foodx.length;i++){
					foods[boardsIndex][i]=paper.image("/images/exercises/minimax/food.png", 900+entry.foodx[i]*40,200+entry.foody[i]*40,40,40).attr({stroke:"white"}).toFront();
					foods[boardsIndex][i].hide();
				}
				for(var i=0;i<entry.wallsx.length;i++){
					walls[boardsIndex][i]=paper.rect(900+entry.wallsx[i]*40,200+entry.wallsy[i]*40,40,40).attr({fill:"white", stroke:"black"}).toFront();
					walls[boardsIndex][i].hide();
				}

				boards[boardsIndex].hide();

				if(boardsIndex==0){
					boards[boardsIndex].show();

					for(var i=0;i<entry.pacmanx.length;i++){
						pacmans[boardsIndex][i].show();
					}
					for(var i=0;i<entry.ghostx.length;i++){
						ghosts[boardsIndex][i].show();
					}
					for(var i=0;i<entry.foodx.length;i++){
						foods[boardsIndex][i].show();
					}
					for(var i=0;i<entry.wallsx.length;i++){
						walls[boardsIndex][i].show();
					}
				}




				boardsIndex++;
			}
		};
		function hideAll(){
			for(var i=0;i<boards.length;i++){
				boards[i].hide();
				for(var j=0;j<pacmans[i].length;j++){
					pacmans[i][j].hide();
				}
				for(var j=0;j<ghosts[i].length;j++){
					ghosts[i][j].hide();
				}
				for(var j=0;j<foods[i].length;j++){
					foods[i][j].hide();
				}
				for(var j=0;j<walls[i].length;j++){
					walls[i][j].hide();
				}
			}

		}

		boardsCount=0;
		var right=paper.circle(1200,350,10).attr({fill:"yellow"});
		var left=paper.circle(800,350,10).attr({fill:"yellow"});
		right.click(function(){
			if(boards.length>0){
				hideAll();
				if(boardsCount<boardsIndex-1){
					boardsCount++;
				}

				boards[boardsCount].show();
				for(var k=0;k<pacmans[boardsCount].length;k++){
						pacmans[boardsCount][k].show();
				}
				for(var k=0;k<ghosts[boardsCount].length;k++){
						ghosts[boardsCount][k].show();
				}
				for(var k=0;k<foods[boardsCount].length;k++){
						foods[boardsCount][k].show();
				}
				for(var k=0;k<walls[boardsCount].length;k++){
						walls[boardsCount][k].show();
				}
			}
		});
		
		var remove_button=paper.circle(1200,550,10).attr({fill:"green"});
		remove_button.click(function(){
			var current_id = ids[boardsCount];
			if(boards.length>0){
				hideAll();

				boards.splice(boardsCount,1);
				pacmans.splice(boardsCount,1);
				ghosts.splice(boardsCount,1);
				foods.splice(boardsCount,1);
				walls.splice(boardsCount,1);
				
				
				boardsIndex--;
				if(boards.length>0){
					boards[0].show();
					boardsCount=0;
					for(var m=0;m<pacmans[boardsCount].length;m++){
								pacmans[boardsCount][m].show();
					}
					for(var m=0;m<ghosts[boardsCount].length;m++){
								ghosts[boardsCount][m].show();
					}
					for(var m=0;m<foods[boardsCount].length;m++){
								foods[boardsCount][m].show();
					}
					for(var m=0;m<walls[boardsCount].length;m++){
								walls[boardsCount][m].show();
					}
					
				}
				window.localStorage.removeItem("Contacts:"+ current_id);

			}

			console.log(boardsCount);

		});

		//draw button here for load/remove
		var load_button=paper.circle(1200,450,10).attr({fill:"blue"});
		load_button.click(function(){
			var current_id = ids[boardsCount];
			var board_entry = JSON.parse(window.localStorage.getItem("Contacts:"+ current_id));

			console.log(current_id);
			console.log(board_entry.pacmanx);
			for(var i=0;i<rows;i++){
				
					for(var j=0;j<columns;j++){
						grid[i][j].hide();
						foodToggle[i][j].hide();
						ghostToggle[i][j].hide();
						pacmanToggle[i][j].hide();
						wallsToggle[i][j].hide();
						clickToggle[i][j]=0;
					}
				}
				rows=board_entry.rows;
				columns=board_entry.columns;
				$('#rows').val(rows);
				$('#columns').val(columns);
				for(var i=0;i<rows;i++){
					grid[i]=new Array(columns);
					clickToggle[i]=new Array(columns);
					pacmanToggle[i]=new Array(columns);
					ghostToggle[i]=new Array(columns);
					foodToggle[i]=new Array(columns);
					wallsToggle[i]=new Array(columns);
					for(var j=0;j<columns;j++){
						grid[i][j]=paper.rect(100+j*40,100+i*40,40,40).attr({fill:"black", stroke:"white"});
						wallsToggle[i][j]=paper.rect(100+j*40,100+i*40,40,40).attr({fill:"white", stroke:"black"});
						pacmanToggle[i][j]=paper.image("/images/exercises/minimax/pacman.png", 100+j*40,100+i*40,40,40).attr({stroke:"white"}).toFront();
						ghostToggle[i][j]=paper.image("/images/exercises/minimax/ghost.png", 100+j*40,100+i*40,40,40).attr({stroke:"white"}).toFront();
						foodToggle[i][j]=paper.image("/images/exercises/minimax/food.png", 100+j*40,100+i*40,40,40).attr({stroke:"white"}).toFront();
						wallsToggle[i][j].hide();
						foodToggle[i][j].hide();
						ghostToggle[i][j].hide();
						pacmanToggle[i][j].hide();
					
						clickToggle[i][j]=0;
						
					}
				}
				console.log("rows"+ rows +"columns"+ columns);
				var px=board_entry.pacmanx, py=board_entry.pacmany, gx=board_entry.ghostx, gy=board_entry.ghosty, fx=board_entry.foodx, fy=board_entry.foody,wx=board_entry.wallsx, wy=board_entry.wallsy;
				for(var k=0;k<px.length;k++){
					pacmanToggle[py[k]][px[k]].show().toFront();
					clickToggle[py[k]][px[k]]=1;	
				}								///fix for multiple ghosts
				for(var k=0;k<gx.length;k++){
					ghostToggle[gy[k]][gx[k]].show().toFront();
					clickToggle[gy[k]][gx[k]]=2;	
				}
				for(var k=0;k<fx.length;k++){
					foodToggle[fy[k]][fx[k]].show().toFront();
					clickToggle[fy[k]][fx[k]]=3;	
				}
				for(var k=0;k<wx.length;k++){
					wallsToggle[wy[k]][wx[k]].show().toFront();
					clickToggle[wy[k]][wx[k]]=4;	
				}
				for(var h=0;h<rows;h++){
				
					for(var k=0;k<columns;k++){
						var a=grid[h][k],b=pacmanToggle[h][k],c=ghostToggle[h][k],d=foodToggle[h][k],e=wallsToggle[h][k];
						a.click(function(){
							console.log("bla");
							var xc=((this.attr("y")-100.5)/40), yc=((this.attr("x")-100.5)/40);
							clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
							pacmanToggle[xc][yc].show().toFront();
								
							
						});
						b.click(function(){
							var xc=((this.attr("y")-100)/40), yc=((this.attr("x")-100)/40);
							clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
							
							pacmanToggle[xc][yc].hide();
							ghostToggle[xc][yc].show();
							ghostToggle[xc][yc].toFront();
							
						});
						c.click(function(){
							var xc=((this.attr("y")-100)/40), yc=((this.attr("x")-100)/40);
							clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
							
							ghostToggle[xc][yc].hide();
							foodToggle[xc][yc].show();
							foodToggle[xc][yc].toFront();
							
							
						});
						d.click(function(){
							var xc=((this.attr("y")-100)/40), yc=((this.attr("x")-100)/40);
							clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
							
							foodToggle[xc][yc].hide();
							wallsToggle[xc][yc].show();
							wallsToggle[xc][yc].toFront();
							
						});
					
						e.click(function(){
							var xc=((this.attr("y")-100.5)/40), yc=((this.attr("x")-100.5)/40);
							clickToggle[xc][yc]=(clickToggle[xc][yc]+1)%5;
							
							wallsToggle[xc][yc].hide();
							grid[xc][yc].toFront();
							
						});
					
					
					
					}
				}
		});

		




		//on click
			// get current board's id
			// retrieve data from localStorage
			// draw board in the ediatable interface

		left.click(function(){
			if(boards.length>0){
				hideAll();
				if(boardsCount>0){
					boardsCount--;
				}
				boards[boardsCount].show();
				for(var l=0;l<pacmans[boardsCount].length;l++){
						pacmans[boardsCount][l].show();
				}
				for(var l=0;l<ghosts[boardsCount].length;l++){
						ghosts[boardsCount][l].show();
				}
				for(var l=0;l<foods[boardsCount].length;l++){
						foods[boardsCount][l].show();
				}
				for(var l=0;l<walls[boardsCount].length;l++){
						walls[boardsCount][l].show();
				}
			}
		});

		var slider=paper.rect(700,100,800,500);
		Contacts.init();
		console.log(boards);	
		$("#contacts-table").hide();
		$("#show-load-table").hide();						
		boards[0].show();
		for(var m=0;m<pacmans[boardsCount].length;m++){
					pacmans[boardsCount][m].show();
		}
		for(var m=0;m<ghosts[boardsCount].length;m++){
					ghosts[boardsCount][m].show();
		}
		for(var m=0;m<foods[boardsCount].length;m++){
					foods[boardsCount][m].show();
		}
		for(var m=0;m<walls[boardsCount].length;m++){
					walls[boardsCount][m].show();
		}
		console.log(pacmans);
		
		paper.text(1250,450,"LOAD");
		paper.text(1250,550,"REMOVE");







};