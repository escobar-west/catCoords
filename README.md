# catCoords
```
├── 0x_ganache_snapshot_catmap-0.0.1.zip
├── jest.config.js
├── package.json
├── src
│   ├── __tests__
│   │   └── index.test.ts
│   ├── index.ts
│   └── resources
│       └── CatMap.json
├── tsconfig.json
└── yarn.lock
```
## Installation and testing 
First, clone the repo to your machine and cd to the root directory. Make sure you have yarn installed. Then in the home directory, run
```bash
yarn install
```
This will install all of the node module prerequisites. To run the unit test suite, run
```bash
yarn test
```
This will unzip a fresh ganache snapshot from the zipped snapshot every time and run the unit tests against the ganache block chain.
## Build and deploy
To build and deploy the library as an npm package, run the following two commands:
```bash
yarn compile
yarn deploy
```
This will compile the TypeScript source code, then package the library as a tgz file. The tgz file can then be added to any existing Node project via the command
```bash
yarn install /path/to/catCoords-v1.0.0.tgz
```
## API documentation
Below is a rough example of how the API can be used:
```typescript
import { ContractIFace } from 'catCoords';
catMap = new ContractIFace();
// set coordinates of cat 1234 to (-100, 100)
catMap.setIdCoords(1234, -100, 100).then((txn) => {console.log(txn);})
// display owner of cat
catMap.getIdOwner(1234).then((address) => {console.log(address);})
//display coordinates of cat
catMap.getIdCoords(1234).then((coords) => {console.log(coords);})
```
A full documentation of each class method and signature is as described:
```typescript
new catMap.ContractIFace(provider?: ExternalProvider): ContractIFace
```
Creates a new object for interfacing with the smart contract.
If provider is not specified, the default behavior is to connect to a
JSON-RPC API located at http://localhost:8545 (you can run ganache or Geth on this port, for example).
If the provider is included, the provider object must expose an interface compatable wth the Ethereum Provider JavaScript API defined in EIP-1193.
Please refer to https://docs.ethers.io/v5/api/providers/other/ and https://eips.ethereum.org/EIPS/eip-1193 for more information on compatible providers.
The default case of connecting to port 8545 should suffice for many back-end projects, but providing the option of supplying your own provider
enables the possibility of using this library with arbitary wallets like MetaMask.
```typescript
ContractIFace.getIdOwner(id: number): Promise<string>
```
Returns the address of the owner who owns cat with the given ID. If the cat does not have an owner, this function will return the null address.
This function does not catch or handle any errors encountered from querying the blockchain; it's up to the user of this library to appropriately catch
and handle any errors.
```typescript
ContractIFace.getIdCoords(id: number): Promise<[number, number]>
```
Returns the coordinates of the cat with given ID. If the cat does not have coordinates, this function will return [null, null].
This function does not catch or handle any errors encountered from querying the blockchain; it's up to the user of this library to appropriately catch
and handle any errors.
```typescript
ContractIFace.setIdCoords(id: number, lat: number, lon: number, signer?: Signer): Promise<TransactionResponse> 
```
Assigns a cat with a given ID new coordinates and owner. If a signer is not provided, then the module will try to sign it using the default or given
provider that was set up in the constructor.
This function does not catch or handle any errors encountered from querying the blockchain; it's up to the user of this library to appropriately catch
and handle any errors.
## Final thoughts
The behavior I spent the most time thinking about was how to handle the errors from failed blockchain queries and transactions. I ultimately decided to
not catch the errors at all and to let the library user handle the errors how they see fit. I did this because I believe this would
give the intended library users more flexibility on how to use the code and handle errors for their own application. At the very least, letting the
developers catch the errors on their own gives them the freedom to ignore and log errors in ways convenient to them.
