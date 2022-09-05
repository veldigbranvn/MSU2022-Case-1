const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const body = document.querySelector("body");
body.appendChild(canvas);

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const context = canvas.getContext("2d");

context.fillStyle = "#000";
// Transparancy on lines doesn't work for some reason
context.strokeStyle = "#000";
context.globalAlpha = 0.5;
context.lineWidth = 3;

// Setup point data
const points = Array(10)
  .fill(null)
  .map(() => {
    return {
      coordinates: getRandomCoordinates(),
      directions: getRandomDirection()
    };
  });

function draw() {
  requestAnimationFrame(draw);

  context.clearRect(0, 0, WIDTH, HEIGHT);

  // Setup line coordinates
  for (const { coordinates, directions } of points) {
    const lines = Array(points.length - 1)
      .fill(null)
      .map((_, i) => {
        return {
          from: {
            x: points[i].coordinates.x,
            y: points[i].coordinates.y
          },
          to: {
            x: points[i + 1].coordinates.x,
            y: points[i + 1].coordinates.y
          }
        };
      });

    // Draw lines
    for (const { from, to } of lines) {
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.lineTo(to.x, to.y);
      context.stroke();
    }

    // Move points around randomly
    coordinates.x += directions.x;
    coordinates.y += directions.y;

    // Draw circles
    context.beginPath();
    context.arc(coordinates.x, coordinates.y, 20, 0, 2 * Math.PI);
    context.fill();

    // Horizontal borders
    if (coordinates.x + 10 > WIDTH || coordinates.x - 10 < 0) {
      directions.x *= -1;
    }

    // Vertical borders
    if (coordinates.y + 10 > HEIGHT || coordinates.y - 10 < 0) {
      directions.y *= -1;
    }
  }
}

draw();

function getRandomCoordinates() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT)
  };
}

function getRandomDirection() {
  return {
    x: Math.random() > 0.5 ? 1 : -1,
    y: Math.random() > 0.5 ? 1 : -1
  };
}
