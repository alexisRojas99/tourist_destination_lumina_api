import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from '../../../common/entities/base.entity';

@Table({
  tableName: 'destination',
  timestamps: true,
  underscored: true,
})
export class Destination extends BaseModel {
  @Column({
    allowNull: false,
  })
  declare name: string;

  @Column({
    allowNull: false,
  })
  declare address: string;

  @Column({
    allowNull: false,
  })
  declare description: string;

  @Column({
    allowNull: false,
    field: 'image_url',
  })
  declare imageUrl: string;

  @Column({
    allowNull: true,
    defaultValue: 0,
  })
  declare likes: number;

  @Column({
    allowNull: false,
    defaultValue: false,
    field: 'is_deleted',
  })
  declare isDeleted: boolean;
}
