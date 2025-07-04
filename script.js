function calcularSueldo() {
      const categoria = document.getElementById("categoria").value;
      const sindicato = document.getElementById("sindicato").checked;
      const antiguedadinput = parseFloat(document.getElementById("antiguedad").value || 0);
      const basico = parseFloat(document.getElementById("basico").value) || 0;
      const horasnoc = parseFloat(document.getElementById("hsnoc").value) || 0;
      const hs50 = parseFloat(document.getElementById("hs50").value) || 0;
      const hs100 = parseFloat(document.getElementById("hs100").value) || 0;
      const feriados = parseFloat(document.getElementById("feriados").value) || 0;

      // validacion de categoria
      let adicional
      if (categoria == "monitoreo") {
        adicional = (760240 - basico);
      } else if (categoria == "encargado") {
        adicional = (809050 - basico);
      } else {
        adicional = 0
      }

      // Calculo horas
      const antiguedad = antiguedadinput / 100;
      const Presentismo = 153600;
      const horasnormal = (basico + Presentismo)/200;
      const valorhs50 = horasnormal + (horasnormal * 0.50);
      const valorhs100 = horasnormal + horasnormal;
      const valornoct = basico * 0.001;
      const nocturnas = horasnoc * (valornoct + (valornoct * antiguedad)) ;
      const totalHs50 = hs50 * (valorhs50 + (valorhs50 * antiguedad));
      const totalHs100 = hs100 * (valorhs100 + (valorhs100 * antiguedad)); 

      // Calcuca

      const totalant = basico * antiguedad;
      const viatico = 429750;//435580
      const sumnorem = 26280;//25000
      const totalFeriado = (basico + Presentismo + 26280 + adicional + totalant) / 25 * feriados;
      const totalA = basico + nocturnas + totalHs50 + totalHs100 + totalant + totalFeriado + Presentismo + adicional + sumnorem;

      // Descuentos
      const jubilacion = totalA * 0.11;
      const ley19032 = totalA * 0.03;
      const obrasocial = totalA * 0.03;
      const descsindi = totalA * 0.03 + totalA * 0.01;
      const totalDescuento = jubilacion + ley19032 + obrasocial;
      //Validacion de sindicato.
      let total
      if (sindicato) {
        total = totalA + viatico - totalDescuento - descsindi;
      } else {
        total = totalA + viatico - totalDescuento;
      }
      // redondeo
      
      document.getElementById("resultado").innerHTML = `
        <img src="https://www.informatique-mania.com/wp-content/uploads/2020/12/Meme-Faces-2.jpg" alt="imagen" style="position: absolute; opacity:0.2; width: 100%; height: 100%;object-fit: cover; top: 0; left: 0; z-index: 0;">
        <div style="margin: 20px; position: relative;z-index: 1">
        <span class="cerrar">&times;</span>
        <p>Sueldo Básico: $${basico.toFixed(2)}</p>
        <p>Horas nocturnas: $${nocturnas.toFixed(2)}</p>
        <p>Horas 50%: $${totalHs50.toFixed(2)}</p>
        <p>Horas 100%: $${totalHs100.toFixed(2)}</p>
        <p>Adicional REM Seguridad: $${sumnorem}</p>
        <p>AD por Presentismo: $${Presentismo}</p>
        <p>Plus categoria: $${adicional}</p>
        <p>Feriados Trabajados: $${totalFeriado.toFixed(2)}</p>
        <p>Total S/Viatico.: $${totalA.toFixed(2)}</p>
        <p><strong>Descuentos</strong></p>
        <p>Jubilacion: $${jubilacion.toFixed(2)}</p>
        <p>Ley19032: $${ley19032.toFixed(2)}</p>
        <p>Obra Social: $${obrasocial.toFixed(2)}</p>
        <p>Descuentos sindicato y Cuota de solidaridad: $${descsindi.toFixed(2)}</p>
        <p><strong>Total a cobrar: $${total.toFixed(2)}</strong></p>
        </div>
      `;
       document.querySelector(".cerrar").addEventListener("click", function() {
    document.getElementById("resultado").innerHTML = "";
    });
    }
   