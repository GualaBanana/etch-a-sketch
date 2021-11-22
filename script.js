class Canvas {
  constructor(element) {
    this.canvas = element;
    this.size = 16;
    this.backgroundColor = "hsl(179, 100%, 90%)";  //#d2fcef  #bdfffe  #b0ffe7
    this.paintColor = "black";
    this.fill();
  }
  // Figure out how to create one object and append it iteratively or
  // separately create cells and then iterate through them and modify them as needed in another step. (probably will change performance hit)
  fill() {
    for (let i = 0; i < 100 ** 2; i++) {
      const cell = new Cell(this);
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
    e.target.style.background = this.paintColor;
  }

  toggleGrid() {
    
  }
}

class Cell {
  constructor(canvas) {
    this.cell = document.createElement("div");
    this.cell.classList.add("cell");
    this.cell.addEventListener("mouseover", () => this.cell.style.background = canvas.paintColor);
    this.cell.style.background = canvas.backgroundColor;
    return this.cell;
  }
}

// Resolve the issue with unreseting input forms after page refresh.
// Define GUI class that is composed with the canvas on which this GUI operates (likely in another file).
const canvas = new Canvas(document.querySelector("#canvas"));

const canvasResSlider = document.querySelector("input[name='canvas-res']");
canvasResSlider.addEventListener("change", (e) => canvas.changeSize(e.target.value));
const mainColorPicker = document.querySelector(".color-picker__main-color");
mainColorPicker.addEventListener("change", (e) => canvas.paintColor = e.target.value);
mainColorPicker.addEventListener("load", () => mainColorPicker.value = "black");
const secondaryColorPicker = document.querySelector(".color-picker__secondary-color");
const colorSwapper = document.getElementById("color-swapper");
colorSwapper.addEventListener("click", () => {
  let temp = mainColorPicker.value;
  mainColorPicker.value = secondaryColorPicker.value;
  secondaryColorPicker.value = temp;
  canvas.paintColor = mainColorPicker.value;
});
const clearButton = document.querySelector("button#clear");
clearButton.addEventListener("click", () => canvas.clear());
