var walletConnected = false
var currentWallet = ''
var price = 0.12

const address = '0x6848F10C53Eff9bC1963Ae4DE10Fb355C0DE2688';

const abi = [
    {
    "inputs": [{"internalType": "string", "name": "_name", "type": "string"}, {
        "internalType": "string",
        "name": "_symbol",
        "type": "string"
    }, {"internalType": "string", "name": "_initBaseURI", "type": "string"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
    }, {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "Approval",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }, {"indexed": false, "internalType": "bool", "name": "approved", "type": "bool"}],
    "name": "ApprovalForAll",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "from", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "Transfer",
    "type": "event"
}, {
    "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "balances",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "baseExtension",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "baseURI",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "cost",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "firstFiveHundredcost",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getApproved",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }],
    "name": "isApprovedForAll",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "maxMintAmount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "maxSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_to", "type": "address"}, {
        "internalType": "uint256",
        "name": "_mintAmount",
        "type": "uint256"
    }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function"
}, {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "ogCost",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "ogListed",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "oglistUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "ogwlCost",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "ownerOf",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bool", "name": "_state", "type": "bool"}],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "paused",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "removeWhitelistUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "removeoglistUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}, {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
    }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "operator", "type": "address"}, {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
    }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "string", "name": "_newBaseExtension", "type": "string"}],
    "name": "setBaseExtension",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "string", "name": "_newBaseURI", "type": "string"}],
    "name": "setBaseURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_newCost", "type": "uint256"}],
    "name": "setCost",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_newmaxMintAmount", "type": "uint256"}],
    "name": "setmaxMintAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes4", "name": "interfaceId", "type": "bytes4"}],
    "name": "supportsInterface",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}],
    "name": "tokenByIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
    }],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "tokenURI",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_owner", "type": "address"}],
    "name": "walletOfOwner",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "whitelistUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "whitelisted",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {"inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function"}, {
    "inputs": [],
    "name": "wlCost",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}
]

window.addEventListener('DOMContentLoaded', async () => {
    const web3 = new Web3(window.ethereum)
    const networkType = await web3.eth.net.getNetworkType()

    console.log(networkType);

    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    if (networkId !== 137) {
        Swal.fire({
            title: 'Error!',
            text: 'Your wallet is not on the polygon, please switch to polygon and refresh the page',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    const moonSociety = new web3.eth.Contract(abi, address);
    let totalMinted = await moonSociety.methods.totalSupply().call()
    const costOfNft = await moonSociety.methods.cost().call()
    const firstFiveHundredcost = await moonSociety.methods.firstFiveHundredcost().call()
    const ogwlCost = await moonSociety.methods.ogwlCost().call()
    const ogCost = await moonSociety.methods.ogCost().call()
    const wlCost = await moonSociety.methods.wlCost().call()

    document.getElementById('totalMinted').innerText = `Total Minted ${totalMinted}/10000`

    const $connectWalletBtn = document.getElementById('connectWalletBtn')
    $connectWalletBtn.addEventListener('click', async () => {
        await window.ethereum.request({method: 'eth_requestAccounts'})

        const accounts = await web3.eth.getAccounts()
        console.log(accounts)
        currentWallet = accounts[0]

        const whiteListed = await moonSociety.methods.whitelisted(currentWallet).call()
        const ogListed = await moonSociety.methods.ogListed(currentWallet).call()

        if (totalMinted <= 500) {
            price = web3.utils.fromWei(firstFiveHundredcost, 'ether')
            console.log(web3.utils.fromWei(firstFiveHundredcost, 'ether'))

            walletConnected = true
            Swal.fire({
                title: 'Connected',
                text: 'Your wallet is now connected, you are among first 500!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            document.getElementById('connectWalletBtn').style.display = 'none';
            document.getElementById('mintButton').style.display = 'block';
        } else if (ogListed && whiteListed) {
            price = web3.utils.fromWei(ogwlCost, 'ether')
            console.log(web3.utils.fromWei(ogwlCost, 'ether'))



            walletConnected = true
            Swal.fire({
                title: 'You are now whitelisted',
                text: 'Whitelist & OGlist mint is active!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            document.getElementById('connectWalletBtn').style.display = 'none';
            document.getElementById('mintButton').style.display = 'block';
        } else if (whiteListed) {
            price = web3.utils.fromWei(wlCost, 'ether')
            console.log(web3.utils.fromWei(wlCost, 'ether'))

            walletConnected = true
            Swal.fire({
                title: 'You are now whitelisted',
                text: 'Whitelist mint is active and you on whitelist!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            document.getElementById('connectWalletBtn').style.display = 'none';
            document.getElementById('mintButton').style.display = 'block';
        } else if (ogListed) {
            price = web3.utils.fromWei(ogCost, 'ether')
            console.log(web3.utils.fromWei(ogCost, 'ether'))

            walletConnected = true
            Swal.fire({
                title: 'You are now oglisted',
                text: 'OGlist mint is active and you are on the OGlist!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            document.getElementById('connectWalletBtn').style.display = 'none';
            document.getElementById('mintButton').style.display = 'block';
        } else {
            price = web3.utils.fromWei(costOfNft, 'ether')
            console.log(web3.utils.fromWei(costOfNft, 'ether'))

            walletConnected = true
            Swal.fire({
                title: 'Connected',
                text: 'Your wallet is now connected, you are among first 500!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            document.getElementById('connectWalletBtn').style.display = 'none';
            document.getElementById('mintButton').style.display = 'block';
        }
        document.getElementById('priceOfNft').innerText = 'Your Price '+price+' Eth';
    })

    const $mintButton = document.getElementById('mintButton')
    $mintButton.addEventListener('click', async () => {
        if (!walletConnected) {
            Swal.fire({
                title: 'Error!',
                text: 'You must connect wallet first',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        document.querySelector('.spinner-loader').style.display = 'block'

        const amountToMint = document.getElementById('amountToMint').value;

        try {
            await moonSociety.methods.mint(currentWallet, amountToMint).send({
                from: currentWallet,
                value: web3.utils.toWei(
                    (amountToMint * price * 2212.97).toString(),
                    'ether'
                ),
                gasLimit: String(285000)
            })

            // refresh total minted
            totalMinted = await moonSociety.methods.totalSupply().call()
            document.getElementById('totalMinted').innerText = `Total Minted ${totalMinted}/10000`
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: 'Error!',
                text: 'Error occurred while minting!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        document.querySelector('.spinner-loader').style.display = 'none'
    })

    document.getElementById('incrementAmountBtn').addEventListener('click', () => setMintAmount(Number(document.getElementById('amountToMint').value) + 1))

    document.getElementById('decrementAmountBtn').addEventListener('click', () => setMintAmount(Number(document.getElementById('amountToMint').value) - 1))

    function setMintAmount(value) {
        if (value > 0 && value < 5) {
            document.getElementById('amountToMint').value = value
        }
    }
})