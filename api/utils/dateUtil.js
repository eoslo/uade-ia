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

    formattedDateArgentinaWithOutHourMinutes(d = new Date) {
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return `${day}/${month}/${year}`;
    }


    formattedDateArgentinaForPayroll(d) {
        var today = new Date();
        var paying_day;

        //last day of the month
        if(d==0){
            var first_day_of_next_month = new Date(today.getFullYear(),today.getMonth()+1,1);
            paying_day = new Date(first_day_of_next_month - 1);
        }else{
            paying_day = new Date(today.getFullYear(),today.getMonth()+1,d);
        }
        return this.formattedDateArgentinaWithOutHourMinutes(paying_day)
    }
}

module.exports=dateUtil;