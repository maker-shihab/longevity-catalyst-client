
const formatNumber = (num) => {
    if (num >= 1000000000000000000) {
        return (num / 1000000000000000000).toFixed(1) + 'Q';
    } else if (num >= 1000000000000000) {
        return (num / 1000000000000000).toFixed(1) + 'T';
    } else if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(1) + 'T';
    } else if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
};

export default formatNumber;