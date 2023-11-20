import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/system';
import theme from './theme';
import { Routes } from './routes/Routes';
import ResponsiveAppBar from './components/ResponsiveAppbar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { hasAuthParams, useAuth } from 'react-oidc-context';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
    },
  },
});

export default function App() {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  // automatically sign-in
  useEffect(() => {
    console.log(
      hasAuthParams(),
      auth.isAuthenticated,
      auth.activeNavigator,
      auth.isLoading,
      hasTriedSignin,
    );
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignin
    ) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
