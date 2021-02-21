import { SummaryDoc } from './../../shared/interfaces/summary-doc.interface';
import { ContactInfo } from './../../shared/interfaces/contact-info.interface';
import { OrdersService } from '../service/orders.service';
import { Orders } from '../../../entities/orders.entity';
import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import * as PDFDocument from 'pdfkit';
import '../../shared/transform/currency';

@Crud({
    model: {
        type: Orders,
    },
    params: {
        id: {
            field: 'order_id',
            type: 'number',
            primary: true
        },
    },
    query: {
        join: {
            orders_item: {
                eager: true
            }
        }
    },
})
@Controller('api/v1/orders')
@ApiTags('Orders')
export class OrdersController implements CrudController<Orders> {
    private _doc: any;
    private _now = new Date();
    private _year = this._now.getFullYear();
    private _month = this._now.getMonth() + 1 < 10 ? '0' + (this._now.getMonth() + 1) : this._now.getMonth() + 1;
    private _date = this._now.getDate() < 10 ? '0' + this._now.getDate() : this._now.getDate();
    private _toDay = `${this._year}-${this._month}-${this._date}`;
    private _width = 500;
    private _regular = 'assets/fonts/THSarabunNew.ttf';
    private _bold = 'assets/fonts/THSarabunNew Bold.ttf';
    private _logo = 'assets/images/logo.png';

    constructor(
        public service: OrdersService
    ) { }

    @Override()
    get base(): CrudController<Orders> {
        return this;
    }

    @Override()
    async createOne(
        @ParsedRequest() params: CrudRequest,
        @ParsedBody() order: Orders,
        @Req() req: any
    ) {
        const { order_code } = await this.service.generateOrderCode();
        order.order_code = order_code;
        return this.base.createOneBase(params, order);
    }

    @Get(':id/exports/pdf')
    async exportOrderPDF(@Res() res, @Req() req, @Param('id') id: number) {
        console.log(req.query);
        const data = await this.service.findOne(id);
        const title = 'รายการสั่งซื้อ'
        this._doc = new PDFDocument({
            size: 'A4',
            margin: 50,
            info: {
                Title: title,
                Author: 'Admin System',
                Keywords: 'pdf;javascript',
                CreationDate: this._now
            }
        });

        this._doc.font(this._regular);
        this.generateHeader(this._doc, {
            title: title,
            paperType: 'original',
            currentPage: 'original' === 'original' ? 1 : 2,
            totalPage: 2
        });
        this._doc.moveDown();
        this.generateContactInfo(this._doc, title, {
            no: data.order_code,
            createdDate: data.order_start_date,
            dueDate: data.order_end_date,
            refNo: data.order_ref_no,
            seller: data.order_seller,
            company: data.order_contact_company,
            code: data.order_contact_code,
            name: data.order_contact_name,
            address: data.order_contact_address,
            email: data.order_contact_email,
            phonenumber: data.order_contact_phonenumber,
            tin: data.order_contact_tin,
        }, this._width);
        this._doc.moveDown();
        this.generateHeadTable(this._doc, this._width);
        this._doc.moveDown();
        let rows = [];
        let i = 1;
        for (const item of data.orders_item) {
            rows.push([
                i++,
                item.order_item_product,
                item.order_item_qty,
                item.order_item_price.currency(),
                '00.00',
                (item.order_item_price * item.order_item_qty).currency()
            ]);
        }
        this.generateBodyTable(this._doc, this._width, rows);
        this._doc.moveDown();
        this.generateFooter(this._doc, this._width, {
            note: data.order_note,
            total: data.order_subtotal.currency(),
            discount: data.order_discount.currency(),
            aftdisc: (data.order_subtotal - data.order_discount).currency(),
            vat: (0).toFixed(2)
        });
        this.generateFooterSummary(this._doc, data.order_total.currency());
        this.generateSignature(this._doc, this._width, {
            fistPosition: 'Received Signature',
            secondPosition: 'Authorized Signature'
        });

        this._doc.end();
        res.contentType('application/pdf')
        return await this._doc.pipe(res);
    }

