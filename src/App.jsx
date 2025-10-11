
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Availabilty from "./pages/Availabilty";
import Payouts from "./pages/Payouts";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import AdminSideBar from "./components/AdminSideBar";
import AdminBooking from "./pages/AdminBookings";
import Vendors from "./pages/Vendors";

function Layout() {
  const {user,getUser} = useUserStore();
  // console.log(user)

  useEffect(() => {
    getUser();
  },[getUser])

  return (
    <div className="bg-[#f8f5e5] w-full min-h-screen p-4 sm:p-6 md:p-8 max-w-full md:max-w-8xl mx-auto">
    
    
{user && <Header /> }
      <div className={`flex justify-start`}>
{user && (
  user?.role === "vendor" ? <Sidebar /> : <AdminSideBar />
)}

       

        <div className="flex-1">
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Login/>} />
            <Route path="/rooms" element={user ? <Rooms /> : <Login/>} />
            <Route path="/bookings" element={ user ? <Booking /> : <Login/>} />
            <Route path="/availabilty" element={ user ? <Availabilty /> : <Login/>} />
            <Route path="/payouts" element={ user ? <Payouts /> : <Login/>} />
            <Route path="/settings" element={ user ? <Settings /> : <Login/>} />
            <Route path="/login" element={!user ? <Login/> : <Dashboard/>}/>
            <Route path="/admin-bookings" element={!user ? <Login/> : <AdminBooking/>}/>
            
            <Route path="/vendors" element={!user ? <Login/> : <Vendors/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
