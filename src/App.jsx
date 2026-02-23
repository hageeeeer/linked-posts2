import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import { HeroUIProvider } from "@heroui/react";
import ProtectedRoute from "./pages/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostDetails from "./pages/PostDetails";
import { Offline } from "react-detect-offline";
import Loading from "./pages/Loading";

const Profile = lazy(() => import('./pages/Profile'));

export default function App() {
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
       
       
      },
    },
  });

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Login></Login> },
        { path: "/register", element: <Register></Register> },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
             <Suspense fallback={<Loading></Loading>}>
               <Profile></Profile>
             </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/postdetails/:id",
          element: (
            <ProtectedRoute>
              <PostDetails></PostDetails>
            </ProtectedRoute>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound></NotFound> },
      ],
    },
  ]);

  return (
    <div>
      <Offline>You're offline right now. Check your connection.</Offline>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools></ReactQueryDevtools>
        <HeroUIProvider>
          <RouterProvider router={routes} />
        </HeroUIProvider>
        <ToastContainer theme="colored" autoClose={3000}></ToastContainer>
      </QueryClientProvider>
     
    </div>
  );
}


// custom hook

//shred data ==> state management

//shared logic ==> fn

//custom 