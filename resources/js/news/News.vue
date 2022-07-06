<template>
    <div>
        <div v-if="news === null">...Загрузка</div>
        <div v-else>
           <div class="row">
                <div class="col-md-4" v-for="(article, index) in news" :key="index">
                    <div class="card mb-4 box-shadow">
                    <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" :src="article.image" data-holder-rendered="true">
                    <div class="card-body">
                        <h2 class="card-title">{{ article.title }}</h2>
                        <p class="card-text">{{ article.description }}</p>
                        <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-info">Подробнее</button>
                        </div>
                        <small class="text-muted">{{ article.date }}</small>
                        </div>
                    </div>
                    </div>
                </div>
            </div> 
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: null,
            loading: false,
            // columns: 3,
            title: "Все новости",
            pageNumber: 0
        };
    },
    computed: {
        // rows() {
        //     return this.news === null
        //         ? 0
        //         : Math.ceil(this.news.length / this.columns);
        // },
        pageCount(){
            let l = this.news.length,
                s = this.size;
            // редакция переводчика спасибо комментаторам
            return Math.ceil(l/s);
            // оригинал
            // return Math.floor(l/s);
        },
        paginatedData(){
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.news.slice(start, end);
        }
    },
    methods: {
        // bookablesInRow(row) {
        //     return this.news.slice(
        //         (row - 1) * this.columns,
        //         row * this.columns
        //     );
        // },
        // placeholdersInRow(row) {
        //     return this.columns - this.newsInRow(row).length;
        // },
        nextPage(){
            this.pageNumber++;
        },
        prevPage(){
            this.pageNumber--;
        }
    },
    created() {
        this.loading = true;

        const request = axios.get("/api/news/").then((response) => {
            this.news = response.data.data;
            this.loading = false;
        });
    },
    props: {
        size:{
            type:Number,
            required:false,
            default: 15
        }
    }
};
</script>