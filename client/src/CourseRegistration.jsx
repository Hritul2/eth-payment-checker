import { useState } from "react";

const CourseRegistration = ({ web3, courseContract, courseFee }) => {
  const [email, setEmail] = useState("");

  const payForCourse = async () => {
    if (!web3 || !courseContract) {
      return;
    }
    const accounts = await web3.eth.getAccounts();
    courseContract.methods
      .payForCourse(email)
      .send({ from: accounts[0], value: web3.utils.toWei(courseFee, "ether") })
      .on("transactionHash", (hash) => {
        console.log("Transaction hash:", hash);
      })
      .on("receipt", (receipt) => {
        console.log("Transaction successful:", receipt);
      })
      .on("error", (error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 max-w-md w-full">
        <p className="text-green-400 text-lg">
          Hello! Welcome to the Payment Page!
        </p>
        <h1 className="text-3xl font-bold text-green-400 mt-4 mb-2">
          Course Registration
        </h1>
        <p className="text-yellow-400">Course Fee: {courseFee} ETH</p>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-4 p-3 border border-green-600 rounded-lg focus:outline-none focus:border-green-400 bg-gray-800 text-gray-100 w-full"
        />
        <button
          onClick={payForCourse}
          className="mt-4 bg-green-500 text-gray-100 py-3 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:bg-green-600 w-full"
        >
          Pay for Course
        </button>
      </div>
    </div>
  );
};

export default CourseRegistration;
