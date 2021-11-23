class Canvas {
  constructor(element) {
    this.canvas = element;
    this.size = 16;
    this.canvas.style.backgroundColor = "hsl(179, 100%, 90%)";
    this.fill();

    this.brushMode = "default";
    this.paintColor = "black";
  }

  fill() {
    for (let i = 0; i < 100 ** 2; i++) {
      const pixel = document.createElement("div");
      this.canvas.appendChild(pixel);
    }
    this.canvas.querySelectorAll("div").forEach(pixel => pixel.addEventListener("mouseover", (e) => canvas.alterPixelColor(e.target)));
  }

  alterPixelColor(pixel) {
    switch(this.brushMode) {
      case "default":
        pixel.style.background = this.paintColor;
        return;
      case "eraser":
        this.erase(pixel);
        return;
      case "rainbow":
        pixel.style.background = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` ;
        return;
    }
  }

  clear() {
    for (let pixel of this.canvas.children) {
      this.erase(pixel);
    }
  }
  
  erase(pixel) {
    pixel.removeAttribute("style");
  }

  changeSize(value) {
    this.size = value;
    this.canvas.style.gridTemplate = `repeat(${this.size}, 1fr)/repeat(${this.size}, 1fr)`;
    this.clear(); 
  }

  toggleGrid() {
    
  }
}

const canvas = new Canvas(document.querySelector("#canvas"));

const canvasResSlider = document.querySelector("input[name='canvas-res']");
canvasResSlider.addEventListener("change", (e) => canvas.changeSize(e.target.value));
const canvasBackgroundContrast = document.querySelector("input[name='background-contrast");
canvasBackgroundContrast.addEventListener("input", (e) => canvas.canvas.style.backgroundColor = `hsl(179, 100%, ${e.target.value}%)`);
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
const eraserButton = document.getElementById("eraser");
eraserButton.addEventListener("click", () => canvas.brushMode = canvas.brushMode !== "eraser" ? "eraser" : "default");
const rainbowButton = document.getElementById("rainbow");
rainbowButton.addEventListener("click", () => canvas.brushMode = canvas.brushMode !== "rainbow" ? "rainbow" : "default");
