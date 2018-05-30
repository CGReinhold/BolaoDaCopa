'use strict';

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.calculaPartida = functions.database.ref('/matches/{pushId}/teste').onCreate((snapshot, context) => {
  const original = snapshot.val();
  console.log('Original: ', JSON.stringify(original)); 
  console.log('Uppercasing', context.params.pushId, original);
  const uppercase = original.toUpperCase();
  return snapshot.ref.parent.child('uppercase').set(uppercase);
});

exports.calculaPontuacaoUsuariosDoJogo =  functions.database.ref('/matches/{partidaID}/finished').onUpdate((snapshot, context) => {
    if(snapshot.before.val() === false && snapshot.after.val() === true) {
      //snapshot trás apenas o valor do finished, para trazer os outros valores é preciso carregar o filtro utilizando a propriedade 'name' da partida.
      // Essa propriedade é o identificador das apostas do usuário
      //Através dessa propriedade é possível carregar as apostas de cada usuário
      
      admin.database().ref('/users').once('value', usuario => {
         
      });
      
    }
});

