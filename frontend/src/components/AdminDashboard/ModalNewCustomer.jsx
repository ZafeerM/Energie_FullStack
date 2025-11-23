
function Modal({checkOpen, onClose, children}) {
    return(
        // BACK DROP OF POP - UP
        <>
        <div className={`fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/30 transition-all duration-500
"                       ${checkOpen  ? "opacity-100 visible backdrop-blur-xs" : "opacity-0 invisible"}`}>
        
            
            <div className="bg-white rounded-md flex flex-col w-max">
                <div className="justify-end flex px-3 font-bold">
                    <button className="text-2xl hover:cursor-pointer hover:opacity-70" onClick={onClose}>X</button>
                </div>
                {children}
            </div>

        </div>
        </>
    );
}


export default Modal;