import React, { useState, useEffect, useCallback } from "react";
import { Navigate, Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Col, Row, Card, Nav, Navbar } from "react-bootstrap";
import { topup } from "../slices/topup";

const TopUp = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [content5, setContent5] = useState("");
  const [content, setContent] = useState("");
  const [content2, setContent2] = useState("");

  const [loading, setLoading] = useState(false);

  const [selectedAmount, setSelectedAmount] = useState("");

  const handleOption = (amount) => {
    setSelectedAmount(amount);
  };

  const dispatch = useDispatch();

  const initialValues = {
    top_up_amount: "",
  };

  const validationSchema = Yup.object().shape({
    top_up_amount: Yup.number().required(
      "hanya angka, tidak boleh kurang dari 0"
    ),
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("amount", selectedAmount);
      topup({ data: { top_up_amount: selectedAmount } });
    },
    [selectedAmount, topup]
  );

  const handleInput = useCallback((e) => {
    if (!e.target.value) {
      setSelectedAmount(0);
      return;
    }
    setSelectedAmount(parseInt(e.target.value));
  }, []);

  const handleTopup = (formValue) => {
    const { top_up_amount } = formValue;
    setLoading(true);

    dispatch(topup({ top_up_amount }))
      .unwrap()
      .then(() => {})
      .catch(() => {
        setLoading(false);
      });
  };

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
  }, []);
  return (
    <>
      <div className="col-md-12 login-form">
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleTopup}
        >
          <Form className="mt-5">
            <div className="form-group">
              <Field
                name="top_up_amount"
                type="number"
                value={selectedAmount}
                onChange={handleInput}
                className="form-control"
                placeholder="masukan jumlah"
              />
              <ErrorMessage
                name="top_up_amount"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <button
              type="submit"
              className="btn btn-danger btn-block"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Top up</span>
            </button>

            <div className="topup-options">
              {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
                <button
                  key={amount}
                  className={amount === selectedAmount ? "active" : ""}
                  onClick={() => handleOption(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default TopUp;
