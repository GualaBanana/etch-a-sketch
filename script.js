class Canvas {
  static paintColor = "black";

  constructor(element) {
    this.canvas = element;
    this.size = 16;
    this.backgroundColor = "gainsboro";
    this.fill();
  }

  fill() {
    for (let i = 0; i < this.size ** 2; i++) {
      const cell = new Cell(this.backgroundColor);
      this.canvas.appendChild(cell);
    }
  }
  // It removes previous cells, later need to think about implementin it efficiently, just appending new cells (if it's better).
  clear() {
    this.canvas.innerHTML = ""  // Deletes all the children of the canvas.
    this.fill();
  }

  changeSize(value) {
    this.size = value;
    this.canvas.style.cssText = `grid-template: repeat(${this.size}, 1fr)/repeat(${this.size}, 1fr);`;
    this.clear(); 
    this.fill();
  }
  // Rainbow mode toggle will be checked here and if it's on, cell will be changed to different collor each time, without changig `Canvas.painColor`.
  paint(e) {
    e.target.style.background = Canvas.paintColor;
  }

  toggleGrid() {
    
  }

  changePaintColor(color) {
    Canvas.paintColor = color;
  }
}

class Cell {
  constructor(initialColor) {
    this.cell = document.createElement("div");
    this.cell.classList.add("cell");
    this.cell.addEventListener("mouseover", () => this.cell.style.background = Canvas.paintColor);
    this.cell.style.background = initialColor;
    return this.cell;
  }
}

const canvas = new Canvas(document.querySelector(".canvas"));
