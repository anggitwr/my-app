import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Row, Col, Image } from "react-bootstrap";
import * as Yup from "yup";
import { logoApp, namaApp } from "../services/config";
import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="col-md-12 login-form">
      <div className="container-fluid mt-5">
        <Row>
          <Col className="container-fluid mt-5">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form className="mt-5">
                <center className=" mb-5">
                  <h4>
                    <img src={logoApp} alt="" className="w10 h10" />
                    <b style={{ paddingLeft: 5, fontSize: 24 }}>{namaApp}</b>
                  </h4>
                  <br />
                  <h3>Masuk atau buat akun</h3>
                  <h3> untuk memulai</h3>
                </center>

                <div className="form-group">
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="masukan email anda"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="masukan password anda"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-danger btn-block"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Masuk</span>
                  </button>
                  <center>
                    <small className="text-muted">
                      belum punya akun? register{" "}
                      <a
                        href="/registration"
                        className="text-danger"
                        style={{ textDecoration: "none" }}
                      >
                        <b>di sini</b>
                      </a>
                    </small>
                  </center>
                </div>
              </Form>
            </Formik>
          </Col>
          <Col>
            <>
              <Image
                src="ilsLogin.png"
                thumbnail
                className="p-0 w-150 vh-190"
                style={{
                  objectFit: "cover",
                  objectPosition: "left",
                  border: "none",
                }}
              />
            </>
          </Col>
        </Row>
      </div>

      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
