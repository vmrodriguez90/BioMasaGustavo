//--------------------------------------------------------------------------
//Listado de constantes
//--------------------------------------------------------------------------
function Biomasa(tiempo, Temperaturas) {
    

    const T10 = Temperaturas[1]
    const T20 = Temperaturas[2]

    //--------------------------------------------------------------------------
    //DEFINO CONSTANTES COMUNES PARA AMBAS ECUACIONES
    //--------------------------------------------------------------------------
    //Ks= Coeficiente de transferencia de calor por conveccion [W/m2.�K]
    const Ks=300;

    //s= Superficie de transferencia [m2]
    const s=1.34;

    //T2= Temperatura entrante de la madera [�K]
    const T2=313.15;
    //T2=input('Ingrese la temperatura entrante de la biomasa: ')

    //mh2o= Flujo masico de agua evaporada [Kg/s]
    //mh2o=0.005;(prueba con valor fijo)
    const mh2o= pol(T2);
    //mh2o= dmh2o(T);

    //Cph2o= Capacidad calorifica especifica del agua [J/Kg.�K]
    const Cph2o=4186;

    //mprch= Volumen de los componentes volatiles [Kg/s]
    //mprch=0.05;(prueba con valor fijo)
    const mprch= pol2(T2);
    //mprch= dmprch(T);

    //Cpprch= Capacidad calorifica de los componentes volatiles [J/Kg.�K]
    const Cpprch=1300;//https://es.wikipedia.org/wiki/Capacidad_calor�fica

    //--------------------------------------------------------------------------
    //DEFINO LAS CONSTANTES PARA LA FUNCION T10 [GAS,AIRE]
    //--------------------------------------------------------------------------

    //Iv1= Volumen de flujo entrante de gas [m3/seg]
    const Iv1=0.16;

    //V1= Volumen de gas [m3]
    const V1=10;

    //T1= Temperatura del gas entrante [�K]
    const T1=373.15;

    //Iv10= Volumen de flujo de salida del gas [m3/seg]
    const Iv10=0.375;

    //Ro1= Densidad del gas [Kg/m3]
    const Ro1=1.2;

    //Cpl= Capacidad calorifica especifica del gas [J/Kg.�K]
    const Cp1=1200;

    //Ivpl= Volumen de flujo de la madera [m3/s]
    const Ivpl=0.0375;

    //H= Valor calorifico de la madera [J/Kg]
    const H=1500;//http://infomadera.net/uploads/articulos/archivo_724_16609.pdf

    //--------------------------------------------------------------------------
    //DEFINO LAS CONSTANTES PARA LA FUNCION T20 [MADERA]
    //--------------------------------------------------------------------------

    //Iv2= Volumen de flujo de entrada de madera [m3/seg]
    const Iv2=0.034;

    //V2= Volumen de la madera [m3]
    const V2=2.12;

    //Iv20= Volumen de flujo de salida de madera [m3/seg]
    const Iv20=0.015;

    //Ro2= Densidad de la madera [Kg/m3]
    const Ro2=470;

    //Cp2= Capacidad calorifica especifica de la madera [J/Kg.�K]
    const Cp2=1800;

    //Hh2odp= Calor de evaporacion del agua [J/Kg]
    const Hh2oodp=2.2;

    //Hprch= Calor de descomposicion de la madera [J/Kg]
    const Hprch=200;

    //mspa1= Flujo masico de la madera [Kg/s]
    const mspa1=15.98;//

    //Ht= Valor de calentamiento de la madera [J/Kg]
    const Ht=19.5;//17000-22000 --> [KJ/Kg] Heating value of wood

    //sprintf('t=//.4f | T10=//.4f | T20=//.4f',t, T10, T20)

    //rj= k1*mh2o+k2*(T20-T10);

    //--------------------------------------------------------------------------
    //ECUACIONES QUE GOBIERNAN EL FUNCIONAMIENTO DEL COMBUSTOR DE BIOMASA
    //--------------------------------------------------------------------------

    const dT10=((Iv1/V1)*T1)-((Iv10/V1)*T10)-((Ks*s)/(Ro1*Cp1*V1)*(T10-T20))+((mh2o*T20*Cph2o)/(Ro1*Cp1*V1))+((mprch*T20*Cpprch)/(Ro1*Cp1*V1))+((Ivpl*H)/(Ro1*Cp1*V1));

    const dT20=((Iv2/V2)*T2)-((Iv20/V2)*T20)+((Ks*s)/(Ro2*Cp2*V2)*(T10-T20))-((mh2o*T20*Cph2o)/(Ro2*Cp2*V2))-((mh2o*Hh2oodp)/(Ro2*Cp2*V2))-((mprch*T20*Cpprch)/(Ro2*Cp2*V2))-((mprch*Hprch)/(Ro2*Cp2*V2))+((mspa1*Ht)/(Ro2*Cp2*V2));

    //dmh2o=-rj;

    //dmprch=

    return [dT10, dT20];
}

function pol(T) {
    let x = T-273.15;
    return (-1.67*(10^-9)*x^3+239.77*(10^-9)*x^2-5.93*(10^-6)*x-23.26*(10^-6))*1.34;
}

function pol2(T) {
    let x = T-273.15;
    // if (x > 250 && x < 350) {
        return (-16.16*(10^-9)*x^3+13.75*(10^-6)*x^2-3.85*(10^-3)*x+355.65*(10^-3))*1.34;
    // } else {
    //     throw "T no admite tal valor";
    // }
}

