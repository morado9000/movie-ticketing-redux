export default function Modal({openState, handleClose, children}) {
    return (
        <div className={openState ? "fixed inset-0 bg-black-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center" : "hidden"}>
            <div className="w-[600px] flex flex-col">
                <button onClick={handleClose} className="text-xl place-self-end">
                    X
                </button>
                <div className="bg-white p-4 border-2 border-gray-500 drop-shadow-md rounded">
                    {children}
                </div>
            </div>
        </div>
    )
}