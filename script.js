/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function onClick(event){
    //vedo chi viene clickato
    const choice = event.currentTarget;
    const image = choice.querySelector('.checkbox');
    //vedo se in selectderanswers ci sono già risposte con lo stesso question-id
    for(let ans of selectedanswers){
        if(ans.dataset.questionId == choice.dataset.questionId){
            ans.addEventListener('click', onClick);
            ans.classList.remove('chosen');
            ans.classList.add('not-chosen');
            const img = ans.querySelector('.checkbox');
            img.src = "images/unchecked.png";
            const indAns = selectedanswers.indexOf(ans);
            selectedanswers.splice(indAns, 1);
            listadianswers.push(ans);
        }
    }
    //metto la scelta nella lista di elementi scelti e la rimuovo da quella totale
    selectedanswers.push(choice);
    choice.removeEventListener('click', onClick);
    const indChoice = listadianswers.indexOf(choice);
    listadianswers.splice(indChoice, 1);
    //faccio l'azione sulla scelta
    choice.classList.add('chosen');
    image.src = "images/checked.png";
    choice.classList.remove('not-chosen');
    //controllo se ho selezionato tre elementi
    if(selectedanswers.length == 3){
        for(let ans of listadianswers){
            ans.removeEventListener('click', onClick);
        }
        //devo mostrare il risultato
        //creo una mappa associando ad ogni Id della scelta la sua frequenza
        const fAnswers = {};
        for(let choice1 of selectedanswers){
            let f = 0;
            let choiceId = choice1.dataset.choiceId;
            for(let choice2 of selectedanswers){
                if(choice1.dataset.choiceId == choice2.dataset.choiceId)
                f++;
            }
            fAnswers[choiceId] = f;
        }
        //itero la mappa e prendo l'Id con la frequenza maggiore
        //lo salvo nella var maxKey
        var maxF = 0;
        var maxKey;
        for(let key in fAnswers){
            if(fAnswers[key] > maxF){
                maxF = fAnswers[key];
                maxKey = key;
            }
        }
        //carico il contenuto del testo corrispondente a maxKey
        const h1Result = document.querySelector('#result h1');
        const pResult = document.querySelector('#result p');
        let map = RESULTS_MAP[maxKey];
        h1Result.textContent = map['title'];
        pResult.textContent = map['contents'];
        pResult.textContent = map['contents'];
        result.classList.remove('hidden');
        button.classList.remove('hidden');
    }
}

function reSet(){
    //nascondo risultato
    result.classList.add('hidden');
    button.classList.add('hidden');
    //svuoto le liste
    for(let answer of listadianswers){
        const indAns = listadianswers.indexOf(answer);
        selectedanswers.splice(indAns, 1);
    }
    for(let answer of selectedanswers){
        const indAns = selectedanswers.indexOf(answer);
        selectedanswers.splice(indAns, 1);
    }
    //riempio da capo quella di answers non selezionate
    for(let answer of answers){
        listadianswers.push(answer);
        answer.addEventListener('click', onClick);
        answer.classList.add('not-chosen');
        const img = answer.querySelector('.checkbox');
        img.src = "images/unchecked.png";
    }
}


//nascondo il risultato
const result = document.querySelector('#result');
result.classList.add('hidden');
const button = document.querySelector('#button');
button.classList.add('hidden');

const answers = document.querySelectorAll('.choice-grid div');
const listadianswers = [];
for(let answer of answers){
    listadianswers.push(answer);
    answer.addEventListener('click', onClick);
    answer.classList.add('not-chosen');
}

const selectedanswers = [];


button.addEventListener('click', reSet)