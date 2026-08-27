import { X } from "lucide-react";
import { ClipLoader } from "react-spinners";

export default function ConfirmDialog({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmed = false,
    confirmText = "Delete",
    cancelText = "Cancel",
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={onCancel} />

                <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md animate-in fade-in zoom-in-95 duration-200">
                    <div className="absolute right-0 top-0 pr-4 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 hover:bg-gray-100 p-1 transition-colors">
                            <span className="sr-only">Close</span>
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="bg-white px-6 pt-6 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                                    {title}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">{message}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-100">
                        {confirmed ? (
                            <button
                                type="button"
                                onClick={onConfirm}
                                className="inline-flex gap-2 items-center w-full justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition-colors">
                                <span>{confirmText}</span>
                                <ClipLoader size={16} color="white" aria-label="Loading Spinner" data-testid="loader" />
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={onConfirm}
                                    className="inline-flex w-full justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition-colors">
                                    {confirmText}
                                </button>
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors">
                                    {cancelText}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
