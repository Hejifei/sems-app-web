import {createBrowserRouter, RouteObject} from 'react-router-dom'

import App from '@/App'
import Layout from '@/layout/index'
import Page from '@/views/page'
import ChangePassword from '@/views/page/change_password'
import Login from '@/views/page/login/login'
import ReportDownload from '@/views/report/report_download'

import ErrorPage from './error_page'

// const Router = () => {
//   let element = useRoutes([
//     {
//       path: '/',
//       element: <div>Hellow World</div>
//     },
//     {
//       path: '/app',
//       element: <App />
//     }
//   ])

//   return element
// }

const routes: RouteObject[] = [
    {
      path: '/',
      element: <ReportDownload />,
    },
    {
      path: '/home',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <div>home</div>,
        },
        {
          path: 'app',
          element: <App />,
        },
        {
          path: 'page',
          element: <Page />,
        },
      ],
      // element: <div>Hellow World</div>
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/change-password',
      element: <ChangePassword />,
    },
    {
      path: '/report_download',
      element: <ReportDownload />,
    },
  ],
  router = createBrowserRouter(routes)

export default router
