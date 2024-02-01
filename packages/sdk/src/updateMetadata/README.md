


# index.js

```javascript
const nearAPI = require("near-api-js");

const { execute, updateMetadata } = require("@joychi-js/sdk");


// creates keyStore from a provided file
// you will need to pass the location of the .json key pair

const { KeyPair, keyStores } = require("near-api-js");
const fs = require("fs");
const homedir = require("os").homedir();

const ACCOUNT_ID = "huynhtrongthoai.testnet"; // NEAR account tied to the keyPair
const NETWORK_ID = "testnet";
// path to your custom keyPair location (ex. function access key for example account)
const KEY_PATH = "/.near-credentials/testnet/huynhtrongthoai.testnet.json";

const credentials = JSON.parse(fs.readFileSync(homedir + KEY_PATH));
const myKeyStore = new keyStores.InMemoryKeyStore();
myKeyStore.setKey(
  NETWORK_ID,
  ACCOUNT_ID,
  KeyPair.fromString(credentials.private_key)
);

const { connect } = nearAPI;

const connectionConfig = {
  networkId: "testnet",
  keyStore: myKeyStore, // first create a key store
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://testnet.mynearwallet.com/",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://testnet.nearblocks.io",
};

const JOYCHI_CONTRACT = "game1.joychi.testnet"
const main = async () => {
  const wallet = await (await connect(connectionConfig)).account(ACCOUNT_ID);

  await execute({ account: wallet }, updateMetadataArgs());

}

const updateMetadataArgs = () => {
  const Status = {
    HAPPY: 'HAPPY',
    HUNGRY: 'HUNGRY',
    STARVING: 'STARVING',
    DYING: 'DYING',
  };

  return updateMetadata({
    tokenId: 1,
    petAttributes: {
      pet_name: "Test",
      image: "abc.com",
      score: 100,
      level: 1,
      status: Status.HAPPY,
      star: 3,
    },
    contractAddress: JOYCHI_CONTRACT,
  })
}

main().catch(console.error);

```

# package.json
```json
{
  "name": "test-sdk-update-metadata",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@joychi-js/sdk": "^0.5.1-beta-prerelease.6",
    "near-api-js": "^3.0.2"
  }
}
```
# Install example

```bash
npm install
```
# Run example

```bash
node index.js
```



