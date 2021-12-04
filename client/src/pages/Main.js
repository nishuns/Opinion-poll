import React, { useState, useEffect } from "react";
import store from "../redux/store";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Search from "./partials/Search";
import Filter from "./partials/Filters";
import Issues from "./Issue/Issues";

// Login popup
import Login from "./auth/Login";
// signup popup
import Signup from "./auth/Signup";
// createIssue popup
import CreateIssue from "./Issue/Form";
// create Logout
import Logout from "./auth/Logout";

const Main = (props) => {
   const [issues, setIssues] = useState([]);

   const handleIssues = (updatedIssues) => {
      setIssues(updatedIssues);
   };

   const handleGetRequest = () => {
      axios
         .get("http://localhost:4001/api/issues/view", {
            headers: {
               "Content-Type": "application/json",
               Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
         })
         .then((response) => {
            switch (response.status) {
               case 200:
                  store.dispatch({
                     type: "ADD_ISSUES",
                     payloads: { issues: response.data.issues }
                  });
                  break;
               default:
                  console.log("issues did not loaded");
            }
         });
   };

   //   use effect
   useEffect(() => {
      handleGetRequest();
      // eslint-disable-next-line
   }, []);

   store.subscribe(() => {
      handleIssues(store.getState().issues);
   });

   return (
      <>
         <main className="content">
            <div className="settings">
               <Search />
               <Filter />
            </div>
            <div className="issue-box">
                <Issues issues={issues}/>
            </div>
         </main>
         <Routes>
            <Route path="/login" element={<Login />}>
               <></>
            </Route>
            <Route path="/signup" element={<Signup />}>
               <></>
            </Route>
            <Route path="/create-issue" element={<CreateIssue />}>
               <></>
            </Route>
            <Route path="/logout" element={<Logout />}>
               <></>
            </Route>
            <Route path="/" element={<></>}>
               <></>
            </Route>
         </Routes>
      </>
   );
};

export default Main;
