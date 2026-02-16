import { Formik, Form, Field } from "formik";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.js";
import { loadCurrentLoggedAdmin, login } from "../authSlice.js";
import ErrorMessage from "./ui/ErrorMessage.jsx";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Spinner from "./ui/Spinner.jsx";
import { loginSchema } from "../validationSchema.js";
import { selectAuth } from "../authSelector.js";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ adminEmail: "", adminPassword: "" }}
      validationSchema={loginSchema}
      onSubmit={async (values) => {
        try {
          await dispatch(login(values)).unwrap();
          await dispatch(loadCurrentLoggedAdmin()).unwrap();
          navigate("/dashboard");
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ errors, touched }) => (
        <div className="flex justify-center items-center w-full h-[80vh]">
          <Form className="space-y-4 w-10/12 sm:w-6/12 lg:w-4/12">
            <div>
              <Field
                name="adminEmail"
                placeholder="Email"
                className="border p-2 w-full"
              />
              {touched.adminEmail && errors.adminEmail && (
                <ErrorMessage message={errors.adminEmail} />
              )}
            </div>

            <div>
              <Field
                name="adminPassword"
                type="password"
                placeholder="Password"
                className="border p-2 w-full"
              />
              {touched.adminPassword && errors.adminPassword && (
                <ErrorMessage message={errors.adminPassword} />
              )}
            </div>

            {error && <ErrorMessage message={error} />}

            <Button
              type="submit"
              loading={loading}
              style={{ cursor: "pointer" }}
            >
              Login
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
