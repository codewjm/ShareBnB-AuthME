import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';

export default function ReviewSpotModal () {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)} className="reviewForm">Leave a Review</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}
