new Vue({
  el: "#vueParent",
  data: {
    searchList: [],
    searchQuery: "",
    filter: [],
    page: 1,
    total_results: 0,
    loading: false,
    searchFilter: "all",
    sortBy: ""
  },
  methods: {
    async handelSearchInput() {
      this.loading = true;
      // Distruct the results objects
      const {
        code = "",
        response = {},
        response: { results = {} }
      } = await fetch(
        `/api/v1/search?q=${this.searchQuery}&page=` + this.page + `&search=${this.searchFilter}`
      ).then(x => x.json());

      if (code !== "SUCCESS") return alert("Make sure you write sometext!");
      // total works bookss.
      this.searchList = results.work || [];

      // whenever total_results= 0 then this means this is the last page.
      this.total_results = parseInt(response["total-results"]);

      // Hide preloader
      this.loading = false;
      return true;
    },
    async handelNextPage() {
      this.page++;
      await this.handelSearchInput();
    },
    async handelPreivousePage() {
      this.page--;
      await this.handelSearchInput();
    },
    /**
     * The blow functions handels the sort
     * As GoodReads search api does not have a sort method on search
     * Ref: https://www.goodreads.com/api/index#search.books
     */
    async handelSort() {
      this.searchList.sort((a, b) => {
        if (this.sortBy == "ratings_count") {
          if (a.ratings_count.$t > b.ratings_count.$t) return 1;
          if (a.ratings_count.$t < b.ratings_count.$t) return -1;
          return 0;
        }
        if (this.sortBy == "average_rating") {
          if (a.average_rating > b.average_rating) return -1;
          if (a.average_rating < b.average_rating) return 1;
          return 0;
        }
      });
    }
  }
});
