class dateUtil{
    formattedDateArgentina(d = new Date) {
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());
        let hours = String(d.getHours());
        let minutes = String(d.getMinutes());
        let seconds = String(d.getSeconds());

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hours.length < 2) hours = '0' + hours;
        if (minutes.length < 2) minutes = '0' + minutes;
        if (seconds.length < 2) seconds = '0' + seconds;

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    formattedDateArgentinaForPayroll(d) {
        if(d>28){
            d   =   0;
        }
        var d = new Date((new Date()).getFullYear(), (new Date()).getMonth()+1, d);
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return `${day}/${month}/${year}`;
    }
}

module.exports=dateUtil;