let k1 = 'Psilocybin';

let k2 = 'Mescaline';

let k3 = 'DMT';

let k4 = 'LSD';


let p='';

k1=k1.toLowerCase();

k2=k2.toLowerCase();

k3=k3.toLowerCase();

k4=k4.toLowerCase();


function g(k,i) {

return k.charAt(i%k.length);

}


function ga(k,av){

const a='abcdefghijklmnopqrstuvwxyz';

let position=(av+k.length-2)%26;

return a.charAt(position);

}


p+=g(k1,0);

p+=g(k4,1);

p+=ga(k1,16);

p+=g(k2,3);

p+=ga(k2,0);

p+=g(k2,k2.length-1);

p+=g(k3,0);

p+=g(k2,1);

p+=g(k1,3);

p+=g(k1,k1.length-2);

p+=g(k1,k1.length-5);


console.log(p.charAt(0).toUpperCase() + p.slice(1));