import React from "react";
import {Formik} from 'formik';
import { Input, Button, Tag } from "antd";
import { addNewStudent } from "../client";

const inputBottomMargin ={marginBottom: '10px'}
const tagStyle ={backgroundColor: '#FA7134', color:'white', ...inputBottomMargin}

const AddStudentForm = (props) => 
(
  <Formik
    initialValues={{ firstName: '', lastName: '', email: '', gender: ''}}
    validate={values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Email Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      if(!values.firstName){
        errors.firstName = 'First Name Required'
      }
      if(!values.lastName){
        errors.lastName = 'Last Name Required'
      }
      if(!values.gender){
        errors.gender = 'Gender Required'
      }else if (!['MALE', 'FEMALE'].includes(values.gender)){
        errors.gender = 'Gender must be {MALE, male, FEMALE, female}';
      }
      return errors;
    }}

    onSubmit={(student, { setSubmitting }) => {
      addNewStudent(student).then(()=>{
        props.onSuccess();
        setSubmitting(false);
      })
      .catch(err =>{
        props.onFailure(err);
      })
      .finally(err =>{
        setSubmitting(false);
      })
    }}

  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      submitForm,
      isValid
      /* and other goodies */
    }) => (
      <form onSubmit={handleSubmit}>
        <Input
          style={inputBottomMargin}
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          placeholder='First Name (Rose)'
        />
        {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}
        <Input
          style={inputBottomMargin}
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          placeholder='Last Name (Ken)'
        />
        {errors.lastName && touched.lastName && <Tag style={tagStyle}>{errors.lastName}</Tag>}
        <Input
          style={inputBottomMargin}
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder='Email (roseken@gmail.com)'
        />
        {errors.email && touched.email && <Tag style={tagStyle}>{errors.email}</Tag>}
        <Input
          style={inputBottomMargin}
          name="gender"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.gender}
          placeholder='Gender (Female or Male)'
        />
        {errors.gender && touched.gender && <Tag style={tagStyle}>{errors.gender}</Tag>}
        <button 
        onClick={()=>submitForm()} 
        type="submit" 
        disabled={isSubmitting | (touched && !isValid)}>
          Submit
        </button>
      </form>
    )}
  </Formik>
);


export default AddStudentForm;