import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'
import Analytics from './pages/Analytics.jsx'
import Setting from './pages/Setting'
import Forum from './pages/Forum'
import Task from './pages/Task'
import SignIn from './pages/SignInCentered.jsx'
import SignUp from './pages/SignUpCentered.jsx'

import Settings from './pages/settings'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App is the parent component
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true, // This means this is the default child for the "/" route 
        element: <Forum />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/setting',
        element: <Setting />
      },
      {
        path: '/analytics',
        element: <Analytics />
      },
      {
        path: '/task',
        element: <Task />
      },
      {
        path: '/saved',
        element: <SavedBooks />
      },
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: '/signin',
        element: <SignIn />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
