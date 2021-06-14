import React, { Component } from 'react';
import GridBlock from './GridBlockComponent';
import Header from './HeaderComponent';
import Chooser from './Algo-chooserComponent';
import {dijkstra, getNodesInShortestPathOrder} from '../Algorithms/Dijkstra';
import {getNodesInShortestPathOrderBbfs} from '../Algorithms/biDirectionalBfs';
import {bfs} from '../Algorithms/bfs';
import {dfs} from '../Algorithms/dfs';
import {greedyBFS} from '../Algorithms/greedybfs';
import {biDirectionalBfs} from '../Algorithms/biDirectionalBfs';
import {aSearch} from '../Algorithms/Asearch';


class GridLayout extends Component {

    constructor(props){
        super(props);
        this.state={
            boxes:[],
            start:[1,10],
            changed:false,
            end:[13,45],
            unchanged:true
        }
    } 

    componentDidUpdate() {
      if (this.state.changed)
      {
      console.log(document.getElementById(`node-${this.state.start[0]}-${this.state.start[1]}`));
        console.log('in getderivedstate');
        let val2 = this.gridRender();
          this.setState({
            boxes:val2
          })
      console.log(document.getElementById(`node-${this.state.start[0]}-${this.state.start[1]}`));
      }
    }

    componentDidMount(){
      let val= this.gridRender();
      this.setState({
        boxes:val
      })
    }

    change = (va) => {
      console.log("param val =",va)
      // let val = this.gridRerender();
      // this.setState({
      //   ...this.state,
      //   boxes:val
      // })
      console.log("before state:", this.state);

      this.setState({
        changed:true,start: va, unchanged: false},()=>{
        console.log("after state ", this.state.start);
        this.setState({
          changed:false,
        })
        // console.log(val2);
        // this.setState({
        //     boxes:val2
        // })

      });

      // console.log("after state:",this.state.start)
      // let val2 = this.gridRender();
      // this.setState({
      //   boxes:val2
      // })
      console.log(document.getElementById(`node-${this.state.start[0]}-${this.state.start[1]}`));
      console.log("state ",this.state.start);
    }


    // change(1);

    gridRender(){
        const b=[];
        for(let row=0;row<19;row++){
            const currRow=[];
            for(let col=0;col<60;col++){

                const val = {
                    row,
                    col,
                    strt: row===this.state.start[0] && col===this.state.start[1],
                    end: row===this.state.end[0] && col===this.state.end[1],
                    startnode:this.state.start,
                    endnode:this.state.end,
                    distance: Infinity,
                    isVisited: false,
                    previousNode: null,
                    isBbfs:false,
                    iswall:false,
                    isweight:false,
                    cost:0,
                    aDis:0
                };
                currRow.push(val);
            }
            b.push(currRow)
        }

      return b;
    }

    grdRender(r,c){
      const b=[];
      for(let row=0;row<19;row++){
          const currRow=[];
          for(let col=0;col<60;col++){

              const val = {
                  row,
                  col,
                  strt: row===1 && col===5,
                  end: row===this.state.end[0] && col===this.state.end[1],
                  startnode:this.state.start,
                  endnode:this.state.end,
                  distance: Infinity,
                  isVisited: false,
                  previousNode: null,
                  isBbfs:false,
                  iswall:false,
                  isweight:false,
                  cost:0,
                  aDis:0
              };
              currRow.push(val);
          }
          b.push(currRow)
      }

      this.setState({
        boxes:b
      })
  }


    gridRerender(){
      const b=[];
      for(let row=0;row<19;row++){
          const currRow=[];
          for(let col=0;col<60;col++){

              const val = {
                  row,
                  col,
                  strt: row===this.state.start[0] && col===this.state.start[1],
                  end: row===this.state.end[0] && col===this.state.end[1],
                  startnode:this.state.start,
                  endnode:this.state.end,
                  distance: Infinity,
                  isVisited: false,
                  previousNode: null,
                  iswall:false,
                  isBbfs:false,
                  isweight:false,
                  cost:0,
                  aDis:0
              };
              currRow.push(val);
              document.getElementById(`node-${row}-${col}`).className = '';
          }
          b.push(currRow)
      }

    return b;
  }

