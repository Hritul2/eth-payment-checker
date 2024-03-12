import { useEffect, useState } from "react";

const Admin = ({ web3, courseContract }) => {
  const [payments, setPayments] = useState([]);

  const init = () => {
    if (!web3 || !courseContract) {
      return;
    }
    console.log(courseContract.methods.payments);

    courseContract.methods
      .getAllPayments()
      .call()
      .then((values) => {
        setPayments(values);
      });
  };

  useEffect(() => {
    if (web3 && courseContract) {
      init();
    }
  }, [web3, courseContract]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-400 mb-4">Admin</h1>
        <p className="text-yellow-400">
          Total {payments.length} have bought the course!
        </p>
        {payments.map((payment) => (
          <div key={payment.email} className="mt-4">
            <p className="text-gray-100">Email: {payment.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
