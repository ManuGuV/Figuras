
var poliActual = {X:0, Y:0, apotema:0, lados:0, teta:0};
var arcActual = {X:0, Y:0, radio:0, angInicial:0, angFinal:0};
var cuboActual = {X:0, Y:0, lado:0};
var PRactual = {X:0, Y:0, largo:0, ancho:0, alto:0};
var PTactual = {X:0, Y:0, lado1:0, lado2:0, lado3:0, altura:0};
var Conoactual = {X:0, Y:0, radio:0, altura:0};

function generar(figuraNatural)
{
    var canvas = document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
    var Xcenter = canvas.width/2;
    var Ycenter = canvas.height/2;

    switch (figuraNatural)
    {
        case 0:
            var apotemaPoli = document.getElementById("apotemaP").value;
            var ladosPoli = document.getElementById("ladosP").value;
            genPoli(Xcenter, Ycenter, apotemaPoli, ladosPoli, 0);
            poliActual.X = Xcenter;
            poliActual.Y = Ycenter;
            poliActual.apotema = apotemaPoli;
            poliActual.lados = ladosPoli;
            poliActual.teta = 0;
            break;
        case 1:
            arcActual.X = Xcenter;
            arcActual.Y = Ycenter;
            arcActual.radio = Number(document.getElementById("radioA").value);
            arcActual.angInicial = (Number(document.getElementById("AngI").value)*Math.PI)/180;
            arcActual.angFinal = (Number(document.getElementById("AngF").value)*Math.PI)/180;
            generarArco(arcActual.X, arcActual.Y, arcActual.radio, arcActual.angInicial, arcActual.angFinal);
            break;
        case 2:
            cuboActual.X = Xcenter;
            cuboActual.Y = Ycenter;
            cuboActual.lado = Number(document.getElementById("ladoCub").value);
            generarCubo(cuboActual.X, cuboActual.Y, cuboActual.lado);
            break;
        case 3:
            PRactual.X = Xcenter;
            PRactual.Y = Ycenter;
            PRactual.largo = Number(document.getElementById("largoPR").value);
            PRactual.ancho = Number(document.getElementById("anchoPR").value);
            PRactual.alto = Number(document.getElementById("altoPR").value);
            generarPrismaRect(PRactual.X, PRactual.Y, PRactual.largo, PRactual.ancho, PRactual.alto);
            break;
        case 4:
            PTactual.X = Xcenter;
            PTactual.Y = Ycenter;
            PTactual.lado1 = Number(document.getElementById("lado1").value);
            PTactual.lado2 = Number(document.getElementById("lado2").value);
            PTactual.lado3 = Number(document.getElementById("lado3").value);
            PTactual.altura = Number(document.getElementById("alturaPT").value);
            generarPrismaTriang(PTactual.X, PTactual.Y, PTactual.lado1, PTactual.lado2, PTactual.lado3, PTactual.altura);
            break;
        case 5:
            Conoactual.X = Xcenter;
            Conoactual.Y = Ycenter;
            Conoactual.radio = Number(document.getElementById("radioCono").value);
            Conoactual.altura = Number(document.getElementById("alturaCono").value);
            generarCono(Conoactual.X, Conoactual.Y, Conoactual.radio, Conoactual.altura);
            break;
            
    }
}

function genPoli(Xcenter, Ycenter, apotema, lados, angInicial)
{
    var canvas = document.getElementById("canvas");
    var contexto = canvas.getContext("2d");

    contexto.beginPath();
    contexto.moveTo(Xcenter + apotema * Math.cos(angInicial), Ycenter + apotema * Math.sin(angInicial));

    for(var i=0; i<=lados; i+=1)
    {
        contexto.lineTo(Xcenter + apotema*Math.cos(i*2*Math.PI/lados+angInicial), Ycenter + apotema*Math.sin(i*2*Math.PI/lados+angInicial));
    }

    contexto.stroke();
}

function trasladarPoligono()
{
    poliActual.X = Number(document.getElementById("despXPoli").value) + Number(poliActual.X);
    poliActual.Y = Number(document.getElementById("despYPoli").value) + Number(poliActual.Y);
    
    genPoli(poliActual.X, poliActual.Y, poliActual.apotema, poliActual.lados, poliActual.teta);
}

