import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box, Typography, CircularProgress } from "@material-ui/core";
import Form from "components/FormControl/Form/Form";
import { Controller, useForm } from "react-hook-form";
import InputField from "components/FormControl/InputField/InputField";
import ButtonForm from "components/FormControl/ButtonForm/ButtonForm";
import AlertComponent from "components/AlertComponent/AlertComponent";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

SettingForm.propTypes = {
  onSubmit: PropTypes.func,
};
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email cần phải có dấu @")
    .required("Email cần được điền vào trường này"),
  name: yup.string().matches().required("Tên cần phải được điền vào trường này"),
  password: yup
    .string()
    .min(4, "Mật khẩu phải có ít nhất 4 ký tự")
    .max(15, "Mật khẩu không được nhiều hơn 15 ký tự")
    .required("Mật khẩu phải được điền vào trường này"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password không khớp"),
});
const USER_TAKEN = "auth/email-already-in-use";
const REQUIRED_LOGIN = "auth/requires-recent-login";

const useStyles = makeStyles((theme) => ({
  btn: {
    width: "100%",
  },
  alert: {
    position: "absolute",
    top: "65px",
    right: 0,
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      right: "auto",
    },
  },
  span: {
    cursor: "pointer",
    color: "#111",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function SettingForm(props) {
  const classes = useStyles();
  const {
    onSubmit,
    currentUser,
    error,
    isLoading,
    open,
    setOpen,
    onClickLogout,
  } = props;
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
  });

  console.log("Error setting", error);

  const printErrorMessage = (error) => {
    switch (error.code) {
      case USER_TAKEN:
        return "Tên tài khoản đã tồn tại";
      case REQUIRED_LOGIN:
        return `Bạn cần phải đăng nhập lại để thay đổi thông tin.`;
      default:
        return "Có vấn đề xảy ra. Thử lại";
    }
  };
  const errorMessage = error ? printErrorMessage(error) : null;

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue={currentUser.email}
          as={
            <InputField
              label="Email *"
              type="text"
              id="email"
              autoComplete="email"
              ref={register}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          }
        />
        <Controller
          name="name"
          control={control}
          defaultValue={currentUser.displayName}
          as={
            <InputField
              label="Tên *"
              type="text"
              id="name"
              autoComplete="name"
              ref={register}
              error={!!errors.name}
              helperText={errors?.name?.message}
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
              autoComplete="current-password"
              ref={register}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
          }
        />
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          as={
            <InputField
              label="Xác nhận mật khẩu *"
              type="password"
              id="confirmPassword"
              autoComplete="current-confirmPassword"
              ref={register}
              error={!!errors.confirmPassword}
              helperText={errors?.confirmPassword?.message}
            />
          }
        />
        {errorMessage ? (
          <div>
            {errorMessage ? (
              errorMessage ===
              "Bạn cần phải đăng nhập lại để thay đổi thông tin." ? (
                <>
                  <Typography color="error">
                    {errorMessage}
                    {""}
                    <span className={classes.span} onClick={onClickLogout}>
                      Đăng xuất
                    </span>
                  </Typography>
                </>
              ) : (
                <Typography color="error">{errorMessage}</Typography>
              )
            ) : null}
          </div>
        ) : (
          <AlertComponent
            openn={open}
            severity="success"
            setOpenn={setOpen}
            alertTitle="Cập nhật thông tin thành công!"
            className={classes.alert}
          />
        )}
        <Box display="flex" mt={2}>
          <ButtonForm
            className={classes.btn}
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            Lưu thay đổi
          </ButtonForm>
        </Box>
      </Form>
    </>
  );
}

export default SettingForm;
