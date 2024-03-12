import Web3 from "web3";
import axios from "axios";
import { contractABI } from "./abi";

const providerUrl = ""; // the url for rpc provider that can help you to listen to the event
const contractAddress = "0x203eF68Ebf00428ce05D35f7556b880a7a9C20F1";

const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
const contract = new web3.eth.Contract(contractABI, contractAddress);

contract.events
  .PaymentReceived({
    fromBlock: 0,
  })
  .on("data", async (event) => {
    console.log(`Adding user ${event.returnValues.email} to the course`);
    // axios.post(webhookUrl, {
    //     email: event.returnValues.email,
    // });
  });
