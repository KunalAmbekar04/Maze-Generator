import React, { Component } from "react";
import Cell from "../Cell/Cell";
import "./Grid.css";

let current = ""; // hold current cell value.
let stack = []; // for Backtracing purpose.
let flag = true; // for checking first time implementation.

class Grid extends Component {
  // to enable and disable buttons
  state = {
    generateBtn: true,
    resetBtn: false,
    solveBtn: false,
  };

  cellArr = []; // hold all the cell component. (DOM)
  arr = []; // hold id of all cell component. (string)
  visited = []; // keep track of visited cell.
  n = this.props.size; // size of grid = n x n

  // initialize cellAr and arr.
  createGrid = () => {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        this.cellArr.push(<Cell id={`(${i},${j})`} key={`(${i},${j})`} />);
        this.arr.push(`(${i},${j})`);
      }
    }
  };

  // break wall between two cell.
  breakWall = (cell1, cell2) => {
    let x = Number(cell1[1]) - Number(cell2[1]);
    let y = Number(cell1[3]) - Number(cell2[3]);
    let a = document.getElementById(cell1);
    let b = document.getElementById(cell2);

    // Here we make common border color similar to background color.
    if (y === 1) {
      a.style.borderLeft = "1px solid white";
      b.style.borderRight = "1px solid white";
    } else if (y === -1) {
      a.style.borderRight = "1px solid white";
      b.style.borderLeft = "1px solid white";
    }

    if (x === 1) {
      a.style.borderTop = "1px solid white";
      b.style.borderBottom = "1px solid white";
    } else if (x === -1) {
      a.style.borderBottom = "1px solid white";
      b.style.borderTop = "1px solid white";
    }
  };

  // return a random non visited neighbour of current cell.
  getFormerNeighbour = (cell) => {
    let neighbours = [];
    let top = "(" + String(Number(cell[1]) - 1) + "," + cell[3] + ")";
    let right = "(" + cell[1] + "," + String(Number(cell[3]) + 1) + ")";
    let bottom = "(" + String(Number(cell[1]) + 1) + "," + cell[3] + ")";
    let left = "(" + cell[1] + "," + String(Number(cell[3]) - 1) + ")";

    if (this.arr.indexOf(top) >= 0) {
      if (!this.visited[this.arr.indexOf(top)]) {
        neighbours.push(top);
      }
    }

    if (this.arr.indexOf(right) >= 0) {
      if (!this.visited[this.arr.indexOf(right)]) {
        neighbours.push(right);
      }
    }

    if (this.arr.indexOf(bottom) >= 0) {
      if (!this.visited[this.arr.indexOf(bottom)]) {
        neighbours.push(bottom);
      }
    }

    if (this.arr.indexOf(left) >= 0) {
      if (!this.visited[this.arr.indexOf(left)]) {
        neighbours.push(left);
      }
    }

    if (neighbours.length > 0) {
      return neighbours[Math.floor(Math.random() * neighbours.length)];
    }
    return null;
  };

  // for maze generation
  generateMaze = () => {
    clearInterval(this.idInterval1);
    let source = "(0,0)";
    // generateMazeUtil function has to be execute in loop between after specific interval.
    this.idInterval1 = setInterval(() => this.generateMazeUtil(source), 50);
  };

  generateMazeUtil = (source) => {
    // for termination of setInterval in generateMaze.
    if (!flag) {
      if (stack.length === 0) {
        this.setState({
          generateBtn: false,
          resetBtn: true,
          solveBtn: true,
        });
        clearInterval(this.idInterval1);
      }
    }

    let currentDOM;
    let next; // hold neighbour of current cell.
    let parent = document.querySelectorAll(".cell");
    for (let i = 0; i < parent.length; i++) {
      parent[i].classList.remove("active");
    }

    // execute for first time only.
    if (flag) {
      current = source;
    }

    // mark current cell as visited.
    // get its non visited neighbour and also mark it as visited.
    // push current cell in stack and break wall b/w current and next cell.
    // if there is no non visited neighbour left then backtrack to recently added cell to stack.
    currentDOM = document.getElementById(current);
    currentDOM.classList.add("active");
    currentDOM.classList.add("visited");
    this.visited[this.arr.indexOf(current)] = true;
    next = this.getFormerNeighbour(current);
    flag = false;
    if (next) {
      this.visited[this.arr.indexOf(next)] = true;
      stack.push(current);
      this.breakWall(current, next);
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop(); // backtrack mechanism.
    }
  };

  //  return a random non visited neighbour of current cell where there exist no wall between them. 
  getActualNeighbour = (cell) => {
    let neighbours = [];
    let top = "(" + String(Number(cell[1]) - 1) + "," + cell[3] + ")";
    let right = "(" + cell[1] + "," + String(Number(cell[3]) + 1) + ")";
    let bottom = "(" + String(Number(cell[1]) + 1) + "," + cell[3] + ")";
    let left = "(" + cell[1] + "," + String(Number(cell[3]) - 1) + ")";
    let currentCell = document.getElementById(cell);
    
    // Here we check if wall exist or not.
    if (this.arr.indexOf(top) >= 0) {
      if (!this.visited[this.arr.indexOf(top)]) {
        let topCell = document.getElementById(top);
        if (
          topCell.style.borderBottom === "1px solid white" &&
          currentCell.style.borderTop === "1px solid white"
        ) {
          neighbours.push(top);
        }
      }
    }

    if (this.arr.indexOf(right) >= 0) {
      if (!this.visited[this.arr.indexOf(right)]) {
        let rightCell = document.getElementById(right);
        if (
          rightCell.style.borderLeft === "1px solid white" &&
          currentCell.style.borderRight === "1px solid white"
        ) {
          neighbours.push(right);
        }
      }
    }

    if (this.arr.indexOf(bottom) >= 0) {
      if (!this.visited[this.arr.indexOf(bottom)]) {
        let bottomCell = document.getElementById(bottom);
        if (
          bottomCell.style.borderTop === "1px solid white" &&
          currentCell.style.borderBottom === "1px solid white"
        ) {
          neighbours.push(bottom);
        }
      }
    }

    if (this.arr.indexOf(left) >= 0) {
      if (!this.visited[this.arr.indexOf(left)]) {
        let leftCell = document.getElementById(left);
        if (
          leftCell.style.borderRight === "1px solid white" &&
          currentCell.style.borderLeft === "1px solid white"
        ) {
          neighbours.push(left);
        }
      }
    }

    if (neighbours.length > 0) {
      return neighbours[Math.floor(Math.random() * neighbours.length)];
    }
    return null;
  };

  // for solving maze.
  solveMaze = () => {
    let source = "(0,0)";
    let destination = "(" + (this.n - 1) + "," + (this.n - 1) + ")";
    clearInterval(this.idInterval);
    this.visited = [];
    stack = [];
    flag = true;
    // solveMazeUtil function has to be execute in loop between after specific interval.
    this.idInterval2 = setInterval(
      () => this.solveMazeUtil(source, destination),
      50
    );
  };

  solveMazeUtil = (source, destination) => {
    let grid = document.querySelectorAll(".cell");
    for (let i = 0; i < grid.length; i++) {
      grid[i].classList.remove("solve");
    }

    let currentDOM;
    let next; // hold neighbour of current cell.

    // execute for first time only.
    if (flag) {
      current = source;
    }

    // mark current cell as visited.
    // get its non visited neighbour.
    // push current cell in stack and set current cell to next cell.
    // if no neighbour exist then backtrack to recently added cell to stack. 
    currentDOM = document.getElementById(current);
    this.visited[this.arr.indexOf(current)] = true;
    next = this.getActualNeighbour(current);
    flag = false;
    // for termination of setInterval in solveMaze.
    if (next === destination) {
      this.idInterval3 = setInterval(() => this.pathVisualisation(stack), 50);
      clearInterval(this.idInterval2);
      let end = document.getElementById(destination);
      end.style.backgroundColor = "red";
      this.setState({
        resetBtn: true,
        solveBtn: false,
      });
    }
    if (next) {
      stack.push(current);
      current = next;
    } else {
      current = stack.pop(); // backtrack mechanism.
    }
    currentDOM.classList.add("solve");
  };

  // Draw the resultant path. 
  pathVisualisation = (path) => {
    if (path.length === 1) {
      clearInterval(this.idInterval3);
    } else {
      let cell = path.pop();
      let cellDOM = document.getElementById(cell);
      cellDOM.classList.add("path");
    }
  };

  // reset the entire configuration.
  resetMaze = () => {
    this.visited = [];
    this.cellArr = [];
    this.arr = [];
    let cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.borderTop = "1px solid black";
      cells[i].style.borderRight = "1px solid black";
      cells[i].style.borderBottom = "1px solid black";
      cells[i].style.borderLeft = "1px solid black";
      cells[i].classList.remove("path");
      cells[i].classList.remove("solve");
    }

    let path = document.querySelectorAll("path");
    for (let i = 0; i < path.length; i++) {
      path[i].style.backgroundColor = "white";
      path[i].classList.remove("path");
    }

    let destination = "(" + (this.n - 1) + "," + (this.n - 1) + ")";
    let end = document.getElementById(destination);
    end.style.backgroundColor = "white";

    this.createGrid();
    this.visited = new Array(this.cellArr.length).fill(false);
    flag = true;
    this.setState({
      generateBtn: true,
      resetBtn: false,
      solveBtn: false,
    });
  };

  componentWillMount() {
    this.createGrid();
    this.visited = new Array(this.cellArr.length).fill(false);
  }

  render() {
    return (
      <div>
        <div style={{ width: this.n * 50 }} className="matrix">
          {this.cellArr}
        </div>
        <div id="wrapper">
          <button
            className="btn"
            onClick={this.generateMaze}
            disabled={!this.state.generateBtn}
          >
            Generate
          </button>
          <button
            className="btn"
            onClick={this.resetMaze}
            disabled={!this.state.resetBtn}
          >
            Reset
          </button>
          <button
            className="btn"
            onClick={this.solveMaze}
            disabled={!this.state.solveBtn}
          >
            Solve
          </button>
        </div>
      </div>
    );
  }
}

export default Grid;
