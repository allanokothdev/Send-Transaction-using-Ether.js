import { ethers } from 'ethers';

let provider;

window.onload = function () {
    this.console.log("Dapp is Loaded");

    if (window.ethereum) {
        //we can access web3!
        this.ethereum.on('accountsChanged', handleAccountsChanged);

        window.ethereum.request({ method: 'eth_accounts' })
            .then(" Yo ")
            .catch((err) => {
                console.log(err);
            });

            provider = new ethers.providers.Web3Provider(window.ethereum);
            this.console.log(provider);
            sendTransaction();
    } else {
        this.console.log("Please install a digital wallet like Metamark");
    }
}


const sendTransaction = async () => {
   
    const gasPrice = provider.getGasPrice();

    const wallet = ethers.Wallet.fromMnemonic('tank emerge clump glass catch frozen unveil age usage vanish leave brave');

    const signer = wallet.connect(provider);

    const recipient = "0xaac27FD70E2466eF027087D13342a972AADB94bf";

    const tx = {
        from: wallet.address;
        to: recipient,
        value: ethers.utils.parseUnits("0.001","ether"),
        gasPrice: gasPrice,
        gasLimit: ethers.utils.hexlify("10000"),
        nonce: provider.getTransactionCount(wallet.address, 'latest')
    };

    const transaction = await signer.sendTransaction(tx);

    console.log(transaction);
}