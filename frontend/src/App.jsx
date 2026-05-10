import AppRoutes from "./routes/AppRoutes";
import AuthLoader from "./components/common/AuthLoader";

function App() {
    return (
        <>
            <AuthLoader />

            <AppRoutes />
        </>
    );
}

export default App;
