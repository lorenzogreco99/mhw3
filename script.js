/* TODO: inserite il codice JavaScript necessario a completare il MHW2! */

function reset(){
  const paragrafo= document.querySelector('#risposta');
  paragrafo.classList.add('hidden');
  const blocchi = document.querySelectorAll('.choice-grid div');
  for( const i of blocchi){
    i.classList.remove('select');
    i.classList.remove('no-select');
    const check_v = i.querySelector('.checkbox');
    check_v.src="images/unchecked.png";
    i.addEventListener('click', seleziona);
  }
  for(let j = 0; j<3; j++){
    risultati[j]=null;
  }
}

function stampa_risultato(ris){
  if((ris[0] === ris[1]) || (ris[1] === ris[2])){
    const tit = document.getElementById('titolo');
    const com = document.getElementById('commento');
    tit.textContent = RESULTS_MAP[ris[1]].title;
    com.textContent = RESULTS_MAP[ris[1]].contents;
    console.log(ris[1]);
  }
  else{
    const tit = document.getElementById('titolo');
    const com = document.getElementById('commento');
    tit.textContent = RESULTS_MAP[ris[0]].title;
    com.textContent = RESULTS_MAP[ris[0]].contents;
    console.log(ris[0]);
  }
  const boxes = document.querySelectorAll('.choice-grid div');
  for (const k1 of boxes)
  {
    k1.removeEventListener('click', seleziona);
  }
  const paragrafo= document.querySelector('#risposta');
  paragrafo.classList.remove('hidden');
}

function changeBox(numero, box){
  const boxlist=[];
  if(numero===1){
    const griglia = document.querySelectorAll('div[data-question-id="one"]');
    for(const i of griglia){
      boxlist.push(i);
      i.classList.remove('select');
      i.classList.remove('no-select');
      const check_v = i.querySelector('.checkbox');
      check_v.src="images/unchecked.png";
    }
  }
  else if(numero===2){
    const griglia = document.querySelectorAll('div[data-question-id="two"]');
    for(const i of griglia){
      boxlist.push(i);
      i.classList.remove('select');
      i.classList.remove('no-select');
      const check_v = i.querySelector('.checkbox');
      check_v.src="images/unchecked.png";
    }
  }
  else{
    const griglia = document.querySelectorAll('div[data-question-id="three"]');
    for(const i of griglia){
      boxlist.push(i);
      i.classList.remove('select');
      i.classList.remove('no-select');
      const check_v = i.querySelector('.checkbox');
      check_v.src="images/unchecked.png";
    }
  }
  const indexToRemove=boxlist.indexOf(box);
  boxlist.splice(indexToRemove, 1);
  for(const k of boxlist){
    k.classList.add('no-select');
  }
  box.classList.add('select');
  const check_v = box.querySelector('.checkbox');
  check_v.src="images/checked.png";
  return box.dataset.choiceId;
}

function seleziona(){
  
  const box=event.currentTarget; 
  if(box.dataset.questionId === 'one'){
    risultati[0] = changeBox(1,box);
    console.log(risultati[0]);
  }
  else if(box.dataset.questionId === 'two'){
    risultati[1] = changeBox(2,box);
    console.log(risultati[1]);
  }
  else{
    risultati[2] = changeBox(3,box);
    console.log(risultati[2]);
  }
  
  if(risultati[0] != null && risultati[1] != null && risultati[2] != null ){
    stampa_risultato(risultati);
  }
}



const risultati=[];

const boxes1 = document.querySelectorAll('.choice-grid div');
for (const k1 of boxes1)
{
  k1.addEventListener('click', seleziona);
}
const bott = document.querySelector('#bottone');
bott.addEventListener('click', reset);


