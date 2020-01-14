window.onload = function clearMaterials() {
  if (localStorage.getItem("posts")) {
    localStorage.removeItem("posts");
  }
};

function addPost() {
  let materials = [];
  let mounts = [];
  let post = {
    materials,
    mounts
  };
  let posts = [];
  if (localStorage.getItem("posts") === null) {
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
  } else {
    posts = JSON.parse(localStorage.getItem("posts"));
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
  }
  
  let id = (posts.length);
  console.log("tipo de dato de post" + typeof posts.length);
  console.log("Este es el id poste" + id);

  let accordionPosts = document.getElementById("accordionPosts");
  accordionPosts.innerHTML += `      <div class="card">
  <div class="card-header" id="heading${id}">
    <h2 class="mb-0">
      <button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapse${id}"
        aria-expanded="true" aria-controls="collapseOne">
        Poste ${id}
      </button>
      <button type="button" class="btn btn-danger" id="deleteMount${id}">Eliminar</button>
    </h2>
  </div>

  <div id="collapse${id}" class="collapse show" aria-labelledby="heading${id}" data-parent="#accordionPosts">
    <div class="panel">
      <div class="body">
        <form class="form-inline my-2 my-lg-0">
          <input id="searchBox" class="form-control mr-sm-2" type="search" placeholder="Buscar"
            aria-label="Search">
          <button type="button" class="btn btn-primary" id="${id}" onclick="showModalMount(id) ">Agregar Montaje</button>
          <button type="button" class="btn btn-primary" id="${id}" onclick="showModalMaterial(id)" >Agregar Material</button>
        </form>
      </div>
    </div>
    <table class="myTable table hover" id="table${id}">
      <tbody>
        <tr>
          <th>Codigo</th>
          <th>Cantidad</th>
          <th>Tipo</th>
          <th>Opciones</th>
        </tr>
      </tbody>
    </table>
  </div>
</div>
                            `;
}

function deletePost() {}

function showModalMaterial(id){
  $('.bd-Materials-modal-lg').modal('show');
  console.log(id);
}
function showModalMount(id){
  $('.bd-Mounts-modal-lg').modal('show');
  console.log(id);
}

function addMaterial(key) {
  
  /*
  let buttom = document.getElementById(key);

  if (buttom.className == "btn btn-success") {
    buttom.className = "btn btn-secondary";
    buttom.innerHTML = "Eliminar";
    saveMaterials(key);
  } else {
    buttom.className = "btn btn-success";
    buttom.innerHTML = "Agregar";
    deleteMaterial(key);
  }
  */
}

function createMount() {
  let materiales = JSON.parse(localStorage.getItem("materials"));
  let montajes = JSON.parse(localStorage.getItem("materials"));
  let data = {};
  if (localStorage.getItem("materials") === null || materiales.length == 0) {
    alertify.warning("Debe Agregar Materiales");
  } else {
    let name = document.getElementById("code").value;
    let concerned = document.getElementById("concerned").value;
    let zone = document.getElementById("zone").value;
    let state = document.getElementById("state").value;
    let type = document.getElementById("typebudgets").value;
    data = {
      nombre: name,
      interesado: concerned,
      zona: zone,
      tipo: type,
      estado: state,
      materiales,
      montajes
    };
    axios
      .post("/new-budgets", data)
      .then(response => {
        console.log(response);
        redirect();
      })
      .catch(error => {
        console.log(error);
      });
  }
  console.dir(data);
}

function redirect() {
  window.location.replace("/viewmounts");
}

//* GUARDA MATERIALES */

function saveMaterials(key) {
  let codigo = document.getElementById(`codigo` + key).innerText;
  let referencia = document.getElementById(`referencia` + key).innerText;
  let cantidad = document.getElementById(`cantidad` + key).value;
  let id = key;
  let material = {
    codigo,
    referencia,
    cantidad,
    id
  };
  console.log(material);

  //JSON.stringify convierte a string los datos

  //JSON.parse convierte a objeto el string

  if (localStorage.getItem("materials") === null) {
    let materials = [];
    materials.push(material);
    localStorage.setItem("materials", JSON.stringify(materials));
  } else {
    let materials = JSON.parse(localStorage.getItem("materials"));
    materials.push(material);
    localStorage.setItem("materials", JSON.stringify(materials));
  }
  getMaterials();
}

/*  CREA LOS MATERIALES DENTRO DE LA TABLA HACIA LA VISTA  */
function getMaterials() {
  let materials = JSON.parse(localStorage.getItem("materials"));
  console.log("Estos son los " + materials);
  let materialshead = document.getElementById("materialTable");
  materialshead.innerHTML = `<thead>
                                    <tr>
                                      <th style="width:160px">Codigo</th>
                                      <th>Referencia</th>
                                      <th>Cantidad</th>
                                      <th>Opciones</th>
                                    </tr>
                            </thead>
                            <tbody id="materialBody" class="tbodyData">

                            </tbody>
                            `;
  let materialsView = document.getElementById("materialBody");

  for (let i = 0; i < materials.length; i++) {
    console.log("Se estan insertando en la tabla" + materials[i].codigo);
    let codigo = materials[i].codigo;
    let referencia = materials[i].referencia;
    let cantidad = materials[i].cantidad;
    let id = materials[i].id;

    materialsView.innerHTML += `<tr>
        <td id="codigo${id}">${codigo}</td>
        <td id="referencia${id}">${referencia}</td>
        <td><input id="cantidad${id}" type="number" name="quantity" min="1" value="${cantidad}"
            class="number"></td>
        <td>
          <a class="btn btn-danger" id="${id}" onclick="deleteMaterial(id)">
            Eliminar
          </a>
        </td>
      </tr>`;
  }
}

/* ELIMINA MATERIALES DEL LOCAL ESTORAGE */

function deleteMaterial(id) {
  let materials = JSON.parse(localStorage.getItem("materials"));
  for (let i = 0; i < materials.length; i++) {
    if (materials[i].id == id) {
      materials.splice(i, 1);
      let buttom = document.getElementById(id);
      buttom.className = "btn btn-success";
      buttom.innerHTML = "Agregar";
    }
  }
  localStorage.setItem("materials", JSON.stringify(materials));
  getMaterials();
}
