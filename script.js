function calcularSueldo() {
      const categoria = document.getElementById("categoria").value;
      const mes = document.getElementById("mes").value;
      const sindicato = document.getElementById("sindicato").checked;
      const antiguedadinput = parseFloat(document.getElementById("antiguedad").value || 0);
      const horasnoc = parseFloat(document.getElementById("hsnoc").value) || 0;
      const hs50 = parseFloat(document.getElementById("hs50").value) || 0;
      const hs100 = parseFloat(document.getElementById("hs100").value) || 0;
      const feriados = parseFloat(document.getElementById("feriados").value) || 0;

      // validacion de mes
      let viatico
      let sumnorem
      let basico
	  let Presentismo
      if (mes == "junio"){
        basico = 711370;
		Presentismo = 153600;
        viatico = 429750;
        sumnorem = 26280;
      } else if ( mes == "julio"){
        basico = 745030;
		Presentismo = 153600;
        viatico = 435580;
        sumnorem = 25000;
      } else if ( mes == "agosto"){
        basico = 751735;
		Presentismo = 153600;
        viatico = 443216;
        sumnorem = 50000;
      } else if ( mes == "septiembre"){
        basico = 808600;
		Presentismo = 153600;
        viatico = 448800;
        sumnorem = 0;
      } else if ( mes == "octubre"){
		basico = 817500;
		Presentismo = 159600;
		viatico = 473800;
		sumnorem = 0;
	  } else if ( mes == "noviembre"){
	  	basico = 825600;
		Presentismo = 159600;
		viatico = 473800;
		sumnorem = 0;
	  } else if ( mes == "diciembre"){
	  	basico = 833600;
		Presentismo = 159600;
		viatico = 473800;
		sumnorem = 25000;
	  }
		


      // validacion de categoria
      let adicional
      if (categoria == "monitoreo") {
        adicional = basico * 0.0697;
      } else if (categoria == "encargado") {
        adicional = basico * 0.1397;
      } else {
        adicional = 0
      }

      // Calculo horas
      const antiguedad = basico * ( antiguedadinput / 100 );
      const horasnormal = (basico + antiguedad + Presentismo)/200;
      const valorhs50 = horasnormal + (horasnormal * 0.50);
      const valorhs100 = horasnormal + horasnormal;
      const valornoct = (basico + antiguedad) * 0.001;
      const nocturnas = horasnoc * valornoct;
      const totalHs50 = hs50 * valorhs50;
      const totalHs100 = hs100 * valorhs100; 
      console.log(antiguedad)
      console.log(valorhs50)

      // Calcuca
      const totalFeriado = (basico + antiguedad + Presentismo + adicional) / 25 * feriados;
      const totalNoRem = viatico + sumnorem; 
      const totalA = basico + nocturnas + adicional + totalHs50 + totalHs100 + Presentismo + totalFeriado + antiguedad;

      // Descuentos
      const jubilacion = totalA * 0.11;
      const ley19032 = totalA * 0.03;
      const obrasocial = totalA * 0.03;
      const oSocialAcuerdos = sumnorem * 0.03;
      let descsindi = totalA * 0.03;
      const totalDescuento = jubilacion + ley19032 + obrasocial + oSocialAcuerdos;
      //Validacion de sindicato.
      let total
      if (sindicato) {
        total = totalA - totalDescuento - descsindi + totalNoRem;
      } else {
        total = totalA  - totalDescuento + totalNoRem;
            descsindi = 0;
      }
      //suma de no remunerativo
      document.getElementById("resultado").innerHTML = `
        <img src="OIP.webp" alt="imagen" style="position: absolute; opacity:0.2; width: 100%; height: 100%;object-fit: cover; top: 0; left: 0; z-index: 0;">
        <div style="margin: 20px; position: relative;z-index: 1">
        <span style="color: red"class="cerrar">&times;</span>
        <table>
        <tr>
          <th colspan="4">Recibo de Sueldo</th>
        </tr>
        <tr>
          <th>CONCEPTO</th>
          <th>Hab. C/Desc.</th>
          <th>Hab. S/Desc.</th>
          <th>Deducciones</th>
        </tr>
        <tr>
          <td>SUELDO MENSUAL</td>
          <td>$${basico}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>ADICIONAL H NOCT NORM</td>
          <td>$${nocturnas.toFixed(2)}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>ADICIONAL SERVICIO</td>
          <td>$${adicional.toFixed(2)}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>HORAS AL 50% SEGURIDAD</td>
          <td>$${totalHs50.toFixed(2)}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>AD POR PRESENTISMO</td>
          <td>$${Presentismo}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>FERIADOS TRABAJADOS</td>
          <td>$${totalFeriado.toFixed(2)}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>ANTIGUEDAD</td>
          <td>$${antiguedad.toFixed(2)}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>JUBILACION</td>
          <td></td>
          <td></td>
          <td>$${jubilacion.toFixed(2)}</td>
        </tr>
        <tr>
          <td>LEY 19032</td>
          <td></td>
          <td></td>
          <td>$${ley19032.toFixed(2)}</td>
        </tr>
        <tr>
          <td>OBRA SOCIAL</td>
          <td></td>
          <td></td>
          <td>$${obrasocial.toFixed(2)}</td>
        </tr>
        <tr>
          <td>O.SOCIAL ACUERDOS</td>
          <td></td>
          <td></td>
          <td>$${oSocialAcuerdos.toFixed(2)}</td>
        </tr>
        <tr>
          <td>APORTE SINDICAL</td>
          <td></td>
          <td></td>
          <td>$${descsindi.toFixed(2)}</td>
        </tr>
        <tr>
          <td>VIATICOS</td>
          <td></td>
          <td>$${viatico}</td>
          <td></td>
        </tr>
        <tr>
          <td>SUMA NO REMUNERATIVA - AC</td>
          <td></td>
          <td>$${sumnorem}</td>
          <td></td>
        </tr>
        <tr>
          <td>TOTALES</td>
          <td>$${totalA.toFixed(2)}</td>
          <td>$${totalNoRem.toFixed(2)}</td>
          <td>$${totalDescuento.toFixed(2)}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>NETO</td>
          <td>$${total.toFixed(2)}</td>
        </tr>
        </table>
	<img src="XOsX.gif" alt="archivo.gif" width="500px" style="margin: auto">
        </div>
      `;
       document.querySelector(".cerrar").addEventListener("click", function() {
    document.getElementById("resultado").innerHTML = "";
    });
    alert("La manera en la que se calcula el feriado en esta calculadora, no es la correcta. pero por motivos de tal empresa...");
    }

   
