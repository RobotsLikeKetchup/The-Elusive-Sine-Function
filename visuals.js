//dynamically changing MathJax typesetting
function mathJaxClear(node) {
    MathJax.typesetClear([node]);
    MathJax.typesetPromise([node]).then(() => {
    // wait for content to get typeset
    });
};

//factorials!
function factorial(num) {
    if (num < 0) 
          return -1;
    else if (num == 0) 
        return 1;
    else {
        return (num * factorial(num - 1));
    }
};

//Triangle visualization
var triangle = JXG.JSXGraph.initBoard('sineTriangle', {
    boundingBox:[-4,4,4,-4], 
    keepaspectratio:true,
    showCopyright: false,
    showNavigation: false
});

var py = triangle.create('point',[-6,2],{name:'A', size:1});
var px = triangle.create('point',[6,-2],{name:'C',size:1});
var p1 = triangle.create('point',[function(){return py.X();},function(){return px.Y();}],{name:'B',size:1,fillColor:"black",strokeColor:'black'});

var tri = triangle.create('polygon',[py,px,p1],{borders:{strokeColor:'black'}});
var rAngle = triangle.create('angle', [px,p1,py],{name:' ', radius:0.5});
var cAngle = triangle.create('angle', [py,px,p1], {radius:1, name:function() {return JXG.toFixed(JXG.Math.Geometry.rad(py, px, p1), 2);}});

var triSineVal = document.getElementById("triangleSineValue");
triSineVal.innerText = "$$\\sin("+JXG.toFixed(cAngle.Value(), 2)+") = \\frac{AB}{AC} = "+JXG.toFixed(Math.sin(cAngle.Value()),3)+"$$";
triangle.on('move', function(){
    triSineVal.innerText = "$$\\sin("+JXG.toFixed(cAngle.Value(), 2)+") = \\frac{AB}{AC} = "+JXG.toFixed(Math.sin(cAngle.Value()),3)+"$$";
    mathJaxClear(triSineVal);
});

//Circle visualization
var circle = JXG.JSXGraph.initBoard('sineCircle', {
    boundingBox:[-1.5, 1.5, 1.5, -1.5], 
    keepaspectratio:true, 
    axis:true,
    showCopyright: false,
    showNavigation: false
});
var circleWave = JXG.JSXGraph.initBoard('circleWave', {
    boundingBox:[0, 1.5, Math.PI*2, -1.5], 
    keepaspectratio:true, 
    axis:true,
    showCopyright: false,
    showNavigation: false
});

var cp = circle.create('point', [0,0], {name:' ', fixed:'true', fillColor:"black",strokeColor:'black'});
var c1 = circle.create('circle', [cp, 1]);
var cg = circle.create('glider', [0.5,1,c1]);
var cs = circle.create('segment', [cp, cg]);
var angleStart = circle.create('point', [1,0], {size:'0', fixed:'true', name:' ',});
var ca = circle.create('angle', [angleStart,cp,cg],{name:function() { return JXG.toFixed(JXG.Math.Geometry.rad(angleStart,cp,cg), 2);}});

var cWave = circleWave.create('functiongraph', [function(x){return Math.sin(x);}]);
var wg = circleWave.create('point', [
    function() {
        var alpha = ca.Value();
      return alpha;
    },
      () => Math.sin(ca.Value())
  ]);
circle.addChild(circleWave);

var circSinVal = document.getElementById("circleSineValue");
cg.on('drag', function(){
    var x = JXG.toFixed(ca.Value(), 2);
    var y = JXG.toFixed(Math.sin(ca.Value()), 2);
    var cos = JXG.toFixed(Math.cos(x),2);
    circSinVal.innerText = "$$A(x,y)=A(\\cos("+x+"),\\sin("+x+"))=A("+cos+","+y+")$$";
    mathJaxClear(circSinVal);
});

//Derivatives
var dOverT = JXG.JSXGraph.initBoard('dOverT1', {
    boundingBox:[-1,10,10,-1],
    axis:true,
    keepaspectratio:true,
    showCopyright: false,
    showNavigation: false
});
var vOverT = JXG.JSXGraph.initBoard('vOverT1', {
    boundingBox:[-1,10,10,-1],
    axis:true,
    keepaspectratio:true,
    showCopyright: false,
    showNavigation: false
});
dOverT.addChild(vOverT);
var dtcurve = dOverT.create('cardinalspline',[[[0,0],[2,4],[5,6],[8,9],[10,10]],1,'uniform'],{createPoints: false, strokeWidth:'2', highlight:false});
var vtcurve = vOverT.create('derivative', [dtcurve], {strokeWidth:'2',highlight:false});

