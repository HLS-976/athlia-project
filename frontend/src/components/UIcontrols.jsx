import React from 'react';

function UIControls({ onReset, onShowObjects }) {
    return (
        <div
            style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                zIndex: '1000',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '10px',
                borderRadius: '5px',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}
        >
            <button
                onClick={onReset}
                style={{
                    padding: '8px 15px',
                    backgroundColor: '#ff0000', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                Réinitialiser les couleurs
            </button>

            <button
                onClick={onShowObjects}
                style={{
                    padding: '8px 15px',
                    backgroundColor: '#007bff', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Afficher les objets
            </button>
        </div>
    );
}

export default UIControls;