export const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB');
}

export const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-GB');
}

export const formatDateAndTime = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB') + ", " + d.toLocaleTimeString();
}