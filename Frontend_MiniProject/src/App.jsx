import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Registration/Login";
import Profile from "./Components/Profile/Profile";
import AboutUs from "./Components/AboutUs/AboutUs";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import ContactUs from "./Components/ContactUs/ContactUs";
import UserBasicDetails from "./Components/Registration/UserBasicDetails";
import Withdraw from "./Components/Transactions/Withdraw";
import Deposit from "./Components/Transactions/Deposit";
import Transfer from "./Components/Transactions/Transfer";
import CheckBalance from "./Components/Transactions/CheckBalance";
import TransactionsPage from "./Components/Transactions/TransactionsPage";
import AccountDetails from "./Components/Registration/AccountDetails";
import ResetPin from "./Components/ResetPin/ResetPin";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Register />} /> */}
        <Route path="/signup" element={<UserBasicDetails />} />
        <Route path="/signup/account-details" element={<AccountDetails />} />



        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutUs />} />

   

        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/check-balance" element={<CheckBalance />} />
        <Route path="/transactions" element={<TransactionsPage />} />

        <Route path="/reset-pin" element={<ResetPin/>}/>





      

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

