function calculate(){
    var slope = parseFloat(document.getElementById("slope").value);
    var del_slope = parseFloat(document.getElementById("del_slope").value);
    var y_int = parseFloat(document.getElementById("y_int").value);
    var del_y_int = parseFloat(document.getElementById("del_y_int").value);

    var x1 = parseFloat(document.getElementById("x1").value);
    var del_x1 = parseFloat(document.getElementById("del_x1").value);
    var x2 = parseFloat(document.getElementById("x2").value);
    var del_x2 = parseFloat(document.getElementById("del_x2").value);
    var x3 = parseFloat(document.getElementById("x3").value);
    var del_x3 = parseFloat(document.getElementById("del_x3").value);

    var temp = parseFloat(document.getElementById("temp").value);
    var del_temp = parseFloat(document.getElementById("del_temp").value);

    var m_lever = parseFloat(document.getElementById("m_lever").value);
    var del_m_lever = parseFloat(document.getElementById("del_m_lever").value);
    var m_extra = parseFloat(document.getElementById("m_extra").value);
    var del_m_extra = parseFloat(document.getElementById("del_m_extra").value);

    var volumeI = parseFloat(document.getElementById("volumeI").value);
    var del_volumeI = parseFloat(document.getElementById("del_volumeI").value);

    var area = parseFloat(document.getElementById("area").value);
    var del_area = parseFloat(document.getElementById("del_area").value);

    var molar_density;
    var del_molar_density;
    var atm_pressure;
    var del_atm_pressure;

    if (isNaN(slope + del_slope + y_int + del_y_int + x1 + del_x1 + x2 + del_x2 + 
              x3 + del_x3 + temp + del_temp + m_lever + del_m_lever + m_extra + 
              del_m_extra + volumeI + del_volumeI + area + del_area)) {

        document.getElementById("error").innerText = "Fill out all Fields";
        return;
    }

    document.getElementById("error").innerHTML = "&nbsp;";

    molar_density = -1 * (slope * x2) / (8.314 * temp * area * x3 * volumeI);
    atm_pressure = (y_int*x2 - m_lever*9.81*x1 - m_extra*x3) / (area * x3);

    del_molar_density = Math.sqrt(Math.pow(slope * del_x2, 2) + Math.pow(x2 * del_slope, 2) + 
                        Math.pow(slope * x2, 2) * (Math.pow(del_temp / temp, 2) + Math.pow(del_area / area, 2) + 
                        Math.pow(del_x3 / x3, 2) + Math.pow(del_volumeI / volumeI, 2))) / 
                        (8.314 * temp * area * x3 * volumeI);

    del_atm_pressure = Math.sqrt(Math.pow(x2*del_y_int/x3, 2) + Math.pow(y_int*del_x2/x3, 2) +
                       Math.pow(9.81*x1*del_m_lever/x3, 2) + Math.pow(m_lever*9.81*del_x1/x3, 2) + 
                       Math.pow(del_m_extra, 2) + 
                       Math.pow((y_int*x2 - m_lever*9.81*x1 - m_extra*x3)*del_area / (area*x3), 2) +
                       Math.pow((y_int*x2 - m_lever*9.81*x1)*del_x3 / Math.pow(x3,2), 2)) / area;

    document.getElementById("molar_density").innerText = molar_density.toFixed(5) + " mol/m^3";
    document.getElementById("del_molar_density").innerText = del_molar_density.toFixed(5) + " mol/m^3";
    document.getElementById("atm_pressure").innerText = atm_pressure.toFixed(5) + " Pa";
    document.getElementById("del_atm_pressure").innerText = del_atm_pressure.toFixed(5) + " Pa";
}