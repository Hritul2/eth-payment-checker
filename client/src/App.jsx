import { useState, useEffect } from "react";
import Web3 from "web3";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import contractABI from "./abi";
import Admin from "./Admin";
import CourseRegistration from "./CourseRegistration";

function App() {
  const [web3, setWeb3] = useState(null);
  const [courseContract, setCourseContract] = useState(null);
  const [courseFee, setCourseFee] = useState("");
  const contractAddress = "0x203eF68Ebf00428ce05D35f7556b880a7a9C20F1";

  useEffect(() => {
    // Check if the Ethereum provider (e.g., MetaMask) is available in the browser
    if (window.ethereum) {
      // Request user permission to access their Ethereum accounts
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => {
          // If permission is granted, create a new Web3 instance using the provider
          const web3Instance = new Web3(window.ethereum);
          // Update the web3 state with the newly created instance
          setWeb3(web3Instance);

          // Create a contract instance using the Web3 instance, ABI, and contract address
          const courseContract = new web3Instance.eth.Contract(
            contractABI,
            contractAddress
          );
          // Update the courseContract state with the newly created contract instance
          setCourseContract(courseContract);

          // Call the courseFee() function of the contract and retrieve the fee
          courseContract.methods
            .courseFee()
            .call()
            .then((fee) => {
              // Convert the fee from Wei to Ether using Web3 utility functions
              setCourseFee(web3Instance.utils.fromWei(fee, "ether"));
            });
        })
        .catch((err) => {
          // Handle errors, such as if the user denies permission
          console.error(err);
        });
    } else {
      // If the Ethereum provider is not available, prompt the user to install a wallet
      alert("Please Install an Ethereum Wallet");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <CourseRegistration
              web3={web3}
              courseContract={courseContract}
              courseFee={courseFee}
            />
          }
        />
        <Route
          path="admin"
          element={
            <Admin
              web3={web3}
              courseContract={courseContract}
              courseFee={courseFee}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
