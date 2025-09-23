import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage";
import { fetchUsers } from "./features/users/usersSlice";
import SinglePostPage from "./features/posts/SinglePostPage";

store.dispatch(fetchUsers());

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="post/:id" element={<SinglePostPage />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
