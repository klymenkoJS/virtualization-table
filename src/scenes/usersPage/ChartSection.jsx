import { useSelector } from 'react-redux';
import AgeChart from './Chart/DonutChart/AgeChart';
import { margin, width, height } from './Chart/DonutChart/const';
import PieChartSection from './Chart/PieChart/PieChartSection';
import { Grid } from '@mui/material';

const ChartSection = () => {
    const users = useSelector((state) => state.users.users);
    const dimensions = { width, height, margin };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <PieChartSection users={users} />
            </Grid>
            <Grid item xs={12} sm={8}>
                <AgeChart users={users} dimensions={dimensions} />
            </Grid>
        </Grid>
    );
};

export default ChartSection;
