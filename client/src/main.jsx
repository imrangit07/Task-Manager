import { createRoot } from 'react-dom/client'
import './styles/app.css'
import App from './App.jsx'
import store, { persistor } from './store/store.jsx'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
)
