export const formatDate = (inputDate) => {
    const date = new Date(inputDate)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+ minutes : minutes;

    return month + '/' + day + '/' + year + ' @ ' + hours + ':' + minutes + ampm
}