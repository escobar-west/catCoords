import { ethers } from 'ethers'
import { JsonRpcProvider, Web3Provider, ExternalProvider } from '@ethersproject/providers'
import artifact from './resources/CatMap.json'

export class ContractIFace {
    provider: JsonRpcProvider;
    contract: ethers.Contract;

    constructor(provider?: ExternalProvider) {
        if (provider == undefined) {
            this.provider = new JsonRpcProvider("http:\/\/127.0.0.1:8545");
        } else {
            this.provider = new Web3Provider(provider);
        }
        this.contract = new ethers.Contract(
            artifact.contractAddress,
            artifact.abi,
            this.provider.getSigner()
        );
    }

    async getIdOwner(id: number): Promise<string> {
        try {
            return await this.contract.catIdToOwner(id);
        } catch(err) {
            console.log(err);
        }
    }

    async getIdCoords(id: number): Promise<[number, number]> {
        try {
            return [2,2];
        } catch(err) {
            console.log(err);
        }
    }

    async getAddress() {
        const signer = this.provider.getSigner();
        try {
            const address = await signer.getAddress();
            return address;
        } catch(err) {
            console.log(err);
        }
    }

    async timer() {
        await new Promise(r => setTimeout(r, 500));
    }
}

const p = new ContractIFace();
//console.dir(p);
//p.getAddress().then(res => {console.log(res)});
p.getIdOwner(1234).then(res => {console.log(res)});
p.getIdCoords(1234).then(res => {console.log(res)});

