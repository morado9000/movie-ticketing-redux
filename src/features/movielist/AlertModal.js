export default function AlertModal({openState, handleClose, children}) {
    
    return (
        <>
            <div className={openState ? "fixed inset-0 z-20 bg-black bg-opacity-50" : "hidden" }>
                <div className="flex flex-col w-1/4 h-1/4 place-content-center rounded-lg bg-white mx-auto">
                    <div className="flex flex-col place-content-center text-center px-6 my-3">
                        {children}
                        <div className="self-end border-2 bg-white absolute z-30 px-3 py-1 top-0 rounded-full">
                            <button onClick={handleClose}>
                                <p className="text-2xl">X</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}