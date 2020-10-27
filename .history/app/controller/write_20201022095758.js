
'use strict';

const Controller = require('egg').Controller;
const { Success } = require('../lib/response_status');

class WriteController extends Controller {

  async draft() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'id' },
    }, ctx.query);
    const draft = await ctx.service.draft.draft(ctx.query);
    ctx.body = Success(1, 'Success', draft);
  }

  async drafts() {
    const { ctx } = this;
    const { uid } = ctx.locals;
    ctx.body = Success(1, 'Success', await ctx.service.draft.drafts(uid));
  }

  async createDraft() {
    const { ctx } = this;
    ctx.validate({
      title: { type: 'string', required: false },
      markdown: { type: 'string', required: false },
    });
    const { uid } = ctx.locals;
    const draft = await ctx.service.draft.createDraft(ctx.request.body, uid);
    ctx.body = Success(1, 'Success', draft);
  }

  async updateDraft() {
    const { ctx, app } = this;
    const errors = app.validator.validate({ id: 'id' }, ctx.request.body);
    console.log(errors);
    ctx.validate({
      id: { type: 'id', required: true },
      title: { type: 'string', required: false },
      markdown: { type: 'string', required: false },
    });
    await ctx.service.draft.updateDraft(ctx.request.body);
    ctx.body = Success(1, 'Success');
  }

  async deleteDraft() {
    const { ctx } = this;
    ctx.validate({ id: 'int' });
    const { id } = ctx.request.body;
    await ctx.service.draft.deleteDraft(id);
    ctx.body = Success(1, 'Success', { id });
  }

  async createPublish() {
    const { ctx } = this;
    ctx.validate({
      markdown: { type: 'string' },
      title: { type: 'string' },
      html: { type: 'string' },
      selectedTag: { type: 'int' },
      selectedCategory: { type: 'int' },
      coverImageUrl: { type: 'string', required: false },
    });
    const { uid } = ctx.locals;
    await ctx.service.article.createPublish(ctx.request.body, uid);
    ctx.body = Success(1, 'Success');
  }

  async articleDetail() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'id' },
    }, ctx.query);
    const [ , detail ] = await Promise.all([
      ctx.service.article.viewPlusOne(ctx.query.id),
      ctx.service.article.detail(ctx.query),
    ]);
    await ctx.service.user.viewPlusOne(detail.user.id);
    ctx.body = Success(1, 'Success', detail);
  }

  async updateArticle() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'id' },
      markdown: { type: 'string' },
      title: { type: 'string' },
      html: { type: 'string' },
      selectedTag: { type: 'int' },
      selectedCategory: { type: 'int' },
      coverImageUrl: { type: 'string', required: false },
    });
    await ctx.service.draft.updateDraft(ctx.request.body);
    ctx.body = Success(1, 'Success');
  }

  async deleteArticle() {
    const { ctx } = this;
    ctx.validate({ id: 'int' });
    const { id } = ctx.request.body;
    await ctx.service.article.deleteArticle(id);
    ctx.body = Success(1, 'Success', { id });
  }

}

module.exports = WriteController;