import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '../router/routes';

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={React.createElement(component)}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
