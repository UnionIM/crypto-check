import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '../router/routes';

const AppRouter = () => {
    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={React.createElement(route.component)}
                />
            ))}
        </Routes>
    );
};

export default AppRouter;
