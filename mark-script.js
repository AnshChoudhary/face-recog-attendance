function openAnotherPageWithPresentList() {
    const className = document.getElementById("className").value;
    const date = document.getElementById("date").value;

    // Example content to be downloaded
    const content = `Class Name: ${className}\nDate: ${date}`;
    // Create a URL with the 'present' array as a query parameter
    const infoQueryParam = encodeURIComponent(JSON.stringify(content));
    const url = `sheet.html?content=${infoQueryParam}`;
  
    // Open the new page
    window.location.href = url;
  }
  
  document.getElementById('downloadButton').addEventListener('click', openAnotherPageWithPresentList);

  function openAnotherPageWithcontent() {
    const className = document.getElementById("className").value;
    const date = document.getElementById("date").value;

    // Store the strings in local storage
    localStorage.setItem('className', className);
    localStorage.setItem('date', date);

    // Open the new page
    window.location.href = 'sheet.html';
}


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
