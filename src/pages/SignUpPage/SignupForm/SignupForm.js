import React from "react";
import { Box, Typography, CircularProgress } from "@material-ui/core";
import InputField from "components/FormControl/InputField/InputField";
import { useForm, Controller } from "react-hook-form";
import Form from "components/FormControl/Form/Form";
import ButtonForm from "components/FormControl/ButtonForm/ButtonForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonCancel from "components/FormControl/ButtonCancel/ButtonCancel";

// /^([^0-9]*)$/ regex
const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Họ không nên bao gồm số")
    .required("Họ cần phải được điền vào trường này"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Tên không nên bao gồm số")
    .required("Tên cần phải được điền vào trường này"),
  email: yup
    .string()
    .email("Email cần phải có dấu @")
    .required("Email cần được điền vào trường này"),
  password: yup
    .string()
    .min(4, "Mật khẩu phải có ít nhất 4 ký tự")
    .max(15, "Mật khẩu không được nhiều hơn 15 ký tự")
    .required("Mật khẩu phải được điền vào trường này"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
});

const USER_TAKEN = "auth/email-already-in-use";

function SignupForm(props) {
  const { error, isLoading, onSubmit } = props;
  const { register, control, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const errorMessage = error
    ? error.code === USER_TAKEN
      ? "Tên tài khoản đã tồn tại"
      : "Có vấn đề xảy ra. Thử lại"
    : null;
  return (
    <>
      <Box mb={1}>
        <Typography variant="h5">Đăng ký tài khoản mới</Typography>
        <Typography>
          Đăng ký tài khoản miễn phí và dễ dàng. Điền vào biểu mẫu bên dưới để
          bắt đầu tham gia TMDB.
        </Typography>
      </Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          as={
            <InputField
              type="text"
              label="Họ"
              id="firstName"
              autoFocus
              autoComplete="firstName"
              ref={register}
              error={!!errors.firstName}
              helperText={errors?.firstName?.message}
            />
          }
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          as={
            <InputField
              label="Tên"
              type="text"
              id="lastName"
              autoComplete="lastName"
              ref={register}
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
            />
          }
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          as={
            <InputField
              label="Email *"
              type="email"
              id="email"
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
            <Typography color="error">{errorMessage}</Typography>
          </div>
        ) : null}
        <Box my={2}>
          <Typography>
            Bằng cách nhấp vào nút "Đăng ký" bên dưới và đồng ý là bạn đã trở thành một thành viên của
            gia đình TMDB.
          </Typography>
        </Box>

        <Box>
          <ButtonForm
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            Đăng Ký
          </ButtonForm>
          <ButtonCancel>Hủy</ButtonCancel>
        </Box>
      </Form>
    </>
  );
}

export default SignupForm;
