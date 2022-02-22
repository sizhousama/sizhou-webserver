/*
 * @Author: sizhou
 * @Date: 2020-11-16 13:53:22
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 14:04:10
 */
/*
 * @Author: sizhou
 * @Date: 2020-09-28 18:30:50
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-02 09:29:19
 */
'use strict';
const Service = require('egg').Service;


class Admin extends Service {
  async draftList({ current, PageSize, orderType, status }) {
    const where = { };
    if (status) where.status = parseInt(status);
    const { count, rows } = await this.ctx.model.Draft.findAndCountAll({
      where,
      offset: (parseInt(current) - 1) * parseInt(PageSize),
      limit: parseInt(PageSize),
      order: [[ orderType, 'DESC' ]],
      attributes: [
        'title',
        'id',
        'cover',
        'createdAt',
        'updatedAt',
        'status',
      ],
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tag',
          attributes: [ 'id', 'name' ],
        },
        {
          model: this.ctx.model.Category,
          as: 'category',
          attributes: [ 'id', 'name' ],
        },
      ],
    });
    return { total: count, list: rows, current: parseInt(current), PageSize: parseInt(PageSize) };
  }

}

module.exports = Admin;
