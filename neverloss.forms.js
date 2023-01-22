



function enviaDados(){

        axios.post('http://localhost:8090/login', {

        nome: 'Anael Jonas',

        idade: 19,

        estilo: 'Músicas US do estilo Disco dos anos 70, 80 e 90 são as melhores',

        }).then(response => { console.log(response.data) })

        .catch(erro => { console.log(erro) });


}