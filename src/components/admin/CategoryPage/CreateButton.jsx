import { AddCircleRounded } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import { useState } from 'react';
import CreateModal from './CreateCategoryModal/CreateModal';

function CreateButton({ handleOnReload }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <Tooltip title="Add new category" arrow>
        <Button
          color="error"
          size="small"
          variant="contained"
          startIcon={<AddCircleRounded />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Category
        </Button>
      </Tooltip>
      <CreateModal
        {...{
          isCreateModalOpen,
          setIsCreateModalOpen,
          handleOnReload,
        }}
      />
    </>
  );
}

export default CreateButton;