function rotarPoli()
{
    poliActual.teta = (Math.PI*(Number(document.getElementById("gradosPR").value)))/360 + Number(poliActual.teta);
    genPoli(poliActual.X, poliActual.Y, poliActual.apotema, poliActual.lados, poliActual.teta);
}

function reflejaPoligonHor()
{
    poliActual.X = -170 + Number(poliActual.X);
    poliActual.teta = Math.PI + Number(poliActual.teta);
    genPoli(poliActual.X, poliActual.Y, poliActual.apotema, poliActual.lados, poliActual.teta);
  
}

function reflejaPoligonVer()
{
    poliActual.Y = 100 + Number(poliActual.Y);
    poliActual.teta = (Math.PI*3/4) + Number(poliActual.teta);
    genPoli(poliActual.X, poliActual.Y, poliActual.apotema, poliActual.lados, poliActual.teta);
}

function EscalarPoli()
{
    poliActual.apotema = Number(poliActual.apotema)*Number(document.getElementById("Escalador").value);
    genPoli(poliActual.X, poliActual.Y, poliActual.apotema, poliActual.lados, poliActual.teta);
}

function generarArco(Xcenter, Ycenter, radio, angInicial, angFinal)
{
    var canvas = document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
    
    contexto.beginPath();
    contexto.arc(Xcenter, Ycenter, radio, angInicial, angFinal, false);
    contexto.stroke();
}

function trasladarArco()
{
    arcActual.X = Number(document.getElementById("despXArc").value) + Number(arcActual.X);
    arcActual.Y = Number(document.getElementById("despYArc").value) + Number(arcActual.Y);
    
    generarArco(arcActual.X, arcActual.Y, arcActual.radio, arcActual.angInicial, arcActual.angFinal);
}

function rotarArco()
{
 arcActual.angInicial = ((Number(document.getElementById("gradosArc").value)*Math.PI)/180) + Number(arcActual.angInicial);
 arcActual.angFinal = ((Number(document.getElementById("gradosArc").value)*Math.PI)/180) + Number(arcActual.angFinal);
 generarArco(arcActual.X, arcActual.Y, arcActual.radio, arcActual.angInicial, arcActual.angFinal);
}

function reflejaArcoHor()
{
    arcActual.X = 10 + Number(arcActual.X);
    arcActual.angInicial = (Math.PI/2) + Number(arcActual.angInicial);
    arcActual.angFinal = (Math.PI/2) + Number(arcActual.angFinal);
    generarArco(arcActual.X, arcActual.Y, arcActual.radio, arcActual.angInicial, arcActual.angFinal);
    
}

function reflejaArcoVer()
{
    arcActual.Y = 10 + Number(arcActual.Y);
    arcActual.angInicial = (3*Math.PI/2) + Number(arcActual.angInicial);
    arcActual.angFinal = (3*Math.PI/2) + Number(arcActual.angFinal);
    generarArco(arcActual.X, arcActual.Y, arcActual.radio, arcActual.angInicial, arcActual.angFinal);
    
}

function EscalarArco()
{
    arcActual.radio = Number(arcActual.radio)*Number(document.getElementById("EscaladorArc").value);
    generarArco(arcActual.X, arcActual.Y, arcActual.radio, arcActual.angInicial, arcActual.angFinal);
}

function generarCubo(Xcenter, Ycenter, lado)
{
    var canvas=document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
    
    contexto.beginPath();
    contexto.rect(Xcenter,Ycenter,lado,lado);
    contexto.rect(Xcenter+lado/2, Ycenter+lado/2, lado, lado);
    
    for(var i=0; i<2; i+=1)
    {
        for(var j=0; j<2; j+=1)
        {
            contexto.moveTo(Xcenter+(i*lado), Ycenter+(j*lado));
            contexto.lineTo(Xcenter+(i*lado)+lado/2, Ycenter+(j*lado)+lado/2);
            contexto.stroke();
        }
    }
}

function trasladarCubo()
{
    cuboActual.X = Number(document.getElementById("despXCubo").value) + Number(cuboActual.X);
    cuboActual.Y = Number(document.getElementById("despYCubo").value) + Number(cuboActual.Y);
    
    generarCubo(cuboActual.X, cuboActual.Y, cuboActual.lado);
}

