import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class RevenueRepository {
    constructor(private readonly dataSource: DataSource) { }

    // Calculate Total Revenue for a given date range
    async calculateTotalRevenue(query: any): Promise<number> {
        const sql = `
      SELECT SUM(order_item.quantity_sold * order_item.unit_price) AS "totalRevenue"
      FROM order_item
      INNER JOIN "order" ON "order".order_id = order_item."order_order_id" 
      WHERE ($1::DATE IS NULL OR "order".date_of_sale >= $1)
        AND ($2::DATE IS NULL OR "order".date_of_sale <= $2)
    `;

        const parameters = [
            query.startDate || null,
            query.endDate || null,
        ];

        const result = await this.dataSource.query(sql, parameters);
        return result[0]?.totalRevenue || 0;
    }

    // Calculate Total Revenue by Product for a given date range
    async calculateTotalRevenueByProduct(query: any): Promise<any[]> {
        const sql = `
      SELECT product.product_id AS product_id, SUM(order_item.quantity_sold * order_item.unit_price) AS "totalRevenue"
      FROM order_item
      INNER JOIN "order" ON "order".order_id = order_item."order_order_id" 
      INNER JOIN product ON product.product_id = order_item."product_product_id" 
      WHERE ($1::DATE IS NULL OR "order".date_of_sale >= $1)
        AND ($2::DATE IS NULL OR "order".date_of_sale <= $2)
      GROUP BY product.product_id
    `;

        const parameters = [
            query.startDate || null,
            query.endDate || null,
        ];

        return await this.dataSource.query(sql, parameters);
    }

    // Calculate Total Revenue by Category for a given date range
    async calculateTotalRevenueByCategory(query: any): Promise<any[]> {
        const sql = `
      SELECT category.name AS category_name, SUM(order_item.quantity_sold * order_item.unit_price) AS "totalRevenue"
      FROM order_item
      INNER JOIN "order" ON "order".order_id = order_item."order_order_id" 
      INNER JOIN product ON product.product_id = order_item."product_product_id" 
      INNER JOIN category ON category.category_id = product."category_category_id" 
      WHERE ($1::DATE IS NULL OR "order".date_of_sale >= $1)
        AND ($2::DATE IS NULL OR "order".date_of_sale <= $2)
      GROUP BY category.name
    `;

        const parameters = [
            query.startDate || null,
            query.endDate || null,
        ];

        return await this.dataSource.query(sql, parameters);
    }

    // Calculate Total Revenue by Region for a given date range
    async calculateTotalRevenueByRegion(query: any): Promise<any[]> {
        const sql = `
      SELECT region.name AS region_name, SUM(order_item.quantity_sold * order_item.unit_price) AS "totalRevenue"
      FROM order_item
      INNER JOIN "order" ON "order".order_id = order_item."order_order_id" 
      INNER JOIN region ON region.region_id = "order"."region_region_id" 
      WHERE ($1::DATE IS NULL OR "order".date_of_sale >= $1)
        AND ($2::DATE IS NULL OR "order".date_of_sale <= $2)
      GROUP BY region.name
    `;

        const parameters = [
            query.startDate || null,
            query.endDate || null,
        ];

        return await this.dataSource.query(sql, parameters);
    }

    // Calculate Revenue Trends Over Time (Monthly, Quarterly, Yearly)
    async calculateRevenueTrends(query: any): Promise<any[]> {
        const sql = `
      SELECT DATE_TRUNC('month', "order".date_of_sale) AS period, 
             SUM(order_item.quantity_sold * order_item.unit_price) AS total_revenue
      FROM order_item
      INNER JOIN "order" ON "order".order_id = order_item."order_order_id" 
      WHERE ($1::DATE IS NULL OR "order".date_of_sale >= $1)
        AND ($2::DATE IS NULL OR "order".date_of_sale <= $2)
      GROUP BY period
      ORDER BY period;
    `;

        const parameters = [
            query.startDate || null,
            query.endDate || null,
        ];

        return await this.dataSource.query(sql, parameters);
    }
}
