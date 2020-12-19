import { ContractIFace } from '../index';

const ganache = require("ganache-core");

const ganacheCfg = {
    "mnemonic": "concert load couple harbor equip island argue ramp clarify fence smart topic",
    "db_path": `${__dirname}/../../0x_ganache_snapshot_catmap`,
    "locked": false
}
const provider = ganache.provider(ganacheCfg);
const catApp = new ContractIFace(provider);

test('query ID coordinates before setting data', async () => {
    const coords = await catApp.getIdCoords(1234);
    expect(coords).toEqual([null, null]);

    const owner = await catApp.getIdOwner(1234);
    expect(owner).toEqual('0x0000000000000000000000000000000000000000');
});

test('setIdCoords with good data', async () => {
    const txn = await catApp.setIdCoords(1234, -100, 100);
    expect(txn).toEqual(expect.anything());
});

test('setIdCoords with bad data 1', async () => {
    await expect(async () => {await catApp.setIdCoords(1234, 900000001, 0)})
          .rejects
          .toThrow();
});

test('setIdCoords with bad data 2', async () => {
    await expect(async () => {await catApp.setIdCoords(1234, 0, 1800000001)})
          .rejects
          .toThrow();
});

test('query ID data after setting coordinates', async () => {
    const coords = await catApp.getIdCoords(1234);
    expect(coords).toEqual([-100, 100]);

    const owner = await catApp.getIdOwner(1234);
    const account = await catApp.provider.getSigner().getAddress();
    expect(owner).toEqual(account);
});
