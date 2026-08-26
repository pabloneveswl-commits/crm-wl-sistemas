const etapas=[
"Lead",
"Contato",
"Demonstração",
"Proposta",
"Follow-up",
"Fechado",
"Perdido"
];

let leads=JSON.parse(localStorage.getItem("wlcrm")||"[]");

function salvar(){
localStorage.setItem("wlcrm",JSON.stringify(leads));
}

function login(){

const u=document.getElementById("user").value;
const p=document.getElementById("pass").value;

if((u==="Pablo"||u==="Wesley")&&p==="123456"){

document.getElementById("login").style.display="none";
document.getElementById("app").style.display="block";

render();

}else{

alert("Usuário inválido");

}

}

function novoLead(){

const nome=document.getElementById("empresa").value;

if(!nome)return;

leads.push({
id:Date.now(),
empresa:nome,
etapa:"Lead"
});

document.getElementById("empresa").value="";

salvar();
render();

}

function render(){

const board=document.getElementById("kanban");

board.innerHTML="";

etapas.forEach(et=>{

const col=document.createElement("div");
col.className="coluna";

col.innerHTML=`<h3>${et}</h3>`;

leads.filter(x=>x.etapa===et).forEach(l=>{

const card=document.createElement("div");

card.className="lead";

card.draggable=true;

card.innerHTML=l.empresa;

col.appendChild(card);

});

board.appendChild(col);

});

document.getElementById("totalLeads").innerText=leads.length;
document.getElementById("fechados").innerText=leads.filter(x=>x.etapa==="Fechado").length;

const receita=leads.filter(x=>x.etapa==="Fechado").length*2500;

document.getElementById("receita").innerText="R$ "+receita;

}
