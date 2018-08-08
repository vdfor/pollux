import * as Koa from 'koa';

class Controller {

  static async find(ctx: Koa.Context) {
    const { current, pageSize, name, sex } = ctx.query;
    const [dealCurrent, dealPageSize] = [+current, +pageSize];
    const start = (dealCurrent - 1) * dealPageSize;
    const end = dealCurrent * dealPageSize;
    const resData = [];
    for (let i = start; i < end; i++) {
      resData.push({
        id: i,
        code: Math.floor(Math.random() * 100),
        name: name ? `${name}${i}` : `Name${i}`,
        sex: sex ? (+sex === 1 ? '男' : '女') : (i % 2 ? '男' : '女'),
        ceateAt: Date.now() - i * 1000 * 60 * 60 * 25
      });
    }
    ctx.body = {
      data: resData,
      total: name || sex ? 200 : 1000
    };
  }

  static async findOne(ctx: Koa.Context) {
    const { id: i } = ctx.params;
    ctx.body = {
      id: i,
      code: Math.floor(Math.random() * 100),
      name: `Name${i}`,
      sex: i % 2 ? '男' : '女',
      website: `https//${i}.example.com`,
      qq: '1234567890' + i,
      github: 'https://github.com/example' + i,
      mobile: '1868888888' + i,
      email: 'example' + i + '@example.com',
      note: '备注信息' + i,
      ceateAt: Date.now() - i * 1000 * 60 * 60 * 25
    };
  }

  static async update(ctx: Koa.Context) {
    const { id: i } = ctx.params;
    if (i === 9) {
      ctx.throw(500, 'ID不匹配');
      return;
    }
    ctx.body = { msg: 'success' };
  }

  static async drop(ctx: Koa.Context) {
    const { id: i } = ctx.params;
    if (i === 7) {
      ctx.throw(500, 'ID不匹配');
      return;
    }
    ctx.body = { msg: 'success' };
  }

}

export default Controller;
