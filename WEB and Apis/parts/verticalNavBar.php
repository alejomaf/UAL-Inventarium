<div class="vertical-nav bg-white" id="sidebar">
<div class="px-3 mb-4 mr-10">
</div>
    <div class="pt-4 px-3 mb-4 bg-light">
      
      <div class="media d-flex justify-content-center">
      <div class="media-body">
          <h5 class="m-0"><?php echo $_SESSION["email"];?></h5>
          <p class="font-weight-light text-muted mb-0">Técnico</p>
        </div>
        </div>
    </div>
  
    <ul class="nav flex-column bg-white mb-0">
    <li class="nav-item">
        <a href="#inicio" class="nav-link text-dark font-italic bg-light">
                  <i class="fa fa-home mr-3 text-primary fa-fw"></i>
                  Inicio
              </a>
      </li>
  </ul>
    <p class="text-gray font-weight-bold text-uppercase px-3 small pb-1 pt-1 mb-0">Principal</p>
  
    <ul class="nav flex-column bg-white mb-0">
      <li class="nav-item">
        <a href="#anadirObjeto" class="nav-link text-dark font-italic bg-light">
                  <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>
                  +Añadir objeto
              </a>
      </li>
      <li class="nav-item">
        <a href="#gobjetos" class="nav-link text-dark font-italic">
                  <i class="fa fa-object-group mr-3 text-primary fa-fw"></i>
                  Objetos
              </a>
      </li>
      <li class="nav-item">
        <a href="#solicitudes" class="nav-link text-dark font-italic">
                  <i class="fa fa-send mr-3 text-primary fa-fw"></i>
                  Solicitudes
              </a>
      </li>
      <li class="nav-item">
        <a href="#usuarios" class="nav-link text-dark font-italic">
                  <i class="fa fa-users mr-3 text-primary fa-fw"></i>
                  Usuarios
              </a>
      </li>
      <li class="nav-item">
        <a href="#equiposConfigurados" class="nav-link text-dark font-italic">
                  <i class="fa fa-laptop mr-3 text-primary fa-fw"></i>
                  Ver equipos configurados
              </a>
      </li>
      </ul>

      <p class="text-gray font-weight-bold text-uppercase px-3 small pb-1 pt-1 mb-0">Administración</p>
      <ul class="nav flex-column bg-white mb-0">
      <li class="nav-item">
        <a href="#ingresarDatos" class="nav-link text-dark font-italic">
                  <i class="fa fa-database mr-3 text-primary fa-fw"></i>
                  Ingresar datos
              </a>
      </li>
      </ul>

      <p class="text-gray font-weight-bold text-uppercase px-3 small pb-1 pt-1 mb-0">Personal</p>
      <ul class="nav flex-column bg-white mb-0">
      <li class="nav-item">
        <a href="#perfil" class="nav-link text-dark font-italic">
                  <i class="fa fa-user-circle mr-3 text-primary fa-fw"></i>
                  Perfil
              </a>
      </li>
      <li class="nav-item">
        <a href="#misprestamos" class="nav-link text-dark font-italic">
                  <i class="fa fa-list mr-3 text-primary fa-fw"></i>
                  Mis préstamos
              </a>
      </li>
      <li class="nav-item">
        <a href="apis/logout.php" class="nav-link text-dark font-italic">
                  <i class="fa fa-sign-out mr-3 text-primary fa-fw"></i>
                  Cerrar sesión
              </a>
      </li>
    
    </ul>
  </div>
  <!-- End vertical navbar -->
  