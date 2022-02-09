function getDatePart(time){
    let now = new Date(time)
    let year = now.getFullYear();  //取得4位数的年份
    let month = now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
    let date = now.getDate();   
    return `${year}/${month}/${date}`
}

function getTimePart(time){
    let now = new Date(time)
    let hour = now.getHours();     //返回日期中的小时数（0到23）
    let minute = now.getMinutes(); //返回日期中的分钟数（0到59）
    let second = now.getSeconds();
    return `${hour}:${minute}:${second}`
}


export default function computeTime(time) { // time format 2016-11-11T18:56:33.904Z
    // var datePart = time.substring(0, 10).replace(/\-/g, "/");;
    // var timePart = time.substring(11, 19);
    var datePart = getDatePart(time);
    var timePart = getTimePart(time);
    //console.log(datePart + ' ' + timePart);
    var oldTime = (new Date(datePart + ' ' + timePart)).getTime();
    var currTime = new Date().getTime();
    var diffValue = currTime - oldTime;

    var days = Math.floor(diffValue/(24*3600*1000));
    if(days === 0){
        //计算相差小时数
        var leave1 = diffValue%(24*3600*1000); //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1/(3600*1000));
        if(hours === 0) {
            //计算相差分钟数
            var leave2 = leave1 % (3600 * 1000);  //计算小时数后剩余的毫秒数
            var minutes = Math.floor(leave2 / (60 * 1000));
            if(minutes === 0) {
                //计算相差秒数
                var leave3 = leave2 % (60 * 1000);   //计算分钟数后剩余的毫秒数
                var seconds = Math.round(leave3 / 1000);
                return seconds+'秒前';
            }
            return minutes+'分钟前';
        }
        return hours+'小时前';
    }

    return days+'天前';
}