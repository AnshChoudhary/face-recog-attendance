const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const presentQueryParam = urlParams.get('present');
const presentArray = JSON.parse(decodeURIComponent(presentQueryParam));



// Function to populate the table with names
function populateTable() {
    const tableBody = document.querySelector("#presentTable tbody");

    presentArray.forEach((name, index) => {
        const row = tableBody.insertRow();
        const cellIndex = row.insertCell(0);
        const cellName = row.insertCell(1);

        cellIndex.textContent = index + 1;
        cellName.textContent = name;
    });
}

// Call the function to populate the table when the page loads
document.addEventListener("DOMContentLoaded", populateTable);


function exportTableToExcel(tableId) {
    // Get the table element using the provided ID
    const table = document.getElementById(tableId);
  
    // Extract the HTML content of the table
    const html = table.outerHTML;
  
    // Create a Blob containing the HTML data with Excel MIME type
    const blob = new Blob([html], {type: 'application/vnd.ms-excel'});
  
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create a temporary anchor element for downloading
    const a = document.createElement('a');
    a.href = url;
  
    // Set the desired filename for the downloaded file
    a.download = 'table.xls';
  
    // Simulate a click on the anchor to trigger download
    a.click();
  
    // Release the URL object to free up resources
    URL.revokeObjectURL(url);
  }
  
  // Attach the function to the export button's click event
  document.getElementById('exportButton').addEventListener('click', function() {
    exportTableToExcel('presentTable');
  });