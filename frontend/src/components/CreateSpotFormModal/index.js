import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import CreateSpotForm from './CreateSpotForm';

function CreateSpotFormModal() {
  const [showModal, setShowModal] = useState(false);
  const spot = useSelector(state => state.spots)

  useEffect(() => {
    setShowModal(false)
  },[spot])

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create A Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm />
        </Modal>
      )}
    </>
  );
};

export default CreateSpotFormModal;
