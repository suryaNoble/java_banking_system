import React, { useEffect, useState } from "react";
import { dummyTransactions } from "../../data/transactions";
import { useNavigate } from "react-router-dom";

const HomeTransactionsPreview = () => {
  
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTransactions(dummyTransactions.slice(0, 5));
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">

      <p className="mb-3 text-lg font-semibold">Recent Transactions</p>

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
            <p>{t.id}</p>
            <p>{t.date} , {t.time}</p>
            <p>{t.type}</p>
            <p>₹{t.amount}</p>
            <p>{t.status}</p>
          </div>
        ))}

      </div>

      <button
        onClick={() => navigate("/transactions")}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
      >
        View All Transactions
      </button>

    </div>
  );
};

export default HomeTransactionsPreview;
