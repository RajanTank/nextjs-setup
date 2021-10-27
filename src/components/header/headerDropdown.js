import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/router";

const HeaderDropdown = ({ profile, logout }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const navigateToProfilePage = () => router.push('/profile');
  return (
    <Dropdown>
      <Dropdown.Toggle variant="default" id="dropdown-basic">
        <i className="fas fa-user-circle" />
        <span className="user-name">
          {profile &&
            profile.first_name &&
            profile.first_name + ' ' + profile.last_name}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu align={'end'}>
        <Dropdown.Item onClick={navigateToProfilePage}>
          <i className="fas fa-user-cog" />
          {t('header.profilePlaceholder')}
        </Dropdown.Item>
        <Dropdown.Item onClick={logout}>
          <i className="fas fa-sign-in-alt fa-rotate-180" />
          {t('header.logOutPlaceholder')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default HeaderDropdown;
