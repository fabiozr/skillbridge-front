const express = require('express');
const fs = require('fs');
const { Web3 } = require('web3');

const app = express();
const web3 = new Web3('https://polygon-amoy.g.alchemy.com/v2/4nw11vzb-OlaievFJGCpfhk6Jv2k7V7y');

app.use(express.json());
app.use(express.static('frontend'));


// ============== CONTRACT ABIs and ADDRESSES ================
const escrowABI = JSON.parse(fs.readFileSync('./src/escrowABI.json').toString());
const escrowBytecode = fs.readFileSync('./src/escrowBytecode').toString();

const reviewsABI = JSON.parse(fs.readFileSync('./src/reviewABI.json').toString());
const reviewsAddress = '0xB8D43D2fc3A2550ef228fdb570E8E909786f442b';


// ============== HELPER FUNCTIONS ================

async function getUserAccount(req) {
    const account = req.body.account;  
    if (!account) {
        throw new Error("User account not provided.");
    }
    return account;
}

// ============== API ENDPOINTS ================


app.post('/createEscrow', async (req, res) => {
    try {
        const { client, professional, amount, arbitrator } = req.body;
        const account = await getUserAccount(req);


        const escrowContract = new web3.eth.Contract(escrowABI, null); 

        const deployedContract = await escrowContract.deploy({
            data: escrowBytecode, 
            arguments: [client, professional, amount, arbitrator],
        }).send({ from: account, gas: 6000000 });

        res.json({ contractAddress: deployedContract.options.address });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating escrow ' + error);
    }
});


app.post('/deposit', async (req, res) => {
    try {
        const { contractAddress, amount } = req.body;
        const account = await getUserAccount(req);

        const escrowContract = new web3.eth.Contract(escrowABI, contractAddress);
        await escrowContract.methods.deposit().send({ from: account, value: amount }); 

        res.send('Deposit successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error depositing funds '+error);
    }
});


app.post('/releasePayment', async (req, res) => {
    try {
        const { contractAddress } = req.body;
        const account = await getUserAccount(req);  

        const escrowContract = new web3.eth.Contract(escrowABI, contractAddress);
        await escrowContract.methods.releasePayment().send({ from: account });

        res.send('Payment released');

    } catch (error) {
        console.error(error); 
        res.status(500).send('Error releasing payment ' + error);
    }
});

app.post('/markMilestoneCompleted', async (req, res) => {
    try {
        const { contractAddress } = req.body;
        const account = await getUserAccount(req);

        const escrowContract = new web3.eth.Contract(escrowABI, contractAddress);
        await escrowContract.methods.markMilestoneCompleted().send({ from: account });

        res.send('Milestone marked as completed');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error marking milestone as completed ' + error);
    }
});

app.post('/raiseDispute', async (req, res) => {
    try {
        const { contractAddress } = req.body;
        const account = await getUserAccount(req);

        const escrowContract = new web3.eth.Contract(escrowABI, contractAddress);
        await escrowContract.methods.raiseDispute().send({ from: account });

        res.send('Dispute raised');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error raising dispute ' + error);
    }
});

app.post('/resolveDispute', async (req, res) => {
    try {
        const { contractAddress, payProfessional } = req.body;
        const account = await getUserAccount(req);

        const escrowContract = new web3.eth.Contract(escrowABI, contractAddress);
        await escrowContract.methods.resolveDispute(payProfessional).send({ from: account });

        res.send('Dispute resolved');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error resolving dispute ' + error);
    }
});

app.post('/addReview', async (req, res) => {
    try {
        const { professional, reviewHash } = req.body;
        const account = await getUserAccount(req);

        const reviewsContract = new web3.eth.Contract(reviewsABI, reviewsAddress);
        await reviewsContract.methods.addReview(professional, reviewHash).send({ from: account, gas:500000}); // No value needed

        res.send('Review added');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding review ' + error);
    }
});


app.post('/getReviews', async (req, res) => {
    try {
        const { professional } = req.body;
        const reviewsContract = new web3.eth.Contract(reviewsABI, reviewsAddress);
        const reviews = await reviewsContract.methods.getReviews(professional).call();

        res.json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting reviews ' + error);
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));