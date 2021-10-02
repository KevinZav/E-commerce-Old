import {MigrationInterface, QueryRunner} from "typeorm";

export class userAddress1632969027519 implements MigrationInterface {
    name = 'userAddress1632969027519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."addresses" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."addresses" ADD CONSTRAINT "UQ_16aac8a9f6f9c1dd6bcb75ec023" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "public"."addresses" ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`);
        await queryRunner.query(`ALTER TABLE "public"."addresses" DROP CONSTRAINT "UQ_16aac8a9f6f9c1dd6bcb75ec023"`);
        await queryRunner.query(`ALTER TABLE "public"."addresses" DROP COLUMN "user_id"`);
    }

}
