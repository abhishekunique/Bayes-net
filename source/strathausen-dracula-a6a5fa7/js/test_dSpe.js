

window.onload=function(){
	var paths=[];
	function generatePaths(node, traversedPath, target){
		traversedPath.push(node);
		if(node==target){
			paths.push(traversedPath);
			return;
		}else if(children(node).length==0){
			return;
		}else{
			for(var i=0;i<children(node).length;i++){
				generatePaths(children(node)[i], traversedPath, target);
			}
			return;
		}
	}

	function children(node){
		sources=[];
		for(var i=0;i<node.edges.length;i++){
            if(node==node.edges[i].source){
                sources.push(node.edges[i].target);
            }   
        }
        return sources;
	}
};