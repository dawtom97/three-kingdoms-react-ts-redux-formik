import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const sleep = (ms:number) => new Promise((r) => setTimeout(r,ms))

export const CustomForm = () => {
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        onSubmit={async (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
            await sleep(2000);
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
         
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="John" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="text"
          />
          

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

