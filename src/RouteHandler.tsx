import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { withLogin } from './components/with-login/withLogin';
import { NavBar } from './components/nav-bar/NavBar';
import { routes } from './constants/routes';
import { withHousehold } from './components/with-household/withHousehold';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Settings } from './pages/settings/Settings';
import { ShoppingList } from './pages/shopping-list/ShoppingList';
import { ShoppingCart } from './pages/shopping-cart/ShoppingCart';
import { Receipts } from './pages/receipts/Receipts';
import { Menu } from './pages/menu/Menu';
import { Calendar } from './pages/calendar/Calendar';
import { CalendarEvent } from './pages/calendar-event/CalendarEvent';
import { TodoList } from './pages/todo-list/TodoList';
import { TodoCreate } from './pages/todo-create/TodoCreate';

const RouteHandlerBase = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={routes.dashboard} element={<Dashboard />} />
        <Route path={routes.shoppingList} element={<ShoppingList />} />
        <Route path={routes.shoppingCart} element={<ShoppingCart />} />
        <Route path={routes.receipts} element={<Receipts />} />
        <Route path={routes.menu} element={<Menu />} />
        <Route path={routes.calendar} element={<Calendar />} />
        <Route path={routes.calendarEvent} element={<CalendarEvent />} />
        <Route path={routes.settings} element={<Settings />} />
        <Route path={routes.todos} element={<TodoList />} />
        <Route path={routes.createTodo} element={<TodoCreate />} />
        <Route path={'/*'} element={<Navigate to={routes.dashboard} />} />
      </Routes>
    </BrowserRouter>
  );
};

const RouteHandler = withLogin(withHousehold(RouteHandlerBase));
export { RouteHandler };
