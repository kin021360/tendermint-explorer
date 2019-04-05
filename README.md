# Tendermint Explorer

Blockchain and transaction explorer for Tendermint. Supports JSON transactions and UTF-8.
Based on Cosmos Explorer.

## What is different from Cosmos Explorer?

Tendermint Explorer relies only on REST RPC (no LCD).

Also it has few extra features comparing to Cosmos Explorer.

### List of blocks

![List of blocks in Tendermint Explorer](https://res.cloudinary.com/thedapper/image/upload/v1542225119/Screen_Shot_2018-11-14_at_9.51.18_PM.png)

### Transaction details

If a block has transactions that are JSON objects, Tendermint Explorer will render all tx's fields automatically. 
Explorer handles UTF-8 encoded values in a [proper way](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding).

![Block Details in Tendermint Explorer](https://res.cloudinary.com/thedapper/image/upload/v1542224916/Screen_Shot_2018-11-14_at_9.47.47_PM.png)

## Requirements

Tendermint Explorer is stateless and relies on a high-throughput Tendermint full node to connect to. 
Explorer requires Tendermint RPC endpoints to be available publicly through TLS-secured subdomains. 
The convention is `https://rpc.fullnode.com`.

To change the backend, edit the file `./src/store/modules/blockchain.js`. 
On the lines 5, change the `localhost:26657` part of the URL to your full node's domain name. 

```
rpc: "http://localhost:26657"
```

And change the line `27` too:

```
const client = RpcClient("ws://localhost:26657")
```

**WARNING:** Every user that visits the Explorer opens two websockets to the default full node. 
The user will continue to spam your full node with AJAX requests until they close the page. 
We need a better backend solution for the Explorer! Please help if you can.

## Build

```sh
# Install dependencies
npm install

# Serve with hot reload at localhost:8080
npm run serve
```

## Deploy

```sh
# Build for production with minification
npm run build

# Then serve the `./dist` folder with the web server of your choice
```
