
function Modal({checkOpen, onClose, children}) {
    return(
        // BACK DROP OF POP - UP
        <>
        <div className={`fixed inset-0 z-50 flex justify-center items-center bg-black/20 transition-opacity
"                       ${checkOpen  ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        
            <div className="bg-white rounded-2xl">
                <button className="text-3xl" onClick={onClose}>X</button>
            </div>
            
            {children}

        </div>
        </>
    );
}


export default Modal;