  clearStyles(st){
    const val= this.state.boxes;
    for(let row=0;row<val.length;row++){
      for(let col=0;col<val[0].length;col++){
        const node = val[row][col];
        if(st)
        {
          if(!node.iswall && !node.isweight){
            document.getElementById(`node-${row}-${col}`).className = '';
          }
        }
        else{
          if(!node.iswall){
            document.getElementById(`node-${row}-${col}`).className = '';
          }
        }
      }
    }
  }

  generateNewGridWithPreviousWalls(){
    const b=[];
      for(let row=0;row<19;row++){
          const currRow=[];
          for(let col=0;col<60;col++){
              const boxes = this.state.boxes;
              const node = boxes[row][col];
              const val = {
                  row,
                  col,
                  strt: row===this.state.start[0] && col===this.state.start[1],
                  end: row===this.state.end[0] && col===this.state.end[1],
                  startnode:this.state.start,
                  endnode:this.state.end,
                  distance: Infinity,
                  aDis:0,
                  aEndDis:0,
                  isVisited: node.iswall? node.isVisited : false ,
                  isweight:false,
                  cost:0,
                  previousNode: null,
                  iswall: node.iswall
              };
              currRow.push(val);
              console.log('prev wall');
          }
          b.push(currRow)
      }

    return b;
  }

  randomGridGeneration(){
    const b=[]
    if(!this.state.running){
      for(let row=0;row<19;row++){
        const c=[];
        for(let col=0;col<60;col++){
          const ran = Math.floor(Math.random()*5+1);
          const box= this.state.boxes;


          const node = box[row][col];

          const val = {
              row,
              col,
              strt: node.strt,
              end: node.end,
              distance: Infinity,
              startnode:this.state.start,
              endnode:this.state.end,
              aDis:0,
              aEndDis:0,
              isVisited: !this.prime(ran) && !node.strt && !node.end ? true : false ,
              previousNode: null,
              isweight:false,
              cost:0,
              iswall: !this.prime(ran) && !node.strt && !node.end ? true : false
          };
          if(!this.prime(ran) && !node.strt && !node.end){
            document.getElementById(`node-${row}-${col}`).className = 'node-wall';
          }
            c.push(val);
        }
        b.push(c)
      }
    }
    return b;
  }

  randomWeightGeneration(){
    const b=[]
    if(!this.state.running){
      for(let row=0;row<19;row++){
        const c=[];
        for(let col=0;col<60;col++){
          const ran = Math.floor(Math.random()*5+1);
          const box= this.state.boxes;


          const node = box[row][col];

          const val = {
              row,
              col,
              strt: node.strt,
              end: node.end,
              distance: Infinity,
              startnode:this.state.start,
              endnode:this.state.end,
              aDis:0,
              aEndDis:0,
              isVisited: false,
              previousNode: null,
              isweight:!this.prime(ran) && !node.strt && !node.end ? true : false,
              cost:!this.prime(ran) && !node.strt && !node.end ? 5 : 0,
              iswall: false
          };
          if(!this.prime(ran) && !node.strt && !node.end){
            document.getElementById(`node-${row}-${col}`).className = 'node-weight';
          }
            c.push(val);
        }
        b.push(c)
      }
    }
    return b;
  }

  prime(num){

    if(num===1){
      return false
    }
    else{
      for(let i=2;i<this.prime;i++){
          if(num%i===0){
            return false
          }
      }
    }
    return true
  }

  even(num){

    if(num%2 ===0 ){
      return true;
    }
    return false
  }

  randomGrid(){
    if(this.state.boxes !== []){
      this.clearStyles();
      this.clearGridForNewAlgo();
    }
    const val = this.randomGridGeneration();
    this.setState({
      boxes:val
    })
  }

  randomWeight(){
    if(this.state.boxes !== []){
      this.clearStyles();
      this.clearGridForNewAlgo();
    }
    const val = this.randomWeightGeneration();
    this.setState({
      boxes:val
    })
  }


  verticalSkew() {
    if(this.state.boxes !== []){
      this.clearStyles();
      this.clearGridForNewAlgo();
    }
    const val = this.verticalGridGeneration();
    this.setState({
      boxes:val
    })
  }

  horizontalSkew(){

  }

   

    clearGrid() {
      if(!this.state.running){
        console.log(this.state.running);
        let val= this.gridRerender();
        this.setState({
          boxes:val
        });
      }
      else{
       prompt("Algo is running"); 
      }
      
    }

