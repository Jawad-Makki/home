function calculate(){
    var xLever = parseFloat(document.getElementById("x_lever").value);
    var del_xLever = parseFloat(document.getElementById("del_x_lever").value);
    var xStand = parseFloat(document.getElementById("x_stand").value);
    var del_xStand = parseFloat(document.getElementById("del_x_stand").value);
    var xExtra = parseFloat(document.getElementById("x_extra").value);
    var del_xExtra = parseFloat(document.getElementById("del_x_extra").value);

    var mLever = parseFloat(document.getElementById("m_lever").value);
    var del_mLever = parseFloat(document.getElementById("del_m_lever").value);
    var mStand = parseFloat(document.getElementById("m_stand").value);
    var del_mStand = parseFloat(document.getElementById("del_m_stand").value);
    var mExtra = parseFloat(document.getElementById("m_extra").value);
    var del_mExtra = parseFloat(document.getElementById("del_m_extra").value);

    var appForce;
    var del_appForce;

    var slope = 0.000001 * parseFloat(document.getElementById("slope").value);
    var del_slope = 0.000001 * parseFloat(document.getElementById("del_slope").value);
    var volume = 0.000001 * parseFloat(document.getElementById("volume").value);
    var del_volume = 0.000001 * parseFloat(document.getElementById("del_volume").value);
    var temp = parseFloat(document.getElementById("temp").value);
    var del_temp = parseFloat(document.getElementById("del_temp").value);
    var area = 0.0001 * parseFloat(document.getElementById("area").value);
    var del_area = 0.0001 * parseFloat(document.getElementById("del_area").value);
    var yInt = parseFloat(document.getElementById("y_int").value);
    var del_yInt = parseFloat(document.getElementById("del_y_int").value);

    var molarDensity;
    var del_molarDensity;
    var pressureAtm;
    var del_pressureAtm;

    if (isNaN(xLever + del_xLever + xStand + del_xStand + xExtra + del_xExtra + 
              mLever + del_mLever + mStand + del_mStand + mExtra + del_mExtra)) {

        document.getElementById("error_1").innerText = "Fill out all Fields";
    }

    else {
        document.getElementById("error_1").innerHTML = "&nbsp;";
    
        appForce = (xStand * mStand * 9.81 - xLever * mLever * 9.81 - xExtra * mExtra * 9.81) / xExtra;
    
        del_appForce = 9.81 * Math.sqrt(Math.pow(mLever * del_xLever / xExtra, 2) + Math.pow(xLever * del_mLever / xExtra, 2) + 
                                        Math.pow(mStand * del_xStand / xExtra, 2) + Math.pow(xStand * del_mStand / xExtra, 2) + 
                                        Math.pow(del_mExtra, 2) + 
                                        Math.pow((xLever * mLever - xStand * mStand) * del_xExtra / Math.pow(xExtra, 2), 2));
       
        document.getElementById("app_force").innerText = appForce.toFixed(5) + " N";
        document.getElementById("del_app_force").innerText = del_appForce.toFixed(5) + " N";
    }
    
    if (isNaN(slope + del_slope + volume + del_volume + temp + del_temp + area + del_area + yInt + del_yInt)) {

        document.getElementById("error_2").innerText = "Fill out all Fields";
    }

    else {
        document.getElementById("error_2").innerHTML = "&nbsp;";
    
        molarDensity = slope / (volume * 8.314 * temp * area);
    
        del_molarDensity = Math.sqrt(Math.pow(del_slope, 2) + Math.pow(slope * del_volume / volume, 2) + Math.pow(slope * del_temp / temp, 2) + 
                                     Math.pow(slope * del_area / area, 2)) / (volume * 8.314 * temp * area);
    
        pressureAtm = yInt / area / 1000;
    
        del_pressureAtm = Math.sqrt(Math.pow(del_yInt / area, 2) + Math.pow(yInt * del_area / Math.pow(area, 2), 2)) / 1000;
    
        document.getElementById("molar_density").innerText = molarDensity.toFixed(5) + " mol/m^3";
        document.getElementById("del_molar_density").innerText = del_molarDensity.toFixed(5) + " mol/m^3";
        document.getElementById("pressure_atm").innerText = pressureAtm.toFixed(5) + " kPa";
        document.getElementById("del_pressure_atm").innerText = del_pressureAtm.toFixed(5) + " kPa";
    }
}