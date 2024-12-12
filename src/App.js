import React, { useEffect, useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Outlet } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'contact',
    title: 'Contact',
    icon: <ContactsIcon />,
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <PeopleIcon />,
  },
];


export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log("User is signed in:", user.email);
        setSession({
          user: {
            name: 'Praveen Kumar',
            email: user.email,
            image: <AccountCircleIcon />,
          },
        });
      } else {
        setUser(null);
        console.log("No user is signed in");
        navigate('/auth/login');
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  const [session, setSession] = React.useState({});

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Praveen Kumar',
            email: user.email,
            image: <AccountCircleIcon />,
          },
        });
      },
      signOut: async () => {
        await auth.signOut();
        setUser(null);
        setSession(null);
        navigate('/auth/login');
      },
    };
  }, []);

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://codingmstr.com/img/logo-white.png" alt="MUI logo" />,
        title: 'CodingMSTR',
      }}
    >
      <Outlet />
    </AppProvider>
  );
}