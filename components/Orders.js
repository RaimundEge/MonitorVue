app.component('orders', {
    template:
        /*html*/
        `<div class="display"> 
            <div class="item-right">
                <button @click="current=null;getOrders()">Update</button>
            </div>
            <h3>List of recent purchase orders:</h3>
            <div class="displaygrid">
                <div>
                    <div v-for="po in data" class="ordergrid order" v-on:click="current=po" :class="{ 'text-red': po==current }">
                        <div>{{ formatRelative(po.timeStamp) }}</div>
                        <div>{{ formatSome(po.name) }}</div>
                        <div>\${{ po.amount }}</div>
                    </div>
                </div>           
                <div v-if="current" class="detail">
                    <strong>Order Detail:</strong><br>
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
            orders: null,
            current: null
        }
    },
    methods: {
        async getOrders() {
            NProgress.start()
            var resp = await axios.get('../PurchaseOrder/')
            this.orders = resp.data         
            // console.log(this.orders)
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
            return (data.length > 25)?(data.slice(0,24) + "..."):data
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
            if (this.orders == null ) {
                this.getOrders()
            }            
            return this.orders
        }
    }
})
