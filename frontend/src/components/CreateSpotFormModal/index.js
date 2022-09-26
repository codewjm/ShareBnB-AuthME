import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import CreateSpotForm from './CreateSpotForm';
import './CreateSpotForm.css'

function CreateSpotFormModal() {
  const [showModal, setShowModal] = useState(false);
  const spot = useSelector(state => state.spots)

  useEffect(() => {
    setShowModal(false)
  },[spot])

  return (
    <>
      <div onClick={() => setShowModal(true)} className="create">Create a Spot</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm />
        </Modal>
      )}
    </>
  );
};

export default CreateSpotFormModal;
