import { useSelector } from 'react-redux';
import AgeChart from './Chart/AgeChart';
import { margin, width, height } from './Chart/const';

const ChartSection = () => {
    const users = useSelector((state) => state.users.users);
    const dimensions = { width, height, margin };

    return <AgeChart users={users} dimensions={dimensions} />;
};

export default ChartSection;
