export default function diffTimeMin(updatedAt) {
    const currDate = new Date();
    const pastDate = new Date(updatedAt);
    const diffInMs = currDate - pastDate;
    const diffInMin = Math.floor(diffInMs / 1000 / 60);
    return diffInMin;
}
