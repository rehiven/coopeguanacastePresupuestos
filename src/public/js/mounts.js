//document.getElementById("formMouts").addEventListener("submit", showData);
window.onload = function clearMaterials() {
  if (localStorage.getItem("materials")) {
    localStorage.removeItem("materials");
  }
};
function addMaterial(key) {
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
}

function createMount() {
  let materiales = JSON.parse(localStorage.getItem("materials"));
  let data = {};
  if (localStorage.getItem("materials") === null || materiales.length == 0) {
    alertify.warning("Debe Agregar Materiales");
  } else {
    let code = document.getElementById("code").value;
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    data = {
      codigo: code,
      nombre: name,
      descripcion: description,
      tipoMontaje: document.getElementById("mountType").value,
      materiales
    };
    axios
      .post("/new-mounts", data)
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
