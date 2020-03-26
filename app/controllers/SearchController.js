const BaseController = require("./BaseController");
const SearchService = require("../services/SearchService");
const { search, validate } = require("../validations/search");
module.exports = class SearchController extends BaseController {
  /**
   * @param {Express} server
   * @param {SearchService} SearchService
   */
  constructor(server, searchService) {
    super(server);
    this.SearchService = searchService || new SearchService();
  }

  /**
   * Register Controller
   */
  init() {
    this.server.get(
      "/api/v1/search",
      validate(search),
      this.searchAction.bind(this)
    );
  }

  /**
   * @api {get} /api/v1/search Search for books
   * @apiVersion 1.0.0
   * @apiName Search V1
   * @apiGroup Search
   * @ApiDescription V1 Search for books in goodreads API
   * @apiUse Response100
   */
  /**
   * Search Action
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   */
  async searchAction(req, res, next) {
    try {
      console.log(req.query);
      let result = await this.SearchService.search(req.query);
      res.status(200).json(super.sendResponse("SUCCESS", result));
    } catch (e) {
      res.status(500).json(super.sendResponse("BACKEND_ERROR", e.message));
    }
  }
};
