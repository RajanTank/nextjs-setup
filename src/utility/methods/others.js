import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

const showToast = (message) => message
  && toast(message, {
    style: {
      background: '#333',
      color: '#fff',
    },
  });

const getFileNameFromURL = (url) => {
  const tempName = url ? url.split('/').pop().split('#')[0].split('?')[0] : '';
  return tempName.replace(/%20/g, ' ');
};

const getFileExtensionFromName = (name) => {
  if (name) {
    const nameArray = name.split('.') || [];
    const extensionArray = (nameArray[nameArray.length - 1]
      && nameArray[nameArray.length - 1].split('?'))
      || [];
    return extensionArray[0] || '';
  } else {
    return '';
  }
};

const useStateCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // mutable ref to store current callback

  const setStateCallback = (state, cb) => {
    cbRef.current = cb; // store passed callback to ref
    setState(state);
  };

  useEffect(() => {
    // cb.current is `null` on initial render, so we only execute cb on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
};

const getHeaderTitle = (path) => {
  if (/profile/.test(path)) {
    return 'Manage Profile';
  } else if (/dashboard/.test(path)) {
    return 'Dashboard';
  } else if (/addNewUser/.test(path)) {
    return 'Add User';
  } else if (/editUser/.test(path)) {
    return 'Edit User';
  } else if (/manageUsers/.test(path)) {
    return 'Manage Users';
  }
  return 'Yet to be set';
};

const getSidebarMenuClasses = (path) => {
  const sidebarMenuClasses = {
    dashboard: '',
    manageUsers: '',
  };
  if (/dashboard/.test(path)) {
    sidebarMenuClasses.dashboard = 'active';
  } else if (
    /add-new-user/.test(path)
    || /manage-users/.test(path)
    || /edit-user/.test(path)
  ) {
    sidebarMenuClasses.manageUsers = 'active';
  }
  return sidebarMenuClasses;
};

const getBaseURL = () => {
  if (!process.env.REACT_APP_ENV) {
    return process.env.REACT_APP_LOCAL_URL;
  } else if (process.env.REACT_APP_ENV === 'staging') {
    return process.env.REACT_APP_STAGING_URL;
  } else if (process.env.REACT_APP_ENV === 'production') {
    return process.env.REACT_APP_PRODUCTION_URL;
  } else {
    return '';
  }
};

const getRouteInfo = (path) => {
  if (path.match(/^\/login/)) {
    return {
      hasLayout: false,
      shouldBeAdmin: false,
      shouldBeAuthenticated: false,
      withUserLayout: false,
      withAdminLayout: false,
    };
  } else if (path.match(/^\/profile/)) {
    return {
      hasLayout: true,
      shouldBeAdmin: false,
      shouldBeAuthenticated: true,
      withUserLayout: true,
      withAdminLayout: false,
    };
  } else if (path.match(/^\/dashboard/)) {
    return {
      hasLayout: true,
      shouldBeAdmin: false,
      shouldBeAuthenticated: true,
      withUserLayout: true,
      withAdminLayout: false,
    };
  } else if (path.match(/^\/add-new-user/)) {
    return {
      hasLayout: true,
      shouldBeAdmin: true,
      shouldBeAuthenticated: false,
      withUserLayout: false,
      withAdminLayout: true,
    };
  } else if (path.match(/^\/edit-user/)) {
    return {
      hasLayout: true,
      shouldBeAdmin: true,
      shouldBeAuthenticated: false,
      withUserLayout: false,
      withAdminLayout: true,
    };
  } else if (path.match(/^\/manage-users/)) {
    return {
      hasLayout: true,
      shouldBeAdmin: false,
      shouldBeAuthenticated: true,
      withUserLayout: true,
      withAdminLayout: false,
    };
  }
  return {
    hasLayout: false,
    shouldBeAdmin: false,
    shouldBeAuthenticated: true,
    withUserLayout: true,
    withAdminLayout: false,
  };
};

const userData = [
  {
    first_name: "John",
    last_name: 'Doe',
    email: 'johnDoe@gmail.com'
  },
  {
    first_name: '1John',
    last_name: '1Doe',
    email: '1johnDoe@gmail.com'
  },
  {
    first_name: 'Abhijit',
    last_name: 'Patel',
    email: 'abhijitPatel@gmail.com',
  },
  {
    first_name: 'Samir Vimal',
    last_name: 'Gupta',
    email: 'samirvimalgupta@gmail.com'
  },
  {
    first_name: '1John',
    last_name: '1Doe',
    email: '1johnDoe@gmail.com'
  },
  {
    first_name: 'Abhijit',
    last_name: 'Patel',
    email: 'abhijitPatel@gmail.com',
  },
  {
    first_name: 'Samir Vimal',
    last_name: 'Gupta',
    email: 'samirvimalgupta@gmail.com',
    is_admin: true,
    id: 2,
  }
]

export {
  showToast,
  getFileNameFromURL,
  getFileExtensionFromName,
  useStateCallback,
  getHeaderTitle,
  getSidebarMenuClasses,
  getBaseURL,
  getRouteInfo,
  userData
};
