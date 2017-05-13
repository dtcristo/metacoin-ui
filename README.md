# MetaCoin UI

An [Ethereum](https://ethereum.org/) Ðapp built around the MetaCoin example contract provided with [Truffle](http://truffleframework.com/)'s `truffle init`. The UI allows the user to send a balance of MetaCoins to the desired address. This project is just a demonstration of a working Ðapp and should not be used for any production cryptocurrency needs.

![Screenshot](https://raw.github.com/dtcristo/metacoin-ui/master/images/screenshot.png)

## Installation

Install [testrpc](https://github.com/ethereumjs/testrpc), a tool used to run a development only Ethereum blockchain.

    $ npm install -g ethereumjs-testrpc

Start your development blockchain. You are provided with 10 Ethereum accounts for testing. These are displayed in the output.

```
$ testrpc
EthereumJS TestRPC v3.0.5

Available Accounts
==================
(0) 0x6874a83758e18501aff028244043915d57afc19b
(1) 0xe2740cc95a98cbca1483085c0823adf76b238269
(2) 0x1f0d3aa2ad526a20bfb9717d5d38fd321290f7c0
(3) 0xb187f8035c3d1cf91f097a0d64068c1e3b3e97f8
(4) 0x473b2209ca01bce8616d703598d553b2d4d3b74e
(5) 0x843f05d3363118bed9267472f66454c04eed076b
(6) 0x35beaf2ffd2d878fc4a2e47f3a624f534e9e6c7d
(7) 0x57fb4c30d712b927e279439a670c5985d9a564c2
(8) 0x96e2551ffae8b6579bd4d8794ab1ef8217f6543c
(9) 0xfc52809118636a4a5cde2630ed7b6127720a31ce

Private Keys
==================
(0) cbc5d3fc67e9e48451c79ff049138eab787796b0d380a65e5a94ba4ec1603f64
(1) d92b861725ff97c0d5540b41111f4118e48d047216abacf7b284e0356f6843b8
(2) cf42fbfa67b4a5311098d3d8bc77fb2d63aae565727fafec4f384be45d394833
(3) 0619bf1505f407334601c1e608701dfcb357f1bd2c55a1abda77a1ddc5f60032
(4) 332a9af17938e474fc01994e657197efe0e0a6c869544777ac8428d2b48655b9
(5) d61eb9c2a2550c0a70a38790665b1d9352fe9ff8386d5ed13bf265c1392a4a9c
(6) deba48ccfccd44fb5eb7ae5bdd3aa3dac40dcdd9b60100fe63e163ff36c05382
(7) 28c11b61ae0114c58922e4462c37ab13a17fe4b345107df6bbadc0c8b842c058
(8) 23fff92008e58a40cdd9a7cdf1f8d021b6b44c146f43387d13980b24f980628d
(9) 240d91a5567cf65033a7b1d728f974db6bc69ec4732644af770ac80cbc4b4234

HD Wallet
==================
Mnemonic:      actress unusual orange smart degree fun banner major find pull chalk ranch
Base HD Path:  m/44'/60'/0'/0/{account_index}

Listening on localhost:8545
```

Contracts are compiled and deployed using [Truffle](http://truffleframework.com/). Install it with the following.

    $ npm install -g truffle

Compile and deploy the contracts with `truffle migrate` and observe the output.

```
$ truffle migrate
Compiling ./contracts/ConvertLib.sol...
Compiling ./contracts/MetaCoin.sol...
Compiling ./contracts/Migrations.sol...
Writing artifacts to ./build/contracts

Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  Migrations: 0xcb73fc5e3507e0a59ad429b2bde06b13bb92ed3b
Saving successful migration to network...
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying ConvertLib...
  ConvertLib: 0xa3dfd5902a1285098f3dfdb47544d82d7f2343c6
  Linking ConvertLib to MetaCoin
  Deploying MetaCoin...
  MetaCoin: 0xaead76b9fbb9d33b49c189dd687143c7ff0baadb
Saving successful migration to network...
Saving artifacts...
```

Take note of the address MetaCoin is deployed to. In our case it is `0xaead76b9fbb9d33b49c189dd687143c7ff0baadb`.

Within `app/javascripts/app.js` update the following line with your MetaCoin address.
```js
var metaAddress = "0xaead76b9fbb9d33b49c189dd687143c7ff0baadb";
```

Install any dependencies and serve the application with the following.

    $ npm install
    $ truffle serve

The MetaCoin UI should be available at [localhost:8080](http://localhost:8080/).

## Credits

* All credit for the MetaCoin contract goes to the Truffle team.
* The MetaCoin UI itself was developed by [BrendanTimmons](https://github.com/BrendanTimmons) and [dtcristo](https://github.com/dtcristo).