    clearGridForNewAlgo(){
      let val = this.generateNewGridWithPreviousWalls();
      this.setState({
        boxes:val
      })
    }

    animateShortestPath(nodesInShortestPathOrder) {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          console.log("short")
          console.log(node);
          console.log(node.row+" "+node.col);

          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
        },  10 * i);
      }
    }

    animateDijkstra(visitedNodes, shortestPath) {

      // if we reach the finish node
      for (let i = 0; i < visitedNodes.length; i++) {
        if (i === visitedNodes.length - 1) {
          setTimeout(() => {
            this.animateShortestPath(shortestPath);
          }, 10 * i);
          return;
        }

        setTimeout(() => {
        const node = visitedNodes[i];
        console.log(node)
        console.log(node.row+" "+node.col);
        console.log(document.getElementById(`node-${node.row}-${node.col}`).id)
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
        }, 10 * i);
      }
    }



    animateBfs(visitedNodes, shortestPath) {

      // if we reach the finish node
      for (let i = 0; i < visitedNodes.length; i++) {
        if (i === visitedNodes.length - 1) {
          setTimeout(() => {
            this.animateShortestPath(shortestPath);
          }, 10 * i);
          return;
        }

        setTimeout(() => {
        const node = visitedNodes[i];
        console.log(node);
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
        }, 10 * i);
      }
    }

    animateBbfs(visitedNodes, shortestPath1, shortestPath2) {

      // if we reach the finish node
      for (let i = 0; i < visitedNodes.length; i++) {
        if (i === visitedNodes.length - 1) {
          setTimeout(() => {
            this.animateShortestPath(shortestPath1);
            this.animateShortestPath(shortestPath2);
          }, 10 * i);
          return;
        }

        setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
        }, 10 * i);
      }
    }

    animateDfs(visitedNodes) {

      // if we reach the finish node
      for (let i = 0; i < visitedNodes.length; i++) {
        if (i === visitedNodes.length - 1) {
          setTimeout(() => {
            console.log(visitedNodes);
            this.animateShortestPath(visitedNodes);
          }, 10* i);
          return;
        }

        setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
        }, 10 * i);
      }
    }

    visualizeDijkstra() {
      if(this.state.boxes !== []){
        this.clearStyles(true);
        this.clearGridForNewAlgo();
      }
      

      const {boxes} = this.state;
      // TO-D0 : start & finish are static for now
      const start = boxes[this.state.start[0]][this.state.start[1]];
      const finish = boxes[this.state.end[0]][this.state.end[1]];

      start.strt = true;
      finish.finish = false;

      // apply dijkstra and get shortest part
      const visitedNodes = dijkstra(boxes, start, finish);

      console.log(visitedNodes);
      const shortestPath = getNodesInShortestPathOrder(finish);

      this.animateDijkstra(visitedNodes, shortestPath);

      console.log("running true");
        
      console.log('running false')
    }

     visuaizeBFS() {
      if(this.state.boxes !== []){
        this.clearStyles(false);
        this.clearGridForNewAlgo();
      }
      const {boxes} = this.state;

      const start = boxes[this.state.start[0]][this.state.start[1]];
      const finish = boxes[this.state.end[0]][this.state.end[1]];
      
      start.strt = true;
      finish.finish = false;

      const visitedNodes = bfs(boxes,start,finish);

      console.log(visitedNodes);

      const shortestPath = getNodesInShortestPathOrder(finish);
      console.log(shortestPath);

      this.animateBfs(visitedNodes, shortestPath);

    }

    visualizeBBFS() {
      if(this.state.boxes !== []){
        this.clearStyles(false);
        this.clearGridForNewAlgo();
      }
      const {boxes} = this.state;

      const start = boxes[this.state.start[0]][this.state.start[1]];
      const finish = boxes[this.state.end[0]][this.state.end[1]];

      const visitedNodes = biDirectionalBfs(boxes,start,finish);
      console.log('bbfs');
      console.log(visitedNodes);

      const shortestPath2 = getNodesInShortestPathOrderBbfs(visitedNodes[1]);
      const shortestPath1 = getNodesInShortestPathOrderBbfs(visitedNodes[2]);


      console.log(shortestPath1,shortestPath2);

      this.animateBbfs(visitedNodes[0], shortestPath1,shortestPath2);

    }

    visuaizeDFS() {
      if(this.state.boxes !== []){
        this.clearStyles(false);
        this.clearGridForNewAlgo();
      }
      const {boxes} = this.state;

      const start = boxes[this.state.start[0]][this.state.start[1]];
      const finish = boxes[this.state.end[0]][this.state.end[1]];

      const visitedNodes = dfs(boxes,start,finish);
      this.animateDfs(visitedNodes);
    }

    visuaizeGBFS() {
      if(this.state.boxes !== []){
        this.clearStyles(true);
        this.clearGridForNewAlgo();
      }
      console.log('Started gbfs');
      const {boxes} = this.state;

      const start = boxes[this.state.start[0]][this.state.start[1]];
      const finish = boxes[this.state.end[0]][this.state.end[1]];

      const visitedNodes = greedyBFS(boxes,start,finish);
      this.animateDfs(visitedNodes);

    }

    visualizeaSearch() {
      if(this.state.boxes !== []){
        this.clearStyles(true);
        this.clearGridForNewAlgo();
      }

      const {boxes} = this.state;
      // TO-D0 : start & finish are static for now
      const start = boxes[this.state.start[0]][this.state.start[1]];
      const finish = boxes[this.state.end[0]][this.state.end[1]];

      // apply dijkstra and get shortest part
      const visitedNodes = aSearch(boxes, start, finish);

      console.log(visitedNodes);

      const shortestPath = getNodesInShortestPathOrder(finish);

      this.animateDijkstra(visitedNodes, shortestPath);
    }

    handleMouseDown(row,col) {
      console.log("Down");
      const newgrid  = this.getNewGridWithWall(this.state.boxes,row,col);
      this.setState({
        boxes:newgrid,
        isMousePressed:true
      });
      document.getElementById(`node-${row}-${col}`).className = 'node-wall';

    }

    handleMouseEnter(row,col){
      console.log("Enter -"+row +'-'+col);

      if( ! this.state.isMousePressed ) return;
      const newGrid = this.getNewGridWithWall(this.state.boxes,row,col);
      this.setState({boxes:newGrid});
    }

    handleMouseUp(){
      console.log("Up");

      this.setState({isMousePressed:false});
    }


    getNewGridWithWall(grid,row,col){
      const newGrid = grid.slice();
      const node = newGrid[row][col];
      const newNode = {
        ...node,
        iswall: !node.iswall,
        isVisited: !node.isVisited
      };
      console.log(newNode)
      newGrid[row][col] = newNode;
      return newGrid;
    }

    chngstart(){
      this.grdRender();  
    }

    render() {
        const {boxes} = this.state;


        console.log('start state ::',this.state.start);

        return (
            <div>
             

                <Header dijkstra={()=>this.visualizeDijkstra()}
                        bfs={() => this.visuaizeBFS()}
                        gbfs={() => this.visuaizeGBFS()}
                        dfs={() => this.visuaizeDFS()}
                        bbfs={() => this.visualizeBBFS()}
                        astar={() => this.visualizeaSearch()}
                        clearGrid={() => this.clearGrid()}
                        randomGrid={() => this.randomGrid()}
                        randomWeight={()=> this.randomWeight()}
                ></Header>

              <button onClick={()=>this.chngstart()}> click</button>
              <div className="grid-container">
                    {
                    boxes.map((row,pos) => {
                        return(
                        <div className="grid-row" key={`r-${pos}`}>
                        {row.map((c,pos2) => {

                            return( 
                            <GridBlock 
                              chng={{start:this.state.start,func:this.change.bind(this)}} 
                              row={pos} 
                              col={pos2} 
                              key={`${pos}-${pos2}`} 
                              start={c.strt} 
                              end={c.end} 
                              startnode={this.state.start} 
                              endnode={this.state.end} 
                              grdRender={this.grdRender.bind(this)} 
                              unchanged={this.state.unchanged} 
                              mouseIsPressed={this.state.isMousePressed} 
                              iswall={c.iswall}

                              onMouseDown ={(row,col) => this.handleMouseDown(row,col)}
                              onMouseEnter = {(row,col) => this.handleMouseEnter(row,col)}
                              onMouseUp={() => this.handleMouseUp()}

                            ></GridBlock>)})

                    }
                        </div>
                        );
                    })
                    }

              </div>

          </div>
        )
    }
}

export default GridLayout;