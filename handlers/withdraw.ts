import { Ethereum } from '@haechi-labs/henesis-sdk';

exports.withdraw = (web3: any, data: Ethereum.Data): any => {
  const {data} = msg.event;
  console.log('EVENT', msg.event);
  console.log('ID', msg.event.id);
  console.log('data', data);
  var token = data["token"];
  return token;
};