    private generateHeader(doc, info: { title: string, paperType: string, currentPage: number, totalPage: number }) {
        let startY = 50;
        const startX = 158;

        doc.image(this._logo, 28, startY + 7, { width: 145 })
            .moveDown()
            //ด้านซ้าย
            .fontSize(20)
            .font(this._bold)
            .text("HTIN HTIN Network Co., LTD", startX, startY)
            .fontSize(12)
            .text("No.(4/27), 4th Street, Maekhaung Quarter,", startX, startY += 28)
            .moveDown()
            .text("Tachileik Township, Shan State (East), Myanmar", startX, startY += 17)
            .moveDown()
            .text("Email : htinhtinnetwork.com.th@gmail.com", startX, startY += 17)
            .moveDown()
            .text("Phone   : 084-52504, 084-52169, 09-899988819", startX, startY += 17)
            .moveDown()

            //ด้านขวา
            .font(this._bold)
            .fontSize(20)
            .text(info.title, startX, 50, { align: "right" })
            .moveDown()
            .font(this._regular)
            .text(info.paperType, startX, 75, { align: "right" })
            .moveDown()
            .fontSize(16)
            .text(`page ${info.currentPage}/${info.totalPage}`, startX, 125, { align: "right" })
            .moveDown()

    }

    private generateContactInfo(doc, title: string, info: ContactInfo, width) {
        const startY = 160;

        const rows = [
            [`Customer : `, `${info.code || '-'}/${info.name}`, `${title} No : `, `${info.no}${info.refNo ? `(${info.refNo})` : ''}`],
            [`Phone : `, `${info.phonenumber}`, `${title} Date : `, info.createdDate],
            [`Taxpayer Identification No. : `, `${info.tin || '-'}`, `Seller : `, `${info.seller}`],
            [`Address : `, `${info.address}`, `Due Date : `, `${info.dueDate}`],
        ];

        doc.font(this._bold);
        doc.fontSize(12);
        const startX = 50;
        const distanceY = 15;
        const distanceX = 17;

        const columnSize = [
            { distanceX: distanceX, width: 15, align: 'left', font: 'bold' },
            { distanceX: distanceX, width: 35, align: 'right', font: 'regular' },
            { distanceX: distanceX, width: 25, align: 'left', font: 'bold' },
            { distanceX: distanceX, width: 25, align: 'right', font: 'regular' },
        ];

        let currentY = startY;

        rows.forEach((value: any) => {
            let currentX = startX;

            value.forEach((text, index) => {
                const blockSize = (width / 100) * columnSize[index].width;
                //Write text
                switch (columnSize[index].font) {
                    case 'regular':
                        doc.font(this._regular);
                        break;
                    case 'bold':
                        doc.font(this._bold);
                        break;
                    default:
                }
                switch (columnSize[index].align) {
                    case 'center':
                        doc.text(text, currentX, currentY, { width: blockSize, align: 'center' });
                        break;
                    case 'right':
                        doc.text(text, currentX - 8, currentY, { width: blockSize, align: 'right' });
                        break;
                    case 'left':
                        doc.text(text, currentX + columnSize[index].distanceX, currentY);
                        break;
                    default:
                        doc.text(text, currentX + columnSize[index].distanceX, currentY);
                }
                currentX += blockSize;
            });
            // New line
            currentY += distanceY;
        });

        this.generateLineY(doc, 150);
        this.generateLineY(doc, doc.y + 20);
        this.generateLineX(doc, 50, 150, 240);
        this.generateLineX(doc, 300, 150, 240);
        this.generateLineX(doc, 550, 150, 240);
        this._doc.moveDown(0.5);
    }

    private generateLineY(doc, y) { // y => จุดที่วาดเส้นแนวนอน
        doc
            .strokeColor("#aaaaaa")
            .lineWidth(1)
            .moveTo(50, y)
            .lineTo(550, y)
            .stroke();
    }

