import Spinner from "components/Spinner";
import Layout from "layout/Layout";
import {
  Login,
} from "pages";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Suspense
      fallback={
        <Layout>
          <Spinner size={100} />
        </Layout>
      }
    >
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route index element={<h1>Hello World</h1>} />
      </Routes>
    </Suspense>
  );
}

export default App;