function rotarCubo()
{
    var contexto = canvas.getContext("2d");
    var rotar = Number(document.getElementById("gradosCubo").value)
    contexto.translate(cuboActual.X, cuboActual.Y);
    contexto.rotate(rotar*Math.PI/180);
    contexto.translate(-cuboActual.X, -cuboActual.Y);
    generarCubo(cuboActual.X, cuboActual.Y, cuboActual.lado);
    
}

function reflejaCuboHor()
{
    var canvas=document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
    
    var lados = cuboActual.lado;
    
    cuboActual.X = Number(cuboActual.X)-150;
    
    contexto.beginPath();
    contexto.rect(cuboActual.X,cuboActual.Y,lados,lados);
    contexto.rect(cuboActual.X-lados/2, cuboActual.Y+lados/2, lados, lados);
    
    for(var i=0; i<2; i+=1)
    {
        for(var j=0; j<2; j+=1)
        {
            contexto.moveTo(cuboActual.X+(i*lados), cuboActual.Y+(j*lados));
            contexto.lineTo(cuboActual.X+(i*lados)-lados/2, cuboActual.Y+(j*lados)+lados/2);
            contexto.stroke();
        }
    }
}

function reflejaCuboVer()
{
    var canvas=document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
    
    var lados = cuboActual.lado;
    
    cuboActual.Y = Number(cuboActual.Y)-100;
    
    contexto.beginPath();
    contexto.rect(cuboActual.X,cuboActual.Y,lados,lados);
    contexto.rect(cuboActual.X+lados/2, cuboActual.Y-lados/2, lados, lados);
    
    for(var i=0; i<2; i+=1)
    {
        for(var j=0; j<2; j+=1)
        {
            contexto.moveTo(cuboActual.X+(i*lados), cuboActual.Y+(j*lados));
            contexto.lineTo(cuboActual.X+(i*lados)+lados/2, cuboActual.Y+(j*lados)-lados/2);
            contexto.stroke();
        }
    }
}

function EscalarCubo()
{
    cuboActual.lado = Number(cuboActual.lado)*Number(document.getElementById("EscaladorCubo").value);
    generarCubo(cuboActual.X, cuboActual.Y, cuboActual.lado);
}

function generarPrismaRect(Xcenter, Ycenter, largo, ancho, alto)
{
    var canvas=document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
    
    contexto.beginPath();
    contexto.rect(Xcenter,Ycenter,ancho,largo);
    contexto.rect(Xcenter+alto/2, Ycenter+alto/2, ancho, largo);
    
    for(var i=0; i<2; i+=1)
    {
        for(var j=0; j<2; j+=1)
        {
            contexto.moveTo(Xcenter+(i*ancho), Ycenter+(j*largo));
            contexto.lineTo(Xcenter+(i*ancho)+alto/2, Ycenter+(j*largo)+alto/2);
            contexto.stroke();
        }
    }
}

function trasladarPR()
{
    PRactual.X = Number(document.getElementById("despXPR").value) + Number(PRactual.X);
    PRactual.Y = Number(document.getElementById("despYPR").value) + Number(PRactual.Y);
    
    generarPrismaRect(PRactual.X, PRactual.Y, PRactual.largo, PRactual.ancho, PRactual.alto);
}

function rotarPR()
{
    var contexto = canvas.getContext("2d");
    var rotar = Number(document.getElementById("gradosPR").value)
    contexto.translate(PRactual.X, PRactual.Y);
    contexto.rotate(rotar*Math.PI/180);
    contexto.translate(-PRactual.X, -PRactual.Y);
    generarPrismaRect(PRactual.X, PRactual.Y, PRactual.largo, PRactual.ancho, PRactual.alto);
}

function reflejaPRHor()
{
    var canvas=document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
    
    var Ycenter = PRactual.Y;
    var ancho = PRactual.ancho;
    var largo = PRactual.largo;
    var alto = PRactual.alto;
    
    var Xcenter = Number(PRactual.X)-150;
    
    contexto.beginPath();
    contexto.rect(Xcenter,Ycenter,ancho,largo);
    contexto.rect(Xcenter-alto/2, Ycenter+alto/2, ancho, largo);
    
    for(var i=0; i<2; i+=1)
    {
        for(var j=0; j<2; j+=1)
        {
            contexto.moveTo(Xcenter+(i*ancho), Ycenter+(j*largo));
            contexto.lineTo(Xcenter+(i*ancho)-alto/2, Ycenter+(j*largo)+alto/2);
            contexto.stroke();
        }
    }
}