var dtg = dOverT.create('glider', [1,1,dtcurve],{name:' '});
var dtt = dOverT.create('tangent',[dtg],{strokeWidth:'1',dash:'2'});
var vtt = vOverT.create('line', [[function(){return dtg.X()},0],[function(){return dtg.X()},5]],{name:' ',fixed:true,createPoints:false,strokeWidth:'1',dash:'2'});

var slopeText = dOverT.create('text', [5,3, function(){return "Slope:"+JXG.toFixed(dtt.getSlope(),2);}]);

var labelD = dOverT.create('text', [0.5, 9.5, "Distance"]);
var labelV = vOverT.create('text', [0.5, 9.5, "Velocity"]);
var labelT1 = dOverT.create('text', [8, 0.5, "Time"]);
var labelT2 = vOverT.create('text', [7, 0.5, "Time"]);

//nth Derivative
var d0 = JXG.JSXGraph.initBoard('d0', {
    boundingBox:[-1,10,8,-1],
    axis:true,
    keepaspectratio:true,
    showCopyright: false,
    showNavigation: false
});
var d1 = JXG.JSXGraph.initBoard('d1', {
    boundingBox:[-1,10,8,-1],
    axis:true,
    keepaspectratio:true,
    showCopyright: false,
    showNavigation: false
});
var d2 = JXG.JSXGraph.initBoard('d2', {
    boundingBox:[-1,10,8,-1],
    axis:true,
    keepaspectratio:true,
    showCopyright: false,
    showNavigation: false
});
var d3 = JXG.JSXGraph.initBoard('d3', {
    boundingBox:[-1,10,8,-1],
    axis:true,
    keepaspectratio:true,
    showCopyright: false,
    showNavigation: false
});

d0.addChild(d1);
d1.addChild(d2);
d2.addChild(d3);

var d0curve = d0.create('functiongraph',[function(x){
    return -5+(13.06667*x)-(9.716667*(x**2))+(2.933333*(x**3))-(0.2833333*(x**4));
}],{createPoints: false, strokeWidth:'2', highlight:false});
var d1curve = d1.create('derivative', [d0curve], {strokeWidth:'2',highlight:false});
var d2curve = d2.create('derivative', [d1curve], {strokeWidth:'2',highlight:false});
var d3curve = d3.create('functiongraph', [function(x){
    return (-6.8*x)+17.4;
}], {strokeWidth:'2',highlight:false});

var d0g = d0.create('glider', [1,1,d0curve],{name:' '});
var d0t = d0.create('tangent',[d0g],{strokeWidth:'1',dash:'2'});
var d1t = d1.create('line', [[function(){return d0g.X()},0],[function(){return d0g.X()},5]],{name:' ',fixed:true,createPoints:false,strokeWidth:'1',dash:'2'});

var d0slopeText = d0.create('text', [0.5,5, function(){return "Slope:"+JXG.toFixed(d0t.getSlope(),2);}]);

var labelD0 = d0.create('text', [0.5, 9.5, "Distance"]);
var labelD1 = d1.create('text', [0.5, 9.5, "Velocity"]);

var labelT3 = d0.create('text', [6, 0.5, "Time"]);
var labelT4 = d1.create('text', [6, 0.5, "Time"]);

//Taylor series
var taylor = JXG.JSXGraph.initBoard('taylor', {
    boundingBox:[-8,3,8,-3],
    axis:true,
    keepaspectratio:true,
    showCopyright: false,
    showNavigation: false
});
var tw = taylor.create('functiongraph', [function(x){return Math.sin(x);}],{dash:2});
var ts = taylor.create('slider', [[-4,2.5],[2,2.5],[1,3,10]],{
    //snapWidth:1,
    name: 'n',
    suffixLabel: 'n Terms = '
});
var ta = taylor.create('functiongraph',[function(x){
    n = 5;
    function taylorSin(n,x){
        n = ts.Value();
        var y;
        sx = "y = 0"
        for (let i=1; i<n; i++){
            var eo;
            if (i % 2  == 0) {
                eo = -1;
            } else {
                eo = 1;
            }
            //taylor series!!!!!! (I FINALLY DID IT EVEN THOUGH I CANNOT PROGRAM YAAAAAAYYY)
            sx = sx + " + ("+eo+"*(x ** ((2*"+i+")-1))/(factorial((2*"+i+")-1)))";
        }
        eval(sx);
        return y;
    };
    return taylorSin(n,x);
}]);

tFunction = document.getElementById('taylorFunction');

ts.on('drag',function(){
    let sf = "$$f(x)= x"
    let n = ts.Value();
    for (let i=2; i<n; i++){
        var eo;
        if (i % 2  == 0) {
            eo = "-";
        } else {
            eo = "+";
        }
        sf = sf+eo+"\\frac{x^{"+((2*i)-1)+"}}{"+((2*i)-1)+"!}";
    }
    sf = sf + "$$";
    tFunction.innerText = sf;
    mathJaxClear(tFunction);
});

