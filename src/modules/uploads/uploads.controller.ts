import {
    Controller,
    Post,
    UseInterceptors,
    HttpException,
    UploadedFiles,
    Res,
    HttpStatus,
    Get,
    Param,
    Req,
    Delete
} from '@nestjs/common';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import * as mkdirp from 'mkdirp';
import * as fs from 'fs';
import { Public } from '../auth/jwt/jwt-auth.guard';

@Public()
@Controller('api/v1/uploads')
export class UploadsController {

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination(req: Request, file, cb) {
                const dir = `./uploads/images`;
                try {
                    mkdirp.sync(dir);
                    cb(null, dir);
                } catch (e) {
                    throw new HttpException(`Make directory ${e}`, 400);
                }
            },
            filename: (req: Request, file, cb) => {
                cb(null, `${file.fieldname + '-' + Date.now()}${extname(file.originalname)}`);
            },
        }),
    }))
    async uploadImages(@UploadedFiles() images, @Res() res) {
        try {
            const path = `uploads/images/${res.req.file.filename}`;
            return res.status(HttpStatus.OK).send({ path });
        } catch (e) {
            throw new HttpException(`UploadController ${e}`, 400);
        }
    }

    @Get(':types/:file_name')
    seeUploadedFile(@Req() req: Request, @Param('file_name') fileName, @Param('types') types, @Res() res: Response) {
        try {
            const dir = `uploads/${types}`;
            return res.sendFile(fileName, { root: dir }, (err) => {
                if (err) {
                    return res.sendFile('nothing.png', { root: 'uploads/' + types });
                }
            });
        } catch (e) {
            throw new HttpException(`UploadController ${e}`, 400);
        }
    }

    @Delete(':types/:file_name')
    removeFile(@Res() res: Response, @Req() req: any, @Param('types') types: string, @Param('file_name') fileName: string) {
        try {
            const dir = `./uploads/${types}/${fileName}`;
            return fs.unlink(dir, err => {
                if (err) {
                    console.log(err)
                    // If throw error node will stop
                    // throw new HttpException(`unlink ${err}`, 400);
                } else {
                    return res.status(HttpStatus.NO_CONTENT).send();
                }
            });
        } catch (e) {
            console.log(e)
            throw new HttpException(`removeFile ${e}`, 400);
        }
    }
}
