var rows;
var currentRow;

function doProcess(files) {
    var reader = new FileReader();
    reader.onerror = function (e) {
        alert(e);
    };
    reader.onloadend = function() {
        rows = reader.result.split("\n");
        rows = rows.map(function(row) {
            return row.split(",").map(Number);
        });
        currentRow = 0;
        processRow();
    };

    reader.readAsText(files[0]);
}

function next() {
    currentRow++;
    processRow();
}

function createChart(row, name, offset) {
    var accX = [];
    var accY = [];
    var accZ = [];
    accX.unshift('X');
    accY.unshift('Y');
    accZ.unshift('Z');

    for (var i=0; i<400; i++) {
        accX.push(row[i * 43 + offset]);
        accY.push(row[i * 43 + offset + 1]);
        accZ.push(row[i * 43 + offset + 2]);
    }

    var chart = c3.generate({
        height: '100px',
        bindto: '#' + name,
        data: {
          columns: [
            accX, accY, accZ
          ]
        }
    });
}

function processRow() {
    document.getElementById('dec').innerHTML = dlab[currentRow].join(",");
    var row = rows[currentRow];
    createChart(row, 'lla', 43);
    createChart(row, 'llg', 46);
    createChart(row, 'rla', 49);
    createChart(row, 'rlg', 52);
    createChart(row, 'lha', 55);
    createChart(row, 'lhg', 58);
    createChart(row, 'rha', 61);
    createChart(row, 'rhg', 64);
    createChart(row, 'laa', 67);
    createChart(row, 'lag', 70);    
    createChart(row, 'raa', 73);
    createChart(row, 'rag', 76);
    createChart(row, 'torsoa', 79);
    createChart(row, 'torsog', 82);    
}