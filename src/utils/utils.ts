import { ItemDate } from '@store/resume/resume.slice';

export const uniqueId = () => `${Math.round(Date.now() * Math.random())}`;

export const displayResumeDates = (startDate: ItemDate, endDate: ItemDate) => {
    let startD = '';
    let endD = '';
    let date = '';

    if (startDate?.year) {
        startD = startDate.year;

        if (startDate.month) {
            startD = `${startDate.month}/${startDate.year}`;
        }

        date = startD;
    }

    if (endDate?.year) {
        endD = endDate.year;

        if (endDate.month) {
            endD = `${endDate.month}/${endDate.year}`;
        }

        if (startDate.year) {
            date = `${startD} - ${endD}`;
        } else {
            date = endD;
        }
    }

    return date;
};
