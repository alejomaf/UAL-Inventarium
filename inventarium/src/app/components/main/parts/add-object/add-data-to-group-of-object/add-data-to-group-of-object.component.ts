import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArchive, faBolt, faCube } from '@fortawesome/free-solid-svg-icons';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';

@Component({
  selector: 'app-add-data-to-group-of-object',
  templateUrl: './add-data-to-group-of-object.component.html',
  styleUrls: ['./add-data-to-group-of-object.component.css']
})
export class AddDataToGroupOfObjectComponent implements OnInit {

  imgURL: any
  type = ""
  name = ""
  fileToUpload: any;

  constructor(private route: ActivatedRoute, private groupOfObjectsS: GroupOfObjectsService, private router: Router) {
    this.type = route.snapshot.params['type']
    this.name = route.snapshot.params['name']
  }

  cubo = faCube
  rayo = faBolt
  caja = faArchive

  photo_selected = false
  marca = new FormControl("")
  modelo = new FormControl("")

  ngOnInit(): void {
  }

  //We enable the creation button
  handleFileInput(event: any) {
    try {
      this.fileToUpload = event.target.files[0]
      var mimeType = this.fileToUpload.type;

      if (mimeType.match(/image\/*/) == null) {
        this.photo_selected = false
        this.imgURL = null
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }

      this.photo_selected = true

    } catch {
      this.photo_selected = false
      this.imgURL = null
    }
  }

  createGroupOfObject() {
    if (!this.photo_selected) return
    const formData = new FormData()
    formData.append("image", this.fileToUpload);
    const data = JSON.stringify({
      "marca": this.marca.value,
      "modelo": this.modelo.value,
      "tipo": this.type,
      "nombre": this.name
    })
    formData.append("marca", this.marca.value);
    formData.append("modelo", this.modelo.value);
    formData.append("nombre", this.name);
    formData.append("tipo", this.type);
    formData.append("body", data);

    this.groupOfObjectsS.addGroupOfObject(formData).subscribe(
      (res: any) => {

        if (res == "The image could not be upload") {
          this.photo_selected = false;
          this.imgURL = null;
          return;
        } else {
          this.router.navigateByUrl('/add-object/create/' + res.id);
        }
      });
  }



}
