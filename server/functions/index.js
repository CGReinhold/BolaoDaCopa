'use strict';

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

function returnArrayFromObject(definicao){
    let arrayData=[];
    let i =0;

    for(let prop of Object.keys(definicao)) {
       arrayData[i] = { usuario: prop, definicaoUsuario: definicao[prop] }
       i++;
    }

    return arrayData;
}

exports.calculaPontuacaoUsuariosDoJogo = functions.database.ref('/matches/{partidaID}/finished').onUpdate((snapshot, context) => {
  if (snapshot.before.val() === false && snapshot.after.val() === true) {
    //snapshot trás apenas o valor do finished, para trazer os outros valores é preciso carregar o filtro utilizando a propriedade 'name' da partida.
    // Essa propriedade é o identificador das apostas do usuário
    //Através dessa propriedade é possível carregar as apostas de cada usuário

    console.log('>> partidaID: ', JSON.stringify(context.params.partidaID))
    const db = admin.database();
    
    let awayScorePartida = 0;
    let homeScorePartida = 0;

    db.ref('/matches/' + context.params.partidaID).once('value', definicaoPartida => {
       
      awayScorePartida = parseInt(definicaoPartida.val().away_score);
      homeScorePartida = parseInt(definicaoPartida.val().home_score);

      db.ref('/users').once('value', usuariosBase => {
        let definicaoUsuarios = usuariosBase.val();
        console.log('>> Usuarios - ', JSON.stringify(definicaoUsuarios));
        const listaUsuarios = returnArrayFromObject(definicaoUsuarios);

        listaUsuarios.forEach(usuario => {
          console.log('===========================================================');
          console.log('>> Partida - ', JSON.stringify(definicaoPartida.val()));
          console.log('away: ', awayScorePartida);
          console.log('home: ', homeScorePartida);
          
          console.log(' >> Usuário - ', JSON.stringify(usuario));
          const apostaUsuario = usuario.definicaoUsuario[definicaoPartida.val().name];  
          console.log(' >> Aposta do usuário: ', JSON.stringify(apostaUsuario));

          let aposta = { awayScore: 0, homeScore: 0 };
          if(apostaUsuario){
              aposta = { awayScore: parseInt(apostaUsuario.awayScore), homeScore: parseInt(apostaUsuario.homeScore) };
          }

          let acertouVeia = false;
          let pontuacaoPartida = 0;
          if(aposta.awayScore === awayScorePartida)
            pontuacaoPartida = 1;

          if(aposta.homeScore === homeScorePartida)
            pontuacaoPartida = (pontuacaoPartida + 1);//to fazendo assim por que o JavaScript é muito doido, só pra evitar erros

          // Significa que o usuário acertou o placar na veia, ganhando o bônus por acertar o placar correto e também acertar quem ganha ou se era empate
          if(aposta.homeScore === homeScorePartida && aposta.awayScore === awayScorePartida){
            pontuacaoPartida = (pontuacaoPartida + 3);
            acertouVeia = true;
          } else {
            // Aqui a rotina tem q identificar se a aposta do usuário foi empate ou se apostou na vitória de alguma equipe
            // Se for empate tem que verificar se o usuário acertou
            // Se o usuário apostou na vitória de alguma das equipes a rotina tem que verificar se o usuário acertou a equipe vencedora

            if(aposta.homeScore === aposta.awayScore){ //Usuário apostou em empate
              if(awayScorePartida === homeScorePartida){ //Se a partida realmente terminou em empate
                pontuacaoPartida = (pontuacaoPartida + 1);
              }
            }else{ //Se o usuário apostou na vitória de alguma seleção
              if(awayScorePartida !== homeScorePartida){ //Se alguma seleção ganhou
                 const isHomeTeamWinner = homeScorePartida > awayScorePartida; //Time da casa é o vencedor?
                 const usuarioApostouTimeCasa = aposta.homeScore > aposta.awayScore; // O usuário apostou no time da casa?

                 if(isHomeTeamWinner === usuarioApostouTimeCasa){ //Acertou o vencedor??
                   pontuacaoPartida = (pontuacaoPartida + 1);
                 }
              }
            }
          }

          console.log('Processamento de pontuação realizado: ', JSON.stringify({ total: pontuacaoPartida, aposta: apostaUsuario }))

          //Criar rotina para totalizar com o que já está no banco
          const dadosUsuario = usuario.definicaoUsuario["dados"];
          console.log("Dados: ", JSON.stringify(dadosUsuario));
          if(dadosUsuario){
            pontuacaoPartida = (pontuacaoPartida + parseInt(dadosUsuario.pontuacao));
            dadosUsuario.pontuacao = pontuacaoPartida;

            if(acertouVeia){
              dadosUsuario.pontuacaoVeia = (parseInt(dadosUsuario.pontuacaoVeia) + 1);//Fazendo isso pq matemática de Script é daquele jeito
            }
          }

          console.log('Total pontos usuário: ', pontuacaoPartida.toString());
          console.log('Identificação usuário: ', usuario.usuario);
          db.ref(`/users/${usuario.usuario}/dados`).set({ pontuacaoVeia: dadosUsuario.pontuacaoVeia, pontuacao: dadosUsuario.pontuacao, displayName: dadosUsuario.displayName });
        });

      });
    });
  }
});