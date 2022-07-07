<template>
    <div>
        <div v-if="loading">
            ...Загрузка
        </div>
        <div v-else>
            <div class="row articles">
                <div 
                    class="col-md-4 col-sm-6 col-12" 
                    v-for="(article, index) in news"
                    :key="index"
                >
                    <div class="card mb-4 box-shadow" :data-id="article.id">
                        <img class="card-img-top" :alt="'Новость №' + article.id + ': ' + article.title" :src="article.image">
                        <div class="card-body">
                            <star-rating                         
                                :rating="article.rating"
                                :star-size="18"
                                :increment="1"
                                :animate="true"
                                :max-rating="10"
                                inactive-color="#808080"
                                active-color="#FFC500"
                                text-class="d-none"
                                @current-rating="setRating"
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
            article: null,
            rating: null,
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
        setRating(rating){
            this.rating = rating;
        },
        async editArticle(article){
            this.article = article;

            if (this.rating != article.rating){
                await axios
                    .post(`/api/setRating/${article.id}/${this.rating}`)
                    .then((response) => {
                        if (response.status == 200){
                            const newBlock = document.querySelector(`.articles [data-id="${article.id}"]`);
                            if (newBlock){
                                if (this.rating > article.rating){
                                    newBlock.classList.add('border-success');
                                    newBlock.classList.remove('border-danger');
                                }
                                if (this.rating < article.rating){
                                    newBlock.classList.add('border-danger');
                                    newBlock.classList.remove('border-success');
                                }
                            }
                            this.article.rating = this.rating;
                            this.article = null;
                            this.rating = null;
                            this.$notify({
                                type: 'success',
                                title: 'Рейтинг успешно изменен',
                            });
                        }
                    })
                    .catch(error => {
                        this.$notify({
                            type: 'error',
                            title: 'Произошла ошибка',
                            text: error
                        });
                    })
            }
        }
    },
    mounted() {
        this.loading = true;
        this.getNews();
    },
};
</script>