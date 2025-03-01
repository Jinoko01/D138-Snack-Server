import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @Get('')
  @ApiExcludeEndpoint()
  helloWorld() {
    return `
    <title>D138 간식 리스트 서버</title>
    <h2>D138 간식 리스트 서버</h2>
    <br/>
    <br/>
    자세한 API 호출 안내는 <a href="/api">/api</a>로 접속해주세요!`;
  }
}
