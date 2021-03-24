'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert(
       "articles",
       [
         {
           title: "今天天气真好",
           context: "今天天气太好了，欢迎来南京鸡鸣寺欣赏樱花！",
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           title: "今天天气真好",
           context: "南京绿博园的郁金香已经开满了，一起春游叭！",
           createdAt: new Date(),
           updatedAt: new Date(),
         },
       ],
       {}
     );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("articles", null, {});
  }
};
