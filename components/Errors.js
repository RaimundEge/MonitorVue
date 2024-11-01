app.component('errors', {
    template:
        /*html*/
        `<div class="display"> 
            <div class="left">
                <h3>List of recent erroneous transactions:</h3>  
                <div class="left-list">        
                    <div v-for="err in data" class="errorgrid" v-on:click="current=err" :class="{ 'text-red': err==current }">
                        <div>{{ formatRelative(err.timeStamp) }}</div>
                        <div>{{ err.errors[0] }}</div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="item-right">
                    <div v-if="!current">
                        click on a transaction to see detail
                    </div> 
                    &nbsp;
                    <button @click="current=null;getErrors()">Update</button>
                </div>                                        
                <div v-if="current" class="detail">
                <strong>Error Detail:</strong><br>
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
            errors: null,
            current: null
        }
    },
    methods: {
        async getErrors() {
            NProgress.start()
            var resp = await axios.get('../ProcessorError/')
            this.errors = resp.data
            console.log(this.errors)
            NProgress.done()
        }
    },
    computed: {
        data() {
            if (this.errors == null) {
                this.getErrors()
            }
            return this.errors
        }
    }
})
