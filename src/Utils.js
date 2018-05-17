import moment from 'moment';
import ptLocale from 'moment/locale/pt-br';

const crypto = require('./crypto');

export const dateToCsFormat = date => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // months are zero indexed
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	const hourFormatted = hour % 24; // hour returned in 24 hour format
  return `${year}${pad(month)}${pad(day)}T${pad(hourFormatted)}${pad(minute)}${pad(second)}`;
};

function pad(num) {
	let s = `${num}`;
	while (s.length < 2) s = `0${s}`;
	return s;
}

export const makeId = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const encrypt = (data, token) => {
  const cifra = crypto.createCipheriv('aes256', token, '0A0B4BB86798C69C');
  let crypted = cifra.update(data, 'utf8', 'base64');
  crypted += cifra.final('base64');
  return crypted;
};

export const formataData = (createdOn, differenceUTC) => {
  moment.updateLocale('pt-br', ptLocale);
  let tempo = moment(createdOn, 'YYYY-MM-DDTHH:mm:ss').locale('pt-br').fromNow();

  if (differenceUTC) {
    const now = new Date();
    const nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    const localDifference = Math.floor((now.getTime() - nowUTC.getTime()) / 1000);
    const localServerDifference = differenceUTC - localDifference;

    if (localServerDifference > 0) {
      tempo = moment(createdOn, 'YYYY-MM-DDTHH:mm:ss').locale('pt-br').subtract(localServerDifference, 's').fromNow();
    }
  } else {
    tempo = moment(new Date(), 'YYYY-MM-DDTHH:mm:ss').locale('pt-br').fromNow();
  }

  return tempo;
};
