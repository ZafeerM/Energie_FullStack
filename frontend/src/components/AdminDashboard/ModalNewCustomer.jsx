
function Modal({checkOpen, onClose, children}) {
    return(
        // BACK DROP OF POP - UP
        <>
        <div className={`fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/30 transition-all duration-500
"                       ${checkOpen  ? "opacity-100 visible backdrop-blur-xs" : "opacity-0 invisible"}`}>
        
            
            <div className="bg-white rounded-2xl flex">
                <button className="text-3xl" onClick={onClose}>X</button>
            </div>

            <div>
                {children}
            </div>

        </div>
        </>
    );
}


export default Modal;