import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  UpdatedAt,
  AutoIncrement,
} from 'sequelize-typescript';

export abstract class BaseModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @CreatedAt
  @Column({
    field: 'created_at',
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
  })
  declare updatedAt: Date;
}
