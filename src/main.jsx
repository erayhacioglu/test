import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import "./scss/main.scss";
import "./i18n.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-spring-bottom-sheet/dist/style.css'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux';
import store from "./redux/store";
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </Provider>
  </BrowserRouter>,
)