    private generateLineX(doc, x, y, z) { // [x,y] => จุดที่เริ่ม ,[x,z] => จุดสิ้นสุด เส้นแนวตั้ง
        doc
            .strokeColor("#aaaaaa")
            .lineWidth(1)
            .moveTo(x, y)
            .lineTo(x, z)
            .stroke();
    }

    private generateHeadTable(doc, width) {
        doc.fontSize(12);
        doc.font(this._bold);
        const data = [
            ['No', 'Description', 'Qty', 'Price', 'Discount', 'Amount'],
        ];

        const startY = doc.y + 5;
        const startX = 50;
        const distanceY = 15;
        const distanceX = 15;

        const columnSize = [
            { distanceX: distanceX, width: 8, align: 'center' },
            { distanceX: distanceX + 52, width: 37, align: 'center' },
            { distanceX: distanceX, width: 10, align: 'center' },
            { distanceX: distanceX, width: 15, align: 'right' },
            { distanceX: distanceX + 10, width: 15, align: 'right' },
            { distanceX: distanceX + 10, width: 15, align: 'right' },
        ];

        let currentY = startY;

        data.forEach(value => {
            let currentX = startX;

            value.forEach((text, index) => {
                let blockSize = (width / 100) * columnSize[index].width;
                //Write text
                switch (columnSize[index].align) {
                    case 'center':
                        doc.text(text, currentX, currentY, { width: blockSize, align: 'center' });
                        break;
                    case 'right':
                        doc.text(text, currentX - 8, currentY, { width: blockSize, align: 'right' });
                        break;
                    case 'left':
                        doc.text(text, currentX + columnSize[index].distanceX, currentY);
                        break;
                    default:
                        doc.text(text, currentX + columnSize[index].distanceX, currentY);
                }

                //Create rectangles
                doc
                    .lineJoin("miter")
                    .rect(currentX, currentY, blockSize, distanceY)
                    .stroke();
                // Next to column
                currentX += blockSize;
            });
            // New line
            currentY += distanceY;
        });
    }

    private generateBodyTable(doc, width, rows: any[]) {
        doc.moveDown(0.3);
        doc.font(this._regular);
        doc.fontSize(12);

        const startY = doc.y - 17;
        const startX = 50;
        const distanceY = 15;
        const distanceX = 17;

        const columnSize = [
            { distanceX: distanceX + 4, width: 8, align: 'center' },
            { distanceX: distanceX, width: 37 },
            { distanceX: distanceX, width: 10, align: 'center' },
            { distanceX: distanceX, width: 15, align: 'right' },
            { distanceX: distanceX, width: 15, align: 'right' },
            { distanceX: distanceX, width: 15, align: 'right' },
        ];

        let currentY = startY;

        rows.forEach((value: any) => {
            let currentX = startX;

            value.forEach((text, index) => {
                const blockSize = (width / 100) * columnSize[index].width;
                //Write text
                switch (columnSize[index].align) {
                    case 'center':
                        doc.text(text, currentX, currentY, { width: blockSize, align: 'center' });
                        break;
                    case 'right':
                        doc.text(text, currentX - 8, currentY, { width: blockSize, align: 'right' });
                        break;
                    case 'left':
                        doc.text(text, currentX + columnSize[index].distanceX, currentY);
                        break;
                    default:
                        doc.text(text, currentX + columnSize[index].distanceX, currentY);
                }
                currentX += blockSize;
            });
            // New line
            currentY += distanceY;
        });

        this.generateLineX(doc, 50, 250, 600);
        this.generateLineX(doc, 90, 250, 600);
        this.generateLineX(doc, 275, 250, 600);
        this.generateLineX(doc, 325, 250, 600);
        this.generateLineX(doc, 400, 250, 600);
        this.generateLineX(doc, 475, 250, 600);
        this.generateLineX(doc, 550, 250, 600);
    }

