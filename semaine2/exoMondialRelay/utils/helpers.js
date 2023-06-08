exports.formatData = (data) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        if (value === "" || value === null) {
            return acc;
        }
        const newKey = key.toLowerCase();
        if (Array.isArray(value)) {
            acc[newKey] = value.filter(v => v !== "" && v !== null);
        } else {
            acc[newKey] = value;
        }
        return acc;
    }, {});
};

exports.formatHours = (hours) => {
    return hours.string
        .filter(time => time !== "0000")
        .map(time => `${time.slice(0, 2)}:${time.slice(2)}`);
};
