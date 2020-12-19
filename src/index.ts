import { ethers } from 'ethers';
import { JsonRpcProvider, Web3Provider, ExternalProvider, TransactionResponse } from '@ethersproject/providers';
import { Signer } from '@ethersproject/abstract-signer';
import artifact from './resources/CatMap.json';

export class ContractIFace {
    provider: JsonRpcProvider;
    contract: ethers.Contract;

    constructor(provider?: ExternalProvider) {
        if (provider === undefined) {
            this.provider = new JsonRpcProvider("http:\/\/127.0.0.1:8545");
        } else {
            this.provider = new Web3Provider(provider);
        }
        this.contract = new ethers.Contract(
            artifact.contractAddress,
            artifact.abi,
            this.provider
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
            const binCoords = await this.contract.catIdToCoordinate(id);
            if (binCoords === "0x") {
                return [null, null];
            } else {
                const coords = ethers.utils.defaultAbiCoder.decode(["int256", "int256"], binCoords);
                return [coords[0].toNumber(), coords[1].toNumber()];
            }
        } catch(err) {
            console.log(err);
        }
    }

    async setIdCoords(id: number, lat: number, lon: number, signer?: Signer): Promise<TransactionResponse> {
        if (lat < -900000000 || lat > 900000000) {
            throw new Error(`latitude of ${lat} is outside allowed range [-900000000, 900000000]`);
        }
        if (lon < -1800000000 || lon > 1800000000) {
            throw new Error(`longitude of ${lon} is outside allowed range [-1800000000, 1800000000]`);
        }
        try {
            if (signer === undefined) {
                signer = this.provider.getSigner();
            }
            const signedContract = this.contract.connect(signer);
            const binCoords = ethers.utils.defaultAbiCoder.encode(["int256", "int256"], [lat, lon]);
            return await signedContract.updateCoordinate(id, binCoords);
        } catch(err) {
            console.log(err);
        }
    }
}
