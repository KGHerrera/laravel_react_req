import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton } from '@material-tailwind/react';

const ModalCustom = ({ isOpen, closeModal, children }) => {
    const modalRef = useRef(null);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-10"
                    onMouseDown={handleClickOutside}
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        exit={{ y: -50 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="bg-white rounded shadow-md relative"
                    >
                        {/* <div className='flex justify-end w-full'>
                            <IconButton variant='text' onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                                <span className='fa fa-close'></span>
                            </IconButton>
                        </div> */}
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalCustom;



