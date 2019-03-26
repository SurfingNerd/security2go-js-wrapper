const Tx = require('ethereumjs-tx');
const Util = require('ethereumjs-util');
const Web3 = require('web3');
const s2go = require('./index');

function toHex(nonHex, prefix = true) {
  let temp = nonHex.toString('hex');
  if (prefix) {
    temp = `0x${temp}`;
  }
  return temp;
}

async function sign(web3, rawTx) {
  const wrapper = new s2go.security2goWrapper();
  const publickey = await wrapper.getPublicKey(1);
  console.log('publickey');
  console.log(publickey);

  // todo: get address from publickey
  let address = '0x' + web3.utils.sha3('0x' + publickey).slice(26);
  console.log('address');
  console.log(address);

  rawTx.nonce = await web3.eth.getTransactionCount(address);
  // todo: is the nonce in 0x hex format?
  console.log(rawTx.nonce);

  const tx = new Tx(rawTx);
  //tx.sign(privateKey);

  const hash = toHex(tx.hash(false), false);
  console.log('hash');
  console.log(hash);

  const cardSig = await wrapper.generateSignature(1, hash.toString('hex'));
  console.log('cardSig');
  console.log(cardSig);

  let rStart = 6;
  let length = 2;
  const rLength = parseInt(cardSig.slice(rStart, rStart + length), 16);
  console.log('rLength');
  console.log(rLength);
  rStart += 2;
  const r = cardSig.slice(rStart, rStart + rLength * 2);
  console.log('r');
  console.log(r);

  let sStart = rStart + rLength * 2 + 2;
  const sLength = parseInt(cardSig.slice(sStart, sStart + length), 16);
  console.log('sLength');
  console.log(sLength);
  sStart += 2;
  const s = cardSig.slice(sStart, sStart + sLength * 2);
  console.log('s');
  console.log(s);

  rawTx.r = '0x' + r;
  rawTx.s = '0x' + s;

  const tx2 = new Tx(rawTx);
  //console.log(tx2);

  const serializedTx = tx2.serialize();
  console.log('serializedTx');
  console.log(toHex(serializedTx));


  web3.eth.sendSignedTransaction(toHex(serializedTx))
    .on('receipt', console.log);

}

const web3 = new Web3('ws://ws.tau1.artis.network');

const rawTx = {
  nonce: '0x00',
  gasPrice: 1000000000,
  gasLimit: '0x5498',
  to: '0x30B125d5Fc58c1b8E3cCB2F1C71a1Cc847f024eE',
  value: 0,
  data: '0x0'
};

sign(web3, rawTx);
