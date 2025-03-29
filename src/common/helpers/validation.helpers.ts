import * as validator from 'validator';

export function validateRow(row: any): void {
    const requiredFields = [
        'Order ID',
        'Product ID',
        'Customer ID',
        'Quantity Sold',
        'Unit Price',
        'Date of Sale',
    ];

    requiredFields.forEach((field) => {
        if (!row[field]) throw new Error(`Missing required field: ${field}`);
    });

    if (!validator.isISO8601(row['Date of Sale'])) {
        throw new Error('Invalid date format');
    }

    if (!validator.isFloat(row['Unit Price'], { min: 0 })) {
        throw new Error('Invalid unit price');
    }
}
