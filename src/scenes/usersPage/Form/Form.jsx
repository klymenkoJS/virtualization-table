import { Grid, IconButton, TextField, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { tokens } from '../../../theme/themeSettings';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

const Form = ({ onSubmit, onClose, initialValues }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
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
                <form onSubmit={handleSubmit}>
                    <Grid
                        container
                        sx={{
                            backgroundColor: colors.primary[400],
                            alignItems: 'center',
                            p: 2,
                            gap: 2,
                        }}
                    >
                        <Grid item order={{ xs: -1, sm: 0 }}>
                            <IconButton size="small" onClick={onClose}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={true}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={true}>
                            <TextField
                                fullWidth
                                label="Age"
                                name="age"
                                value={values.age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.age && Boolean(errors.age)}
                                helperText={touched.age && errors.age}
                            />
                        </Grid>
                        <Grid item xs={12} sm={true}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.city && Boolean(errors.city)}
                                helperText={touched.city && errors.city}
                            />
                        </Grid>
                        <Grid item order={{ xs: -1, sm: 0 }}>
                            <IconButton type="submit" size="small">
                                <SaveIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
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
