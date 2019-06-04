import { Ethereum } from '@haechi-labs/henesis-sdk';
var erc20 = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  }

];


exports.withdraw = async (web3, event: Ethereum.Event, blockMeta: Ethereum.BlockMeta, userMeta: Ethereum.UserMeta): Promise<any> => {
  var args = event.payload.data;
  console.log('EVENT', event);

  var token = args['token'].value;
  var amount = args['amount'].value;
  var erc20Token = new web3.eth.Contract(erc20,token);

  //erc 20 metadata 
  var sym;
  var name;
  var decimals;

  //if token is zero_address, it's ether
  if(token=="0x0000000000000000000000000000000000000000"){
    sym = "ETH";
    name = "Ether";
    decimals = "18";
  }
  else {
    sym = await erc20Token.methods.symbol().call();
    name = await erc20Token.methods.name().call();
    decimals = await erc20Token.methods.decimals().call();
  }
  
  console.log('erc20 symbol: ', sym);
  console.log('erc20 name: ', name);
  console.log('erc20 decimal: ', decimals);

  //human readable amount
  var bigIntAmount = new web3.utils.BN(amount);
  var floatAmount = bigIntAmount.div(new web3.utils.BN(10).pow( new web3.utils.BN(decimals)));

  const base = new web3.utils.BN(10).pow(new web3.utils.BN(decimals));
  const dm = new web3.utils.BN(amount).divmod(base);
  const readable = dm.div + "." + dm.mod.toString(10, decimals);

  console.log('amount :', readable);

  const result:any = {
    "type": "Withdraw",
    "symbol":sym,
    "name":name,
    "amount":readable
  }

  return result;
};
