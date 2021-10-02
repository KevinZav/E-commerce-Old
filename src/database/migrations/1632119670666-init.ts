import {MigrationInterface, QueryRunner} from "typeorm";

export class init1632119670666 implements MigrationInterface {
    name = 'init1632119670666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brands" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text NOT NULL, "image" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name"), CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_types" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "description" text NOT NULL, "icon" character varying(100), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "company_id" integer, CONSTRAINT "PK_3f05efd7b52a7eca1f6b6f75e45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modules" ("id" SERIAL NOT NULL, "path" character varying(150) NOT NULL, "name" character varying(150) NOT NULL, "description" text NOT NULL, "icon" character varying(250), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7dbefd488bd96c5bf31f0ce0c95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "title" character varying(200) NOT NULL, "logo" character varying(200) NOT NULL, "RFC" character varying(100) NOT NULL, "commercial_line" character varying(200) NOT NULL, "date_registration" date NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131" UNIQUE ("name"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "address" character varying(250) NOT NULL, "zip_code" character varying(50) NOT NULL, "city" character varying(100), "state" character varying(100), "country" character varying(200), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "company_id" integer, CONSTRAINT "REL_21b07f425d667f94949fcc0791" UNIQUE ("company_id"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(100), "RFC" character varying(100), "photo" character varying(255), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_has_modules" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, "module_id" integer, CONSTRAINT "PK_5790bd0591a3e0c46c06621552a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies_has_modules" ("company_id" integer NOT NULL, "module_id" integer NOT NULL, CONSTRAINT "PK_ab15d8b9f577b4ffc230f5ad229" PRIMARY KEY ("company_id", "module_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7506a677306f424e0853505814" ON "companies_has_modules" ("company_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5fa162aa3ea90505c1f1471637" ON "companies_has_modules" ("module_id") `);
        await queryRunner.query(`ALTER TABLE "user_types" ADD CONSTRAINT "FK_f20c731eb3f7f08a1f23a60b07b" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_21b07f425d667f94949fcc07914" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_has_modules" ADD CONSTRAINT "FK_72a851a6f9157f1f3223c46b726" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_has_modules" ADD CONSTRAINT "FK_d5482739a18a7606bedaa12ad86" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies_has_modules" ADD CONSTRAINT "FK_7506a677306f424e0853505814a" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "companies_has_modules" ADD CONSTRAINT "FK_5fa162aa3ea90505c1f14716375" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_has_modules" DROP CONSTRAINT "FK_5fa162aa3ea90505c1f14716375"`);
        await queryRunner.query(`ALTER TABLE "companies_has_modules" DROP CONSTRAINT "FK_7506a677306f424e0853505814a"`);
        await queryRunner.query(`ALTER TABLE "users_has_modules" DROP CONSTRAINT "FK_d5482739a18a7606bedaa12ad86"`);
        await queryRunner.query(`ALTER TABLE "users_has_modules" DROP CONSTRAINT "FK_72a851a6f9157f1f3223c46b726"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_21b07f425d667f94949fcc07914"`);
        await queryRunner.query(`ALTER TABLE "user_types" DROP CONSTRAINT "FK_f20c731eb3f7f08a1f23a60b07b"`);
        await queryRunner.query(`DROP INDEX "IDX_5fa162aa3ea90505c1f1471637"`);
        await queryRunner.query(`DROP INDEX "IDX_7506a677306f424e0853505814"`);
        await queryRunner.query(`DROP TABLE "companies_has_modules"`);
        await queryRunner.query(`DROP TABLE "users_has_modules"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "modules"`);
        await queryRunner.query(`DROP TABLE "user_types"`);
        await queryRunner.query(`DROP TABLE "brands"`);
    }

}
