import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faArchive, faBolt, faCube } from '@fortawesome/free-solid-svg-icons';
import { GroupOfObjectsService } from 'src/app/services/group-of-objects.service';

@Component({
  selector: 'app-add-data-to-group-of-object',
  templateUrl: './add-data-to-group-of-object.component.html',
  styleUrls: ['./add-data-to-group-of-object.component.css']
})
export class AddDataToGroupOfObjectComponent implements OnInit {

  type = ""
  name = ""
  fileToUpload: any;

  constructor(private route: ActivatedRoute, private groupOfObjectsS: GroupOfObjectsService) {
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

  handleFileInput(event: any) {
    try {
      this.fileToUpload = event.target.files[0]
      this.photo_selected = true
    } catch {
      this.photo_selected = false
    }
  }

  createGroupOfObject() {
    if (!this.photo_selected) return
    const formData = new FormData()
    formData.append("image", this.fileToUpload)
    formData.append("marca", this.marca.value)
    formData.append("modelo", this.modelo.value)
    formData.append("nombre", this.name)
    formData.append("tipo", this.type)

    this.groupOfObjectsS.addGroupOfObject(formData).subscribe(
      (res: any) => { console.log(res) });
  }



}
