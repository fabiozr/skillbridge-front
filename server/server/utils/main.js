const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
    connectMetaMask();
});

async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            showAccount.innerHTML = account;

            console.log("Connected account:", account); // For testing

        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            if (error.code === 4001) {
                // User rejected the request
                alert('Please connect to MetaMask.');
            } else {
                alert('An error occurred. Please check the console for details.');
            }
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this application.');
    }
}