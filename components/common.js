app.mixin({
    methods: {
        formatRelative: function(when) {
            var d = new Date() - new Date(when);
            var seconds = Math.round(d/1000)
            var minutes = Math.round(d/1000/60)
            var hours = Math.round(d/1000/60/60)
            // console.log(seconds, minutes, hours);
            if (seconds<60) {
                return seconds.toString() + " second" + ((seconds==1)?'':'s') + " ago"
            } else if (minutes<60) {
                return minutes.toString() + " minute" + ((minutes==1)?'':'s') + " ago"
            } else if (hours<6) {
                return hours.toString() + " hour" + ((hours==1)?'':'s') + " ago"
            } else { 
                return this.formatTime(when)
            }
        },
        formatSome: function(data) {          
            return (data.length > 25)?(data.slice(0,24) + "..."):data
        },
        formatTime: function(when) {
            var d = new Date(when);
            var text = d.getFullYear() + "-" + (d.getMonth()+1).toString().padStart(2,'0') + "-" + d.getDate().toString().padStart(2,'0') + " ";
            text += d.getHours().toString().padStart(2,'0') + ":" + d.getMinutes().toString().padStart(2,'0');           
            return text;
        }
    }
})