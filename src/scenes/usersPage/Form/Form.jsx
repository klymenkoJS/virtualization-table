import { Box, IconButton, TextField, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { tokens } from '../../../theme/themeSettings';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

const Form = ({ onSubmit, onClose, initialValues }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            sx={{
                backgroundColor: colors.primary[400],
            }}
        >
            <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            gap: '20px',
                            backgroundColor: colors.primary[400],
                            padding: '10px',
                        }}
                    >
                        <IconButton size="small" onClick={onClose}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            type="text"
                            label="Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                            error={!!touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                        />
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            type="text"
                            label="Age"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.age}
                            name="age"
                            error={!!touched.age && !!errors.age}
                            helperText={touched.age && errors.age}
                        />
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            type="text"
                            label="City"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.city}
                            name="city"
                            error={!!touched.city && !!errors.city}
                            helperText={touched.city && errors.city}
                        />
                        <IconButton size="small" onClick={handleSubmit}>
                            <SaveIcon fontSize="large" />
                        </IconButton>
                    </Box>
                )}
            </Formik>
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(30, 'Name cannot be more than 30 characters')
        .required('Name is required'),
    age: yup
        .number()
        .required('Age is required')
        .min(1, 'Age must be at least 1 year')
        .max(100, 'Age must be less than or equal to 100 years'),
    city: yup
        .string()
        .required('City is required')
        .min(2, 'City must be at least 2 characters')
        .max(100, 'City cannot be more than 100 characters'),
});

export default Form;
