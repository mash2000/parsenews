<template>
    <div>
        <div v-if="loading">
            ...Загрузка
        </div>
        <div v-else>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-12" v-for="(article, index) in news" :key="index">
                    <div class="card mb-4 box-shadow">
                    <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" :src="article.image" data-holder-rendered="true">
                    <div class="card-body">
                        <star-rating                         
                            v-model="article.rating"
                            :star-size="18"
                            :increment="0.5"
                            :animate="true"
                            :max-rating="10"
                            inactive-color="#808080"
                            active-color="#FFC500"
                            text-class="d-none"
                            @rating-selected="editArticle(article)"
                        >
                        </star-rating>

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

               <div class="w-100 text-center" v-if="news.length && spiner" v-observe-visibility="handleScrolledToBottom">
                    <InfiniteLoading spinner="bubbles" @infinite="handleScrolledToBottom"></InfiniteLoading>
               </div>
            </div> 
        </div>
        
    </div>
</template>

<script>

import InfiniteLoading from 'vue-infinite-loading';

export default {
    name: 'news',
    components: {
        InfiniteLoading,
    },
    data() {
        return {
            news: [],
            page: 0,
            loading: false,
            spiner: true,
            rating: null,
            article: null,
    };
    },
    methods: {
        async getNews(offset = 0, limit = 6){
            let news = await axios.get(`/api/news/${offset * limit}/${limit}`);
            
            if (JSON.stringify(news.data) == '[]'){
                this.spiner = false;
            }
            else {
                this.news.push(...news.data);
                this.loading = false;
                this.page++;
            }
        },
        handleScrolledToBottom(isVisible) {
            if (!isVisible || !this.spiner) { return }
            
            this.getNews(this.page);
        },
        async editArticle(article){
            this.article = article;
            await axios
                .post(`/api/setRating/${article.id}/${article.rating}`)
                .then((response) => {
                    console.log(response);
                });
        }
    },
    mounted() {
        this.loading = true;
        this.getNews();
    },
};
</script>