//Complex numbers intro
var complexIntro = JXG.JSXGraph.initBoard('complexIntro', {
    boundingBox:[-5,5,5,-5], 
    keepaspectratio:true,
    axis:true,
    defaultAxes: {
        y:{
            ticks: {
                scale:1,
                scaleSymbol:"i"
            }
        }
    },
    showCopyright: false,
    showNavigation: false
});

var cip = complexIntro.create('point', [1,1], {name:'A'});
var civ = document.getElementById("complexIntroValue");

cip.on('drag', function(){
    civ.innerText="$$A=a+bi="+JXG.toFixed(cip.X(),1)+"+"+JXG.toFixed(cip.Y(),1)+"i$$";
    mathJaxClear(civ);
});

//Complex numbers multiplication
var complexM = JXG.JSXGraph.initBoard('complexMultiply', {
    boundingBox:[-10,10,10,-10], 
    keepaspectratio:true,
    axis:true,
    defaultAxes: {
        y:{
            ticks: {
                scale:1,
                scaleSymbol:"i"
            }
        }
    },
    showCopyright: false,
    showNavigation: false
});

var cp1 = complexM.create('point', [2,1], {name:'A'});
var cp2 = complexM.create('point', [1,2], {name:'B'});
var co = complexM.create('point', [0,0], {name:' ', size:'0', fixed:'true'});


var out = complexM.create('point', [function() {
    var x1, y1, x2, y2;
    x1 = cp1.X();
    y1 = cp1.Y();
    x2 = cp2.X();
    y2 = cp2.Y();
    var rOut = (x1*x2)-(y1*y2);
    return rOut;
}, function() {
    var x1, y1, x2, y2;
    x1 = cp1.X();
    y1 = cp1.Y();
    x2 = cp2.X();
    y2 = cp2.Y();
    var iOut = (x1*y2)+(x2*y1);
    return iOut;
}], {name:'C'});

var cs1 = complexM.create('segment', [co, cp1], {dash:2});
var cs2 = complexM.create('segment', [co, cp2], {dash:2});

var cso = complexM.create('segment', [co, out], {dash:3});

var abiVal = document.getElementById('multiplyA+bi');
var polarVal = document.getElementById('multiplyPolar');

cp1.on('drag', function () {
    var x3, y3, r1, r2, r3, a1, a2, a3;
    var x1, y1, x2, y2;
    x1 = cp1.X();
    y1 = cp1.Y();
    x2 = cp2.X();
    y2 = cp2.Y();
    x3 = JXG.toFixed(out.X(),1);
    y3 = JXG.toFixed(out.Y(),1);
    r1 = JXG.toFixed(cs1.L(),1);
    r2 = JXG.toFixed(cs2.L(),1);
    r3 = JXG.toFixed(cso.L(),1);
    a1 = JXG.toFixed(JXG.Math.Geometry.rad([1,0], co, cp1),1);
    a2 = JXG.toFixed(JXG.Math.Geometry.rad([1,0], co, cp2),1);
    a3 = JXG.toFixed(JXG.Math.Geometry.rad([1,0], co, out),1);
    abiVal.innerText = "$$("+JXG.toFixed(x1,1)+"+"+JXG.toFixed(y1,1)+"i) \\cdot ("+JXG.toFixed(x2,1)+"+"+JXG.toFixed(y2,1)+"i)=("+x3+"+"+y3+"i)$$";
    polarVal.innerText = "$$"+r1+"e^{"+a1+"i} \\cdot "+r2+"e^{"+a2+"i}="+r3+"e^{"+a3+"i}$$";
    mathJaxClear(abiVal);
    mathJaxClear(polarVal);
});
cp2.on('drag', function () {
    var x3, y3, r1, r2, r3, a1, a2, a3;
    var x1, y1, x2, y2;
    x1 = cp1.X();
    y1 = cp1.Y();
    x2 = cp2.X();
    y2 = cp2.Y();
    x3 = JXG.toFixed(out.X(),1);
    y3 = JXG.toFixed(out.Y(),1);
    r1 = JXG.toFixed(cs1.L(),1);
    r2 = JXG.toFixed(cs2.L(),1);
    r3 = JXG.toFixed(cso.L(),1);
    a1 = JXG.toFixed(JXG.Math.Geometry.rad([1,0], co, cp1),1);
    a2 = JXG.toFixed(JXG.Math.Geometry.rad([1,0], co, cp2),1);
    a3 = JXG.toFixed(JXG.Math.Geometry.rad([1,0], co, out),1);
    abiVal.innerText = "$$("+JXG.toFixed(x1,1)+"+"+JXG.toFixed(y1,1)+"i) \\cdot ("+JXG.toFixed(x2,1)+"+"+JXG.toFixed(y2,1)+"i)=("+x3+"+"+y3+"i)$$";
    polarVal.innerText = "$$"+r1+"e^{"+a1+"i} \\cdot "+r2+"e^{"+a2+"i}="+r3+"e^{"+a3+"i}$$";
    mathJaxClear(abiVal);
    mathJaxClear(polarVal);
});

