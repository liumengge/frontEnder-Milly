var express = require("express");
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get("/", async function (req, res, next) {
    var articles = await models.Article.findAll({
      order: [["id", "DESC"]],
    });
    res.json({ articles: articles })
});

router.post("/", async function (req, res, next) {
  var articles = await models.Article.create(req.body);
  res.json({ articles: articles });
});

router.get("/:id", async function (req, res, next) {
  var article = await models.Article.findByPk(req.params.id);
  res.json({ article: article });
});

router.put("/:id", async function (req, res, next) {
  var article = await models.Article.findByPk(req.params.id);
  article.update(req.body)
  res.json({ article: article });
});

router.delete("/:id", async function (req, res, next) {
  var article = await models.Article.findByPk(req.params.id);
  article.destroy(req.body);
  res.json({ msg: "删除成功" });
});

module.exports = router;
