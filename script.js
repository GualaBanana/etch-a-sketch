class Canvas {
  static paintColor = "black";

  constructor(element) {
    this.canvas = element;
    this.size = 16;
    this.backgroundColor = "gainsboro";
    this.fill();
  }

  fill() {
    for (let i = 0; i < 100 ** 2; i++) {
      const cell = new Cell(this.backgroundColor);
      this.canvas.appendChild(cell);
    }
  }
  clear() {
    // Instead of reseting cells from here consider defining reset() in Cell class.
    const cells = this.canvas.children;
    for (let cell of cells) {
      cell.style.background = this.backgroundColor;
    }
  }

  changeSize(value) {
    this.size = value;
    this.canvas.style.cssText = `grid-template: repeat(${this.size}, 1fr)/repeat(${this.size}, 1fr);`;
    this.clear(); 
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

// Define GUI class that is composed with the canvas on which this GUI operates (likely in another file).
const canvas = new Canvas(document.querySelector(".canvas"));
const canvasResSlider = document.querySelector("input[name='canvas-res']");
canvasResSlider.addEventListener("change", (e) => canvas.changeSize(e.target.value));
