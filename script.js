let originalImage;
let image;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

document.getElementById("imageInput").addEventListener("change", function (event) {
  loadImage(event);
});

function loadImage(event) {
  let input = event.target;

  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function (e) {
      originalImage = new Image();
      originalImage.src = e.target.result;
      originalImage.onload = function () {
        resizeImage();
        resetImage();
      };
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function resizeImage() {
  const landscapeSize = 512;
  const portraitWidth = 300;
  const portraitHeight = 500;

  if (originalImage.width > originalImage.height) {
    originalImage.width = landscapeSize;
    originalImage.height = landscapeSize * (originalImage.height / originalImage.width);
  } else {
    originalImage.width = portraitWidth;
    originalImage.height = portraitHeight;
  }
}

function drawImage() {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);
}

function resetImage() {
  image = new Image();
  image.src = originalImage.src;
  image.onload = function () {
    drawImage();
  };
}

function rotateRight() {
  rotateImage(90);
}

function rotateLeft() {
  rotateImage(-90);
}

function rotateUpsideDown() {
  rotateImage(180);
}

function rotateImage(angle) {
  if (originalImage) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.drawImage(originalImage, -originalImage.width / 2, -originalImage.height / 2, originalImage.width, originalImage.height);
    ctx.restore();
  }
}

function downloadImage() {
  if (originalImage) {
    let link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "rotated_image.png";
    link.click();
  }
}
