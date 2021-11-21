class Canvas {
  constructor(element) {
    this.canvas = element;
    this.size = 16;
    this.color = "gainsboro";
    this.fill();
  }

  fill() {
    for (let i = 0; i < this.size ** 2; i++) {
      const cell = document.createElement("div");
      cell.style.background = this.color;
      this.canvas.appendChild(cell);
    }
  }

  changeSize(value) {
    this.size = value;
    this.canvas.style.cssText = `grid-template: repeat(${this.size}, 1fr)/repeat(${this.size}, 1fr);`;
    this.fill();
  }

  toggleGrid() {
    
  }
}

const canvas = new Canvas(document.querySelector(".canvas"));
