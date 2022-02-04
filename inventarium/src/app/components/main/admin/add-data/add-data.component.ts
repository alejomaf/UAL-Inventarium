import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  excel: any;
  fileName: any;

  constructor() { }

  ngOnInit(): void {
  }

  readExcelFile(file: any) {

    this.fileName = file.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(this.fileName);
    reader.onload = (_event) => {
      this.excel = reader.result;
    }

  }

  processData() {
    fetch(this.excel).then(function (res) {
      if (!res.ok) throw new Error("Fetch of the file failed");
      return res.arrayBuffer();
    }).then(function (ab) {
      var data = new Uint8Array(ab);
      var datos = XLSX.read(data, { type: "array" });
      var datos_procesados = datos.SheetNames;
      console.log(XLSX.utils.sheet_to_json(datos.Sheets[datos_procesados[0]]));
    });

  }
}
