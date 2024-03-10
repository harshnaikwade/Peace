import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./Routes";
import Error404 from "./Pages/Error404"; // Import the Error404 component

export default function App() {
  const renderRoutes = (routes) => {
    return routes
      .map((route) => {
        if (route.routes) {
          return (
            <Route
              key={route.key}
              path={route.path}
              element={renderRoutes(route.routes)}
            />
          );
        } else if (route.component) {
          const Component = route.component; // Check if route component exists
          return (
            <Route
              key={route.key}
              path={route.path}
              element={<Component />} // Render the component if it exists
            />
          );
        } else {
          console.error(`Component not found for route: ${route.path}`); // Log an error if component is missing
          return null; // Render nothing
        }
      })
      .concat(<Route key="error-404" path="*" element={<Error404 />} />); // Add the Error 404 route at the end
  };

  return (
    <div className="app">
      <Routes>{renderRoutes(routes)}</Routes>
    </div>
  );
}
