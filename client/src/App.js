
import React, { createContext, useReducer } from "react"
import { Route, Routes } from "react-router-dom";
// material ui components

// import all compoennts
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";
import Logout from "./components/Logout";

// require useReducer
import { initialState, reducer } from "./reducer/UseReducer";

// making context for hiding logout button or register,login button
// Wee need state which true then display logout menu(list) and false when display Login,Register menu(list)
export const UserContext = createContext();

const App = () => {

  // using useReducer to perform state true false
  // We use useReducer to perform different states using different dispatch type
  const [state, dispatch] = useReducer(reducer, initialState);
  // reducer is defined in UseReducer file of reducer folder

  // WHAT is : CONCEPTS
  // We change state : true when user logged in, from Login component during fetching api & set type="USER" for identification
  // We change state : false when user logout, from Logout component during fetching api & set type="USER" for identification
  // now in Navbar component Making Function component which doing when state : true then display <list> home,contact,about </list>
  // and if state false then display their list -> home, login , register

  return (
    <>
    {/* Providing state and their dispatch object in all components */}
    {/* which is mainly used in login ,logout, navbar */}
      <UserContext.Provider value={{ state, dispatch }} >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </UserContext.Provider>

    </>
  );
};

export default App;

// export { UserContext };
