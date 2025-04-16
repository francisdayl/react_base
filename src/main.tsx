import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFoundPage.tsx';
import PostsPage from './pages/posts/PostsPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostDetailPage from './pages/posts/PostDetailPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PostsPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/posts',
    element: <PostsPage />,
    errorElement: <NotFound />,
    children: [],
  },
  {
    path: '/posts/:id',
    element: <PostDetailPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
