import {
  Avatar,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { Field } from 'formik';

function DetailsInput() {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Category Details</Typography>
      <Stack spacing={3}>
        {/* Category Name Input */}
        <Field name="name">
          {({ field, form }) => (
            <FormControl
              fullWidth
              required
              variant="outlined"
              error={form.touched[field.name] && form.errors[field.name]}
            >
              <InputLabel htmlFor="name_input">Category name</InputLabel>
              <OutlinedInput
                id="name_input"
                type="text"
                label="Category name"
                inputProps={{ 'aria-label': 'Category name' }}
                aria-describedby="name_helper-text"
                {...field}
              />
              <FormHelperText id="name_helper-text">
                {form.touched[field.name]
                  ? form.errors[field.name] || ' '
                  : ' '}
              </FormHelperText>
            </FormControl>
          )}
        </Field>

        {/* Category Image Input */}
        <Field name="image">
          {({ field, form }) => (
            <FormControl
              fullWidth
              required
              variant="outlined"
              error={form.touched[field.name] && form.errors[field.name]}
            >
              <InputLabel htmlFor="image_input" shrink>
                Category Image
              </InputLabel>
              <Avatar
                component="label"
                htmlFor="image_input"
                src={form.values.imageURL}
                alt={field.value?.name}
                variant="square"
                sx={{
                  mt: '1rem',
                  width: '10rem',
                  height: '10rem',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.8 },
                }}
              />
              <input
                hidden
                id="image_input"
                type="file"
                accept="image/*"
                aria-label="Category image"
                aria-describedby="image_helper-text"
                onChange={async ({ target }) => {
                  await form.setFieldValue('image', target.files[0]); // Set image
                  URL.revokeObjectURL(form.values.imageURL); // Release the object URL when no longer needed to free up resources
                  await form.setFieldValue(
                    'imageURL', // imageURL for image preview
                    target.files[0] ? URL.createObjectURL(target.files[0]) : ''
                  ); // Set imageURL
                  await form.setFieldTouched('image', true);
                }}
              />
              <FormHelperText id="image_helper-text">
                {form.touched[field.name]
                  ? form.errors[field.name] || ' '
                  : ' '}
              </FormHelperText>
            </FormControl>
          )}
        </Field>
      </Stack>
    </Stack>
  );
}

export default DetailsInput;
