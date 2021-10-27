import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container } from 'react-bootstrap';
import { HeaderDropdown, LanguageDropdown } from '../index';
import { logout } from '../../actions/login';
import { setProfileData } from '../../actions/profile';
import { useRouter } from 'next/router'
import {
  setSidebarCollapse,
  setSidebarVisibility,
} from '../../actions/sidebar';
import { getHeaderTitle, showToast } from '../../utility';

const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const { profile, isCollapsed, isVisible, language } = useSelector(
    (state) => ({
      isCollapsed: state.sidebar.isCollapsed,
      isVisible: state.sidebar.isVisible,
      profile: state.profile,
      language: state.language,
    }),
  );
  useEffect(() => {
    dispatch(setProfileData()).then((res) => {
      if (!res.data.status) showToast(res.data.error_message);
    });
  }, []);

  const logoutAction = () => dispatch(logout());

  const toggleCollapse = () => dispatch(setSidebarCollapse(!isCollapsed));
  const toggleVisibility = () => dispatch(setSidebarVisibility(!isVisible));
  let headerTitle = getHeaderTitle(router.pathname);
  return (
    <Navbar fixed="top">
      <Container className="justify-content-between">
        <i
          className={`collapse-menu-btn ${isCollapsed ? 'fas fa-angle-right' : 'fas fa-angle-left'
            }`}
          onClick={toggleCollapse}
        />
        <div className="page-title">
          <h1>{headerTitle}</h1>
        </div>
        <div className="navigation-items">
          <LanguageDropdown dispatch={dispatch} language={language} />
          <HeaderDropdown profile={profile} logout={logoutAction} />
          <i
            className="fas fa-bars collapse-sidebar-btn"
            onClick={toggleVisibility}
          />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
