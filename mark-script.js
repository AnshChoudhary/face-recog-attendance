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
