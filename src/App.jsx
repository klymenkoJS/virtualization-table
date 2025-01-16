import './styles/index.css';
import UsersPage from './scenes/usersPage/UsersPage';
import Topbar from './scenes/components/bars/Topbar';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { useMode } from './hooks/useMode';
import { ColorModeContext } from './theme/themeContext';

const App = () => {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box maxWidth="900px" m="0 auto">
                    <Topbar />
                    <UsersPage />
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
