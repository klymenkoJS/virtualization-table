import { useSelector } from 'react-redux';
import AgeChart from './DonutChart/AgeChart';
import PieChartSection from './PieChart/PieChartSection';
import { Grid } from '@mui/material';

const ChartSection = () => {
    const users = useSelector((state) => state.users.users);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <PieChartSection users={users} />
            </Grid>
            <Grid item xs={12} sm={8}>
                <AgeChart users={users} />
            </Grid>
        </Grid>
    );
};

export default ChartSection;
