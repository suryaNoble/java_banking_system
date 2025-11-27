import React, { useEffect, useState } from "react";
import { dummyTransactions } from "../../data/transactions";

const TransactionsPage = () => {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(dummyTransactions);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-6">

      <p className="mb-3 text-lg font-semibold">All Transactions</p>

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
    </div>
  );
};

export default TransactionsPage;
