// components/PolicyModal.jsx
import React from 'react';

function PolicyModal({ isOpen, onClose, content, title }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className='text-bold'>{title}</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <button className="btn primary__btn mt-3" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PolicyModal;
