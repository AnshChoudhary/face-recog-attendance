// Retrieve the 'present' array from the query parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const presentQueryParam = urlParams.get('present');
const presentArray = JSON.parse(decodeURIComponent(presentQueryParam));


// Now you can use the 'presentArray' as needed on this page
console.log(presentArray);

function generateDownload() {
    const className = document.getElementById("className").value;
    const date = document.getElementById("date").value;

    // Example content to be downloaded
    const content = `Class Name: ${className}\nDate: ${date}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.getElementById("downloadLink");
    const downloadButton = document.getElementById("downloadButton");

    downloadLink.style.display = "block";
    downloadButton.href = url;
}
