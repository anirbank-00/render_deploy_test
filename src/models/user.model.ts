import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { UserRole, Sex } from '../constants/user-constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ type: 'varchar', length: 255 }) // Explicitly define type
    firstName!: string;

  @Column({ type: 'varchar', length: 255 }) // Explicitly define type
    lastName!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    phoneNumber: string | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
    email: string | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
    picture: string | undefined;

  @Column({ type: 'int4', nullable: true })
    age: number | undefined;

  @Column({
    type: 'enum',
    enum: Sex,
    nullable: true, // or false, depending on your requirements
  })
    sex: Sex | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
    address: string | undefined;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
    role!: UserRole;

  @Column({
    type: 'varchar',
    length: 225,
    nullable: true, // <-- Allow NULL in database if needed
  })
    service: string | undefined;

  @Column({
    type: 'timestamp',
    nullable: true, // <-- if you want to allow no date
  })

    dob: Date | undefined;

  @Column({
    type: 'timestamp',
    nullable: true, // <-- if you want to allow no date
  })
    date: Date | undefined;

  @Column({
    type: 'varchar',
    length: 225,
    nullable: true,
  })
    timeslot: string | undefined;

  @Column({
    type: 'varchar',
    length: 225,
    nullable: true,
  })
    additionalInfo: string | undefined;

  @Column({
    type: 'varchar',
    length: 225,
    nullable: true,
  })
    willingPrice: string | undefined;

  @Column({
    type: 'varchar',
    length: 225,
    nullable: true,
  })
    emergencyContact: string | undefined;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
    authTokens: string | undefined;
}
