import React from 'react';
import { Form, Container, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Input, Button } from '../components';
import { useStateCallback } from '../utility';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../schema/login';
import { setUserToken } from '../actions/login';
import Cookies from "universal-cookie";
import { useRouter } from 'next/router';
import authenticatedRoute from '../components/common/authorization';

const Login = () => {
  const { t } = useTranslation();

  const [state, setState] = useStateCallback({
    isLoading: false,
    errorMessage: '',
  });
  const { isLoading, errorMessage } = state;
  const dispatch = useDispatch();
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      // rememberMe: false,
    },
    resolver: yupResolver(schema(t)),
  });
  const onSubmit = (data) => {
    setState(
      (state) => ({ ...state, isLoading: true }),
      () => {
        dispatch(setUserToken(data))
          .then((res) => {
            const cookies = new Cookies();
            cookies.set("token", `${res}`, {
              path: "/",
            });
            setState((state) => ({
              ...state,
              isLoading: false,
              // errorMessage: res.data.error_message || '',
            }));
            router.push('/dashboard')
          })
          .catch((e) => {
            setState((state) => ({ ...state, isLoading: false }))
          });
      },
    );
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center login-body">
      <Container className="d-flex justify-content-center align-items-center">
        <div className="login-box">
          <div className="text-center">
            <img src="/images/logo.png" alt="Logo" className="logo" />
            <h1 className="heading">{t('loginPage.title')}</h1>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              controlId="formEmail"
              placeholder={t('loginPage.emailPlaceholder')}
              error={errors.email && errors.email.message}
              showError={touchedFields && touchedFields.email}
              registeredEvents={register('email')}
              iconClass="fas fa-envelope"
              testID="email-input-login-screen"
            />
            <Input
              controlId="formPassword"
              type="password"
              placeholder={t('loginPage.passwordPlaceholder')}
              error={errors.password && errors.password.message}
              showError={touchedFields && touchedFields.password}
              registeredEvents={register('password')}
              iconClass="fas fa-lock"
              testID="password-input-login-screen"
            />
            <div className="text-center">
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                label={t('loginPage.buttons.login')}
                onClick={handleSubmit(onSubmit)}
                type="submit"
                testID="login-button-login-screen"
              />
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default authenticatedRoute(Login, {});

// export const getServerSideProps = async (context) => {
//   const cookies = new Cookies(context.req, context.res);
//   const token = cookies.get("token");
//   if (token) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/dashboard",
//       },
//     };
//   }
//   return { props: {} };
// };