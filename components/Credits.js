app.component('credits', {
    template:
        /*html*/
        `<div class="display"> 
            <div class="item-right">
                <button @click="getCredits()">Update</button>
            </div>
            <h3>List of recent credit transactions:</h3>
            <div v-for="cr in data">
                {{ cr }}
            </div>
         </div>`,
    data() {
        return {
            credits: null
        }
    },
    methods: {
        async getCredits() {
            NProgress.start()
            var resp = await axios.get('../CreditCard/')
            this.credits = resp.data         
            console.log(this.credits)
            NProgress.done()
        },
        formatDate(when) {
            var d = new Date(when).toISOString();
            return d.slice(0, 10) + ' ' + d.slice(11, 16)
        }
    },
    computed: {
        data() {
            var data = this.credits;            
            if (this.credits == null ) {
                this.getCredits()
            }            
            return data
        }
    }
})
