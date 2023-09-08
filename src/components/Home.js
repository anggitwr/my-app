import React, { useState, useEffect } from "react";
import { Navigate, Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { createEntityAdapter } from "@reduxjs/toolkit";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Col, Row, Card, Nav, Navbar } from "react-bootstrap";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [content2, setContent2] = useState("");
  const [content3, setContent3] = useState("");
  const [content4, setContent4] = useState("");
  const localUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";

  const setContent3Id = createEntityAdapter({
    selectId: (data) => data.service_code,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // const { contentCode: ContentAll } = useSelector((state) => state.auth);

  // const ListService = useSelector((state) => state.setContent3Id);

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
        const _content2 =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent2(_content2);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
    UserService.getService().then(
      (response) => {
        setContent3(response.data);
      },
      (error) => {
        const _content3 =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent3(_content3);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
    UserService.getBanner().then(
      (response) => {
        setContent4(response.data);
      },
      (error) => {
        const _content4 =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent4(_content4);

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
    <>
      <div className="header">
        <Navbar bg="light" variant="light text-dark">
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/Logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            SIMS PPOB-ZAIN
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end text-dark ">
            <Nav.Item>
              <Nav.Link href="/Topup" className="text-dark">
                Topup
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/Transaction" className="text-dark">
                Transaction
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/Profile" className="text-dark">
                Akun
              </Nav.Link>
            </Nav.Item>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <Row>
        <Col>
          <div className="container">
            <div className="mt-2">Selamat datang</div>
            <h3>
              {content.data && content.data.first_name}
              {content.data && content.data.last_name}
            </h3>
          </div>
        </Col>
        <Col>
          <Card
            className="p-3 text-white cardSaldo"
            style={{ backgroundImage: "url(BackgroundSaldo.png)" }}
          >
            <p>saldo anda</p>
            <h3>{content2.data && content2.data.balance}</h3>
          </Card>
        </Col>
      </Row>
      <Row className="p-0 mt-4">
        {content3.data &&
          content3.data.map((e) => (
            <div className="service-card">
              <img src={e.service_icon} alt="icon" />
              <p>{e.service_name}</p>
            </div>
          ))}
      </Row>
      <Row className="p-0 mt-3">
        {content4.data &&
          content4.data.map((e) => (
            <div className="service-card">
              <img src={e.banner_image} alt="icon" />
            </div>
          ))}
      </Row>
    </>
  );
};

export default Home;
