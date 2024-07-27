const { Keyring } = require("@polkadot/keyring");
const { hexToU8a } = require("@polkadot/util");

const { ApiPromise } = require("@polkadot/api");
const { getApiOptions, getPublicProvider } = require("@therootnetwork/api");



const NFT_OWNER_KEY = ""; // Hex Private Key here
const NFT_COLLECTION = 54372; // Example Collection ID (Root Punks)

// Array of Destinations - Address, Token ID
const NFT_TOKENS = [{"0x27d5c477B2BE97973793a4b02cA159AE3d61a19c":155},
  {"0xD92802667FBc820885f1aE329495251d31e9aef3":201}]

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function main() {

    //Root /Polkadot API
  const api = await ApiPromise.create({
    ...getApiOptions(),
    ...getPublicProvider("root"),
  });

  const keyring = new Keyring({ type: "ethereum" });

  const KEYRING_NFT_OWNER = keyring.addFromSeed(hexToU8a(NFT_OWNER_KEY));

  const unsubscribe = await api.query.timestamp.now((moment) => {
    console.log(`The last block has a timestamp of ${moment}`);
  
    // unsubscribe(); call to stop receiving updates
  });

  
  let batchCalls = [];

  NFT_TOKENS.forEach(async (element) => {
    
  
      var keys = Object.keys(element)
      var values = Object.values(element)
      
      console.log(`Sending ${values[0]} to ${keys[0]}`)  
  
      const data = [
        [values[0]]
      ];

      const createToken = api.tx.nft.transfer(NFT_COLLECTION,data,keys[0])

      batchCalls.push(createToken);

      return;
      // For Debugging
      console.log(createToken.toHuman());
    
      

      
  }); 

  console.log(batchCalls);

  let batchResult = await api.tx.utility.batch(batchCalls).signAndSend(KEYRING_NFT_OWNER, ({ status }) => {
    if (status.isInBlock) {
      console.log(`included in ${status.asInBlock}`);
    }
  });

  await delay(40000);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
