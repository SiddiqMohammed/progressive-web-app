import QrScanner from "../qr-scanner.min.js";
QrScanner.WORKER_PATH = "../qr-scanner-worker.min.js";

const video = document.getElementById("qr-video");
const camHasCamera = document.getElementById("cam-has-camera");
const camQrResult = document.getElementById("cam-qr-result");

function setResult(label, result) {
  label.textContent = result;
  label.style.color = "teal";
  clearTimeout(label.highlightTimeout);
  label.highlightTimeout = setTimeout(
    () => (label.style.color = "inherit"),
    100
  );
}

// ####### Web Cam Scanning #######

QrScanner.hasCamera().then(
  (hasCamera) => (camHasCamera.textContent = hasCamera)
);

const scanner = new QrScanner(
  video,
  (result) => setResult(camQrResult, result),
  (error) => {
    camQrResult.textContent = error;
    camQrResult.style.color = "inherit";
  }
);
// scanner.start().then(() => {
//   scanner.hasFlash().then((hasFlash) => {
//     camHasFlash.textContent = hasFlash;
//     if (hasFlash) {
//       flashToggle.style.display = "inline-block";
//       flashToggle.addEventListener("click", () => {
//         scanner
//           .toggleFlash()
//           .then(
//             () =>
//               (flashState.textContent = scanner.isFlashOn()
//                 ? "on"
//                 : "off")
//           );
//       });
//     }
//   });
// });

// for debugging
window.scanner = scanner;
var x = 0;
// function scanRegion() {

// }
document.getElementById("show-scan-region").addEventListener("change", (e) => {
  const input = e.target;

  console.log(input);
  const label = input.parentNode;
  console.log(label);
  label.parentNode.insertBefore(scanner.$canvas, label.nextSibling);
  scanner.$canvas.style.display = input.checked ? "block" : "none";
});


setInterval(function () {
  if (x === 5) {
    scanner.stop();

  }
  console.log(x);
  x += 1
}, 10000);

document.getElementById("start-button").addEventListener("click", () => {
  scanner.start().then(() => {
    scanner.setInversionMode("original");
    x += 1;
    // scanner.$canvas.style.display = "block";
  });
});

document.getElementById("stop-button").addEventListener("click", () => {
  scanner.stop();
  //   scanner.$canvas.style.display = "none";
});

// ####### File Scanning #######

// fileSelector.addEventListener("change", (event) => {
//   const file = fileSelector.files[0];
//   if (!file) {
//     return;
//   }
//   QrScanner.scanImage(file)
//     .then((result) => setResult(fileQrResult, result))
//     .catch((e) => setResult(fileQrResult, e || "No QR code found."));
// });
