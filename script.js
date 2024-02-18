
const video = document.getElementById("video");
let present = []; // Array to store unique values of 'val'
const marked = [];
const markedFlags = {};
/*
function downloadPresentList() {
  const presentText = present.join('\n');
  const blob = new Blob([presentText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'present_list.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Add event listener to the download button
document.getElementById('downloadButton').addEventListener('click', downloadPresentList);
*/

function openAnotherPageWithPresentList() {
  // Create a URL with the 'present' array as a query parameter
  const presentQueryParam = encodeURIComponent(JSON.stringify(marked));
  const url = `sheet.html?marked=${presentQueryParam}`;

  // Open the new page
  window.location.href = url;
}

document.getElementById('downloadButton').addEventListener('click', openAnotherPageWithPresentList);

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
]).then(startWebcam);

function startWebcam() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getLabeledFaceDescriptions() {
  const labels = ["Ansh", "Messi", "Mbappe", "Rahul", "Yousuf", "Abhishek"];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`./labels/${label}/${i}.png`);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}

video.addEventListener("play", async () => {
  const labeledFaceDescriptors = await getLabeledFaceDescriptions();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    const results = resizedDetections.map((d) => {
      return faceMatcher.findBestMatch(d.descriptor);
    });

    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result,
      });
      drawBox.draw(canvas);

      // Update 'val' with the result label
      const val = result.label;

      // Check if val is not equal to 'unknown' and if the count of val is less than 25 in the present array
      if (val !== 'unknown') {
        // Count the occurrences of val in the present array
        const valCount = present.filter(item => item === val).length;

        // Check if the count for the current value is less than 25
        if (valCount < 25) {
          // Push the value to the array
          present.push(val);

          // Log the updated 'present' array
          console.log('Present Array:', present);
        }
      }
      const counter = {};
 
      present.forEach(ele => {
          if (counter[ele]) {
              counter[ele] += 1;
          } else {
              counter[ele] = 1;
          }
      });
      
      for (const key in counter) {
        if (counter[key] >= 25 && !markedFlags[key]) {
          marked.push(key);
          markedFlags[key] = true; // Set the flag to true to indicate it has been marked
          console.log('Marked Array:', marked);
        }
      }

    });
  }, 100);
});
