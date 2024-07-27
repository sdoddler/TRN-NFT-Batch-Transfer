# TRN-NFT-Batch-Transfer
Utility NodeJS script to batch send NFTs on The Root Network

## Usage
This script presumes you have already created a collection on Porcini/Root and know the collection ID
- Replace 54372 in `const NFT_COLLECTION = 54372;` with your collection ID
- Input your hex based private key for the account you are minting from: `const NFT_OWNER_KEY = "";`
- Format your array and replace content of `const NFT_TOKENS` variable
   - This array is formatted as "destination address": token number to send (as int)
- Switch `...getPublicProvider("root"),` to "porcini" if using the testnet

This scripts sends the transfers as a batch, and writes when it has been included in the block, waiting 40 seconds before exiting.

Batch send may become unstable at higher amounts of NFTs - I recommend testing anything above 100 on porcini before attempting on mainnet.
