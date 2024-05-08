import dayjs from 'dayjs'; // Make sure to import dayjs if you're using it

export const handleFinishCalculation = (estStart, hours) => {
    if (!estStart || isNaN(new Date(estStart).getTime())) {
        return null;
    }
    const estStartDate = new Date(estStart + 'Z');

    // Extract the integer part and the fractional part of the hours
    const wholeHours = Math.floor(hours);
    const fractionOfHour = hours - wholeHours;

    // Calculate minutes from the fractional part of hours
    const minutes = Math.round(fractionOfHour * 60);

    // Add whole hours and minutes separately
    estStartDate.setUTCHours(estStartDate.getUTCHours() + wholeHours);
    estStartDate.setUTCMinutes(estStartDate.getUTCMinutes() + minutes);

    return estStartDate.toISOString().slice(0, 19).replace('T', ' ');
};

export const calculateDuration = (start, end) => {
    if (!start || !end || !dayjs(start).isValid() || !dayjs(end).isValid()) {
        return null;
    }
    return dayjs(end).diff(dayjs(start), 'hour', true); // Returns the difference in hours, including fractions
};
