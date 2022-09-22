import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import EditSpotForm from './EditSpotForm';

function EditSpotFormModal({ spot }) {
  const [showModal, setShowModal] = useState(false);

  const spots = useSelector((state) => state.spots)


  useEffect(() => {
    setShowModal(false);
  }, [spots]);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Your Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm spot={spot} />
        </Modal>
      )}
    </>
  );
};

export default EditSpotFormModal;