    private generateFooter(doc, width, info: SummaryDoc) {
        let rows = [];
        if (info.aftdisc) {
            rows = [
                [`Note: ${info.note || '-'}`, 'Subtotal', info.total],
                ['', 'Discount', info.discount],
                ['', 'After Discount', info.aftdisc],
                ['', 'Vat (10%)', info.vat],
            ]
        }

        doc.font(this._bold);
        doc.fontSize(12);
        //const startY = doc.y + 275;
        const startY = 605;
        const startX = 50;
        const distanceY = 15;
        const distanceX = 17;

        const columnSize = [
            { distanceX: distanceX, width: 55, },
            { distanceX: distanceX, width: 30, align: 'right' },
            { distanceX: distanceX, width: 15, align: 'right' },
        ];

        let currentY = startY;

        rows.forEach((value: any) => {
            let currentX = startX;

            value.forEach((text, index) => {
                const blockSize = (width / 100) * columnSize[index].width;
                //Write text
                switch (columnSize[index].align) {
                    case 'center':
                        doc.text(text, currentX, currentY, { width: blockSize, align: 'center' });
                        break;
                    case 'right':
                        doc.text(text, currentX - 8, currentY, { width: blockSize, align: 'right' });
                        break;
                    case 'left':
                        doc.text(text, currentX + columnSize[index].distanceX, currentY);
                        break;
                    default:
                        doc.text(text, currentX + columnSize[index].distanceX, currentY);
                }
                currentX += blockSize;
            });
            // New line
            currentY += distanceY;
        });

        // doc
        //     .fontSize(12)
        //     .font(this._bold)
        //     .text(`Note: ${info.note || '-'}`, 65, 605)
        //     .font(this._regular)
        //     .text("Subtotal", 432, 605)
        //     .text("Discount", 432, 628)
        //     .text("Vat (7%)", 432, 650)

        //     .text(info.total, 382, 605, { align: "right" })
        //     .text(info.discount, 382, 628, { align: "right" })
        //     .text(info.vat, 382, 650, { align: "right" })
        //     .moveDown();

        this.generateLineY(doc, 600);
        this.generateLineY(doc, 670);
        this.generateLineX(doc, 50, 600, 660);
        this.generateLineX(doc, 325, 600, 660);
        this.generateLineX(doc, 475, 600, 660);
        this.generateLineX(doc, 550, 600, 660);
    }

    private generateFooterSummary(doc, sumTotal: any) {
        doc
            .font(this._bold)
            .fontSize(12)
            // .text(`( ${this.arabicNumberToText(sumTotal)} )`, 120, 673)
            .text("Total", 442, 673)
            .text(sumTotal, 382, 673, { align: "right" })
            .moveDown(1);

        this.generateLineY(doc, 690);
        this.generateLineX(doc, 50, 660, 690);
        this.generateLineX(doc, 325, 660, 690);
        this.generateLineX(doc, 475, 660, 690);
        this.generateLineX(doc, 550, 660, 690);
    }

    private generateSignature(doc, width, info: { fistPosition: string, secondPosition: string }) {

        const rows = [
            ['( ................................................................ )', '( ................................................................ )'],
            ['Date ........./........./.........', 'Date ........./........./.........'],
            [info.fistPosition, info.secondPosition]
        ]
        doc.font(this._bold);
        doc.fontSize(12);
        const startY = doc.y + 35;
        const startX = 50;
        const distanceY = 15;
        const distanceX = 17;

        const columnSize = [
            { distanceX: distanceX, width: 50, align: 'center' },
            { distanceX: distanceX, width: 50, align: 'center' },
        ];

        let currentY = startY;

        rows.forEach((value: any) => {
            let currentX = startX;

            value.forEach((text, index) => {
                const blockSize = (width / 100) * columnSize[index].width;
                //Write text
                switch (columnSize[index].align) {
                    case 'center':
                        doc.text(text, currentX, currentY, { width: blockSize, align: 'center' });
                        break;
                    case 'right':
                        doc.text(text, currentX - 8, currentY, { width: blockSize, align: 'right' });
                        break;
                    case 'left':
                        doc.text(text, currentX + columnSize[index].distanceX, currentY);
                        break;
                    default:
                        doc.text(text, currentX + columnSize[index].distanceX, currentY);
                }
                currentX += blockSize;
            });
            // New line
            currentY += distanceY;
        });
    }

}
