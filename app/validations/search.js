const { Joi, validate } = require("express-validation");
module.exports.search = {
  query: Joi.object({
    q: Joi.string()
      .required()
      .label("Query is required. You have to enter sometext i.e: Book Name"),
    page: Joi.number().label("Page should be a number"),
    search: Joi.string()
      .required()
      .valid("all", "title", "author", "genre")
      .label(`Invaild fliter! Please select on of of "all", "title", "author", "genre"s `)
  })
};

module.exports.validate = validate;
