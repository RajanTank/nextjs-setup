import React from 'react';
import { Sidebar, Header, Footer, FullScreenLoader } from '../index';

const UserLayout = (props) => {
  const { loaderCount, component, ...rest } = props;
  return (
    <>
      <Sidebar {...rest} />
      <Header {...rest} />
      <main> {component}
        {/* <Component {...rest} /> */}
      </main>
      {loaderCount > 0 && <FullScreenLoader />}
      <Footer />
      Hello
    </>
  );
};
export default UserLayout;
