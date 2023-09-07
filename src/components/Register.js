import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { logoApp, namaApp } from "../services/config";
import { Row, Col, Image } from "react-bootstrap";
import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { email, first_name, last_name, password } = formValue;

    setSuccessful(false);

    dispatch(register({ email, first_name, last_name, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="col-md-12 signup-form">
      <div className="container-fluid mt-5">
        <Row>
          <Col className="mr-5">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              <Form>
                {!successful && (
                  <div>
                    <center className=" mb-5">
                      <h4>
                        <img src={logoApp} alt="" className="w10 h10" />
                        <b style={{ paddingLeft: 5, fontSize: 24 }}>
                          {namaApp}
                        </b>
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
                        name="first_name"
                        type="text"
                        className="form-control"
                        placeholder="nama depan"
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <Field
                        name="last_name"
                        type="text"
                        className="form-control"
                        placeholder="nama belakang"
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="buat password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        name="passwordd"
                        type="password"
                        className="form-control"
                        placeholder="konfirmasi password"
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
                      >
                        Sign Up
                      </button>
                      <center>
                        <small className="text-muted">
                          sudah punya akun? login{" "}
                          <a
                            href="/login"
                            className="text-danger"
                            style={{ textDecoration: "none" }}
                          >
                            <b>di sini</b>
                          </a>
                        </small>
                      </center>
                    </div>
                  </div>
                )}
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
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
