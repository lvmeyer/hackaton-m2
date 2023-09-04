import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #00BB7E0',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

export default function ModalInfo() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Plus d'informations</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Formations
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Les formations sont réalisées en fonction des disponibilités de nos experts. Chaque formation est composée de 5 niveaux. Après visionnage d'une formation, vous obtenez un badge de compétence en fonction du niveau de celle-ci.
            <br/> Lorsque vous rejoignez une formation, un lien vous sera envoyé par mail par nos équipes pour rejoindre la formation.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}