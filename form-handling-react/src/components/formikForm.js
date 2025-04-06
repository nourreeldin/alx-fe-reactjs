import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const formikForm = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form data submitted:', values);
      }}
    >
      <Form>
        <div>
          <label>Username:</label>
          <Field type="text" name="username" />
          <ErrorMessage name="username" component="span" />
        </div>

        <div>
          <label>Email:</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="span" />
        </div>

        <div>
          <label>Password:</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="span" />
        </div>

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default formikForm;
