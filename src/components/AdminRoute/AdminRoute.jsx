import { useAuth } from '../../hooks/useAuth';
import NotFound from '../NotFound/NotFound';
import AuthRoute from '../AuthRoute/AuthRoute';

function AdminRoute({ children }) {

    const { user } = useAuth();

    return (
        user.isAdmin
            ? children
            : (
                <NotFound
                    linkRoute="/dashboard"
                    linkText="Ir a Dashboard"
                    message="No tienes los permisos para acceder a esta página"
                />
            )
    )
};

const AdminRouteExport = ({ children }) => (
    // Validaciones
    // 1. AuthRoute: Valida si es un usuario
    // 2. AdminRoute: Valida si es un administrador
    <AuthRoute>
        <AdminRoute>{children}</AdminRoute>
    </AuthRoute>
);

export default AdminRouteExport;
