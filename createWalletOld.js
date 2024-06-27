const Web3 = require('web3');
const fs = require('fs');

// Initialize Web3
const web3 = new Web3();

// Function to generate wallet and check the address
const generateWallet = () => {
    let attempts = 0;
    let validWallets = [];

    while (true) {  // This will run indefinitely, stop manually or add a condition to break
        attempts++;
        const wallet = web3.eth.accounts.create();
        const address = wallet.address;

        // Check if there are 5 to 10 characters at the end of the address that are the same
        for (let i = 8; i <= 10; i++) {
            const suffix = address.substring(address.length - i);
            if (new Set(suffix).size === 1) {
                validWallets.push({ address: address, privateKey: wallet.privateKey });
                console.log(`Valid wallet found after ${attempts} attempts!`);
                console.log(`Address: ${address} with ${i} identical trailing characters.`);
                console.log(`Private Key: ${wallet.privateKey}`);
                break;  // Stop checking further once a condition is met
            }
        }

        if (attempts % 1000 === 0) {
            console.log(`Checked ${attempts} addresses...`);
            // Optional: Save found wallets to a file periodically
            fs.writeFileSync('wallets.json', JSON.stringify(validWallets, null, 2));
        }
    }
};

// Start the wallet generation process
generateWallet();
