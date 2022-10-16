import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import express, { response } from "express";

const app = express();

app.use(express.json());

app.get('/claim', async (req, res) => {
    const address = req.query.address;
    const sdk = ThirdwebSDK.fromPrivateKey("devnet", "5gbQAvWmVh3FKiqR1gG9H2mdRWNCopw2DsdP2cNJdGVaKJHtpSTWUgwm2k2e1N5mt87vcmZ3o24LvvsBUbqXnF1Z");
    const program = await sdk.getProgram("5TRkLSTvgk4qAvBCKJQJvaFFFLBcqrrGV28VKjcXjRuM", "nft-drop");

    const claimedAddresses = await program.claimTo(address, 1);
    var addObj = { "claimedAddresses": claimedAddresses[0] };
    res.send(addObj);
});

app.get('/nft/all', async (req, res) => {
    const sdk = ThirdwebSDK.fromPrivateKey("devnet", "5gbQAvWmVh3FKiqR1gG9H2mdRWNCopw2DsdP2cNJdGVaKJHtpSTWUgwm2k2e1N5mt87vcmZ3o24LvvsBUbqXnF1Z");
    const program = await sdk.getProgram("5TRkLSTvgk4qAvBCKJQJvaFFFLBcqrrGV28VKjcXjRuM", "nft-drop");
    const nfts = await program.getAll();
    res.send(nfts);
});
app.get('/nft', async (req, res) => {
    const address = req.query.address;
    const sdk = ThirdwebSDK.fromPrivateKey("devnet", "5gbQAvWmVh3FKiqR1gG9H2mdRWNCopw2DsdP2cNJdGVaKJHtpSTWUgwm2k2e1N5mt87vcmZ3o24LvvsBUbqXnF1Z");
    const program = await sdk.getProgram("5TRkLSTvgk4qAvBCKJQJvaFFFLBcqrrGV28VKjcXjRuM", "nft-drop");
    const nfts = await program.get(address);
    res.send(nfts);
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
});