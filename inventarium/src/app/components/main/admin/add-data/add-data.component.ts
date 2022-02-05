import { Component, OnInit } from '@angular/core';
import { ConfiguracionProcesada, GrupoObjetosProcesados, KitProcesado, ObjetosProcesados } from 'src/app/interfaces/grupoobjetosprocesados';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  excel: any;
  fileName: any;

  processed_data: any;
  processed_location: { nombre: string, id: number }[] = []
  processed_objects: GrupoObjetosProcesados[] = [];
  object_visualizer: any;
  ultimoObjeto = "";

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
    }).then((ab) => {
      var data = new Uint8Array(ab);
      var datos = XLSX.read(data, { type: "array" });
      this.processed_data = XLSX.utils.sheet_to_json(datos.Sheets[datos.SheetNames[0]]);
      console.log(this.processed_data);
      this.processLocations();

    });
  }

  processObjects() {
    var isKit = false;
    for (let i = 0; i < this.processed_data.length; i++) {
      let obj = this.processed_data[i];

      //Kit part
      if (isKit) {
        if (obj.nombre == "fin-kit") {
          //Stoping the iteration
          isKit = false;
          continue;
        } else {
          //Iterating througt kits elements
          this.addKit(obj);
        }
        continue;
      }

      if (obj.nombre == "kit") {
        //Starting the iteration
        isKit = true;
        //Getting the name, location and quantity
        i++;
        obj = this.processed_data[i];
        this.addGroupOfObject(obj);
        for (let i = 0; i < obj.cantidad; i++) {
          this.addObject(obj);
        }
        continue;
      }

      if (this.processed_objects.length == 0) {
        this.addGroupOfObject(obj);
        continue;
      }

      if (obj.nombre === this.ultimoObjeto)
        if (this.processed_objects[this.processed_objects.length - 1].nombre === this.ultimoObjeto) {
          //We add the object
          this.addObject(obj);
        } else {
          //We create the group of objects and add the object
          this.addGroupOfObject(obj);
        }
      else this.addGroupOfObject(obj);

    }
    console.log(this.processed_objects);
  }

  addGroupOfObject(grp_obj: any) {
    this.ultimoObjeto = grp_obj.nombre;
    var grp_obj_aux: GrupoObjetosProcesados = { imagen: grp_obj.imagen, marca: grp_obj.marca, modelo: grp_obj.modelo, nombre: grp_obj.nombre, objetos: [], tipo: grp_obj.tipo == undefined ? 0 : grp_obj.tipo, kit: grp_obj.cantidad > 0 ? [] : undefined };
    this.processed_objects.push(grp_obj_aux);
    this.addObject(grp_obj);
  }

  addObject(obj: any) {
    var obj_aux: ObjetosProcesados = { codigo: obj.codigo, configuracion: obj.configuracion, etiqueta: obj.etiqueta, fechaAdquisicion: obj.fechaAdquisicion, mejorasEquipo: obj.mejorasEquipo, observaciones: obj.observaciones, organizativa: obj.organizativa, Ubicacion_idUbicacion: obj.ubicacion == undefined ? 1 : this.getLocation(obj.ubicacion) };

    if (this.itContainsConfig(obj)) {
      var conf_aux: ConfiguracionProcesada = { armario: obj.armario, boca: obj.boca, contrasena: obj.contrasena, ip: obj.ip, mac: obj.mac, usuario: obj.usuario };
      obj_aux.configuracion = conf_aux;
    }
    this.processed_objects[this.processed_objects.length - 1].objetos.push(obj_aux);
  }

  addKit(kit: any) {
    var kit_aux: KitProcesado = { cantidad: kit.cantidad, imagen: kit.imagen, nombre: kit.nombre, observaciones: kit.observaciones };
    this.processed_objects[this.processed_objects.length - 1].kit?.push(kit_aux);
  }


  processLocations() {
    for (let loc of this.processed_data) {
      if (loc.ubicacion == undefined) continue;
      if (this.locationIsAdded(loc.ubicacion)) continue;
      this.processed_location.push({ nombre: loc.ubicacion, id: 0 });
    }
    console.log(this.processed_location);
  }

  locationIsAdded(location: String) {
    for (let loc_exist of this.processed_location) {
      if (location === loc_exist.nombre) {
        return true;
      }
    }
    return false;
  }

  getSentLocation(processed_location: { nombre: string, id: number }, location_selected: number) {
    console.log(location_selected);
    processed_location.id = location_selected;
  }

  getLocation(nombre: String): number {
    for (let loc of this.processed_location) {
      if (loc.nombre === nombre) return loc.id;
    }
    return 1;
  }

  itContainsObject(object: any): boolean {
    if (object.mejorasEquipo == undefined && object.codigo == undefined && object.fechaAdquisicion == undefined && object.observaciones == undefined && object.etiqueta == undefined) return false;
    return true;
  }

  itContainsConfig(configuration: any): boolean {
    if (configuration.ip == undefined && configuration.mac == undefined && configuration.boca == undefined && configuration.armario == undefined && configuration.usuario == undefined && configuration.contrasena == undefined) return false;
    return true;
  }
}
