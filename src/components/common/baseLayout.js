import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { setReduxLoaderCount } from "../../actions/loader";
import { getRouteInfo } from "../../utility";
import { UserLayout, AdminLayout } from "../../components";

const ScrollToTop = (props) => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [router.pathname]);
  return props.children;
};

const BaseLayout = ({
  children,
}) => {

  const dispatch = useDispatch();
  const { profile, token, loaderCount } = useSelector((state) => ({
    token: state.token,
    loaderCount: state.loaderCount,
    profile: state.profile,
  }));

  const resetLoaderCount = () => dispatch(setReduxLoaderCount(0))

  const router = useRouter();
  let isAuthenticated = !token;
  let isAdmin = true
  // profile && profile.is_admin;
  const routeInfo = getRouteInfo(router.pathname);
  useEffect(() => {
    loaderCount > 0 && resetLoaderCount(0);
    if (router.pathname === "/" || router.pathname === "/_error") {
      router.replace(isAuthenticated ? "dashboard" : "login");
    } else if (router.pathname === "/login") {
      isAuthenticated && router.replace("dashboard");
    } else if (routeInfo.shouldBeAdmin) {
      !isAdmin && router.replace(isAuthenticated ? "dashboard" : "login");
    } else if (routeInfo.shouldBeAuthenticated) {
      !isAuthenticated &&
        router.replace(isAuthenticated ? "dashboard" : "login");
    }
  }, []);
  return (
    <ScrollToTop>
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" href="/images/icon-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Next JS setup repo" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
          as="font"
          crossOrigin=""
        />
        <title>NextJS Setup</title>
      </Head>
      {routeInfo.withAdminLayout ? (
        <AdminLayout component={children} loaderCount={loaderCount} />
      ) : routeInfo.withUserLayout ? (
        <UserLayout component={children} loaderCount={loaderCount} />
      ) : (
        children
      )}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </ScrollToTop>
  );
};

export default BaseLayout;