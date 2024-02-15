import { RouteHandler } from './RouteHandler';
import { ContextWrapper } from './context/ContextWrapper';

function App() {
  return (
    <ContextWrapper>
      <RouteHandler />
    </ContextWrapper>
  );
}

export default App;
