import { Routes, Route, Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { CreatList } from "../CreatList/CreatList";
import { Home } from "../Home/Home";
import { PrivateRoute } from "../PrivateRouter/PrivateRoute";
export const Router = () => {
  return (
    <Routes>
      <Route element={<LayoutHeader />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<LayoutHeader />}>
        <Route path="/lista" element={
          <PrivateRoute>
            <CreatList />
          </PrivateRoute>
          } />
      </Route>
    </Routes>
  );
};

const LayoutHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
