import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const HomePage = lazy(() => import('../pages/HomePage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const AuthPage = lazy(() => import('../account-auth/AuthPage'));
const AdminPage = lazy(() => import('../admin/AdminPage'));
const AddBookPage = lazy(() => import('../admin/AddBookPage'));
const DetailsPage = lazy(() => import('../pages/DetailsPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));

function RoutesPage() {
    return (
        <Routes>

            <Route path="/" element={
                <PrivateRoute>
                    <HomePage />
                </PrivateRoute>
            } />

            <Route path="/admin" element={
                <PrivateRoute>
                    <AdminPage />
                </PrivateRoute>
            } />

            <Route path="/add-book" element={
                <PrivateRoute>
                    <AddBookPage />
                </PrivateRoute>
            } />

            <Route path="/:book_id" element={
                <PrivateRoute>
                    <DetailsPage />
                </PrivateRoute>
            } />

            <Route path="/about" element={<AboutPage />} />

            <Route path="/login" element={<AuthPage />} />

            <Route path='*' element={<ErrorPage />} />


        </Routes>
    )
}

export default RoutesPage;