//CORDIC Algorithm
var cordic = JXG.JSXGraph.initBoard('CORDIC', {
    boundingBox:[-2,2,2,-2], 
    keepaspectratio:true,
    axis:true,
    defaultAxes: {
        y:{
            ticks: {
                scale:1,
                scaleSymbol:"i"
            }
        }
    },
    showCopyright: false,
    showNavigation: false
});

var ic = cordic.create('circle', [[0,0],1], {createPoints:false, dash:2, fixed:true});
var button = document.getElementById('run');
var results = document.getElementById('results');
var tVal;
var rInfo = document.getElementById('rinfo');
var wi, wis, inTe;
// CORDIC gain for 5 iterations is 0.607
button.addEventListener('click', async function(){
    try {
        wi.remove();
        wis.remove();
        rInfo.innerText = " ";
        mathJaxClear(rInfo);
    } catch (error) {
        console.log('lets go!');
        console.error(error);
    };
    tVal = parseFloat(document.getElementById('targetValue').value);
    if (tVal < 0 || tVal > (2*Math.PI)) {
        rInfo.innerText = "Please enter a number between 0 and \\(2\\pi\\).";
        mathJaxClear(rInfo);
    } else if (tVal < (Math.PI/2)) { //90 or less
        console.log('90 or less!');
        inTe = "1";
        wi = cordic.create('point',[1,0],{fixed:true});
    } else if(tVal < (Math.PI)) { //180 or less
        inTe = "i";
        wi = cordic.create('point',[0,1],{fixed:true});
    } else if(tVal < (3*(Math.PI/2))) { //270 or less
        inTe = "-1";
        wi = cordic.create('point',[-1,0],{fixed:true});
    } else { //360 or less
        inTe = "-i";
        wi = cordic.create('point',[0,-1],{fixed:true, hasLabel:false});
    };
    rInfo.innerText = "$$ " + inTe + " $$";
    wis = cordic.create('segment',[[0,0],wi],{createPoints:false});
    var x1, y1, bCoeff, aa, xo, yo;
    x1 = wi.X();
    y1 = wi.Y();
    for (let i=1;i<9;i++){
        bCoeff = (1)/(2**(i-1));
        aa = JXG.Math.Geometry.rad([1,0],[0,0],wi);
        if (tVal-aa > 0) { 
            xo = x1-(y1*bCoeff);
            yo = (x1*bCoeff)+y1;
        } else {
            xo = x1+(y1*bCoeff);
            yo= -(x1*bCoeff)+y1;
        };
        inTe = inTe + "\\cdot (1+\\frac{1}{"+(2**(i-1))+"}i)";
        rInfo.innerText = "$$ " + inTe + " $$"
        mathJaxClear(rInfo);
        await new Promise(done=>{
            wi.moveTo([xo,yo],500,{callback:() => {done()}});
        });
        x1 = xo;
        y1 = yo;
        console.log("iteration: "+i+" - coords: "+xo+", "+yo+" - angle: "+aa);
    }
    xo = xo*0.607;
    yo = yo*0.607;
    wi.moveTo([xo,yo],500,{});
    inTe = "(" + inTe + ") \\cdot 0.607 = (" + JXG.toFixed(xo, 3) + "+" + JXG.toFixed(yo, 3) + "i)";
    rInfo.innerText = "$$ " + inTe + " $$"
    rInfo.innerText = rInfo.innerText + " $$ \\sin(" + tVal + ") = " + JXG.toFixed(yo, 3) + "$$ $$ \\cos(" + tVal + ") =" + JXG.toFixed(xo, 3) + " $$";
    mathJaxClear(rInfo);
});

//hover definitions
function showDef(){
    for (i=0; i<this.children.length; i++){
        this.children[i].style.display="block";
    };
}
function hideDef(){
    for (i=0; i<this.children.length; i++){
        this.children[i].style.display="none";
    };
}

var defs = document.getElementsByClassName('info');
for (i=0; i<defs.length; i++) {
    defs[i].addEventListener('mouseover',showDef, false);
    defs[i].addEventListener('mouseout', hideDef, false);
}
