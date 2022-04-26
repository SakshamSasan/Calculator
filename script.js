

/*
parseFloat better > than parseInt even with integers as prevents rounding off
MIN_VALUE is still positive. use MIN_SAFE_INT instead
data-value custom attribute greatly reduced complexity of code by surpassing the
need to write multiple unique elements and making it possible with this to play with
values directly. Also, the data returned via this attribute is a string. 
*/


var ans="0";
var operand="0";
var operator=null;
var anscomplete=false;
var operand2complete=true;


function number() {
  if(!anscomplete) {
    if(ans=='0') {
      ans=String(this.getAttribute('data-value'));
    }
    else ans+=String(this.getAttribute('data-value'));
    
    document.getElementsByTagName('h2')[0].innerText=ans;
  }
  else {
    if(operand=='0') {
      operand=String(this.getAttribute('data-value'));
    }
    else operand+=String(this.getAttribute('data-value'));
    document.getElementsByTagName('h2')[0].innerText=operand;
  }
}

function point() {
  if(!anscomplete) {
    ans+='.'
    document.getElementsByTagName('h2')[0].innerText=ans;
  }
  else {
    operand+='.'
    document.getElementsByTagName('h2')[0].innerText=operand;
  }
}


function clear() {
  ans="0";
  operand="0";
  operator=null;
  anscomplete=false;
  operand2complete=true;
  document.getElementsByTagName('h2')[0].innerText=0;
}

function operation() {
  var val=this.getAttribute('data-value');

  if (val=='percent') {
    operator='/';
    operand='100'
  }
  else if(val=='inverse') {
    operator='*';
    operand='-1';
  }
  else {
    operator=val
  }
  anscomplete=true;
  operand2complete=false;
  
}


function equal(){
  operand2complete=true;
  anscomplete=false;
  var disp=eval(parseFloat(ans)+operator+parseFloat(operand));
  
  if (Number.MIN_SAFE_INTEGER<=disp && disp<=Number.MAX_VALUE) {
    document.getElementsByTagName('h2')[0].innerText=disp;
   
  }
  else {
    disp="ERROR, press AC"
    document.getElementsByTagName('h2')[0].innerText=disp;

  }
  ans=disp;
  operand="0";
  operator=null;
  anscomplete=false;
  operand2complete=true;

}

var numbers = document.getElementsByClassName('digit');
for (var i = 0; i<numbers.length;i++) {
  numbers[i].addEventListener('click', number);
}

var operators = document.getElementsByClassName('operations');
for (var i = 0; i<operators.length;i++) {
  operators[i].addEventListener('click', operation);
}


document.getElementById('point').addEventListener('click',point)
document.getElementById('AC').addEventListener('click',clear);
document.getElementById('equal').addEventListener('click',equal);


