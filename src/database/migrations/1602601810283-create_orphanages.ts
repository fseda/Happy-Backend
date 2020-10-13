import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanages1602601810283 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Operacoes no DB
        await queryRunner.createTable(new Table({
            name: 'orphanages',
            columns: [
            /* first row */  { 
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                /** second row */ {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2 ,
                },
                {
                    name: 'about',
                    type: 'text',
                },
                {
                    name: 'instructions',
                    type: 'text',
                },
                {
                    name: 'openingHours',
                    type: 'varchar',
                },
                {
                    name: 'openOnWeekends',
                    type: 'boolean',
                    default: false,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Desfazer o que foi feito no 'up';
        await queryRunner.dropTable('orphanages');
    }
}