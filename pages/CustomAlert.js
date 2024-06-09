import React from 'react';

const CustomAlert = ({ message, type, onClose, loading }) => {
  if (!message && !loading) return null;

  let alertClass = '';
  switch (type) {
    case 'success':
      alertClass = 'bg-green-100 border-green-400 text-green-700';
      break;
    case 'error':
      alertClass = 'bg-red-100 border-red-400 text-red-700';
      break;
    case 'loading':
      alertClass = 'bg-blue-100 border-blue-400 text-blue-700';
      break;
    default:
      alertClass = 'bg-blue-100 border-blue-400 text-blue-700';
  }

  return (
    <div className={`border-l-4 p-4 mb-4 ${alertClass}`} role="alert">
      {loading ? (
        <>
          <p className="font-bold">Loading...</p>
          <p>Please wait while your file is being uploaded.</p>
        </>
      ) : (
        <>
          <p className="font-bold">{type === 'success' ? 'Success' : 'Error'}</p>
          <p>{message}</p>
          <button onClick={onClose} className="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded">
            Close
          </button>
        </>
      )}
    </div>
  );
};

export default CustomAlert;
