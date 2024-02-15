export const Collections = {
  USERS: 'users',
  HOUSEHOLD: 'household',
};

const defaultFirebaseProd = {
  apiKey: 'AIzaSyD4xirLiNMLtFO0Vw1KmXGPMYs-1Qg7W7k',
  authDomain: 'sodnarts-todo.firebaseapp.com',
  projectId: 'sodnarts-todo',
  storageBucket: 'sodnarts-todo.appspot.com',
  messagingSenderId: '193650648032',
  appId: '1:193650648032:web:6d2b00faddacced1330185',
};

const defaultFirebaseDev = {
  apiKey: 'AIzaSyD4xirLiNMLtFO0Vw1KmXGPMYs-1Qg7W7k',
  authDomain: 'sodnarts-todo.firebaseapp.com',
  projectId: 'sodnarts-todo',
  storageBucket: 'sodnarts-todo.appspot.com',
  messagingSenderId: '193650648032',
  appId: '1:193650648032:web:6d2b00faddacced1330185',
};

const getFirebaseEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return defaultFirebaseProd;
    case 'development':
      return defaultFirebaseDev;
    default:
      return defaultFirebaseDev;
  }
};

export const firebaseConfig = getFirebaseEnvironment();
