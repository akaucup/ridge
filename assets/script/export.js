var now = new Date();
var dateString = now.toISOString().slice(0, 10).replace(/-/g, "");
var randomString = Math.random().toString(36).substring(2, 6);

function exportToJson() {
  var table = document.getElementById("outputTable");
  var rows = table.rows;
  var header = rows[0];
  var data = [];

  // Membuat array header
  var headers = [];
  for (var i = 0; i < header.cells.length; i++) {
    headers[i] = header.cells[i].textContent.toLowerCase().trim();
  }

  // Iterasi semua baris kecuali header
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var rowData = {};

    // Iterasi semua sel dalam baris
    for (var j = 0; j < row.cells.length; j++) {
      var cellData = row.cells[j].textContent.trim();
      rowData[headers[j]] = cellData;
    }

    // Menambahkan data baris ke array data
    data.push(rowData);
  }

  var defaultFilename = dateString + "-" + randomString + ".json";
  var filename = prompt("Set file name:", "");

  if (filename !== null && filename !== "") {
    filename = filename.endsWith(".json") ? filename : filename + ".json";
    var json = JSON.stringify(data, null, 2);
    var blob = new Blob([json], { type: "application/json" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}


function exportToCsv() {
  let table = document.getElementById("outputTable");
  let tbody = document.getElementById("dataTable");
  let rows = tbody.rows;
  let cols = rows[0].cells;
  let data = [];
  for (let i = 0; i < rows.length; i++) {
    let rowData = [];
    for (let j = 0; j < cols.length; j++) {
      rowData.push(rows[i].cells[j].innerHTML);
    }
    data.push(rowData);
  }

  let defaultFilename = dateString + "-" + randomString;
  let filename = prompt("Set file name:", defaultFilename);

  if (filename !== null && filename !== "") {
    // remove any characters that are not alphanumeric or whitespace
    filename = filename.trim() + ".csv";

    let csv = "";
    for (let i = 0; i < data.length; i++) {
      let row = data[i].join(",");
      csv += row + "\n";
    }
    let blob = new Blob([csv], { type: "text/csv" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}