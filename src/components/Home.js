import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [content2, setContent2] = useState("");

  useEffect(() => {
    UserService.getProfile().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
    UserService.getBalance().then(
      (response) => {
        setContent2(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent2(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container">
      <p>nama :</p>
      <h3>{content.data && content.data.first_name}</h3>
      <p>saldo anda</p>
      <h3>{content2.data && content2.data.balance}</h3>
    </div>
  );
};

export default Home;
