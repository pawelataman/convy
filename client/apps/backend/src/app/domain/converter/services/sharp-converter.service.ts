import { BadRequestException, Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import sharp from 'sharp';

import { wrapInPromise } from '@backend/src/app/common/utils/promise';
import { ImageFileFormat } from '../types/image-file-format.type';

@Injectable()
export class SharpConverterService {
  private _converterFnMap: Map<ImageFileFormat, (sharpInstance: sharp.Sharp) => Promise<sharp.Sharp>>;

  constructor() {
    this._converterFnMap = this._createConverterFnMap();
  }

  async convert(sourceBuffer: Buffer, targetFormat: string): Promise<Buffer> {
    let sharpFileInstance = sharp(sourceBuffer);

    if (!(await this._checkImageValid(sharpFileInstance))) {
      throw new UnprocessableEntityException('Unprocessable or corrupted image');
    }

    const converterFunction = this._converterFnMap.get(targetFormat as ImageFileFormat);
    if (!converterFunction) {
      throw new BadRequestException('Image format not supported');
    }

    try {
      sharpFileInstance = await converterFunction(sharpFileInstance);
      return this._toBuffer(sharpFileInstance);
    } catch (e) {
      throw new InternalServerErrorException('Error while formating image');
    }
  }

  private _toJpg(sharpInstance: sharp.Sharp): Promise<sharp.Sharp> {
    return wrapInPromise<sharp.Sharp>(() => sharpInstance.jpeg());
  }

  private _toPng(sharpInstance: sharp.Sharp): Promise<sharp.Sharp> {
    return wrapInPromise<sharp.Sharp>(() => sharpInstance.png());
  }

  private _toBmp(sharpInstance: sharp.Sharp): Promise<sharp.Sharp> {
    // TODO: separate implement BMP conversion  https://github.com/lovell/sharp/issues/806
    return wrapInPromise<sharp.Sharp>(() => sharpInstance);
  }

  private _toSvg(sharpInstance: sharp.Sharp): Promise<sharp.Sharp> {
    // TODO: check if can convert to SVG
    return wrapInPromise<sharp.Sharp>(() => sharpInstance);
  }

  private _toAvif(sharpInstance: sharp.Sharp): Promise<sharp.Sharp> {
    return wrapInPromise<sharp.Sharp>(() => sharpInstance.avif());
  }

  private _toTiff(sharpInstance: sharp.Sharp): Promise<sharp.Sharp> {
    return wrapInPromise<sharp.Sharp>(() => sharpInstance.tiff());
  }

  private _toHeif(sharpInstance: sharp.Sharp): Promise<sharp.Sharp> {
    return wrapInPromise<sharp.Sharp>(() => sharpInstance); // TODO: implement
  }

  private _toGif(sharpInstance: sharp.Sharp): Promise<sharp.Sharp> {
    return wrapInPromise<sharp.Sharp>(() => sharpInstance.gif());
  }

  private _toWebp(sharpInstance: sharp.Sharp): Promise<sharp.Sharp> {
    return wrapInPromise<sharp.Sharp>(() => sharpInstance.webp());
  }

  private _toJp2(sharpInstance: sharp.Sharp): Promise<sharp.Sharp> {
    return wrapInPromise<sharp.Sharp>(() => sharpInstance); // TODO: implement
  }

  private _toFits(sharpInstance: sharp.Sharp): Promise<sharp.Sharp> {
    return wrapInPromise<sharp.Sharp>(() => sharpInstance); // TODO: implement
  }

  private _toJxl(sharpInstance: sharp.Sharp): Promise<sharp.Sharp> {
    return wrapInPromise<sharp.Sharp>(() => sharpInstance); // TODO: implement
  }

  private _toRaw(sharpInstance: sharp.Sharp): Promise<sharp.Sharp> {
    return wrapInPromise<sharp.Sharp>(() => sharpInstance); // TODO: implement
  }

  private _createConverterFnMap(): Map<ImageFileFormat, (sharpInstance: sharp.Sharp) => Promise<sharp.Sharp>> {
    return new Map([
      ['jpeg', this._toJpg.bind(this)],
      ['jpg', this._toJpg.bind(this)],
      ['webp', this._toWebp.bind(this)],
      ['png', this._toPng.bind(this)],
      ['avif', this._toAvif.bind(this)],
      ['tiff', this._toTiff.bind(this)],
      ['tif', this._toTiff.bind(this)],
      ['gif', this._toGif.bind(this)],
    ]);
  }

  private async _checkImageValid(sharpFileInstance: sharp.Sharp): Promise<boolean> {
    try {
      await sharpFileInstance.stats();
      return true;
    } catch (e) {
      return false;
    }
  }

  private _toBuffer(sharpFileInstance: sharp.Sharp): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      sharpFileInstance.toBuffer((error, buffer) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(buffer);
      });
    });
  }
}
