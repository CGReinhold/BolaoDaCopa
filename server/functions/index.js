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

exports.calculaPontuacaoUsuariosDoJogo = functions.database.ref('/matches/{partidaID}/finished').onUpdate((snapshot, context) => {
  if (snapshot.before.val() === false && snapshot.after.val() === true) {
    //snapshot trás apenas o valor do finished, para trazer os outros valores é preciso carregar o filtro utilizando a propriedade 'name' da partida.
    // Essa propriedade é o identificador das apostas do usuário
    //Através dessa propriedade é possível carregar as apostas de cada usuário

    console.log('>> partidaID: ', JSON.stringify(context.params.partidaID))
    const db = admin.database();
    
    db.ref('/matches/' + context.params.partidaID).once('value', definicaoPartida => {
      console.log('>>', JSON.stringify(definicaoPartida));

      db.ref('/users').once('value', usuariosBase => {
        const usuarios = usuariosBase.val();
        console.log('>>');
        console.log('>> Usuarios - ', JSON.stringify(usuarios));
         usuarios.forEach((element, index) => {
            console.log('>>> Element: ', JSON.stringify(element));
         });
      });
    });
  }
});