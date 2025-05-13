const db = new PouchDB('Finances');
const form = document.getElementById('RecordForm');
const list = document.getElementById('RecordsList');
const totalDaily = document.getElementById('DailySum');
const total = document.getElementById('TotalSum');
const today = new Date().toISOString().slice(0, 10);//aqui estamos pegando a data atual e

form.addEventListener('submit', async (e) => {
    e.preventDefault();//para tudo o que está acontecendo no evento submit
    //caso eu não tivesse este preventDefault, o formulário seria enviado e a página 
    // recarregada
    const desc = document.getElementById('Description').value;
    const value = parseFloat(document.getElementById('Value').value);
    const recordType = document.getElementById('Type').value;
    const date = today;//aqui estamos pegando a data atual e formatando para o padrão ISO

    const doc = {
        _id: new Date().toISOString(),//aqui estamos criando um id único para cada documento
        desc, value, recordType, date//aqui estamos pegando os dados do formulário e criando um objeto com eles
    };
    await db.put(doc);//como estamos dentro de uma função assíncrona, usamos o await para 
    // esperar a resposta do banco de dados antes de continuar
    form.reset();//limpa o formulário após o envio
    refresh();//atualiza a lista de registros
});
    async function refresh(){

    const res = await db.allDocs({include_docs: true, descending: true});//aqui estamos pegando todos os documentos do banco de dados
    list.innerHTML = '';//limpa a lista de registros antes de adicionar os novos
    let totalG = 0;//variável para armazenar o total geral
    let totalD = 0;//variável para armazenar o total diário

    res.rows.forEach(row => {
    // aqui estamos percorrendo todos os documentos do banco de dados
    // e criando um elemento li para cada um deles
    const {desc, value, recordType, date} = row.doc; // aqui estamos pegando os dados do documento
    const li = document.createElement('li'); // cria um elemento li para cada registro
    li.textContent = `${desc} - ${value} - ${recordType} - ${date}`; // aqui estamos adicionando os dados do registro ao elemento li
    list.appendChild(li); // adiciona o elemento li à lista de registros
    if (recordType === 'income') {
        totalG += value; // aqui estamos somando o valor do registro ao total geral
        if(date === today) {
            totalD += value; // aqui estamos somando o valor do registro ao total diário
        }else {
            totalD -= value; // aqui estamos subtraindo o valor do registro ao total diário
            if(date === today)totalID -= value; // aqui estamos subtraindo o valor do registro ao total diário
        }
    }
});

}

refresh();//chama a função refresh para atualizar a lista de registros quando a página
//  é carregada