import React, { FunctionComponent } from "react";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
import { LogIn as LoginIcon } from "react-feather";
import { LoginUser } from "../../lib/auth/client";
import { useAuth } from "../../lib/auth/context";
import Button from "../button/Button";

const Login: FunctionComponent = () => {
  const { login } = useAuth();
  const router = useRouter();

  const initialValues: LoginUser = {
    email: "",
    password: "",
  };

  return (
    <Formik
      onSubmit={(v) => login(v).then(() => router.push("/konto"))}
      initialValues={initialValues}
    >
      <Form>
        <Field name="email" type="email" />
        <Field name="password" type="password" />
        <Button type="submit" icon={LoginIcon}>
          Logga in
        </Button>
      </Form>
    </Formik>
  );
};

export default Login;
