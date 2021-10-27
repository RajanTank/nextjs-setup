import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'

import Link from "next/link"; import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SubMenu,
} from 'react-pro-sidebar';
import { useTranslation } from 'react-i18next';
import { setSidebarVisibility } from '../../actions/sidebar';
import {
  getSidebarMenuClasses,
  // formatDateAndTime,
  // fromNow,
  // toNow
} from '../../utility';
// import dayjs from 'dayjs';
import "react-pro-sidebar/dist/css/styles.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { t } = useTranslation();
  const { profile, isCollapsed, isVisible } = useSelector((state) => ({
    isCollapsed: state.sidebar.isCollapsed,
    isVisible: state.sidebar.isVisible,
    profile: state.profile,
  }));
  let sidebarMenuClasses = getSidebarMenuClasses(router.pathname);
  const toggleSidebar = (value) => dispatch(setSidebarVisibility(value));
  const closeSidebar = () => toggleSidebar(false);
  return (
    <ProSidebar
      collapsed={isCollapsed}
      breakPoint="lg"
      toggled={isVisible}
      onToggle={toggleSidebar}>
      <SidebarHeader>
        {isCollapsed ? (
          <img
            alt="Icon logo"
            className="small-logo"
            src="/images/icon-logo.png"
          />
        ) : (
          <img alt="Logo" className="brand-logo" src="/images/logo.png" />
        )}
        <i className="fas fa-times close-sidebar" onClick={closeSidebar} />
      </SidebarHeader>
      <Menu iconShape="round">
        <MenuItem
          className={sidebarMenuClasses.dashboard}
          icon={<i className="fa fa-tachometer-alt" />}>
          <Link href={{
            pathname: "/dashboard",
          }}>
            <a onClick={closeSidebar}>{t('sidebar.dashboardPlaceholder')}</a>
          </Link>
        </MenuItem>
        {profile.is_admin && (
          <MenuItem
            className={sidebarMenuClasses.manageUsers}
            icon={<i className="fa fa-user-plus" />}>
            <Link onClick={closeSidebar} href="/manage-users">
              <a onClick={closeSidebar}>{t('sidebar.manageUsersPlaceholder')}</a>
            </Link>
          </MenuItem>
        )}
        <SubMenu
          title={t('sidebar.subMenuExamplePlaceholder')}
          icon={<i className="fa fa-user-plus" />}>
          <MenuItem>{t('sidebar.route1Placeholder')}</MenuItem>
          <SubMenu
            title={t('sidebar.nestedSubMenuPlaceholder')}
            icon={<i className="fa fa-user-plus" />}>
            <MenuItem>{t('sidebar.route2Placeholder')}</MenuItem>
            <MenuItem>{t('sidebar.route3Placeholder')}</MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>
      {/* Just for testing */}
      {/* {t("header.testNumber", { value: 345454534.4545 })}
      {"\n"}{formatDateAndTime(dayjs())}
      {"\n"}{fromNow(dayjs())} */}
    </ProSidebar>
  );
};

export default Sidebar;
