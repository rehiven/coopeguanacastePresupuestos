var textbuscar = document.getElementById("buscar");
textbuscar.onkeyup = function(){
	buscar(this);
}
function buscar(inputbuscar){
	var valorabuscar = (inputbuscar.value).toLowerCase().trim();
	var tabla_tr = document.getElementById("tabla").getElementsByTagName("tbody")[0].rows;
	for(var i=0; i<tabla_tr.length; i++){
		var tr = tabla_tr[i];
		var textotr = (tr.innerText).toLowerCase();
		tr.className = (textotr.indexOf(valorabuscar)>=0)?"mostrar":"ocultar";
	}
}