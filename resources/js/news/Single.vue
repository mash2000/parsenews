<template>
    <div>
        <div v-if="loading">
            ...Загрузка
        </div>
        <div v-else>
          <div class="jumbotron overlay-image" :style="`background: url(${article.image}) no-repeat;`">
            <div class="container">
              <h1 class="display-4 text-center text-white">{{ article.title }}</h1>
              <p class="text-center">
                <a class="btn btn-info btn-lg" target="_blank" :href="article.url" role="button">Перейти</a>
              </p>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <h2>Рейтинг</h2>
                <p>
                  <star-rating                         
                      :rating="article.rating"
                      :star-size="20"
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
                </p>
              </div>
              <div class="col-md-4">
                <h2>Дата</h2>
                <p>{{ setFormatDate(article.date) }}</p>
              </div>
              <div class="col-md-4">
                <h2>Тема</h2>
                <p>{{ article.type }}</p>
              </div>
              <div class="col-md-12">
                <h2>Описание</h2>
                <p>
                  {{  article.description  }}
                </p>
              </div>              
            </div>

            <hr>

          </div>
          <v-dialog />
        </div>
    </div>
</template>

<script>

import moment from 'moment';

export default {
    name: 'Single',
    data() {
        return {
            loading: false,
            article: null,
            rating: null,
        };
    },
    methods: {
        setRating(rating){
            this.rating = rating;
        },
        setFormatDate(date){
            if (date){
                if (date) {
                    return moment(String(date)).format('MM.DD.YYYY, hh:mm')
                }
            }
        },
        async editArticle(){
            if (this.rating != this.article.rating){
                await axios
                    .post(`/api/setRating/${this.article.id}/${this.rating}`)
                    .then((response) => {
                        if (response.status == 200){
                            const newBlock = document.querySelector(`.articles [data-id="${this.article.id}"]`);
                            if (newBlock){
                                if (this.rating > this.article.rating){
                                    newBlock.classList.add('border-success');
                                    newBlock.classList.remove('border-danger');
                                }
                                if (this.rating < this.article.rating){
                                    newBlock.classList.add('border-danger');
                                    newBlock.classList.remove('border-success');
                                }
                            }
                            this.article.rating = this.rating;
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
    created() {
      this.loading = true;
      axios
        .get(`/api/article/${this.$route.params.id}`)
        .then(response => {
          this.article = response.data;
          this.loading = false;
      });
    },
};
</script>