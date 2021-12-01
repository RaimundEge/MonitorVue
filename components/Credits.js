app.component('credits', {
    template:
        /*html*/
        `<div class="display"> 
            <div class="item-right">
                <button @click="current=null;getCredits()">Update</button>
            </div>
            <h3>List of recent credit transactions:</h3>
            <div class="displaygrid">
                <div>
                    <div v-for="cr in data" class="creditgrid credit" v-on:click="current=cr" :class="{ 'text-red': cr==current }">
                        <div>{{ formatRelative(cr.timeStamp) }}</div>
                        <div>{{ formatSome(cr.name) }}</div>
                        <div>\${{ cr.amount }}</div>
                    </div>               
                </div>           
                <div v-if="current" class="detail">
                <strong>Transaction Detail:</strong><br>
                    <div v-for="key in Object.keys(current)">
                        <div v-if="key!=='_id'">                     
                            <div v-if="key=='timeStamp'" class="detailgrid">
                                <div>{{ key }}:</div><div>{{ formatTime(current[key]) }}</div>
                            </div>
                            <div v-else class="detailgrid">
                                <div>{{ key }}:</div><div>{{ current[key] }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>`,
    data() {
        return {
            credits: null,
            current: null
        }
    },
    methods: {
        async getCredits() {
            NProgress.start()
            var resp = await axios.get('../CreditCard/')
            this.credits = resp.data         
            // console.log(this.credits)
            NProgress.done()
        },
        formatRelative(when) {
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
        formatSome(data) {          
            return (data.length > 20)?(data.slice(0,19) + "..."):data
        },
        formatTime(when) {
            var d = new Date(when);
            var text = d.getFullYear() + "-" + (d.getMonth()+1).toString().padStart(2,'0') + "-" + d.getDate().toString().padStart(2,'0') + " ";
            text += d.getHours().toString().padStart(2,'0') + ":" + d.getMinutes().toString().padStart(2,'0');           
            return text;
        }
    },
    computed: {
        data() {           
            if (this.credits == null ) {
                this.getCredits()
            }            
            return this.credits
        }
    }
})
