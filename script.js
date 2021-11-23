class Canvas {
  constructor(element) {
    this.canvas = element;
    this.size = 16;
    this.backgroundColor = "hsl(179, 100%, 90%)";  //#d2fcef  #bdfffe  #b0ffe7
    this.canvas.style.backgroundColor = this.backgroundColor;
    this.paintColor = "black";
    this.rainbowMode = false;
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
    for (let cell of this.canvas.children) {
      cell.removeAttribute("style");
    }
  }

  changeSize(value) {
    this.size = value;
    this.canvas.style.gridTemplate = `repeat(${this.size}, 1fr)/repeat(${this.size}, 1fr)`;
    // this.canvas.style.gridTemplateRows = `repeat(${this.size}, 1fr)`;
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
    this.cell.addEventListener("mouseover", (e) => canvas.paint(e));
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
