import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Readable } from 'node:stream';

@Controller('')
export class AppController {
  constructor() {}

  @Get('terms')
  async getTerms(@Res() response: Response) {
    const file = readFileSync(resolve('src', 'infra', 'assets', 'terms.pdf'));

    const stream = new Readable();
    stream.push(file);
    stream.push(null);

    response.set({
      'Content-Type': 'application/pdf',
      'Content-Length': file.length,
    });

    stream.pipe(response);

    return;
  }
}
