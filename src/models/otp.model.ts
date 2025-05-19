import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Otp {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  otpCode!: string;

  @Column({ type: "timestamp" })
  expiresAt!: Date;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
