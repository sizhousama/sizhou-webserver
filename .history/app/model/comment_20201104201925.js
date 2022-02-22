/*
 * @Author: sizhou
 * @Date: 2020-09-28 18:30:50
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-04 20:07:03
 */
'use strict';

module.exports = app => {
  const { INTEGER, TEXT } = app.Sequelize;
  const Comment = app.model.define('comments', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    uid: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      comment: '评论人id',
    },
    reply_id: {
      type: INTEGER,
      allowNull: false,
      comment: '被评论人id',
    },
    parent_id: {
      type: INTEGER,
      defaultValue: 0,
      allowNull: false,
      comment: '父级评论id',
    },
    article_id: {
      type: INTEGER,
      allowNull: false,
    },
    content: {
      type: TEXT,
      defaultValue: null,
      comment: '评论内容',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->正常,2->删除',
    },
  });
  Comment.associate = () => {
    app.model.Comment.belongsTo(app.model.User, { as: 'user', foreignKey: 'uid' });
    app.model.Comment.hasMany(app.model.Comment, { as: 'replys', foreignKey: 'parent_id' });
    app.model.Comment.belongsTo(app.model.Article, { as: 'article' });
  };
  return Comment;
};

