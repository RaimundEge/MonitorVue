app.component('orders', {
    template:
        /*html*/
        `<div class="display"> 
            <div class="item-right">
                <button @click="getOrders()">Update</button>
            </div>
            <h3>List of recent purchase orders:</h3>
            <div v-for="po in data">
                {{ formatDate(po.timeStamp) }} {{ po.custid }} {{ po.order }}
            </div>
         </div>`,
    data() {
        return {
            orders: null
        }
    },
    methods: {
        async getOrders() {
            NProgress.start()
            var resp = await axios.get('../PurchaseOrder/')
            this.orders = resp.data         
            console.log(this.orders)
            NProgress.done()
        },
        formatDate(when) {
            var d = new Date(when).toISOString();
            return d.slice(0, 10) + ' ' + d.slice(11, 16)
        }
    },
    computed: {
        data() {
            var data = this.orders;            
            if (this.orders == null ) {
                this.getOrders()
            }            
            return data
        }
    }
})
