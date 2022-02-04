import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  oldpass = new FormControl("");
  newpass = new FormControl("");
  newpass2 = new FormControl("");

  alertPass = "";
  successChange = "";

  usuario?: Usuario;

  constructor(private authS: AuthGuardService, private modalService: NgbModal, private usersS: UsersService) {
    this.usuario = authS.getCurrentUser();
  }

  ngOnInit(): void {
  }

  cambiarContrasena() {
    if (this.oldpass.value == "" || this.newpass.value == "" || this.newpass2.value == "") {
      this.alertPass = "Rellene todos los campos del cambio de contraseña";
      return;
    }
    if (!(this.newpass.value === this.newpass2.value)) {
      this.alertPass = "Las contraseñas no coinciden";
      return;
    }
    if (this.oldpass.value.length < 8 || this.newpass.value.length < 8) {
      this.alertPass = "El mínimo de extensión de una contraseña es de 8 carácteres";
      return;
    }

    let formData = new FormData();

    formData.append('oldpass', this.oldpass.value);
    formData.append('newpass', this.newpass.value);

    this.usersS.cambiarContrasena(formData).subscribe(
      (res: any) => {
        if (res.done) {
          this.alertPass = ""
          this.successChange = res.done;
          setTimeout(() => this.cerrarModal(), 1500);
          return;
        }
        if (res.error) {
          this.alertPass = res.error;
          return;
        }
      }
    )


  }

  //Modal behaviour

  abrirModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
  }

  cerrarModal() {
    this.modalService.dismissAll();
    this.oldpass = new FormControl("");
    this.newpass = new FormControl("");
    this.newpass2 = new FormControl("");
  }

}
