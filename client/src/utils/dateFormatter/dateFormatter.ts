export const dateFormatter = (date: Date) => {
    const formatter = new Intl.DateTimeFormat("ru-RU", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    return formatter.format(date);
}