function reflejaPRVer()
{
    var canvas=document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
    
    var Xcenter = PRactual.X;
    var ancho = PRactual.ancho;
    var largo = PRactual.largo;
    var alto = PRactual.alto;
    
    var Ycenter = Number(PRactual.Y)-100;
    
    contexto.beginPath();
    contexto.rect(Xcenter,Ycenter,ancho,largo);
    contexto.rect(Xcenter+alto/2, Ycenter-alto/2, ancho, largo);
    
    for(var i=0; i<2; i+=1)
    {
        for(var j=0; j<2; j+=1)
        {
            contexto.moveTo(Xcenter+(i*ancho), Ycenter+(j*largo));
            contexto.lineTo(Xcenter+(i*ancho)+alto/2, Ycenter+(j*largo)-alto/2);
            contexto.stroke();
        }
    }
}

function EscalarPR()
{
    PRactual.largo = Number(PRactual.largo)*Number(document.getElementById("EscaladorPR").value);
    PRactual.ancho = Number(PRactual.ancho)*Number(document.getElementById("EscaladorPR").value);
    PRactual.alto = Number(PRactual.alto)*Number(document.getElementById("EscaladorPR").value);
    generarPrismaRect(PRactual.X, PRactual.Y, PRactual.largo, PRactual.ancho, PRactual.alto);
}

function generarPrismaTriang(Xcenter, Ycenter, lado1, lado2, lado3, altura)
{
    var canvas=document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
    
    contexto.beginPath();
    contexto.moveTo(Xcenter, Ycenter);
    contexto.lineTo(Xcenter+lado1, Ycenter);
    contexto.lineTo()
    contexto.closePath();
    contexto.stroke();
}

function generarCono(Xcenter, Ycenter, radio, altura)
{
    var canvas = document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
    
    contexto.beginPath();
    
    contexto.ellipse(Xcenter, Ycenter, radio, radio/4, 0, 0, 2*Math.PI, true);
    contexto.moveTo(Xcenter-radio, Ycenter);
    contexto.lineTo(Xcenter, Ycenter-altura);
    contexto.lineTo(Xcenter+radio, Ycenter);
    contexto.stroke();
}

function trasladarCono()
{
    Conoactual.X = Number(document.getElementById("despXCono").value) + Number(Conoactual.X);
    Conoactual.Y = Number(document.getElementById("despYCono").value) + Number(Conoactual.Y);
    
    generarCono(Conoactual.X, Conoactual.Y, Conoactual.radio, Conoactual.altura);
}

function rotarCono()
{
    var contexto = canvas.getContext("2d");
    var rotar = Number(document.getElementById("gradosCono").value)
    contexto.translate(Conoactual.X, Conoactual.Y);
    contexto.rotate(rotar*Math.PI/180);
    contexto.translate(-Conoactual.X, -Conoactual.Y);
    generarCono(Conoactual.X, Conoactual.Y, Conoactual.radio, Conoactual.altura);
}

function reflejaConoHor()
{
    Conoactual.X = Number(Conoactual.X)-150;
    generarCono(Conoactual.X, Conoactual.Y, Conoactual.radio, Conoactual.altura);
}

function reflejaConoVer()
{
    var canvas = document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
    
    var Ycenter = Number(Conoactual.Y)-150;
    var Xcenter = Conoactual.X;
    var radio = Conoactual.radio;
    var altura = Conoactual.altura;
    
    contexto.beginPath();
    
    contexto.ellipse(Xcenter, Ycenter, radio, radio/4, 0, 0, 2*Math.PI, true);
    contexto.moveTo(Xcenter-radio, Ycenter);
    contexto.lineTo(Xcenter, Ycenter+altura);
    contexto.lineTo(Xcenter+radio, Ycenter);
    contexto.stroke();
}

function EscalarCono()
{
    Conoactual.radio = Number(Conoactual.radio)*Number(document.getElementById("EscaladorCono").value);
    Conoactual.altura = Number(Conoactual.altura)*Number(document.getElementById("EscaladorCono").value);
    generarCono(Conoactual.X, Conoactual.Y, Conoactual.radio, Conoactual.altura);
}


function clearCanvas()
{
    var canvas = document.getElementById("canvas");
    var contexto = canvas.getContext("2d");
    contexto.clearRect(0,0, canvas.width, canvas.height);
}
