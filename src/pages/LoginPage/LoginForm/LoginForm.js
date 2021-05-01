import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import ButtonCancel from "components/FormControl/ButtonCancel/ButtonCancel";
import ButtonForm from "components/FormControl/ButtonForm/ButtonForm";
import Form from "components/FormControl/Form/Form";
import InputField from "components/FormControl/InputField/InputField";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email nên có dấu @ trong trường này")
    .required("Email nên được điền vào trường này"),
  password: yup.string().required("Mật khẩu nên được điền vào trường này"),
});

// có sẵn trong auth(error) cua firebase
const WRONG_CREDENTIALS = "auth/wrong-password";
const NOT_FOUND = "auth/user-not-found";
const LOGIN_BLOCKED = "auth/too-many-requests";

const printErrorMessage = (error) => {
  switch (error.code) {
    case WRONG_CREDENTIALS:
      return "Sai mật khẩu";
    case NOT_FOUND:
      return "Tài khoản không tồn tại";
    case LOGIN_BLOCKED:
      return "User blocked. Restore password or try again later";
    default:
      return "Có vấn đề xảy ra. Thử lại";
  }
};

function LoginForm(props) {
  const { error, isLoading, onSubmit } = props;
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
  });

  const errorMessage = error ? printErrorMessage(error) : null;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        as={
          <InputField
            label="Email *"
            type="text"
            id="email"
            autoFocus
            autoComplete="email"
            ref={register}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
        }
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        as={
          <InputField
            label="Mật khẩu *"
            type="password"
            id="password"
            autoComplete="password"
            ref={register}
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
        }
      />
      {errorMessage ? (
        <div>
          <Typography color="error">{errorMessage}</Typography>
        </div>
      ) : null}
      <Box display="flex" mt={2}>
        <ButtonForm
          startIcon={
            isLoading ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          Đăng nhập
        </ButtonForm>
        <ButtonCancel>Hủy</ButtonCancel>
      </Box>
    </Form>
  );
}

export default LoginForm;
