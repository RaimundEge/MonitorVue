app.component('credits', {
    template:
        /*html*/
        `<div class="display"> 
            <div class="item-right">
                <span v-if="!current">
                    click on a credit transaction to see detail &nbsp;
                </span>
                <button @click="current=null;getCredits()">Update</button>
            </div>
            <h3>List of recent credit transactions:</h3>          
            <div v-for="cr in data" class="creditgrid credit" v-on:click="current=cr" :class="{ 'text-red': cr==current }">
                <div>{{ formatRelative(cr.timeStamp) }}</div>
                <div>{{ formatSome(cr.name) }}</div>
                <div>\${{ cr.amount }}</div>
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
        }
    },
    computed: {
        data() {
            if (this.credits == null) {
                this.getCredits()
            }
            return this.credits
        }
    }
})
