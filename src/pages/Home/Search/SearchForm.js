// import InputField from "components/CutomField/InputField";
// import { FastField, Form, Formik } from "formik";
// import PropTypes from "prop-types";
// import React, { useRef, useState } from "react";
// import { Button, FormGroup } from "reactstrap";

// SearchForm.propTypes = {
//   onSubmit: PropTypes.func,
// };
// SearchForm.defaultProps = {
//   onSubmit: null,
// };

// function SearchForm(props) {
//   const initialValues = {
//     keySearch: "",
//   };
//   const { onSubmit } = props;

//   const typingRef = useRef(null);

//   return (
//     <Formik initialValues={initialValues} onSubmit={onSubmit}>
//       {(formikProps) => {
//         //do something here
//         const { values, errors, touched } = formikProps;
//         console.log({ values, errors, touched });

//         if (!onSubmit) return;

//         if (typingRef.current) {
//           clearTimeout(typingRef.current);
//         }
//         typingRef.current = setTimeout(() => {
//           const searchTermValue = {
//             values,
//           };
//           onSubmit(searchTermValue);
//         }, 3000);

//         return (
//           <Form>
//             <FastField
//               name="keySearch"
//               component={InputField}
//               placeholder="Search for a movie, tv show, person......"
//             />
//             <FormGroup>
//               <Button type="submit">Search</Button>
//             </FormGroup>
//           </Form>
//         );
//       }}
//     </Formik>
//   );
// }

// export default SearchForm;
