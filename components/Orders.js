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
