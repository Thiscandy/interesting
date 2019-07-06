import { Controller, Get, Req, Res, Param, Post, Body, Header, HttpStatus } from '@nestjs/common';
import { Dto } from './user.dto'


@Controller('test')
export class TestController {
	user = [{ id:1, name: 'test', age: 32 }];

	// get 请求
	@Get()
	getHello(@Res() res) {
	  res.status(HttpStatus.OK).json(this.user);
	}

	@Get(':id')
	getUser(@Req() req, @Res() res, @Param('id') id) {
		console.log('Request 路径: ' + req.path);
		console.log('Resource id: ' + id);
		res.status(HttpStatus.OK).json(this.user.find(user => user.id==id));
	}

	// post 请求
	@Post()
	@Header('Access-Control-Allow-Origin', '*')
	dto(@Res() res, @Body() dto: Dto) {
		console.dir(dto);
		var obj = { msg: '创建成功', code: 0 };
		if (!dto.name) {
			obj.msg = '缺少参数 name';
			obj.code = 1;
		}
		if (!dto.age) {
			obj.msg = '缺少参数 age';
			obj.code = 1;
		}
		res.status(HttpStatus.CREATED).json(obj).send();
	}
}
