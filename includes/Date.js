exports.date = (type) => {
    
    const set       = new Date();
    const day       = set.getDay();
    const date      = set.getDate();
    const month     = set.getMonth();
    const year      = set.getFullYear();
    const hours     = set.getHours();
    const minutes   = set.getMinutes();
    const seconds   = set.getSeconds();
    
    const thisTime  = `${hours}:${minutes}:${seconds}`;
    const thisDate  = `${year}-${month}-${date}`;
    const thisDay   = day


    switch (type) {
        case "date":
            return thisDate
            break;
        case "time":
            return thisTime
            break;
        case "day":
            return thisDay
            break;
        default:
            console.log("Type must be filled")
            break;
    }
}