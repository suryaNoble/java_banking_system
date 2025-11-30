// import React, { useEffect, useState } from "react";
// import { dummyTransactions } from "../../data/transactions";


// const TransactionsPage = () => {

//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     setTransactions(dummyTransactions);
//   }, []);

//   return (
//     <div className="w-full max-w-5xl mx-auto mt-6">

//       <p className="mb-3 text-lg font-semibold">All Transactions</p>

//       <div className="bg-white border rounded text-sm">

//         <div className="hidden sm:grid grid-cols-[1fr_2fr_2fr_1fr_1fr] py-3 px-6 border-b text-gray-700">
//           <p>ID</p>
//           <p>Date & Time</p>
//           <p>Type</p>
//           <p>Amount</p>
//           <p>Status</p>
//         </div>

//         {transactions.map((t) => (
//           <div
//             key={t.id}
//             className="sm:grid grid-cols-[1fr_2fr_2fr_1fr_1fr] py-3 px-6 border-b text-gray-600 flex flex-col gap-1"
//           >
//             <p>{t.id}</p>
//             <p>{t.date} , {t.time}</p>
//             <p>{t.type}</p>
//             <p>₹{t.amount}</p>
//             <p>{t.status}</p>
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// };

// export default TransactionsPage;





import React, { useEffect, useState } from "react";
import { getTransactions } from "../../api/transactionApi"; 
import Navbar from "../LandingPage/Navbar";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


// const accountNo = 323456789
    const accountNo = sessionStorage.getItem("accountNo");


const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const data = await getTransactions(accountNo);
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    if (accountNo) fetchAllTransactions();
  }, [accountNo]);

  const navigate = useNavigate();

 
 return (
  <div>
    <Navbar />
    <div className="w-full max-w-5xl mx-auto mt-6">

      <p className="mb-3 text-lg font-semibold">All Transactions</p>

      {/* If no transactions */}
      {transactions.length === 0 ? (
        <div className="bg-white border text-black rounded py-10 text-center text-gray-600">
          <p>No transactions made yet.</p>
        </div>
      ) : (
        <div className="bg-white border rounded text-sm">

          <div className="hidden sm:grid grid-cols-[1fr_2fr_2fr_1fr_1fr] py-3 px-6 border-b text-gray-700">
            <p>ID</p>
            <p>Date & Time</p>
            <p>Type</p>
            <p>Amount</p>
            <p>Status</p>
          </div>

          {transactions.map((t) => (
            <div
              key={t.id}
              className="sm:grid grid-cols-[1fr_2fr_2fr_1fr_1fr] py-3 px-6 border-b text-gray-600 flex flex-col gap-1"
            >
              <p>{t.transactionId}</p>
              <p>{t.createdAt}</p>
              <p>{t.transactionType}</p>
              <p>₹{t.amount}</p>
              <p>Success</p>
            </div>
          ))}

        </div>
      )}
    </div>
    <div className="w-full max-w-5xl mx-auto mt-4">
  <button
    onClick={() => navigate("/")}
    className="bg-indigo-600 profile-hover-btn text-white relative px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-md"
  >
    Go To Home
    <IoHomeOutline className="text-xl" />
  </button>
</div>



  </div>
);

};

export default TransactionsPage;
